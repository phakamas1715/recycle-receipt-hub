import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Calculator, Receipt, Users, Building, Download, Plus, Minus, CheckCircle, Search, ShoppingCart, Trash2 } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReceiptView from "./ReceiptView";
import { dataStorage, Transaction, TransactionItem } from "@/lib/dataStorage";

interface WasteType {
  id: string;
  name: string;
  price: number;
  unit: string;
}

interface Department {
  id: string;
  name: string;
}

interface Person {
  id: string;
  name: string;
  phone?: string;
}


const PurchaseForm = () => {
  const [sellerType, setSellerType] = useState<"department" | "person">("department");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedWasteType, setSelectedWasteType] = useState("");
  const [weight, setWeight] = useState("");
  const [cartItems, setCartItems] = useState<TransactionItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [wasteTypeSearch, setWasteTypeSearch] = useState("");
  const [personSearch, setPersonSearch] = useState("");
  const [signatures, setSignatures] = useState<{buyer?: string, seller?: string}>({});
  const receiptRef = useRef<HTMLDivElement>(null);

  // Load waste types from storage
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  
  useEffect(() => {
    const loadWasteTypes = () => {
      const stored = dataStorage.getWasteTypes();
      setWasteTypes(stored);
    };
    loadWasteTypes();
  }, []);

  const departments: Department[] = [
    { id: "1", name: "NSO - บริหารกลุ่มการพยาบาล" },
    { id: "2", name: "ER - งานการพยาบาลผู้ป่วยอุบัติเหตุฉุกเฉินและนิติเวช" },
    { id: "3", name: "OR - งานการพยาบาลผู้ป่วยผ่าตัดและวิสัญญีพยาบาล" },
    { id: "4", name: "LR - งานการพยาบาลผู้คลอด" },
    { id: "5", name: "งานการพยาบาลโรคไต" },
    { id: "6", name: "WARD1 - งานการพยาบาลผู้ป่วยใน ชาย" },
    { id: "7", name: "WARD3 - งานการพยาบาลผู้ป่วยใน เด็ก" },
    { id: "8", name: "WARD2 - งานการพยาบาลผู้ป่วยใน หญิง" },
    { id: "9", name: "OPD - งานการพยาบาลผู้ป่วยนอก" },
    { id: "10", name: "PSY - จิตเวชและยาเสพติด" },
    { id: "11", name: "งานเคลื่อนย้ายผู้ป่วย" },
    { id: "12", name: "CSU - งานการพยาบาลหน่วยควบคุมการติดเชื้อและงานจ่ายกลาง" },
    { id: "13", name: "MNU - งานโภชนศาสตร์" },
    { id: "14", name: "MAN - ฝ่ายบริหารงานทั่วไป" },
    { id: "15", name: "MON - งานการเงิน" },
    { id: "16", name: "ART - งานพัสดุ" },
    { id: "17", name: "BOO - งานธุรการ" },
    { id: "18", name: "AMB - งานยานพาหนะ" },
    { id: "19", name: "GAR - งานภูมิทัศน์" },
    { id: "20", name: "CLC - งานซักฟอก" },
    { id: "21", name: "SEC - งานรักษาความปลอดภัย" },
    { id: "22", name: "CLE - งานทำความสะอาด" },
    { id: "23", name: "MED - งานเวชปฏิบัติทั่วไป" },
    { id: "24", name: "XRA - งานรังสีวิทยา" },
    { id: "25", name: "LAB - งานเทคนิคการแพทย์" },
    { id: "26", name: "TTM - งานแพทย์แผนไทย" },
    { id: "27", name: "PLA - แผนงานและประเมินผล" },
    { id: "28", name: "COM - งานศูนย์คอมพิวเตอร์" },
    { id: "29", name: "HAC - งานศูนย์ประกันสุขภาพ" },
    { id: "30", name: "MRD - งานเวชระเบียน" },
    { id: "31", name: "FMC - กลุ่มงานบริการด้านปฐมภูมิและองค์รวม" },
    { id: "32", name: "PHA - ฝ่ายเภสัชกรรมชุมชน" },
    { id: "33", name: "RHD - ฝ่ายเวชกรรมฟื้นฟู" },
    { id: "34", name: "FUN - งานทันตกรรม" },
    { id: "35", name: "HED - งานสุขศึกษาและประชาสัมพันธ์" },
    { id: "36", name: "PO - การแพทย์" },
    { id: "37", name: "NCD - งานการพยาบาลผู้ป่วยโรคไม่ติดต่อเรื้อรัง" },
    { id: "38", name: "TEC - งานซ่อมบำรุง" },
    { id: "39", name: "ES - งานสุขาภิบาล" },
    { id: "40", name: "EYE - งานการพยาบาลผู้ป่วยจักษุ" },
    { id: "41", name: "WARD4 - งานการพยาบาลผู้ป่วยใน พิเศษ" },
    { id: "42", name: "PC - งานพยาบาลการดูแลผู้ป่วยระยะท้ายแบบประคับประคอง" },
    { id: "43", name: "Boss - หัวหน้างาน" },
    { id: "44", name: "ICU - งานผู่ป่วยหนัก" },
    { id: "45", name: "MDC - ศูนย์ซ่อมเครื่องมือแพทย์" },
    { id: "46", name: "PHA IPD - ฝ่ายเภสัชกรรมชุมชน ผู้ป่วยใน" },
    { id: "47", name: "PHA OPD - ฝ่ายเภสัชกรรมชุมชน ผู้ป่วยนอก" },
    { id: "48", name: "PHA NCD - ฝ่ายเภสัชกรรมชุมชน ผู้ป่วยไม่ติดต่อเรื้อรัง" },
  ];

  const persons: Person[] = [
    { id: "1", name: "นายสมชาย ใจดี", phone: "081-234-5678" },
    { id: "2", name: "นางสาวสมหญิง รักดี", phone: "082-345-6789" },
    { id: "3", name: "นายทดสอบ ทดสอบ", phone: "083-456-7890" },
    { id: "4", name: "นางสาวตัวอย่าง ตัวอย่าง", phone: "084-567-8901" },
  ];

  // Filter functions
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const filteredWasteTypes = wasteTypes.filter(waste => 
    waste.name.toLowerCase().includes(wasteTypeSearch.toLowerCase())
  );

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(personSearch.toLowerCase()) || 
    (person.phone && person.phone.includes(personSearch))
  );

  const selectedWaste = wasteTypes.find(w => w.id === selectedWasteType);

  // Calculate total from cart items
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const addToCart = () => {
    console.log("addToCart called", { selectedWaste, weight });
    
    if (!selectedWaste || !weight) {
      console.log("Missing data:", { selectedWaste: !!selectedWaste, weight: !!weight });
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณาเลือกประเภทขยะและใส่น้ำหนัก",
        variant: "destructive",
      });
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      toast({
        title: "น้ำหนักไม่ถูกต้อง",
        description: "กรุณาใส่น้ำหนักที่ถูกต้อง",
        variant: "destructive",
      });
      return;
    }

    const newItem: TransactionItem = {
      wasteTypeId: selectedWaste.id,
      wasteTypeName: selectedWaste.name,
      weight: weightNum,
      pricePerUnit: selectedWaste.price,
      amount: weightNum * selectedWaste.price
    };

    setCartItems([...cartItems, newItem]);
    setSelectedWasteType("");
    setWeight("");
    
    toast({
      title: "เพิ่มรายการสำเร็จ",
      description: `เพิ่ม ${selectedWaste.name} ${weightNum} ${selectedWaste.unit}`,
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const adjustWeight = (amount: number) => {
    const currentWeight = parseFloat(weight) || 0;
    const newWeight = Math.max(0, currentWeight + amount);
    setWeight(newWeight.toString());
  };

  const generatePDF = () => {
    if (!lastTransaction || !receiptRef.current) {
      toast({
        title: "ไม่พบข้อมูลใบเสร็จ",
        description: "กรุณาบันทึกรายการก่อนสร้าง PDF",
        variant: "destructive",
      });
      return;
    }

    html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 80; // Narrower width for receipt format
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`receipt-${lastTransaction.receiptNumber}.pdf`);
      
      toast({
        title: "สร้าง PDF สำเร็จ",
        description: "ไฟล์ใบเสร็จถูกดาวน์โหลดแล้ว",
      });
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400,height=600');
    if (printWindow && receiptRef.current) {
      const receiptHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>ใบเสร็จรับเงิน</title>
            <meta charset="UTF-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');
              body { 
                margin: 0; 
                padding: 10px; 
                font-family: 'Sarabun', sans-serif;
                background-color: #fff;
              }
              @page { 
                size: 80mm 200mm;
                margin: 0;
              }
              .receipt-container {
                width: 75mm;
                margin: 0 auto;
                padding: 10px;
                border: 1px dashed #ddd;
              }
              .receipt-header {
                text-align: center;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px dashed #000;
              }
              .hospital-name {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 5px;
              }
              .receipt-title {
                font-size: 16px;
                color: #555;
              }
              .receipt-info {
                font-size: 12px;
                margin: 5px 0;
              }
              .receipt-details {
                margin: 10px 0;
                font-size: 14px;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                margin: 8px 0;
              }
              .detail-label {
                font-weight: bold;
                min-width: 100px;
              }
              .receipt-total {
                margin-top: 15px;
                padding-top: 10px;
                border-top: 1px dashed #000;
                font-size: 16px;
                font-weight: bold;
              }
              .receipt-footer {
                margin-top: 15px;
                text-align: center;
                font-size: 11px;
                color: #666;
              }
              .stamp-area {
                margin-top: 20px;
                text-align: right;
                font-size: 12px;
              }
              .stamp-box {
                display: inline-block;
                width: 70px;
                height: 70px;
                border: 1px solid #000;
                text-align: center;
                line-height: 70px;
                opacity: 0.7;
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              <div class="receipt-header">
                <div class="hospital-name">โรงพยาบาลตัวอย่าง</div>
                <div class="receipt-title">ใบเสร็จรับเงิน</div>
                <div class="receipt-info">เลขที่: ${lastTransaction.receiptNumber}</div>
                <div class="receipt-info">วันที่: ${lastTransaction.date} ${lastTransaction.time}</div>
              </div>
              
              <div class="receipt-details">
                <div class="detail-row">
                  <span class="detail-label">ผู้ขาย:</span>
                  <span>${lastTransaction.seller}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">รายการขยะ:</span>
                </div>
                ${lastTransaction.items.map(item => `
                <div class="detail-row">
                  <span>${item.wasteTypeName}</span>
                  <span>${item.weight} กก. × ${item.pricePerUnit} = ${item.amount.toFixed(2)} บาท</span>
                </div>
                `).join('')}
                
                <div class="detail-row">
                  <span class="detail-label">น้ำหนักรวม:</span>
                  <span>${lastTransaction.totalWeight} กิโลกรัม</span>
                </div>
              </div>
              
              <div class="receipt-total">
                <div class="detail-row">
                  <span class="detail-label">รวมเป็นเงิน:</span>
                  <span>${lastTransaction.totalAmount.toFixed(2)} บาท</span>
                </div>
              </div>
              
              <div class="stamp-area">
                <div class="stamp-box">ลายเซ็น</div>
              </div>
              
              <div class="receipt-footer">
                ขอบคุณที่ร่วมรักษาสิ่งแวดล้อม<br>
                โทร: 02-123-4567
              </div>
            </div>
            
            <script>
              setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 500);
              }, 200);
            </script>
          </body>
        </html>
      `;
      
      printWindow.document.open();
      printWindow.document.write(receiptHtml);
      printWindow.document.close();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called", { 
      cartItems: cartItems.length, 
      selectedDepartment: !!selectedDepartment, 
      selectedPerson: !!selectedPerson 
    });
    
    if (cartItems.length === 0 || (!selectedDepartment && !selectedPerson)) {
      console.log("Validation failed:", { 
        cartItemsEmpty: cartItems.length === 0, 
        noSellerSelected: !selectedDepartment && !selectedPerson 
      });
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณาเพิ่มรายการขยะและเลือกผู้ขาย",
        variant: "destructive",
      });
      return;
    }

    const receiptNumber = `RCP-${String(Date.now()).slice(-5).padStart(5, '0')}`;
    const totalWeight = cartItems.reduce((sum, item) => sum + item.weight, 0);
    
    const transactionToSave = {
      receiptNumber,
      date: new Date().toISOString().split('T')[0], // Use ISO format YYYY-MM-DD
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      sellerType,
      seller: sellerType === "department" 
        ? departments.find(d => d.id === selectedDepartment)?.name || ""
        : persons.find(p => p.id === selectedPerson)?.name || "",
      items: cartItems,
      totalWeight,
      totalAmount,
    };

    // Save to storage
    const savedTransaction = dataStorage.saveTransaction(transactionToSave);
    
    setLastTransaction(savedTransaction);
    setShowReceipt(true);
    
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: `เลขที่ใบเสร็จ: ${receiptNumber} | บันทึกลงฐานข้อมูลแล้ว`,
    });

    // Reset form
    setSelectedDepartment("");
    setSelectedPerson("");
    setSelectedWasteType("");
    setWeight("");
    setCartItems([]);
    setTotalAmount(0);
    setDepartmentSearch("");
    setWasteTypeSearch("");
    setPersonSearch("");
    setSignatures({});
  };

  const handleSignatureUpdate = (type: 'buyer' | 'seller', signature: string) => {
    console.log("handleSignatureUpdate called:", { type, signature: signature ? "✓ Present" : "✗ Missing" });
    setSignatures(prev => {
      const updated = { ...prev, [type]: signature };
      console.log("Updated signatures:", updated);
      return updated;
    });
  };

  if (showReceipt && lastTransaction) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-green-800">บันทึกสำเร็จ!</h2>
              <p className="text-green-600">ใบเสร็จพร้อมใช้งาน</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowReceipt(false);
              setLastTransaction(null);
            }}
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg"
          >
            บันทึกรายการใหม่
          </Button>
        </div>
        
        <ReceiptView
          ref={receiptRef}
          data={{
            ...lastTransaction,
            buyerSignature: signatures.buyer,
            sellerSignature: signatures.seller
          }}
          onDownloadPDF={generatePDF}
          onPrint={handlePrint}
          onUpdateSignature={handleSignatureUpdate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Card */}
          <Card className={sellerType === "department" ? "ring-2 ring-primary" : ""}>
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl font-bold">แผนกในโรงพยาบาล</CardTitle>
                </div>
                <Button
                  type="button"
                  variant={sellerType === "department" ? "default" : "outline"}
                  size="lg"
                  className="w-full h-16 text-xl font-bold"
                  onClick={() => setSellerType("department")}
                >
                  {sellerType === "department" ? "✓ เลือกแล้ว" : "เลือกแผนก"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedDepartment} 
                onValueChange={setSelectedDepartment}
                disabled={sellerType !== "department"}
              >
                <SelectTrigger className="h-16 text-xl font-medium">
                  <SelectValue placeholder="👆 เลือกแผนกของคุณ" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <div className="sticky top-0 z-10 bg-background p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหาแผนก..."
                        className="pl-8"
                        value={departmentSearch}
                        onChange={(e) => setDepartmentSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  {filteredDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id} className="h-12 text-lg">
                      {dept.name}
                    </SelectItem>
                  ))}
                  {filteredDepartments.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      ไม่พบแผนกที่ค้นหา
                    </div>
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Person Card */}
          <Card className={sellerType === "person" ? "ring-2 ring-primary" : ""}>
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl font-bold">บุคคลทั่วไป</CardTitle>
                </div>
                <Button
                  type="button"
                  variant={sellerType === "person" ? "default" : "outline"}
                  size="lg"
                  className="w-full h-16 text-xl font-bold"
                  onClick={() => setSellerType("person")}
                >
                  {sellerType === "person" ? "✓ เลือกแล้ว" : "เลือกบุคคล"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedPerson} 
                onValueChange={setSelectedPerson}
                disabled={sellerType !== "person"}
              >
                <SelectTrigger className="h-16 text-xl font-medium">
                  <SelectValue placeholder="👆 เลือกบุคคล" />
                </SelectTrigger>
                <SelectContent>
                  <div className="sticky top-0 z-10 bg-background p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหาบุคคล..."
                        className="pl-8"
                        value={personSearch}
                        onChange={(e) => setPersonSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  {filteredPersons.map((person) => (
                    <SelectItem key={person.id} value={person.id} className="h-12">
                      <div className="text-lg">
                        <div className="font-medium">{person.name}</div>
                        {person.phone && (
                          <div className="text-base text-muted-foreground">{person.phone}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                  {filteredPersons.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      ไม่พบบุคคลที่ค้นหา
                    </div>
                  )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Waste Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Waste Type Selection */}
            <div>
              <Label htmlFor="wasteType" className="text-2xl font-bold mb-4 block">🗂️ ประเภทขยะรีไซเคิล</Label>
              <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                <SelectTrigger className="h-16 text-xl font-medium">
                  <SelectValue placeholder="👆 เลือกประเภทขยะ" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <div className="sticky top-0 z-10 bg-background p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหาประเภทขยะ..."
                        className="pl-8"
                        value={wasteTypeSearch}
                        onChange={(e) => setWasteTypeSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  {filteredWasteTypes.map((waste) => (
                    <SelectItem key={waste.id} value={waste.id} className="h-16">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg font-medium">{waste.name}</span>
                        <span className="text-lg text-primary font-bold ml-4">
                          {waste.price} บาท/{waste.unit}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                  {filteredWasteTypes.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      ไม่พบประเภทขยะที่ค้นหา
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Weight Input */}
            <div>
              <Label htmlFor="weight" className="text-2xl font-bold mb-4 block">⚖️ น้ำหนัก ({selectedWaste?.unit || "กิโลกรัม"})</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-16 w-16 text-2xl font-bold"
                  onClick={() => adjustWeight(-0.5)}
                >
                  <Minus className="h-8 w-8" />
                </Button>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-16 text-3xl text-center font-bold"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-16 w-16 text-2xl font-bold"
                  onClick={() => adjustWeight(0.5)}
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => adjustWeight(1)}
                  className="h-14 text-xl font-bold"
                >
                  +1 กก.
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => adjustWeight(5)}
                  className="h-14 text-xl font-bold"
                >
                  +5 กก.
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => adjustWeight(10)}
                  className="h-14 text-xl font-bold"
                >
                  +10 กก.
                </Button>
              </div>
              
              {selectedWaste && weight && (
                <Button
                  type="button"
                  onClick={addToCart}
                  className="w-full mt-4"
                  size="lg"
                >
                  เพิ่มลงตะกร้า - {(parseFloat(weight || "0") * selectedWaste.price).toFixed(2)} บาท
                </Button>
              )}
            </div>
          </div>

          {/* Calculation Summary */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calculator className="h-8 w-8" />
                💰 สรุปการคำนวณ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground font-medium">ประเภทขยะ:</span>
                <span className="font-bold">{selectedWaste?.name || "-"}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground font-medium">ราคาต่อหน่วย:</span>
                <span className="font-bold">{selectedWaste ? `${selectedWaste.price} บาท/${selectedWaste.unit}` : "-"}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground font-medium">น้ำหนัก:</span>
                <span className="font-bold">{weight ? `${weight} ${selectedWaste?.unit || "กิโลกรัม"}` : "-"}</span>
              </div>
              <Separator />
              <div className="bg-white p-4 rounded-lg border-2 border-primary">
                <div className="flex justify-between text-3xl font-bold">
                  <span>💵 ยอดรวม:</span>
                  <span className="text-primary">{totalAmount.toFixed(2)} บาท</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons */}
        <div className="space-y-4">
          <Button 
            type="submit" 
            size="lg"
            className="w-full h-20 text-2xl font-bold bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:from-primary/90 hover:to-primary"
          >
            <Receipt className="h-8 w-8 mr-3" />
            💾 บันทึกและออกใบเสร็จ
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            size="lg"
            className="w-full h-16 text-xl"
            onClick={() => {
              setSelectedDepartment("");
              setSelectedPerson("");
              setSelectedWasteType("");
              setWeight("");
              setTotalAmount(0);
              setDepartmentSearch("");
              setWasteTypeSearch("");
              setPersonSearch("");
            }}
          >
            🗑️ ล้างข้อมูลทั้งหมด
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;