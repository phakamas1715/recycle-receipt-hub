import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Recycle, Save, X } from "lucide-react";
import { dataStorage, WasteType as StorageWasteType } from "@/lib/dataStorage";

interface WasteType {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  description?: string;
  greenStandard: boolean;
  hazardLevel: 'ต่ำ' | 'กลาง' | 'สูง';
}

const WasteTypeManager = () => {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWaste, setEditingWaste] = useState<WasteType | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    unit: string;
    category: string;
    description: string;
    greenStandard: boolean;
    hazardLevel: 'ต่ำ' | 'กลาง' | 'สูง';
  }>({
    name: "",
    price: "",
    unit: "กิโลกรัม",
    category: "",
    description: "",
    greenStandard: false,
    hazardLevel: "ต่ำ"
  });

  // Green & Clean Hospital Standard Categories
  const wasteCategories = [
    "ขยะติดเชื้อ",
    "ขยะอันตราย",
    "ขยะรีไซเคิล - กระดาษ",
    "ขยะรีไซเคิล - พลาสติก",
    "ขยะรีไซเคิล - โลหะ",
    "ขยะรีไซเคิล - แก้ว",
    "ขยะอินทรีย์",
    "ขยะทั่วไป",
    "วัสดุอุปกรณ์การแพทย์",
    "เครื่องมือแพทย์"
  ];

  useEffect(() => {
    loadWasteTypes();
  }, []);

  const loadWasteTypes = () => {
    const stored = dataStorage.getWasteTypes();
    if (stored.length === 0) {
      // Default waste types following Green & Clean Hospital standards
      const defaultWasteTypes: WasteType[] = [
        { id: "1", name: "กระดาษ A4/หนังสือพิมพ์", price: 3.5, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - กระดาษ", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "2", name: "พลาสติก PET ขวดน้ำ", price: 12, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - พลาสติก", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "3", name: "กระป๋องอลูมิเนียม", price: 45, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - โลหะ", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "4", name: "แก้วใส", price: 1.5, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - แก้ว", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "5", name: "เหล็กเศษ", price: 8, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - โลหะ", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "6", name: "พลาสติกใส PP", price: 15, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - พลาสติก", greenStandard: true, hazardLevel: "ต่ำ" },
        { id: "7", name: "เศษยาง", price: 5, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - พลาสติก", greenStandard: false, hazardLevel: "กลาง" }
      ];
      
      defaultWasteTypes.forEach(wasteType => {
        const storageWasteType: StorageWasteType = {
          ...wasteType,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        dataStorage.saveWasteType(storageWasteType);
      });
      // Convert storage waste types to component waste types
      const convertedTypes = defaultWasteTypes.map(wt => ({
        id: wt.id,
        name: wt.name,
        price: wt.price,
        unit: wt.unit,
        category: wt.category,
        description: wt.description,
        greenStandard: wt.greenStandard,
        hazardLevel: wt.hazardLevel
      } as WasteType));
      setWasteTypes(convertedTypes);
    } else {
      // Convert storage waste types to component waste types
      const convertedTypes = stored.map(wt => ({
        id: wt.id,
        name: wt.name,
        price: wt.price,
        unit: wt.unit,
        category: wt.category || "ขยะทั่วไป",
        description: wt.description,
        greenStandard: wt.greenStandard || false,
        hazardLevel: wt.hazardLevel || "ต่ำ"
      } as WasteType));
      setWasteTypes(convertedTypes);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      unit: "กิโลกรัม",
      category: "",
      description: "",
      greenStandard: false,
      hazardLevel: "ต่ำ"
    });
    setEditingWaste(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น",
        variant: "destructive",
      });
      return;
    }

    const wasteTypeData: StorageWasteType = {
      id: editingWaste?.id || `waste_${Date.now()}`,
      name: formData.name,
      price: parseFloat(formData.price),
      unit: formData.unit,
      category: formData.category,
      description: formData.description,
      greenStandard: formData.greenStandard,
      hazardLevel: formData.hazardLevel,
      isActive: true,
      createdAt: editingWaste?.id ? (dataStorage.getWasteTypes().find(w => w.id === editingWaste.id)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingWaste) {
      dataStorage.updateWasteType(editingWaste.id, wasteTypeData);
      toast({
        title: "อัปเดตสำเร็จ",
        description: "ข้อมูลประเภทขยะถูกอัปเดตแล้ว",
      });
    } else {
      dataStorage.saveWasteType(wasteTypeData);
      toast({
        title: "เพิ่มสำเร็จ",
        description: "เพิ่มประเภทขยะใหม่แล้ว",
      });
    }

    loadWasteTypes();
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (wasteType: WasteType) => {
    setEditingWaste(wasteType);
    setFormData({
      name: wasteType.name,
      price: wasteType.price.toString(),
      unit: wasteType.unit,
      category: wasteType.category,
      description: wasteType.description || "",
      greenStandard: wasteType.greenStandard,
      hazardLevel: wasteType.hazardLevel
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("คุณต้องการลบประเภทขยะนี้หรือไม่?")) {
      dataStorage.deleteWasteType(id);
      loadWasteTypes();
      toast({
        title: "ลบสำเร็จ",
        description: "ลบประเภทขยะแล้ว",
      });
    }
  };

  const getHazardLevelColor = (level: string) => {
    switch (level) {
      case "ต่ำ": return "bg-green-100 text-green-800";
      case "กลาง": return "bg-yellow-100 text-yellow-800";
      case "สูง": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">จัดการประเภทขยะรีไซเคิล</h2>
          <p className="text-muted-foreground">เพิ่ม แก้ไข หรือลบประเภทขยะตามมาตรฐาน Green & Clean Hospital</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="gap-2">
              <Plus className="h-4 w-4" />
              เพิ่มประเภทขยะ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingWaste ? "แก้ไขประเภทขยะ" : "เพิ่มประเภทขยะใหม่"}
              </DialogTitle>
              <DialogDescription>
                กรอกข้อมูลประเภทขยะตามมาตรฐาน Green & Clean Hospital
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">ชื่อประเภทขยะ *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="เช่น กระดาษ A4/หนังสือพิมพ์"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">ราคาต่อหน่วย (บาท) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">หน่วยนับ</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="กิโลกรัม">กิโลกรัม</SelectItem>
                      <SelectItem value="กรัม">กรัม</SelectItem>
                      <SelectItem value="ชิ้น">ชิ้น</SelectItem>
                      <SelectItem value="ลิตร">ลิตร</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">หมวดหมู่ตามมาตรฐาน *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hazardLevel">ระดับความเสี่ยง</Label>
                  <Select value={formData.hazardLevel} onValueChange={(value: any) => setFormData({...formData, hazardLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ต่ำ">ต่ำ</SelectItem>
                      <SelectItem value="กลาง">กลาง</SelectItem>
                      <SelectItem value="สูง">สูง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="greenStandard"
                    checked={formData.greenStandard}
                    onChange={(e) => setFormData({...formData, greenStandard: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="greenStandard">ผ่านมาตรฐาน Green & Clean Hospital</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="description">รายละเอียดเพิ่มเติม</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับประเภทขยะ"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  ยกเลิก
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingWaste ? "อัปเดต" : "เพิ่ม"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="h-5 w-5" />
            รายการประเภทขยะ ({wasteTypes.length} รายการ)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ชื่อประเภทขยะ</TableHead>
                <TableHead>ราคา/หน่วย</TableHead>
                <TableHead>หมวดหมู่</TableHead>
                <TableHead>ระดับความเสี่ยง</TableHead>
                <TableHead>มาตรฐาน</TableHead>
                <TableHead>การจัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteTypes.map((wasteType) => (
                <TableRow key={wasteType.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{wasteType.name}</div>
                      {wasteType.description && (
                        <div className="text-sm text-muted-foreground">{wasteType.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{wasteType.price.toFixed(2)}</span>
                    <span className="text-muted-foreground"> บาท/{wasteType.unit}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {wasteType.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getHazardLevelColor(wasteType.hazardLevel)}`}>
                      {wasteType.hazardLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {wasteType.greenStandard ? (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ มาตรฐาน
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        ไม่ผ่านมาตรฐาน
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(wasteType)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(wasteType.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteTypeManager;