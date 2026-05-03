import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, FileText, Settings, Building2, BarChart3, Database, Package } from "lucide-react";
import PurchaseForm from "@/components/PurchaseForm";
import TransactionHistory from "@/components/TransactionHistory";
import CustomerManager from "@/components/CustomerManager";
import ConfigSystem from "@/components/ConfigSystem";
import Dashboard from "@/components/Dashboard";
import WasteTypeManager from "@/components/WasteTypeManager";
import DepartmentDashboard from "@/components/DepartmentDashboard";


const RecycleSystem = () => {
  const [activeTab, setActiveTab] = useState("purchase");

  return (
    <div className="min-h-screen relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80')" }}>
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <Recycle className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                {/* Responsive title */}
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  ระบบบันทึกรับซื้อขยะรีไซเคิล
                </h1>
                {/* Responsive subtitle */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground flex items-center gap-1 sm:gap-2 mt-1">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="truncate">ร้านรับซื้อของเก่า รักษ์โลก</span>
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden lg:flex text-sm">
              v1.0.0
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Responsive tab layout */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-6 sm:mb-8 gap-1 h-auto p-1">
            <TabsTrigger
              value="purchase"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <Recycle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">บันทึกรับซื้อ</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">รายการทั้งหมด</span>
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">แดชบอร์ด</span>
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">ข้อมูลลูกค้า</span>
            </TabsTrigger>
            <TabsTrigger
              value="waste-types"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <Package className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">ประเภทขยะ</span>
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg h-auto min-h-[48px] touch-button"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-center leading-tight">จัดการลูกค้า</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase" className="space-y-4 sm:space-y-6">
            <Card className="mobile-card">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                  <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  <span className="min-w-0">บันทึกการรับซื้อขยะรีไซเคิล</span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base md:text-lg">
                  กรอกข้อมูลการรับซื้อขยะรีไซเคิลจากลูกค้าสมาชิก หรือบุคคลทั่วไป
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <PurchaseForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                {/* Increased font size for CardTitle */}
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <FileText className="h-6 w-6 text-primary" />
                  ประวัติการรับซื้อขยะรีไซเคิล
                </CardTitle>
                {/* Increased font size for CardDescription */}
                <CardDescription className="text-base md:text-lg">
                  ดูและจัดการประวัติการรับซื้อขยะรีไซเคิลทั้งหมด
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <DepartmentDashboard />
          </TabsContent>

          <TabsContent value="waste-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Package className="h-6 w-6 text-primary" />
                  จัดการประเภทขยะรีไซเคิล
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  เพิ่ม แก้ไข หรือลบประเภทขยะ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WasteTypeManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <CustomerManager />
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </div>
  );
};

export default RecycleSystem;
