import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, FileText, Settings, Building2, BarChart3, Database, Sparkles, Leaf } from "lucide-react";

// Enhanced placeholder components with beautiful designs
const PurchaseForm = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 border border-emerald-200 shadow-lg">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full -mr-16 -mt-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full -ml-12 -mb-12"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-48 text-center">
      <div className="mb-4 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
        <Recycle className="h-8 w-8 text-white animate-spin" style={{animationDuration: '3s'}} />
      </div>
      <p className="text-xl font-semibold text-emerald-800 mb-2">ส่วนฟอร์มบันทึกรับซื้อ</p>
      <p className="text-emerald-600">กำลังพัฒนาระบบ...</p>
    </div>
  </div>
);

const TransactionHistory = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 border border-blue-200 shadow-lg">
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -mr-20 -mt-20"></div>
    <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full -ml-14 -mb-14"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-48 text-center">
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
        <FileText className="h-8 w-8 text-white animate-pulse" />
      </div>
      <p className="text-xl font-semibold text-blue-800 mb-2">ส่วนประวัติรายการ</p>
      <p className="text-blue-600">กำลังพัฒนาระบบ...</p>
    </div>
  </div>
);

const SystemSettings = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8 border border-orange-200 shadow-lg">
    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-orange-200/25 to-transparent rounded-full -mr-18 -mt-18"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-200/25 to-transparent rounded-full -ml-16 -mb-16"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-48 text-center">
      <div className="mb-4 p-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
        <Settings className="h-8 w-8 text-white animate-spin" style={{animationDuration: '4s'}} />
      </div>
      <p className="text-xl font-semibold text-orange-800 mb-2">ส่วนตั้งค่าระบบ</p>
      <p className="text-orange-600">กำลังพัฒนาระบบ...</p>
    </div>
  </div>
);

const ConfigSystem = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-8 border border-violet-200 shadow-lg">
    <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-violet-200/20 to-transparent rounded-full -mr-22 -mt-22"></div>
    <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-fuchsia-200/20 to-transparent rounded-full -ml-18 -mb-18"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-48 text-center">
      <div className="mb-4 p-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full">
        <Database className="h-8 w-8 text-white animate-bounce" />
      </div>
      <p className="text-xl font-semibold text-violet-800 mb-2">ส่วนเชื่อมต่อ API</p>
      <p className="text-violet-600">กำลังพัฒนาระบบ...</p>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-8 border border-yellow-200 shadow-lg">
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-yellow-200/15 to-transparent rounded-full -mr-24 -mt-24"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-200/15 to-transparent rounded-full -ml-20 -mb-20"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-48 text-center">
      <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
        <BarChart3 className="h-8 w-8 text-white animate-pulse" />
      </div>
      <p className="text-xl font-semibold text-yellow-800 mb-2">ส่วนแดชบอร์ด</p>
      <p className="text-yellow-600">กำลังพัฒนาระบบ...</p>
    </div>
  </div>
);

const RecycleSystem = () => {
  const [activeTab, setActiveTab] = useState("purchase");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-80"></div>
      </div>

      {/* Header with enhanced design */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-xl relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <Recycle className="h-10 w-10 text-white" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ระบบบันทึกรับซื้อขยะรีไซเคิล
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 flex items-center gap-3 mt-2">
                  <Building2 className="h-6 w-6 text-emerald-500" />
                  โรงพยาบาลน้ำพอง
                  <Leaf className="h-5 w-5 text-green-500 animate-pulse" />
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 border-emerald-200">
                v1.0.0
              </Badge>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with enhanced styling */}
      <main className="container mx-auto px-4 py-10 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-10 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/20">
            <TabsTrigger
              value="purchase"
              className="flex items-center gap-3 px-6 py-4 text-lg md:text-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-xl"
            >
              <Recycle className="h-6 w-6" />
              บันทึกรับซื้อ
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-3 px-6 py-4 text-lg md:text-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-xl"
            >
              <FileText className="h-6 w-6" />
              รายการทั้งหมด
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-3 px-6 py-4 text-lg md:text-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-xl"
            >
              <BarChart3 className="h-6 w-6" />
              แดชบอร์ด
            </TabsTrigger>
            <TabsTrigger
              value="config"
              className="flex items-center gap-3 px-6 py-4 text-lg md:text-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-fuchsia-500 data-[state=active]:text-white data-[state=active]:shadow-xl"
            >
              <Database className="h-6 w-6" />
              เชื่อมต่อ API
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-3 px-6 py-4 text-lg md:text-xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl"
            >
              <Settings className="h-6 w-6" />
              ตั้งค่าระบบ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase" className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="bg-white/70 backdrop-blur-sm shadow-2xl border-white/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald/10">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-emerald-800">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <Recycle className="h-7 w-7 text-white" />
                  </div>
                  บันทึกการรับซื้อขยะรีไซเคิล
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-emerald-600">
                  กรอกข้อมูลการรับซื้อขยะรีไซเคิลจากแผนกต่างๆ หรือบุคคลทั่วไป
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <PurchaseForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="bg-white/70 backdrop-blur-sm shadow-2xl border-white/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue/10">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-blue-800">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  ประวัติการรับซื้อขยะรีไซเคิล
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-blue-600">
                  ดูและจัดการประวัติการรับซื้อขยะรีไซเคิลทั้งหมด
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <TransactionHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-8 animate-in fade-in-50 duration-500">
            <Dashboard />
          </TabsContent>

          <TabsContent value="config" className="space-y-8 animate-in fade-in-50 duration-500">
            <ConfigSystem />
          </TabsContent>

          <TabsContent value="settings" className="space-y-8 animate-in fade-in-50 duration-500">
            <Card className="bg-white/70 backdrop-blur-sm shadow-2xl border-white/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50 border-b border-orange/10">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-orange-800">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg">
                    <Settings className="h-7 w-7 text-white" />
                  </div>
                  ตั้งค่าระบบ
                </CardTitle>
                <CardDescription className="text-lg md:text-xl text-orange-600">
                  จัดการราคาขยะรีไซเคิลและรายชื่อผู้ขาย
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <SystemSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RecycleSystem;