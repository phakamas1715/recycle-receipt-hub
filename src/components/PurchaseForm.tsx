import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Calculator, Receipt, Users, Building, Download, Plus, Minus, CheckCircle } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReceiptView from './ReceiptView';
import { useRef } from "react";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Mock data - ในระบบจริงจะดึงจาก Google Sheets
  const wasteTypes: WasteType[] = [
    { id: "1", name: "กระดาษ", price: 3.5, unit: "กิโลกรัม" },
    { id: "2", name: "พลาสติก PET", price: 12, unit: "กิโลกรัม" },
    { id: "3", name: "กระป๋องอลูมิเนียม", price: 45, unit: "กิโลกรัม" },
    { id: "4", name: "แก้ว", price: 1.5, unit: "กิโลกรัม" },
    { id: "5", name: "เหล็ก", price: 8, unit: "กิโลกรัม" },
  ];

  const departments: Department[] = [
    { id: "1", name: "NSO - บริหารกลุ่มการพยาบาล" },
    { id: "2", name: "ER - งานการพยาบาลผู้ป่วยอุบัติเหตุฉุกเฉิน" },
    { id: "3", name: "OR - งานการพยาบาลผู้ป่วยผ่าตัด" },
    { id: "4", name: "LR - งานการพยาบาลผู้คลอด" },
    { id: "5", name: "งานการพยาบาลโรคไต" },
    { id: "6", name: "WARD1 - งานการพยาบาลผู้ป่วยใน ชาย" },
    { id: "7", name: "WARD3 - งานการพยาบาลผู้ป่วยใน เด็ก" },
    { id: "8", name: "WARD2 - งานการพยาบาลผู้ป่วยใน หญิง" },
    { id: "9", name: "OPD - งานการพยาบาลผู้ป่วยนอก" },
    { id: "10", name: "PSY - จิตเวชและยาเสพติด" },
    { id: "11", name: "งานเคลื่อนย้ายผู้ป่วย" },
    { id: "12", name: "CSU - งานการพยาบาลหน่วยควบคุมการติดเชื้อ" },
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
    { id: "31", name: "FMC - กลุ่มงานบริการด้านปฐมภูมิ" },
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
    { id: "42", name: "PC - งานพยาบาลการดูแลผู้ป่วยระยะท้าย" },
    { id: "43", name: "Boss - หัวหน้างาน" },
    { id: "44", name: "ICU - งานผู่ป่วยหนัก" },
    { id: "45", name: "MDC - ศูนย์ซ่อมเครื่องมือแพทย์" },
    { id: "46", name: "PHA IPD - เภสัชกรรม ผู้ป่วยใน" },
    { id: "47", name: "PHA OPD - เภสัชกรรม ผู้ป่วยนอก" },
    { id: "48", name: "PHA NCD - เภสัชกรรม ผู้ป่วยโรคเรื้อรัง" },
  ];

  const persons: Person[] = [
    { id: "1", name: "นายสมชาย ใจดี", phone: "081-234-5678" },
    { id: "2", name: "นางสาวสมหญิง รักดี", phone: "082-345-6789" },
  ];

  const selectedWaste = wasteTypes.find(w => w.id === selectedWasteType);

  useEffect(() => {
    if (selectedWaste && weight) {
      const weightNum = parseFloat(weight);
      if (!isNaN(weightNum)) {
        setTotalAmount(weightNum * selectedWaste.price);
      }
    } else {
      setTotalAmount(0);
    }
  }, [selectedWaste, weight]);

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
      
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`receipt-${lastTransaction.receiptNumber}.pdf`);
      
      toast({
        title: "สร้าง PDF สำเร็จ",
        description: "ไฟล์ใบเสร็จถูกดาวน์โหลดแล้ว",
      });
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedWasteType || !weight || (!selectedDepartment && !selectedPerson)) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    // สร้างเลขที่ใบเสร็จ
    const receiptNumber = `RCP-${String(Date.now()).slice(-5).padStart(5, '0')}`;
    
    // ข้อมูลการรับซื้อ
    const transactionData = {
      receiptNumber,
      date: new Date().toLocaleDateString('th-TH'),
      time: new Date().toLocaleTimeString('th-TH'),
      sellerType,
      seller: sellerType === "department" 
        ? departments.find(d => d.id === selectedDepartment)?.name 
        : persons.find(p => p.id === selectedPerson)?.name,
      wasteType: selectedWaste?.name,
      weight: parseFloat(weight),
      pricePerUnit: selectedWaste?.price,
      totalAmount,
    };

    // บันทึกข้อมูล (ในระบบจริงจะส่งไป Google Sheets)
    console.log("Transaction Data:", transactionData);
    
    setLastTransaction(transactionData);
    setShowReceipt(true);
    
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: `เลขที่ใบเสร็จ: ${receiptNumber}`,
    });

    // รีเซ็ตฟอร์ม
    setSelectedDepartment("");
    setSelectedPerson("");
    setSelectedWasteType("");
    setWeight("");
    setTotalAmount(0);
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
          data={lastTransaction}
          onDownloadPDF={generatePDF}
          onPrint={handlePrint}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* เลือกประเภทผู้ขาย */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id} className="h-12 text-lg">
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

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
                {persons.map((person) => (
                  <SelectItem key={person.id} value={person.id} className="h-12">
                    <div className="text-lg">
                      <div className="font-medium">{person.name}</div>
                      {person.phone && (
                        <div className="text-base text-muted-foreground">{person.phone}</div>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* ข้อมูลขยะรีไซเคิล */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="wasteType" className="text-2xl font-bold mb-4 block">🗂️ ประเภทขยะรีไซเคิล</Label>
            <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
              <SelectTrigger className="h-16 text-xl font-medium">
                <SelectValue placeholder="👆 เลือกประเภทขยะ" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {wasteTypes.map((waste) => (
                  <SelectItem key={waste.id} value={waste.id} className="h-16">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg font-medium">{waste.name}</span>
                      <span className="text-lg text-primary font-bold ml-4">
                        {waste.price} บาท/{waste.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
          </div>
        </div>

        {/* แสดงการคำนวณ */}
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

      {/* ปุ่มบันทึก */}
      <div className="space-y-4">
        <Button 
          type="submit" 
          size="lg"
          className="w-full h-20 text-2xl font-bold bg-gradient-primary shadow-lg"
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