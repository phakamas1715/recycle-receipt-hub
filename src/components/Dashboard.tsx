import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, TrendingUp, DollarSign, Recycle, Calendar, Download, RefreshCw } from "lucide-react";
import { dataStorage } from "@/lib/dataStorage";
import { ExportUtils } from "@/lib/exportUtils";

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

  // Load real data from storage
  useEffect(() => {
    const loadDashboardData = () => {
      const stats = dataStorage.getStatistics();
      const transactions = dataStorage.getTransactions();
      
      // Generate real dashboard data
      const realData: DashboardData = {
        totalTransactions: stats.totalTransactions,
        totalAmount: stats.totalAmount,
        totalWeight: stats.totalWeight,
        topDepartments: Object.entries(stats.sellerStats)
          .sort(([,a], [,b]) => b.amount - a.amount)
          .slice(0, 5)
          .map(([name, data]) => ({
            name: name.length > 30 ? name.substring(0, 30) + '...' : name,
            amount: data.amount,
            weight: data.weight,
            transactions: data.count
          })),
        wasteTypeDistribution: Object.entries(stats.wasteTypeStats).map(([name, data]) => ({
          name,
          value: data.weight,
          amount: data.amount
        })),
        monthlyTrend: generateMonthlyTrend(transactions),
        dailyStats: generateDailyStats(transactions)
      };
      setDashboardData(realData);
    };

    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  // Helper functions
  const generateMonthlyTrend = (transactions: any[]) => {
    const monthlyData: { [key: string]: { amount: number; weight: number; transactions: number } } = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('th-TH', { month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { amount: 0, weight: 0, transactions: 0 };
      }
      monthlyData[monthKey].amount += t.totalAmount;
      monthlyData[monthKey].weight += t.weight;
      monthlyData[monthKey].transactions++;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([key, data]) => ({
        month: new Date(key + '-01').toLocaleDateString('th-TH', { month: 'short' }),
        ...data
      }));
  };

  const generateDailyStats = (transactions: any[]) => {
    const dailyData: { [key: string]: { amount: number; transactions: number } } = {};
    
    transactions.forEach(t => {
      const dateKey = t.date;
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { amount: 0, transactions: 0 };
      }
      dailyData[dateKey].amount += t.totalAmount;
      dailyData[dateKey].transactions++;
    });

    return Object.entries(dailyData)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit' }),
        ...data
      }));
  };

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
      <div className="flex items-center justify-between flex-wrap gap-4"> {/* Added flex-wrap and gap */}
        <div className="flex items-center gap-3">
          <BarChart3 className="h-7 w-7 text-primary" /> {/* Increased icon size */}
          <h2 className="text-2xl md:text-3xl font-semibold">แดชบอร์ดและรายงาน</h2> {/* Increased font size */}
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end"> {/* Added flex-wrap and justify-end */}
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48 text-base md:text-lg"> {/* Increased width and font size */}
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 วันที่ผ่านมา</SelectItem>
              <SelectItem value="30">30 วันที่ผ่านมา</SelectItem>
              <SelectItem value="90">90 วันที่ผ่านมา</SelectItem>
              <SelectItem value="365">1 ปีที่ผ่านมา</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="lg" // Increased button size
            className="text-base md:text-lg px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg" // Increased font size and added effects
          >
            <RefreshCw className="h-5 w-5 mr-2" /> {/* Increased icon size */}
            อัปเดต
          </Button>
          <Button
            size="lg" // Increased button size
            onClick={generateReport}
            className="text-base md:text-lg px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg" // Increased font size and added effects
          >
            <Download className="h-5 w-5 mr-2" /> {/* Increased icon size */}
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> {/* Adjusted responsive grid */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base md:text-lg font-medium">รายการทั้งหมด</CardTitle> {/* Increased font size */}
            <Calendar className="h-5 w-5 text-muted-foreground" /> {/* Increased icon size */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold">{dashboardData.totalTransactions}</div> {/* Increased font size */}
            <p className="text-sm md:text-base text-muted-foreground">รายการรับซื้อ</p> {/* Increased font size */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base md:text-lg font-medium">ยอดรวมทั้งหมด</CardTitle> {/* Increased font size */}
            <DollarSign className="h-5 w-5 text-muted-foreground" /> {/* Increased icon size */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold">{dashboardData.totalAmount.toLocaleString()}</div> {/* Increased font size */}
            <p className="text-sm md:text-base text-muted-foreground">บาท</p> {/* Increased font size */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base md:text-lg font-medium">น้ำหนักรวม</CardTitle> {/* Increased font size */}
            <Recycle className="h-5 w-5 text-muted-foreground" /> {/* Increased icon size */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold">{dashboardData.totalWeight.toLocaleString()}</div> {/* Increased font size */}
            <p className="text-sm md:text-base text-muted-foreground">กิโลกรัม</p> {/* Increased font size */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base md:text-lg font-medium">ค่าเฉลี่ยต่อรายการ</CardTitle> {/* Increased font size */}
            <TrendingUp className="h-5 w-5 text-muted-foreground" /> {/* Increased icon size */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold"> {/* Increased font size */}
              {dashboardData.totalTransactions > 0 
                ? (dashboardData.totalAmount / dashboardData.totalTransactions).toFixed(0)
                : "0"
              }
            </div>
            <p className="text-sm md:text-base text-muted-foreground">บาท/รายการ</p> {/* Increased font size */}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Departments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">แผนกที่มียอดสูงสุด</CardTitle> {/* Increased font size */}
            <CardDescription className="text-base md:text-lg">5 แผนกที่มีปริมาณการขายมากที่สุด</CardDescription> {/* Increased font size */}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.topDepartments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={14} /> {/* Increased height and font size */}
                <YAxis fontSize={14} /> {/* Increased font size */}
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                    name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                  ]}
                  labelStyle={{ fontSize: '14px' }} // Increased tooltip font size
                  itemStyle={{ fontSize: '14px' }} // Increased tooltip item font size
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">การกระจายตัวของประเภทขยะ</CardTitle> {/* Increased font size */}
            <CardDescription className="text-base md:text-lg">สัดส่วนขยะแต่ละประเภท</CardDescription> {/* Increased font size */}
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
                  outerRadius={100} // Increased outerRadius for larger pie chart
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '14px' }} // Increased label font size
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
            <CardTitle className="text-xl md:text-2xl">แนวโน้มรายเดือน</CardTitle> {/* Increased font size */}
            <CardDescription className="text-base md:text-lg">ยอดรวมและน้ำหนักในแต่ละเดือน</CardDescription> {/* Increased font size */}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={14} /> {/* Increased font size */}
                <YAxis fontSize={14} /> {/* Increased font size */}
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'amount' ? `${value.toLocaleString()} บาท` : `${value} กก.`,
                    name === 'amount' ? 'ยอดรวม' : 'น้ำหนัก'
                  ]}
                  labelStyle={{ fontSize: '14px' }} // Increased tooltip font size
                  itemStyle={{ fontSize: '14px' }} // Increased tooltip item font size
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
            <CardTitle className="text-xl md:text-2xl">สถิติรายวัน</CardTitle> {/* Increased font size */}
            <CardDescription className="text-base md:text-lg">จำนวนรายการในแต่ละวัน</CardDescription> {/* Increased font size */}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={14} /> {/* Increased font size */}
                <YAxis fontSize={14} /> {/* Increased font size */}
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'transactions' ? `${value} รายการ` : `${value.toLocaleString()} บาท`,
                    name === 'transactions' ? 'จำนวนรายการ' : 'ยอดรวม'
                  ]}
                  labelStyle={{ fontSize: '14px' }} // Increased tooltip font size
                  itemStyle={{ fontSize: '14px' }} // Increased tooltip item font size
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
          <CardTitle className="text-xl md:text-2xl">สรุปข้อมูลสำคัญ</CardTitle> {/* Increased font size */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Increased gap for better spacing */}
            <div className="space-y-3"> {/* Increased space-y */}
              <h4 className="font-medium text-lg md:text-xl">ประเภทขยะที่ได้รับนิยม</h4> {/* Increased font size */}
              <div className="space-y-2"> {/* Increased space-y */}
                {dashboardData.wasteTypeDistribution.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-base md:text-lg"> {/* Increased font size */}
                    <span>{item.name}</span>
                    <Badge variant="secondary" className="text-base md:text-lg">{item.value} กก.</Badge> {/* Increased badge font size */}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3"> {/* Increased space-y */}
              <h4 className="font-medium text-lg md:text-xl">แผนกที่มีส่วนร่วมสูง</h4> {/* Increased font size */}
              <div className="space-y-2"> {/* Increased space-y */}
                {dashboardData.topDepartments.slice(0, 3).map((dept, index) => (
                  <div key={index} className="flex justify-between text-base md:text-lg"> {/* Increased font size */}
                    <span className="truncate">{dept.name.split(' - ')[0]}</span>
                    <Badge variant="outline" className="text-base md:text-lg">{dept.transactions} รายการ</Badge> {/* Increased badge font size */}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3"> {/* Increased space-y */}
              <h4 className="font-medium text-lg md:text-xl">สถิติเฉลี่ย</h4> {/* Increased font size */}
              <div className="space-y-2 text-base md:text-lg"> {/* Increased space-y and font size */}
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
