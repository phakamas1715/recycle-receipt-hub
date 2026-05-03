import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Calendar, TrendingUp, FileSpreadsheet, FileText, FileDown, Upload, BarChart3 } from "lucide-react";
import { supabaseStorage, Transaction } from "@/lib/supabaseStorage";
import { ExportUtils } from "@/lib/exportUtils";
import { toast } from "@/hooks/use-toast";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSellerType, setFilterSellerType] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Load transactions from storage
  useEffect(() => {
    const loadTransactions = async () => {
      const allTransactions = await supabaseStorage.getTransactions();
      setTransactions(allTransactions);
    };
    
    loadTransactions();
    
    // Refresh every 5 seconds to catch new transactions
    const interval = setInterval(loadTransactions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter transactions based on criteria
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.items || []).some(item => item.waste_type_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSellerType = filterSellerType === "all" || transaction.seller_type === filterSellerType;
    
    // Safely handle date parsing
    let transactionDate: string;
    try {
      const date = new Date(transaction.date);
      if (isNaN(date.getTime())) {
        // If date is invalid, use today's date as fallback
        transactionDate = new Date().toISOString().split('T')[0];
      } else {
        transactionDate = date.toISOString().split('T')[0];
      }
    } catch {
      transactionDate = new Date().toISOString().split('T')[0];
    }
    
    const matchesDateRange = 
      (!filterDateFrom || transactionDate >= filterDateFrom) &&
      (!filterDateTo || transactionDate <= filterDateTo);

    return matchesSearch && matchesSellerType && matchesDateRange;
  });

  // Calculate statistics
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
  const totalWeight = filteredTransactions.reduce((sum, t) => sum + (t.total_weight || 0), 0);

  // Export functions (simplified for now)
  const handleExportExcel = async () => {
    try {
      const { ExportUtils } = await import('../lib/exportUtils');
      ExportUtils.exportToExcel(filteredTransactions);
      toast({
        title: "ส่งออกสำเร็จ",
        description: "ไฟล์ Excel ถูกดาวน์โหลดแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งออกไฟล์ Excel ได้",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = async () => {
    try {
      const { ExportUtils } = await import('../lib/exportUtils');
      ExportUtils.exportToCSV(filteredTransactions);
      toast({
        title: "ส่งออกสำเร็จ",
        description: "ไฟล์ CSV ถูกดาวน์โหลดแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งออกไฟล์ CSV ได้",
        variant: "destructive",
      });
    }
  };

  const handleExportJSON = async () => {
    try {
      const { ExportUtils } = await import('../lib/exportUtils');
      await ExportUtils.exportToJSON();
      toast({
        title: "ส่งออกสำเร็จ",
        description: "ไฟล์ JSON ถูกดาวน์โหลดแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งออกไฟล์ JSON ได้",
        variant: "destructive",
      });
    }
  };

  const handleExportPDFReport = async () => {
    try {
      const { ExportUtils } = await import('../lib/exportUtils');
      await ExportUtils.generateSummaryReportPDF(filteredTransactions);
      toast({
        title: "สร้างรายงานสำเร็จ",
        description: "ไฟล์ PDF ถูกดาวน์โหลดแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างรายงาน PDF ได้",
        variant: "destructive",
      });
    }
  };

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { ExportUtils } = await import('../lib/exportUtils');
      await ExportUtils.importFromJSON(file);
      const updatedTransactions = await supabaseStorage.getTransactions();
      setTransactions(updatedTransactions);
      toast({
        title: "นำเข้าสำเร็จ",
        description: "ข้อมูลถูกนำเข้าแล้ว",
      });
      // Reset file input
      event.target.value = '';
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error instanceof Error ? error.message : "ไม่สามารถนำเข้าข้อมูลได้",
        variant: "destructive",
      });
      // Reset file input
      event.target.value = '';
    }
    
    // Reset input
    event.target.value = '';
  };

  const handleViewReceipt = (transaction: Transaction) => {
    toast({
      title: "แสดงใบเสร็จ",
      description: `เลขที่ใบเสร็จ: ${transaction.receipt_number}`,
    });
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (await supabaseStorage.deleteTransaction(transactionId)) {
      const updatedTransactions = await supabaseStorage.getTransactions();
      setTransactions(updatedTransactions);
      toast({
        title: "ลบรายการสำเร็จ",
        description: "รายการถูกลบออกจากระบบแล้ว",
      });
    } else {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบรายการได้",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* สถิติรวม */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายการทั้งหมด</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ยอดรวมทั้งหมด</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">บาท</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">น้ำหนักรวม</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWeight.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">กิโลกรัม</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Export and Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">การส่งออกและนำเข้าข้อมูล</CardTitle>
          <CardDescription className="text-base md:text-lg">ส่งออกข้อมูลหรือนำเข้าข้อมูลสำรอง</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Export Buttons */}
            <Button onClick={handleExportExcel} className="gap-2 h-12 text-base">
              <FileSpreadsheet className="h-5 w-5" />
              Excel (XLSX)
            </Button>
            <Button onClick={handleExportCSV} variant="outline" className="gap-2 h-12 text-base">
              <FileText className="h-5 w-5" />
              CSV
            </Button>
            <Button onClick={handleExportJSON} variant="outline" className="gap-2 h-12 text-base">
              <FileDown className="h-5 w-5" />
              JSON (สำรอง)
            </Button>
            <Button onClick={handleExportPDFReport} variant="outline" className="gap-2 h-12 text-base">
              <BarChart3 className="h-5 w-5" />
              รายงาน PDF
            </Button>
            {/* Import Button */}
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="secondary" className="gap-2 h-12 text-base w-full">
                <Upload className="h-5 w-5" />
                นำเข้า JSON
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">ตัวกรองข้อมูล</CardTitle>
          <CardDescription className="text-base md:text-lg">ค้นหาและกรองข้อมูลการรับซื้อขยะรีไซเคิล</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">ค้นหา</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="เลขที่ใบเสร็จ, ผู้ขาย, ประเภทขยะ"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="sellerType">ประเภทผู้ขาย</Label>
              <Select value={filterSellerType} onValueChange={setFilterSellerType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="department">ลูกค้าสมาชิก/องค์กร</SelectItem>
                  <SelectItem value="person">บุคคลทั่วไป</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFrom">วันที่เริ่มต้น</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dateTo">วันที่สิ้นสุด</Label>
              <Input
                id="dateTo"
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterSellerType("all");
                  setFilterDateFrom("");
                  setFilterDateTo("");
                }}
                variant="outline" 
                className="w-full h-12 text-base"
              >
                <Search className="h-4 w-4 mr-2" />
                ล้างตัวกรอง
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">รายการการรับซื้อขยะรีไซเคิล</CardTitle>
          <CardDescription className="text-base md:text-lg">
            แสดง {filteredTransactions.length.toLocaleString()} รายการจากทั้งหมด {transactions.length.toLocaleString()} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base">เลขที่ใบเสร็จ</TableHead>
                  <TableHead className="text-base">วันที่</TableHead>
                  <TableHead className="text-base">เวลา</TableHead>
                  <TableHead className="text-base">ผู้ขาย</TableHead>
                  <TableHead className="text-base">รายการขยะ</TableHead>
                  <TableHead className="text-right text-base">น้ำหนักรวม (กก.)</TableHead>
                  <TableHead className="text-right text-base">จำนวนรายการ</TableHead>
                  <TableHead className="text-right text-base">ยอดรวม</TableHead>
                  <TableHead className="text-base">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground text-lg">
                      {transactions.length === 0 ? "ยังไม่มีรายการ" : "ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-base">
                          {transaction.receipt_number}
                      </TableCell>
                      <TableCell className="text-base">
                        {(() => {
                          try {
                            const date = new Date(transaction.date);
                            return isNaN(date.getTime()) ? 'วันที่ไม่ถูกต้อง' : date.toLocaleDateString('th-TH');
                          } catch {
                            return 'วันที่ไม่ถูกต้อง';
                          }
                        })()}
                      </TableCell>
                      <TableCell className="text-base">{transaction.time}</TableCell>
                      <TableCell className="text-base">
                        <div className="flex flex-col">
                          <span className="font-medium">{transaction.seller}</span>
                          <Badge variant={transaction.seller_type === "department" ? "default" : "secondary"} className="w-fit text-xs">
                            {transaction.seller_type === "department" ? "สมาชิก/องค์กร" : "บุคคลทั่วไป"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-base">
                        <div className="space-y-1">
                          {(transaction.items || []).map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.waste_type_name} ({item.weight} กก.)
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-base font-medium">{(transaction.total_weight || 0).toFixed(1)}</TableCell>
                      <TableCell className="text-right text-base">{(transaction.items || []).length}</TableCell>
                      <TableCell className="text-right font-medium text-base text-primary">
                        {(transaction.total_amount || 0).toFixed(2)} บาท
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewReceipt(transaction)}
                            className="text-sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            ดู
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTransaction(transaction.id!)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            ลบ
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;