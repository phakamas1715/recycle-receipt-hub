import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { Building2, TrendingUp, DollarSign, Recycle, Award, Search, Filter, Download } from "lucide-react";
import { dataStorage, Transaction } from "@/lib/dataStorage";

interface DepartmentStats {
  departmentName: string;
  totalTransactions: number;
  totalAmount: number;
  totalWeight: number;
  avgPerTransaction: number;
  topWasteTypes: Array<{ name: string; weight: number; amount: number }>;
  monthlyTrend: Array<{ month: string; amount: number; weight: number }>;
  greenScore: number;
  greenActions: number;
  lastTransaction: string;
}

const DepartmentDashboard = () => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats | null>(null);
  const [allDepartmentStats, setAllDepartmentStats] = useState<DepartmentStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"amount" | "weight" | "transactions" | "greenScore">("amount");

  useEffect(() => {
    loadDepartments();
    loadAllDepartmentStats();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      loadDepartmentStats(selectedDepartment);
    }
  }, [selectedDepartment]);

  const loadDepartments = () => {
    const transactions = dataStorage.getTransactions();
    const uniqueDepartments = Array.from(
      new Set(
        transactions
          .filter(t => t.sellerType === "department")
          .map(t => t.seller)
      )
    ).sort();
    
    setDepartments(uniqueDepartments);
    if (uniqueDepartments.length > 0 && !selectedDepartment) {
      setSelectedDepartment(uniqueDepartments[0]);
    }
  };

  const loadDepartmentStats = (departmentName: string) => {
    const transactions = dataStorage.getTransactions();
    const departmentTransactions = transactions.filter(
      t => t.sellerType === "department" && t.seller === departmentName
    );

    if (departmentTransactions.length === 0) {
      setDepartmentStats(null);
      return;
    }

    // Calculate basic stats
    const totalAmount = departmentTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalWeight = departmentTransactions.reduce((sum, t) => sum + t.weight, 0);
    const totalTransactions = departmentTransactions.length;

    // Calculate waste type distribution
    const wasteTypeStats: { [key: string]: { weight: number; amount: number } } = {};
    departmentTransactions.forEach(t => {
      if (!wasteTypeStats[t.wasteType]) {
        wasteTypeStats[t.wasteType] = { weight: 0, amount: 0 };
      }
      wasteTypeStats[t.wasteType].weight += t.weight;
      wasteTypeStats[t.wasteType].amount += t.totalAmount;
    });

    const topWasteTypes = Object.entries(wasteTypeStats)
      .sort(([,a], [,b]) => b.amount - a.amount)
      .slice(0, 5)
      .map(([name, data]) => ({ name, ...data }));

    // Calculate monthly trend
    const monthlyData: { [key: string]: { amount: number; weight: number } } = {};
    departmentTransactions.forEach(t => {
      try {
        const date = new Date(t.date);
        if (isNaN(date.getTime())) return;
        
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { amount: 0, weight: 0 };
        }
        monthlyData[monthKey].amount += t.totalAmount;
        monthlyData[monthKey].weight += t.weight;
      } catch {
        return;
      }
    });

    const monthlyTrend = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([key, data]) => ({
        month: new Date(key + '-01').toLocaleDateString('th-TH', { month: 'short' }),
        ...data
      }));

    // Calculate Green Score (ตามมาตรฐาน Green & Clean Hospital)
    const wasteTypes = dataStorage.getWasteTypes();
    const greenTransactions = departmentTransactions.filter(t => {
      const wasteType = wasteTypes.find(w => w.name === t.wasteType);
      return wasteType?.greenStandard;
    });
    
    const greenScore = totalTransactions > 0 ? Math.round((greenTransactions.length / totalTransactions) * 100) : 0;
    const greenActions = greenTransactions.length;

    // Find last transaction
    const lastTransaction = departmentTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    const stats: DepartmentStats = {
      departmentName,
      totalTransactions,
      totalAmount,
      totalWeight,
      avgPerTransaction: totalAmount / totalTransactions,
      topWasteTypes,
      monthlyTrend,
      greenScore,
      greenActions,
      lastTransaction: lastTransaction ? new Date(lastTransaction.date).toLocaleDateString('th-TH') : 'ไม่มีข้อมูล'
    };

    setDepartmentStats(stats);
  };

  const loadAllDepartmentStats = () => {
    const transactions = dataStorage.getTransactions();
    const departmentGroups = transactions
      .filter(t => t.sellerType === "department")
      .reduce((groups: { [key: string]: Transaction[] }, transaction) => {
        if (!groups[transaction.seller]) {
          groups[transaction.seller] = [];
        }
        groups[transaction.seller].push(transaction);
        return groups;
      }, {});

    const wasteTypes = dataStorage.getWasteTypes();
    
    const stats = Object.entries(departmentGroups).map(([departmentName, deptTransactions]) => {
      const totalAmount = deptTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
      const totalWeight = deptTransactions.reduce((sum, t) => sum + t.weight, 0);
      const totalTransactions = deptTransactions.length;

      // Calculate Green Score
      const greenTransactions = deptTransactions.filter(t => {
        const wasteType = wasteTypes.find(w => w.name === t.wasteType);
        return wasteType?.greenStandard;
      });
      
      const greenScore = totalTransactions > 0 ? Math.round((greenTransactions.length / totalTransactions) * 100) : 0;

      const lastTransaction = deptTransactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      return {
        departmentName,
        totalTransactions,
        totalAmount,
        totalWeight,
        avgPerTransaction: totalAmount / totalTransactions,
        topWasteTypes: [],
        monthlyTrend: [],
        greenScore,
        greenActions: greenTransactions.length,
        lastTransaction: lastTransaction ? new Date(lastTransaction.date).toLocaleDateString('th-TH') : 'ไม่มีข้อมูล'
      };
    });

    setAllDepartmentStats(stats);
  };

  const filteredStats = allDepartmentStats
    .filter(stat => 
      stat.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "amount": return b.totalAmount - a.totalAmount;
        case "weight": return b.totalWeight - a.totalWeight;
        case "transactions": return b.totalTransactions - a.totalTransactions;
        case "greenScore": return b.greenScore - a.greenScore;
        default: return 0;
      }
    });

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  const getGreenScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getGreenScoreLabel = (score: number) => {
    if (score >= 80) return "ดีเยี่ยม";
    if (score >= 60) return "ดี";
    if (score >= 40) return "ปานกลาง";
    return "ต้องปรับปรุง";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            แดชบอร์ดข้อมูลแผนก
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            ติดตามและประเมินผลการจัดการขยะรีไซเคิลตามมาตรฐาน Green & Clean Hospital
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Department Selection */}
      <Card>
        <CardHeader>
          <CardTitle>เลือกแผนกเพื่อดูรายละเอียด</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="เลือกแผนก" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Selected Department Stats */}
      {departmentStats && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>ข้อมูลแผนก: {departmentStats.departmentName}</span>
                <Badge className={`text-lg px-4 py-2 ${getGreenScoreColor(departmentStats.greenScore)}`}>
                  คะแนนสิ่งแวดล้อม: {departmentStats.greenScore}% ({getGreenScoreLabel(departmentStats.greenScore)})
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{departmentStats.totalTransactions}</div>
                  <div className="text-blue-700 font-medium">รายการทั้งหมด</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{departmentStats.totalAmount.toLocaleString()}</div>
                  <div className="text-green-700 font-medium">ยอดรวม (บาท)</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{departmentStats.totalWeight.toFixed(1)}</div>
                  <div className="text-purple-700 font-medium">น้ำหนักรวม (กก.)</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{departmentStats.avgPerTransaction.toFixed(0)}</div>
                  <div className="text-orange-700 font-medium">ค่าเฉลี่ย/รายการ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ประเภทขยะที่ได้รับนิยม</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentStats.topWasteTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value, name) => [
                      name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                      name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                    ]} />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>แนวโน้มรายเดือน</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={departmentStats.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value, name) => [
                      name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                      name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                    ]} />
                    <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="weight" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* All Departments Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ภาพรวมทุกแผนก</span>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาแผนก..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">เรียงตามยอดรวม</SelectItem>
                  <SelectItem value="weight">เรียงตามน้ำหนัก</SelectItem>
                  <SelectItem value="transactions">เรียงตามจำนวนรายการ</SelectItem>
                  <SelectItem value="greenScore">เรียงตามคะแนนสิ่งแวดล้อม</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStats.map((stat) => (
              <Card key={stat.departmentName} className="cursor-pointer hover:shadow-lg transition-all duration-200" 
                    onClick={() => setSelectedDepartment(stat.departmentName)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">
                      {stat.departmentName.length > 30 
                        ? stat.departmentName.substring(0, 30) + '...'
                        : stat.departmentName
                      }
                    </CardTitle>
                    <Badge className={`text-xs ${getGreenScoreColor(stat.greenScore)}`}>
                      {stat.greenScore}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">รายการ:</span>
                      <span className="font-medium">{stat.totalTransactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ยอดรวม:</span>
                      <span className="font-medium">{stat.totalAmount.toLocaleString()} บาท</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">น้ำหนัก:</span>
                      <span className="font-medium">{stat.totalWeight.toFixed(1)} กก.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">การกระทำเขียว:</span>
                      <span className="font-medium text-green-600">{stat.greenActions} ครั้ง</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ล่าสุด:</span>
                      <span className="font-medium">{stat.lastTransaction}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentDashboard;