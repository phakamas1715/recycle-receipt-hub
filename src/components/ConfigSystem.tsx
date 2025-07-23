import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Settings, Database, MessageSquare, Zap, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ConfigSystem = () => {
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState({
    spreadsheetId: "",
    apiKey: "",
    serviceAccountKey: "",
  });

  const [lineConfig, setLineConfig] = useState({
    channelAccessToken: "",
    channelSecret: "",
    webhookUrl: "",
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    googleSheets: boolean | null;
    lineOA: boolean | null;
  }>({
    googleSheets: null,
    lineOA: null,
  });

  const handleSaveGoogleSheetsConfig = () => {
    if (!googleSheetsConfig.spreadsheetId || !googleSheetsConfig.apiKey) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอก Spreadsheet ID และ API Key",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage (in real system, this would be encrypted and stored securely)
    localStorage.setItem("googleSheetsConfig", JSON.stringify(googleSheetsConfig));
    
    toast({
      title: "บันทึกการตั้งค่าสำเร็จ",
      description: "การตั้งค่า Google Sheets ถูกบันทึกแล้ว",
    });
  };

  const handleSaveLineConfig = () => {
    if (!lineConfig.channelAccessToken || !lineConfig.channelSecret) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอก Channel Access Token และ Channel Secret",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage (in real system, this would be encrypted and stored securely)
    localStorage.setItem("lineConfig", JSON.stringify(lineConfig));
    
    toast({
      title: "บันทึกการตั้งค่าสำเร็จ",
      description: "การตั้งค่า Line OA ถูกบันทึกแล้ว",
    });
  };

  const testGoogleSheetsConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Simulate API test (in real system, this would call Google Sheets API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus(prev => ({ ...prev, googleSheets: true }));
      toast({
        title: "เชื่อมต่อสำเร็จ",
        description: "การเชื่อมต่อ Google Sheets ทำงานปกติ",
      });
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, googleSheets: false }));
      toast({
        title: "เชื่อมต่อไม่สำเร็จ",
        description: "ไม่สามารถเชื่อมต่อ Google Sheets ได้",
        variant: "destructive",
      });
    }
    setIsTestingConnection(false);
  };

  const testLineConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Simulate API test (in real system, this would call Line API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus(prev => ({ ...prev, lineOA: true }));
      toast({
        title: "เชื่อมต่อสำเร็จ",
        description: "การเชื่อมต่อ Line OA ทำงานปกติ",
      });
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, lineOA: false }));
      toast({
        title: "เชื่อมต่อไม่สำเร็จ",
        description: "ไม่สามารถเชื่อมต่อ Line OA ได้",
        variant: "destructive",
      });
    }
    setIsTestingConnection(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">การตั้งค่าระบบ</h2>
      </div>

      <Tabs defaultValue="google-sheets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="google-sheets" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Google Sheets
          </TabsTrigger>
          <TabsTrigger value="line-oa" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Line OA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google-sheets">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  การเชื่อมต่อ Google Sheets
                </div>
                {connectionStatus.googleSheets !== null && (
                  <div className="flex items-center gap-2">
                    {connectionStatus.googleSheets ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-sm">เชื่อมต่อแล้ว</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <X className="h-4 w-4" />
                        <span className="text-sm">เชื่อมต่อไม่สำเร็จ</span>
                      </div>
                    )}
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                กำหนดค่าการเชื่อมต่อกับ Google Sheets สำหรับการจัดเก็บข้อมูล
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  ต้องมี Google Sheets API Key และ Spreadsheet ID เพื่อเชื่อมต่อกับระบบ
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
                  <Input
                    id="spreadsheetId"
                    placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    value={googleSheetsConfig.spreadsheetId}
                    onChange={(e) => setGoogleSheetsConfig(prev => ({
                      ...prev,
                      spreadsheetId: e.target.value
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="AIzaSy..."
                    value={googleSheetsConfig.apiKey}
                    onChange={(e) => setGoogleSheetsConfig(prev => ({
                      ...prev,
                      apiKey: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceAccountKey">Service Account Key (JSON)</Label>
                <textarea
                  id="serviceAccountKey"
                  className="w-full h-32 p-3 border rounded-md resize-none text-sm font-mono"
                  placeholder='{"type": "service_account", "project_id": "..."}'
                  value={googleSheetsConfig.serviceAccountKey}
                  onChange={(e) => setGoogleSheetsConfig(prev => ({
                    ...prev,
                    serviceAccountKey: e.target.value
                  }))}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveGoogleSheetsConfig}>
                  บันทึกการตั้งค่า
                </Button>
                <Button 
                  variant="outline" 
                  onClick={testGoogleSheetsConnection}
                  disabled={isTestingConnection}
                >
                  {isTestingConnection ? "กำลังทดสอบ..." : "ทดสอบการเชื่อมต่อ"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line-oa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  การเชื่อมต่อ Line Official Account
                </div>
                {connectionStatus.lineOA !== null && (
                  <div className="flex items-center gap-2">
                    {connectionStatus.lineOA ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-4 w-4" />
                        <span className="text-sm">เชื่อมต่อแล้ว</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <X className="h-4 w-4" />
                        <span className="text-sm">เชื่อมต่อไม่สำเร็จ</span>
                      </div>
                    )}
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                กำหนดค่าการเชื่อมต่อกับ Line OA สำหรับการแจ้งเตือนและรายงาน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertDescription>
                  สามารถส่งรายงานสรุปประจำวันและแจ้งเตือนผ่าน Line OA ได้
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="channelAccessToken">Channel Access Token</Label>
                  <Input
                    id="channelAccessToken"
                    type="password"
                    placeholder="Bearer token..."
                    value={lineConfig.channelAccessToken}
                    onChange={(e) => setLineConfig(prev => ({
                      ...prev,
                      channelAccessToken: e.target.value
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="channelSecret">Channel Secret</Label>
                  <Input
                    id="channelSecret"
                    type="password"
                    placeholder="Channel secret..."
                    value={lineConfig.channelSecret}
                    onChange={(e) => setLineConfig(prev => ({
                      ...prev,
                      channelSecret: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-domain.com/webhook"
                  value={lineConfig.webhookUrl}
                  onChange={(e) => setLineConfig(prev => ({
                    ...prev,
                    webhookUrl: e.target.value
                  }))}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSaveLineConfig}>
                  บันทึกการตั้งค่า
                </Button>
                <Button 
                  variant="outline" 
                  onClick={testLineConnection}
                  disabled={isTestingConnection}
                >
                  {isTestingConnection ? "กำลังทดสอบ..." : "ทดสอบการเชื่อมต่อ"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigSystem;