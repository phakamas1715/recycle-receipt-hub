import { forwardRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, Camera } from "lucide-react";
import ElectronicSignature from "./ElectronicSignature";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ReceiptItem {
  wasteTypeId: string;
  wasteTypeName: string;
  weight: number;
  pricePerUnit: number;
  amount: number;
}

interface ReceiptData {
  receiptNumber: string;
  date: string;
  time: string;
  sellerType: string;
  seller: string;
  items: ReceiptItem[];
  totalWeight: number;
  totalAmount: number;
  buyerSignature?: string;
  sellerSignature?: string;
}

interface ReceiptViewProps {
  data: ReceiptData;
  onDownloadPDF: () => void;
  onPrint: () => void;
  onUpdateSignature?: (type: 'buyer' | 'seller', signature: string) => void;
}

const ReceiptView = forwardRef<HTMLDivElement, ReceiptViewProps>(
  ({ data, onDownloadPDF, onPrint, onUpdateSignature }, ref) => {
    const [receiptData, setReceiptData] = useState(data);
    const { toast } = useToast();

    const handleSignatureUpdate = (type: 'buyer' | 'seller', signature: string) => {
      const updatedData = {
        ...receiptData,
        [type === 'buyer' ? 'buyerSignature' : 'sellerSignature']: signature
      };
      setReceiptData(updatedData);
      onUpdateSignature?.(type, signature);
    };

    const shareReceipt = async () => {
      if (navigator.share) {
        try {
          // Generate image from receipt
          const receiptElement = document.querySelector('[data-receipt]') as HTMLElement;
          if (receiptElement) {
            const canvas = await html2canvas(receiptElement, {
              backgroundColor: '#ffffff',
              scale: 2,
              useCORS: true,
            });
            
            canvas.toBlob(async (blob) => {
              if (blob) {
                const file = new File([blob], `receipt-${receiptData.receiptNumber}.png`, { type: 'image/png' });
                try {
                  await navigator.share({
                    title: `ใบเสร็จ ${receiptData.receiptNumber}`,
                    text: `ใบเสร็จรับซื้อขยะรีไซเคิล ${receiptData.receiptNumber} - จำนวน ${receiptData.totalAmount.toFixed(2)} บาท`,
                    files: [file],
                  });
                } catch (shareError) {
                  // Fallback to sharing without image
                  await navigator.share({
                    title: `ใบเสร็จ ${receiptData.receiptNumber}`,
                    text: `ใบเสร็จรับซื้อขยะรีไซเคิล ${receiptData.receiptNumber} - จำนวน ${receiptData.totalAmount.toFixed(2)} บาท`,
                  });
                }
              }
            }, 'image/png');
          }
        } catch (error) {
          console.error('Error sharing receipt:', error);
          toast({
            title: "ไม่สามารถแชร์ได้",
            description: "เกิดข้อผิดพลาดในการแชร์ใบเสร็จ",
            variant: "destructive",
          });
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const text = `ใบเสร็จรับซื้อขยะรีไซเคิล ${receiptData.receiptNumber} - จำนวน ${receiptData.totalAmount.toFixed(2)} บาท`;
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          toast({
            title: "คัดลอกแล้ว",
            description: "คัดลอกข้อมูลใบเสร็จไปยังคลิปบอร์ดแล้ว",
          });
        }
      }
    };

    return (
      <div className="space-y-4">
        {/* ปุ่มการจัดการใบเสร็จ */}
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <Button
            onClick={onPrint}
            size="lg"
            variant="outline"
            className="h-12 sm:h-14 text-sm sm:text-lg flex-1 min-w-0"
          >
            <Printer className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">พิมพ์ใบเสร็จ</span>
            <span className="sm:hidden">พิมพ์</span>
          </Button>
          <Button
            onClick={onDownloadPDF}
            size="lg"
            variant="outline"
            className="h-12 sm:h-14 text-sm sm:text-lg flex-1 min-w-0"
          >
            <Download className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">ดาวน์โหลด PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
          <Button
            onClick={shareReceipt}
            size="lg"
            variant="outline"
            className="h-12 sm:h-14 text-sm sm:text-lg flex-1 min-w-0"
          >
            <Share2 className="h-4 w-4 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">แชร์ใบเสร็จ</span>
            <span className="sm:hidden">แชร์</span>
          </Button>
        </div>

        {/* ใบเสร็จ */}
        <Card ref={ref} data-receipt className="w-full max-w-lg mx-auto bg-white text-black print:shadow-none print:border-none">
          <CardHeader className="text-center space-y-2 pb-4">
            <CardTitle className="text-2xl font-bold text-primary">
              โรงพยาบาลน้ำพอง
            </CardTitle>
            <div className="text-lg font-semibold">ใบเสร็จรับซื้อขยะรีไซเคิล</div>
            <div className="text-sm text-muted-foreground">
              เลขที่ใบเสร็จ: {data.receiptNumber}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* ข้อมูลวันที่และเวลา */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">วันที่:</span>
                <div className="font-medium">{receiptData.date}</div>
              </div>
              <div>
                <span className="text-muted-foreground">เวลา:</span>
                <div className="font-medium">{receiptData.time}</div>
              </div>
            </div>

            <Separator />

            {/* ข้อมูลผู้ขาย */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">ผู้ขาย:</div>
              <div className="font-medium text-lg">{receiptData.seller}</div>
              <div className="text-sm text-muted-foreground">
                ({receiptData.sellerType === 'department' ? 'แผนกในโรงพยาบาล' : 'บุคคลทั่วไป'})
              </div>
            </div>

            <Separator />

            {/* รายละเอียดขยะ */}
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">รายละเอียดการรับซื้อ:</div>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                {receiptData.items.map((item, index) => (
                  <div key={index} className="border-b border-muted pb-2 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ประเภทขยะ:</span>
                      <span className="font-medium">{item.wasteTypeName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">น้ำหนัก:</span>
                      <span className="font-medium">{item.weight} กิโลกรัม</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ราคาต่อหน่วย:</span>
                      <span className="font-medium">{item.pricePerUnit} บาท/กก.</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ยอดย่อย:</span>
                      <span className="font-medium text-primary">{item.amount.toFixed(2)} บาท</span>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 border-t border-muted">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">น้ำหนักรวม:</span>
                    <span className="font-medium">{receiptData.totalWeight} กิโลกรัม</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* ยอดรวม */}
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">ยอดรวม:</span>
                <span className="text-2xl font-bold text-primary">
                  {receiptData.totalAmount.toFixed(2)} บาท
                </span>
              </div>
            </div>

            {/* ลายเซ็นอิเล็กทรอนิกส์ */}
            <div className="pt-6 space-y-6 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <ElectronicSignature
                  title="ลายเซ็นผู้รับซื้อ"
                  onSave={(signature) => handleSignatureUpdate('buyer', signature)}
                  existingSignature={receiptData.buyerSignature}
                />
                <ElectronicSignature
                  title="ลายเซ็นผู้ขาย"
                  onSave={(signature) => handleSignatureUpdate('seller', signature)}
                  existingSignature={receiptData.sellerSignature}
                />
              </div>
            </div>

            {/* หมายเหตุ */}
            <div className="text-xs text-center text-muted-foreground pt-4 border-t">
              ขอบคุณที่ร่วมมือในการรีไซเคิล
              <br />
              เพื่อสิ่งแวดล้อมที่ดีของโรงพยาบาลน้ำพอง
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

ReceiptView.displayName = "ReceiptView";

export default ReceiptView;