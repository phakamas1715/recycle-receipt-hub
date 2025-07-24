import { forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";

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
}

interface ReceiptViewProps {
  data: ReceiptData;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

const ReceiptView = forwardRef<HTMLDivElement, ReceiptViewProps>(
  ({ data, onDownloadPDF, onPrint }, ref) => {
    return (
      <div className="space-y-4">
        {/* ปุ่มการจัดการใบเสร็จ */}
        <div className="flex flex-col md:flex-row gap-3 print:hidden">
          <Button
            onClick={onPrint}
            size="lg"
            variant="outline"
            className="h-14 text-lg flex-1"
          >
            <Printer className="h-6 w-6 mr-2" />
            พิมพ์ใบเสร็จ
          </Button>
          <Button
            onClick={onDownloadPDF}
            size="lg"
            variant="outline"
            className="h-14 text-lg flex-1"
          >
            <Download className="h-6 w-6 mr-2" />
            ดาวน์โหลด PDF
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `ใบเสร็จ ${data.receiptNumber}`,
                  text: `ใบเสร็จรับซื้อขยะรีไซเคิล ${data.receiptNumber}`,
                });
              }
            }}
            size="lg"
            variant="outline"
            className="h-14 text-lg flex-1"
          >
            <Share2 className="h-6 w-6 mr-2" />
            แชร์ใบเสร็จ
          </Button>
        </div>

        {/* ใบเสร็จ */}
        <Card ref={ref} className="w-full max-w-md mx-auto bg-white text-black print:shadow-none print:border-none">
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
                <div className="font-medium">{data.date}</div>
              </div>
              <div>
                <span className="text-muted-foreground">เวลา:</span>
                <div className="font-medium">{data.time}</div>
              </div>
            </div>

            <Separator />

            {/* ข้อมูลผู้ขาย */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">ผู้ขาย:</div>
              <div className="font-medium text-lg">{data.seller}</div>
              <div className="text-sm text-muted-foreground">
                ({data.sellerType === 'department' ? 'แผนกในโรงพยาบาล' : 'บุคคลทั่วไป'})
              </div>
            </div>

            <Separator />

            {/* รายละเอียดขยะ */}
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">รายละเอียดการรับซื้อ:</div>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                {data.items.map((item, index) => (
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
                    <span className="font-medium">{data.totalWeight} กิโลกรัม</span>
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
                  {data.totalAmount.toFixed(2)} บาท
                </span>
              </div>
            </div>

            {/* ลายเซ็น */}
            <div className="pt-6 space-y-6 text-sm">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="border-b border-dashed pb-1 mb-2 h-12"></div>
                  <div>ลายเซ็นผู้รับซื้อ</div>
                </div>
                <div className="text-center">
                  <div className="border-b border-dashed pb-1 mb-2 h-12"></div>
                  <div>ลายเซ็นผู้ขาย</div>
                </div>
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