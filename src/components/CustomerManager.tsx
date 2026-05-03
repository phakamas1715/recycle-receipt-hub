import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Building2, User } from "lucide-react";
import { dataStorage, Department, Person } from "@/lib/dataStorage";
import { Badge } from "@/components/ui/badge";

const CustomerManager = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false);
  const [showPersonDialog, setShowPersonDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDepartments(dataStorage.getDepartments());
    setPersons(dataStorage.getPersons());
  };

  // Department Management
  const handleSaveDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;

    if (!name || !code) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    if (editingDepartment) {
      dataStorage.updateDepartment(editingDepartment.id, {
        ...editingDepartment,
        name,
        code
      });
      toast({ title: "แก้ไขสำเร็จ", description: "อัปเดตข้อมูลลูกค้าองค์กรแล้ว" });
    } else {
      dataStorage.addDepartment({ name, code, isActive: true });
      toast({ title: "เพิ่มข้อมูลสำเร็จ", description: "เพิ่มลูกค้าองค์กรใหม่แล้ว" });
    }

    setEditingDepartment(null);
    setShowDepartmentDialog(false);
    loadData();
  };

  const handleDeleteDepartment = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบลูกค้ารายนี้?")) {
      dataStorage.deleteDepartment(id);
      toast({ title: "ลบข้อมูลสำเร็จ", description: "ลบลูกค้าองค์กรแล้ว" });
      loadData();
    }
  };

  // Person Management
  const handleSavePerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
      dataStorage.updatePerson(editingPerson.id, {
        ...editingPerson,
        name,
        phone,
        address
      });
      toast({ title: "แก้ไขสำเร็จ", description: "อัปเดตข้อมูลบุคคลทั่วไปแล้ว" });
    } else {
      dataStorage.addPerson({ name, phone, address, isActive: true });
      toast({ title: "เพิ่มข้อมูลสำเร็จ", description: "เพิ่มบุคคลทั่วไปใหม่แล้ว" });
    }

    setEditingPerson(null);
    setShowPersonDialog(false);
    loadData();
  };

  const handleDeletePerson = (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบลูกค้ารายนี้?")) {
      dataStorage.deletePerson(id);
      toast({ title: "ลบข้อมูลสำเร็จ", description: "ลบข้อมูลบุคคลทั่วไปแล้ว" });
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* จัดการลูกค้าองค์กร/สมาชิก */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                จัดการลูกค้าสมาชิก / องค์กร
              </CardTitle>
              <CardDescription>
                เพิ่ม แก้ไข หรือลบรายชื่อลูกค้าสมาชิกและหน่วยงานต่างๆ
              </CardDescription>
            </div>
            <Dialog open={showDepartmentDialog} onOpenChange={setShowDepartmentDialog}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    setEditingDepartment(null);
                    setShowDepartmentDialog(true);
                  }}
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มลูกค้าองค์กร
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSaveDepartment}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingDepartment ? "แก้ไขข้อมูลลูกค้าองค์กร" : "เพิ่มลูกค้าองค์กรใหม่"}
                    </DialogTitle>
                    <DialogDescription>
                      กรอกข้อมูลสำหรับลูกค้าระดับองค์กร สมาชิก หรือหน่วยงาน
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="deptName">ชื่อลูกค้า / องค์กร *</Label>
                      <Input
                        id="deptName"
                        name="name"
                        defaultValue={editingDepartment?.name || ""}
                        placeholder="เช่น บริษัท เอบีซี จำกัด, โรงเรียนรักษ์โลก"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deptCode">รหัสอ้างอิง *</Label>
                      <Input
                        id="deptCode"
                        name="code"
                        defaultValue={editingDepartment?.code || ""}
                        placeholder="เช่น ORG1, EDU1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowDepartmentDialog(false)}>
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
                  <TableHead>ชื่อลูกค้า / องค์กร</TableHead>
                  <TableHead>รหัสอ้างอิง</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การดำเนินการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">ไม่มีข้อมูล</TableCell>
                  </TableRow>
                ) : (
                  departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.code}</TableCell>
                      <TableCell>
                        <Badge variant={dept.isActive ? "default" : "secondary"}>
                          {dept.isActive ? "ใช้งานปกติ" : "ระงับการใช้งาน"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingDepartment(dept);
                              setShowDepartmentDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDepartment(dept.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* จัดการลูกค้าบุคคลทั่วไป */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                จัดการลูกค้าบุคคลทั่วไป
              </CardTitle>
              <CardDescription>
                เพิ่ม แก้ไข หรือลบข้อมูลบุคคลทั่วไปที่มาขายขยะรีไซเคิลบ่อยๆ
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
                  เพิ่มลูกค้าบุคคล
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSavePerson}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingPerson ? "แก้ไขข้อมูลลูกค้าบุคคล" : "เพิ่มลูกค้าบุคคลใหม่"}
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
                {persons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">ไม่มีข้อมูล</TableCell>
                  </TableRow>
                ) : (
                  persons.map((person) => (
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

export default CustomerManager;
