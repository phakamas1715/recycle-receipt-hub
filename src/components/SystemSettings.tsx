import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, DollarSign, Users } from "lucide-react";

interface WasteType {
  id: string;
  name: string;
  price: number;
  unit: string;
}

interface Person {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

const SystemSettings = () => {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([
    { id: "1", name: "กระดาษ", price: 3.5, unit: "กิโลกรัม" },
    { id: "2", name: "พลาสติก PET", price: 12, unit: "กิโลกรัม" },
    { id: "3", name: "กระป๋องอลูมิเนียม", price: 45, unit: "กิโลกรัม" },
    { id: "4", name: "แก้ว", price: 1.5, unit: "กิโลกรัม" },
    { id: "5", name: "เหล็ก", price: 8, unit: "กิโลกรัม" },
  ]);

  const [persons, setPersons] = useState<Person[]>([
    { id: "1", name: "นายสมชาย ใจดี", phone: "081-234-5678", address: "123 หมู่ 1 ต.น้ำพอง" },
    { id: "2", name: "นางสาวสมหญิง รักดี", phone: "082-345-6789", address: "456 หมู่ 2 ต.น้ำพอง" },
  ]);

  const [editingWaste, setEditingWaste] = useState<WasteType | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [showWasteDialog, setShowWasteDialog] = useState(false);
  const [showPersonDialog, setShowPersonDialog] = useState(false);

  // Waste Type Management
  const handleSaveWasteType = (formData: FormData) => {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const unit = formData.get("unit") as string;

    if (!name || !price || !unit) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    if (editingWaste) {
      // แก้ไข
      setWasteTypes(prev => prev.map(w => 
        w.id === editingWaste.id 
          ? { ...w, name, price, unit }
          : w
      ));
      toast({
        title: "แก้ไขสำเร็จ",
        description: "แก้ไขข้อมูลประเภทขยะรีไซเคิลแล้ว",
      });
    } else {
      // เพิ่มใหม่
      const newWaste: WasteType = {
        id: String(Date.now()),
        name,
        price,
        unit,
      };
      setWasteTypes(prev => [...prev, newWaste]);
      toast({
        title: "เพิ่มข้อมูลสำเร็จ",
        description: "เพิ่มประเภทขยะรีไซเคิลใหม่แล้ว",
      });
    }

    setEditingWaste(null);
    setShowWasteDialog(false);
  };

  const handleDeleteWasteType = (id: string) => {
    setWasteTypes(prev => prev.filter(w => w.id !== id));
    toast({
      title: "ลบข้อมูลสำเร็จ",
      description: "ลบประเภทขยะรีไซเคิลแล้ว",
    });
  };

  // Person Management
  const handleSavePerson = (formData: FormData) => {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกชื่อ-นามสกุล",
        variant: "destructive",
      });
      return;
    }

    if (editingPerson) {
      // แก้ไข
      setPersons(prev => prev.map(p => 
        p.id === editingPerson.id 
          ? { ...p, name, phone, address }
          : p
      ));
      toast({
        title: "แก้ไขสำเร็จ",
        description: "แก้ไขข้อมูลบุคคลแล้ว",
      });
    } else {
      // เพิ่มใหม่
      const newPerson: Person = {
        id: String(Date.now()),
        name,
        phone,
        address,
      };
      setPersons(prev => [...prev, newPerson]);
      toast({
        title: "เพิ่มข้อมูลสำเร็จ",
        description: "เพิ่มบุคคลใหม่แล้ว",
      });
    }

    setEditingPerson(null);
    setShowPersonDialog(false);
  };

  const handleDeletePerson = (id: string) => {
    setPersons(prev => prev.filter(p => p.id !== id));
    toast({
      title: "ลบข้อมูลสำเร็จ",
      description: "ลบข้อมูลบุคคลแล้ว",
    });
  };

  return (
    <div className="space-y-6">
      {/* จัดการราคาขยะรีไซเคิล */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                จัดการราคาขยะรีไซเคิล
              </CardTitle>
              <CardDescription>
                เพิ่ม แก้ไข หรือลบประเภทขยะรีไซเคิลและราคารับซื้อ
              </CardDescription>
            </div>
            <Dialog open={showWasteDialog} onOpenChange={setShowWasteDialog}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setEditingWaste(null);
                    setShowWasteDialog(true);
                  }}
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มประเภทขยะ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSaveWasteType(formData);
                }}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingWaste ? "แก้ไขประเภทขยะรีไซเคิล" : "เพิ่มประเภทขยะรีไซเคิลใหม่"}
                    </DialogTitle>
                    <DialogDescription>
                      กรอกข้อมูลประเภทขยะรีไซเคิลและราคารับซื้อ
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="name">ชื่อประเภทขยะ</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={editingWaste?.name || ""}
                        placeholder="เช่น กระดาษ, พลาสติก"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">ราคารับซื้อ (บาท)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.1"
                        defaultValue={editingWaste?.price || ""}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit">หน่วย</Label>
                      <Input
                        id="unit"
                        name="unit"
                        defaultValue={editingWaste?.unit || "กิโลกรัม"}
                        placeholder="เช่น กิโลกรัม, ลูก"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowWasteDialog(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">บันทึก</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ประเภทขยะ</TableHead>
                  <TableHead className="text-right">ราคารับซื้อ</TableHead>
                  <TableHead>หน่วย</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteTypes.map((waste) => (
                  <TableRow key={waste.id}>
                    <TableCell className="font-medium">{waste.name}</TableCell>
                    <TableCell className="text-right">{waste.price} บาท</TableCell>
                    <TableCell>{waste.unit}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingWaste(waste);
                            setShowWasteDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteWasteType(waste.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* จัดการรายชื่อบุคคล */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                จัดการรายชื่อบุคคลทั่วไป
              </CardTitle>
              <CardDescription>
                เพิ่ม แก้ไข หรือลบข้อมูลบุคคลทั่วไปที่มาขายขยะรีไซเคิล
              </CardDescription>
            </div>
            <Dialog open={showPersonDialog} onOpenChange={setShowPersonDialog}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setEditingPerson(null);
                    setShowPersonDialog(true);
                  }}
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มบุคคล
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleSavePerson(formData);
                }}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingPerson ? "แก้ไขข้อมูลบุคคล" : "เพิ่มบุคคลใหม่"}
                    </DialogTitle>
                    <DialogDescription>
                      กรอกข้อมูลบุคคลที่มาขายขยะรีไซเคิล
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="personName">ชื่อ-นามสกุล *</Label>
                      <Input
                        id="personName"
                        name="name"
                        defaultValue={editingPerson?.name || ""}
                        placeholder="เช่น นายสมชาย ใจดี"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                      <Input
                        id="phone"
                        name="phone"
                        defaultValue={editingPerson?.phone || ""}
                        placeholder="เช่น 081-234-5678"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">ที่อยู่</Label>
                      <Input
                        id="address"
                        name="address"
                        defaultValue={editingPerson?.address || ""}
                        placeholder="เช่น 123 หมู่ 1 ต.น้ำพอง"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowPersonDialog(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">บันทึก</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ-นามสกุล</TableHead>
                  <TableHead>เบอร์โทรศัพท์</TableHead>
                  <TableHead>ที่อยู่</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {persons.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{person.phone || "-"}</TableCell>
                    <TableCell>{person.address || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPerson(person);
                            setShowPersonDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePerson(person.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

export default SystemSettings;