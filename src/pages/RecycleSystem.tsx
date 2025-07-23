import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, FileText, Settings, Building2 } from "lucide-react";
import PurchaseForm from "@/components/PurchaseForm";
import TransactionHistory from "@/components/TransactionHistory";
import SystemSettings from "@/components/SystemSettings";

const RecycleSystem = () => {
  const [activeTab, setActiveTab] = useState("purchase");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Recycle className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  ระบบบันทึกรับซื้อขยะรีไซเคิล
                </h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  โรงพยาบาลน้ำพอง
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:flex">
              v1.0.0
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="purchase" className="flex items-center gap-2">
              <Recycle className="h-4 w-4" />
              บันทึกรับซื้อ
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              รายการทั้งหมด
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              ตั้งค่าระบบ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchase" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-primary" />
                  บันทึกการรับซื้อขยะรีไซเคิล
                </CardTitle>
                <CardDescription>
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
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  ประวัติการรับซื้อขยะรีไซเคิล
                </CardTitle>
                <CardDescription>
                  ดูและจัดการประวัติการรับซื้อขยะรีไซเคิลทั้งหมด
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  ตั้งค่าระบบ
                </CardTitle>
                <CardDescription>
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