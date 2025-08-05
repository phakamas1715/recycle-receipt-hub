import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PenTool, RotateCcw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ElectronicSignatureProps {
  title: string;
  onSave: (signature: string) => void;
  existingSignature?: string;
}

const ElectronicSignature = ({ title, onSave, existingSignature }: ElectronicSignatureProps) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const saveSignature = () => {
    console.log("saveSignature clicked");
    console.log("sigCanvas.current:", sigCanvas.current);
    
    if (!sigCanvas.current) {
      console.error("No signature canvas found");
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่พบแคนวาสลายเซ็น",
        variant: "destructive",
      });
      return;
    }

    if (sigCanvas.current.isEmpty()) {
      console.log("Canvas is empty");
      toast({
        title: "กรุณาลงลายเซ็น",
        description: "กรุณาลงลายเซ็นก่อนบันทึก",
        variant: "destructive",
      });
      return;
    }

    try {
      const signature = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      console.log("Generated signature:", signature ? "✓ Success" : "✗ Failed");
      
      if (signature) {
        onSave(signature);
        setIsOpen(false);
        toast({
          title: "บันทึกลายเซ็นสำเร็จ",
          description: "ลายเซ็นได้รับการบันทึกแล้ว",
        });
      }
    } catch (error) {
      console.error("Error saving signature:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกลายเซ็นได้",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-center cursor-pointer">
          {existingSignature ? (
            <div className="relative">
              <img
                src={existingSignature}
                alt="ลายเซ็น"
                className="w-full h-16 object-contain border-b border-dashed"
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <PenTool className="h-4 w-4 text-primary" />
              </div>
            </div>
          ) : (
            <div className="border-b border-dashed pb-1 mb-2 h-16 flex items-center justify-center hover:bg-primary/5 transition-colors">
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <div className="text-sm">{title}</div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">กรุณาลงลายเซ็นด้านล่าง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-dashed border-muted-foreground rounded-lg p-2 bg-background">
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "signature-canvas w-full h-auto",
                  style: { touchAction: "none" }
                }}
                backgroundColor="white"
                penColor="black"
                minWidth={1}
                maxWidth={3}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={clearSignature}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                ล้างลายเซ็น
              </Button>
              <Button
                onClick={saveSignature}
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                บันทึกลายเซ็น
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ElectronicSignature;