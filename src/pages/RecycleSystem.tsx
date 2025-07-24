import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, FileText, Settings, Building2, BarChart3, Database } from "lucide-react";
import PurchaseForm from "@/components/PurchaseForm";
import TransactionHistory from "@/components/TransactionHistory";
import SystemSettings from "@/components/SystemSettings";
import ConfigSystem from "@/components/ConfigSystem";
import Dashboard from "@/components/Dashboard";


const RecycleSystem = () => {
  const [activeTab, setActiveTab] = useState("purchase");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                {/* Increased font size for main title */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  ระบบบันทึกรับซื้อขยะรีไซเคิล
                </h1>
                {/* Increased font size for subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  โรงพยาบาลน้ำพอง
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:flex text-base">
              v1.0.0
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Increased font size for tab triggers and added hover effects */}
          {/* Increased padding (px-6 py-3) and text size (text-lg md:text-xl) for larger buttons */}
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger
              value="purchase"
              className="flex items-center gap-2 px-6 py-3 text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Recycle className="h-6 w-6" /> {/* Increased icon size */}
              บันทึกรับซื้อ
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 px-6 py-3 text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <FileText className="h-6 w-6" /> {/* Increased icon size */}
              รายการทั้งหมด
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 px-6 py-3 text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <BarChart3 className="h-6 w-6" /> {/* Increased icon size */}
              แดชบอร์ด
            </TabsTrigger>
            <TabsTrigger
              value="config"
              className="flex items-center gap-2 px-6 py-3 text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Database className="h-6 w-6" /> {/* Increased icon size */}
              เชื่อมต่อ API
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 px-6 py-3 text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Settings className="h-6 w-6" /> {/* Increased icon size */}
              ตั้งค่าระบบ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase" className="space-y-6">
            <Card>
              <CardHeader>
                {/* Increased font size for CardTitle */}
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Recycle className="h-6 w-6 text-primary" />
                  บันทึกการรับซื้อขยะรีไซเคิล
                </CardTitle>
                {/* Increased font size for CardDescription */}
                <CardDescription className="text-base md:text-lg">
                  กรอกข้อมูลการรับซื้อขยะรีไซเคิลจากแผนกต่างๆ หรือบุคคลทั่วไป
                </CardDescription>
              </CardHeader>
              <CardContent>
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

          <TabsContent value="config" className="space-y-6">
            <ConfigSystem />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                {/* Increased font size for CardTitle */}
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Settings className="h-6 w-6 text-primary" />
                  ตั้งค่าระบบ
                </CardTitle>
                {/* Increased font size for CardDescription */}
                <CardDescription className="text-base md:text-lg">
                  จัดการราคาขยะรีไซเคิลและรายชื่อผู้ขาย
                </CardDescription>
              </CardHeader>
              <CardContent>
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
