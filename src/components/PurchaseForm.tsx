import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Calculator, Receipt, Users, Building, Download, Plus, Minus } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    if (!lastTransaction) {
      toast({
        title: "ไม่พบข้อมูลใบเสร็จ",
        description: "กรุณาบันทึกรายการก่อนสร้าง PDF",
        variant: "destructive",
      });
      return;
    }

    const pdf = new jsPDF();
    
    // หัวเอกสาร
    pdf.setFontSize(16);
    pdf.text('ใบเสร็จรับซื้อขยะรีไซเคิล', 20, 20);
    pdf.text('โรงพยาบาลน้ำพอง', 20, 35);
    
    pdf.setFontSize(12);
    pdf.text(`เลขที่ใบเสร็จ: ${lastTransaction.receiptNumber}`, 20, 55);
    pdf.text(`วันที่: ${lastTransaction.date}`, 20, 70);
    pdf.text(`เวลา: ${lastTransaction.time}`, 20, 85);
    
    pdf.text(`ผู้ขาย: ${lastTransaction.seller}`, 20, 105);
    pdf.text(`ประเภท: ${lastTransaction.sellerType === 'department' ? 'แผนกในโรงพยาบาล' : 'บุคคลทั่วไป'}`, 20, 120);
    
    pdf.text(`ประเภทขยะ: ${lastTransaction.wasteType}`, 20, 140);
    pdf.text(`น้ำหนัก: ${lastTransaction.weight} กิโลกรัม`, 20, 155);
    pdf.text(`ราคาต่อหน่วย: ${lastTransaction.pricePerUnit} บาท/กิโลกรัม`, 20, 170);
    
    pdf.setFontSize(14);
    pdf.text(`ยอดรวม: ${lastTransaction.totalAmount.toFixed(2)} บาท`, 20, 190);
    
    pdf.save(`receipt-${lastTransaction.receiptNumber}.pdf`);
    
    toast({
      title: "สร้าง PDF สำเร็จ",
      description: "ไฟล์ใบเสร็จถูกดาวน์โหลดแล้ว",
    });
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

  return (
    <div className="space-y-6">
      {/* แสดงปุ่ม PDF ถ้ามีรายการล่าสุด */}
      {lastTransaction && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">บันทึกรายการล่าสุดสำเร็จ</p>
                <p className="text-sm text-green-600">เลขที่ใบเสร็จ: {lastTransaction.receiptNumber}</p>
              </div>
              <Button onClick={generatePDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                ดาวน์โหลด PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* เลือกประเภทผู้ขาย */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={sellerType === "department" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl md:text-lg">แผนกในโรงพยาบาล</CardTitle>
              </div>
              <Button
                type="button"
                variant={sellerType === "department" ? "default" : "outline"}
                size="lg"
                className="h-12 px-6 text-lg md:h-8 md:px-4 md:text-sm"
                onClick={() => setSellerType("department")}
              >
                เลือก
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedDepartment} 
              onValueChange={setSelectedDepartment}
              disabled={sellerType !== "department"}
            >
              <SelectTrigger className="h-12 text-lg md:h-10 md:text-base">
                <SelectValue placeholder="เลือกแผนก" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className={sellerType === "person" ? "ring-2 ring-primary" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl md:text-lg">บุคคลทั่วไป</CardTitle>
              </div>
              <Button
                type="button"
                variant={sellerType === "person" ? "default" : "outline"}
                size="lg"
                className="h-12 px-6 text-lg md:h-8 md:px-4 md:text-sm"
                onClick={() => setSellerType("person")}
              >
                เลือก
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedPerson} 
              onValueChange={setSelectedPerson}
              disabled={sellerType !== "person"}
            >
              <SelectTrigger className="h-12 text-lg md:h-10 md:text-base">
                <SelectValue placeholder="เลือกบุคคล" />
              </SelectTrigger>
              <SelectContent>
                {persons.map((person) => (
                  <SelectItem key={person.id} value={person.id}>
                    <div>
                      <div>{person.name}</div>
                      {person.phone && (
                        <div className="text-sm text-muted-foreground">{person.phone}</div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="wasteType" className="text-lg md:text-base font-medium">ประเภทขยะรีไซเคิล</Label>
            <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
              <SelectTrigger className="h-12 text-lg md:h-10 md:text-base">
                <SelectValue placeholder="เลือกประเภทขยะ" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((waste) => (
                  <SelectItem key={waste.id} value={waste.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{waste.name}</span>
                      <span className="text-sm text-muted-foreground ml-4">
                        {waste.price} บาท/{waste.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="weight" className="text-lg md:text-base font-medium">น้ำหนัก ({selectedWaste?.unit || "กิโลกรัม"})</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 w-12 md:h-10 md:w-10"
                onClick={() => adjustWeight(-0.5)}
              >
                <Minus className="h-6 w-6 md:h-4 md:w-4" />
              </Button>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12 text-lg text-center md:h-10 md:text-base"
              />
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 w-12 md:h-10 md:w-10"
                onClick={() => adjustWeight(0.5)}
              >
                <Plus className="h-6 w-6 md:h-4 md:w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustWeight(1)}
                className="flex-1 h-10 text-base md:h-8 md:text-sm"
              >
                +1 กก.
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustWeight(5)}
                className="flex-1 h-10 text-base md:h-8 md:text-sm"
              >
                +5 กก.
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustWeight(10)}
                className="flex-1 h-10 text-base md:h-8 md:text-sm"
              >
                +10 กก.
              </Button>
            </div>
          </div>
        </div>

        {/* แสดงการคำนวณ */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              สรุปการคำนวณ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-base md:text-sm">
              <span className="text-muted-foreground">ประเภทขยะ:</span>
              <span className="font-medium">{selectedWaste?.name || "-"}</span>
            </div>
            <div className="flex justify-between text-base md:text-sm">
              <span className="text-muted-foreground">ราคาต่อหน่วย:</span>
              <span className="font-medium">{selectedWaste ? `${selectedWaste.price} บาท/${selectedWaste.unit}` : "-"}</span>
            </div>
            <div className="flex justify-between text-base md:text-sm">
              <span className="text-muted-foreground">น้ำหนัก:</span>
              <span className="font-medium">{weight ? `${weight} ${selectedWaste?.unit || "กิโลกรัม"}` : "-"}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl md:text-lg font-bold">
              <span>ยอดรวม:</span>
              <span className="text-primary text-2xl md:text-xl">{totalAmount.toFixed(2)} บาท</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          className="h-14 text-lg md:h-10 md:text-base order-2 md:order-1"
          onClick={() => {
            setSelectedDepartment("");
            setSelectedPerson("");
            setSelectedWasteType("");
            setWeight("");
            setTotalAmount(0);
          }}
        >
          ล้างข้อมูล
        </Button>
        <Button 
          type="submit" 
          size="lg"
          className="bg-gradient-primary h-14 text-lg md:h-10 md:text-base order-1 md:order-2"
        >
          <Receipt className="h-6 w-6 mr-2 md:h-4 md:w-4" />
          บันทึกและออกใบเสร็จ
        </Button>
      </div>
    </form>
    </div>
  );
};

export default PurchaseForm;