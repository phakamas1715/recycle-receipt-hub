import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, TrendingUp, DollarSign, Recycle, Calendar, Download, RefreshCw } from "lucide-react";

interface DashboardData {
  totalTransactions: number;
  totalAmount: number;
  totalWeight: number;
  topDepartments: Array<{ name: string; amount: number; weight: number; transactions: number }>;
  wasteTypeDistribution: Array<{ name: string; value: number; amount: number }>;
  monthlyTrend: Array<{ month: string; amount: number; weight: number; transactions: number }>;
  dailyStats: Array<{ date: string; amount: number; transactions: number }>;
}

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalTransactions: 0,
    totalAmount: 0,
    totalWeight: 0,
    topDepartments: [],
    wasteTypeDistribution: [],
    monthlyTrend: [],
    dailyStats: []
  });

  // Mock data - ในระบบจริงจะดึงจาก Google Sheets
  useEffect(() => {
    const loadDashboardData = () => {
      const mockData: DashboardData = {
        totalTransactions: 156,
        totalAmount: 45280.50,
        totalWeight: 1250.75,
        topDepartments: [
          { name: "OPD - งานการพยาบาลผู้ป่วยนอก", amount: 8540, weight: 245.5, transactions: 24 },
          { name: "WARD1 - งานการพยาบาลผู้ป่วยใน ชาย", amount: 7320, weight: 198.2, transactions: 18 },
          { name: "ER - งานการพยาบาลผู้ป่วยฉุกเฉิน", amount: 6890, weight: 178.9, transactions: 16 },
          { name: "OR - งานการพยาบาลผู้ป่วยผ่าตัด", amount: 5430, weight: 156.3, transactions: 14 },
          { name: "MNU - งานโภชนศาสตร์", amount: 4680, weight: 145.8, transactions: 12 }
        ],
        wasteTypeDistribution: [
          { name: "กระดาษ", value: 450.2, amount: 15757 },
          { name: "พลาสติก PET", value: 320.5, amount: 3846 },
          { name: "กระป๋องอลูมิเนียม", value: 85.3, amount: 3838.5 },
          { name: "แก้ว", value: 240.8, amount: 361.2 },
          { name: "เหล็ก", value: 153.9, amount: 1231.2 }
        ],
        monthlyTrend: [
          { month: "ม.ค.", amount: 38500, weight: 1050, transactions: 42 },
          { month: "ก.พ.", amount: 42300, weight: 1180, transactions: 48 },
          { month: "มี.ค.", amount: 45280, weight: 1250, transactions: 52 },
          { month: "เม.ย.", amount: 48900, weight: 1320, transactions: 58 },
          { month: "พ.ค.", amount: 44200, weight: 1200, transactions: 54 },
          { month: "มิ.ย.", amount: 47800, weight: 1280, transactions: 56 }
        ],
        dailyStats: [
          { date: "20/03", amount: 2340, transactions: 8 },
          { date: "22/03", amount: 1890, transactions: 6 },
          { date: "25/03", amount: 3450, transactions: 12 },
          { date: "27/03", amount: 2780, transactions: 9 },
          { date: "29/03", amount: 4120, transactions: 14 },
          { date: "01/04", amount: 3680, transactions: 11 },
          { date: "03/04", amount: 2950, transactions: 10 }
        ]
      };
      setDashboardData(mockData);
    };

    loadDashboardData();
  }, [selectedPeriod]);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  const generateReport = () => {
    // ในระบบจริงจะสร้าง PDF หรือ Excel report
    const reportData = {
      period: `${selectedPeriod} วันที่ผ่านมา`,
      generated: new Date().toLocaleDateString('th-TH'),
      summary: dashboardData
    };
    
    console.log("Generating report:", reportData);
    // Here would be the actual report generation logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">แดชบอร์ดและรายงาน</h2>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 วันที่ผ่านมา</SelectItem>
              <SelectItem value="30">30 วันที่ผ่านมา</SelectItem>
              <SelectItem value="90">90 วันที่ผ่านมา</SelectItem>
              <SelectItem value="365">1 ปีที่ผ่านมา</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            อัปเดต
          </Button>
          <Button size="sm" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายการทั้งหมด</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">รายการรับซื้อ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดรวมทั้งหมด</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">บาท</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">น้ำหนักรวม</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalWeight.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">กิโลกรัม</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ค่าเฉลี่ยต่อรายการ</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalTransactions > 0 
                ? (dashboardData.totalAmount / dashboardData.totalTransactions).toFixed(0)
                : "0"
              }
            </div>
            <p className="text-xs text-muted-foreground">บาท/รายการ</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Departments */}
        <Card>
          <CardHeader>
            <CardTitle>แผนกที่มียอดสูงสุด</CardTitle>
            <CardDescription>5 แผนกที่มีปริมาณการขายมากที่สุด</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.topDepartments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                    name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                  ]}
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>การกระจายตัวของประเภทขยะ</CardTitle>
            <CardDescription>สัดส่วนขยะแต่ละประเภท</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.wasteTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.wasteTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} กก.`, 'น้ำหนัก']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายเดือน</CardTitle>
            <CardDescription>ยอดรวมและน้ำหนักในแต่ละเดือน</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                    name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                  ]}
                />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="weight" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Stats */}
        <Card>
          <CardHeader>
            <CardTitle>สถิติรายวัน</CardTitle>
            <CardDescription>จำนวนรายการในแต่ละวัน</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'transactions' ? `${value} รายการ` : `${value.toLocaleString()} บาท`,
                    name === 'transactions' ? 'จำนวนรายการ' : 'ยอดรวม'
                  ]}
                />
                <Bar dataKey="transactions" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปข้อมูลสำคัญ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">ประเภทขยะที่ได้รับนิยม</h4>
              <div className="space-y-1">
                {dashboardData.wasteTypeDistribution.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <Badge variant="secondary">{item.value} กก.</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">แผนกที่มีส่วนร่วมสูง</h4>
              <div className="space-y-1">
                {dashboardData.topDepartments.slice(0, 3).map((dept, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="truncate">{dept.name.split(' - ')[0]}</span>
                    <Badge variant="outline">{dept.transactions} รายการ</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">สถิติเฉลี่ย</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>ยอดเฉลี่ยต่อวัน:</span>
                  <span>{(dashboardData.totalAmount / 30).toFixed(0)} บาท</span>
                </div>
                <div className="flex justify-between">
                  <span>น้ำหนักเฉลี่ยต่อรายการ:</span>
                  <span>{(dashboardData.totalWeight / dashboardData.totalTransactions).toFixed(1)} กก.</span>
                </div>
                <div className="flex justify-between">
                  <span>รายการเฉลี่ยต่อวัน:</span>
                  <span>{(dashboardData.totalTransactions / 30).toFixed(0)} รายการ</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;