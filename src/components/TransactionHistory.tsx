import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Calendar, TrendingUp } from "lucide-react";

interface Transaction {
  id: string;
  receiptNumber: string;
  date: string;
  time: string;
  sellerType: "department" | "person";
  seller: string;
  wasteType: string;
  weight: number;
  pricePerUnit: number;
  totalAmount: number;
}

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSellerType, setFilterSellerType] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  // Mock data - ในระบบจริงจะดึงจาก Google Sheets
  const transactions: Transaction[] = [
    {
      id: "1",
      receiptNumber: "RCP-00001",
      date: "2024-01-15",
      time: "09:30:00",
      sellerType: "department",
      seller: "แผนกอายุรกรรม",
      wasteType: "กระดาษ",
      weight: 15.5,
      pricePerUnit: 3.5,
      totalAmount: 54.25,
    },
    {
      id: "2",
      receiptNumber: "RCP-00002",
      date: "2024-01-15",
      time: "10:15:00",
      sellerType: "department",
      seller: "แผนกศัลยกรรม",
      wasteType: "พลาสติก PET",
      weight: 8.2,
      pricePerUnit: 12,
      totalAmount: 98.4,
    },
    {
      id: "3",
      receiptNumber: "RCP-00003",
      date: "2024-01-17",
      time: "14:20:00",
      sellerType: "person",
      seller: "นายสมชาย ใจดี",
      wasteType: "กระป๋องอลูมิเนียม",
      weight: 2.1,
      pricePerUnit: 45,
      totalAmount: 94.5,
    },
    {
      id: "4",
      receiptNumber: "RCP-00004",
      date: "2024-01-19",
      time: "11:45:00",
      sellerType: "department",
      seller: "แผนกเภสัชกรรม",
      wasteType: "แก้ว",
      weight: 12.3,
      pricePerUnit: 1.5,
      totalAmount: 18.45,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.wasteType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSellerType = filterSellerType === "all" || transaction.sellerType === filterSellerType;
    
    const matchesDateRange = 
      (!filterDateFrom || transaction.date >= filterDateFrom) &&
      (!filterDateTo || transaction.date <= filterDateTo);

    return matchesSearch && matchesSellerType && matchesDateRange;
  });

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
  const totalWeight = filteredTransactions.reduce((sum, t) => sum + t.weight, 0);

  const handleExport = () => {
    // ในระบบจริงจะส่งออกเป็น Excel
    console.log("Exporting data...", filteredTransactions);
    alert("ส่งออกข้อมูลเป็น Excel (ฟีเจอร์นี้จะพัฒนาในเวอร์ชันถัดไป)");
  };

  const handleViewReceipt = (transaction: Transaction) => {
    // ในระบบจริงจะแสดงใบเสร็จ
    console.log("Viewing receipt for:", transaction.receiptNumber);
    alert(`แสดงใบเสร็จ ${transaction.receiptNumber} (ฟีเจอร์นี้จะพัฒนาในเวอร์ชันถัดไป)`);
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

      {/* ตัวกรองข้อมูล */}
      <Card>
        <CardHeader>
          <CardTitle>ตัวกรองข้อมูล</CardTitle>
          <CardDescription>ค้นหาและกรองข้อมูลการรับซื้อขยะรีไซเคิล</CardDescription>
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
                  <SelectItem value="department">แผนกในโรงพยาบาล</SelectItem>
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
              <Button onClick={handleExport} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                ส่งออก Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ตารางข้อมูล */}
      <Card>
        <CardHeader>
          <CardTitle>รายการการรับซื้อขยะรีไซเคิล</CardTitle>
          <CardDescription>
            แสดง {filteredTransactions.length} รายการจากทั้งหมด {transactions.length} รายการ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่ใบเสร็จ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ผู้ขาย</TableHead>
                  <TableHead>ประเภทขยะ</TableHead>
                  <TableHead className="text-right">น้ำหนัก (กก.)</TableHead>
                  <TableHead className="text-right">ราคา/หน่วย</TableHead>
                  <TableHead className="text-right">ยอดรวม</TableHead>
                  <TableHead>การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.receiptNumber}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{transaction.seller}</span>
                        <Badge variant={transaction.sellerType === "department" ? "default" : "secondary"} className="w-fit text-xs">
                          {transaction.sellerType === "department" ? "แผนก" : "บุคคลทั่วไป"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.wasteType}</TableCell>
                    <TableCell className="text-right">{transaction.weight}</TableCell>
                    <TableCell className="text-right">{transaction.pricePerUnit}</TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReceipt(transaction)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        ดูใบเสร็จ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;