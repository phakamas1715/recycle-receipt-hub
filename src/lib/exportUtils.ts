import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Transaction, supabaseStorage } from './supabaseStorage';

export class ExportUtils {
  
  // Export to Excel (XLSX)
  static exportToExcel(transactions: Transaction[], filename?: string): void {
    try {
      const workbook = XLSX.utils.book_new();
      
      // Summary Sheet
      const summaryData = this.generateSummaryData(transactions);
      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'สรุปยอดรวม');
      
      // Transactions Sheet
      const transactionData = transactions.flatMap((t, index) => 
        t.items.map((item, itemIndex) => ({
          'ลำดับ': itemIndex === 0 ? index + 1 : '',
          'เลขที่ใบเสร็จ': itemIndex === 0 ? t.receipt_number : '',
          'วันที่': itemIndex === 0 ? (() => {
            try {
              const date = new Date(t.date);
              return isNaN(date.getTime()) ? 'วันที่ไม่ถูกต้อง' : date.toLocaleDateString('th-TH');
            } catch {
              return 'วันที่ไม่ถูกต้อง';
            }
          })() : '',
          'เวลา': itemIndex === 0 ? t.time : '',
          'ประเภทผู้ขาย': itemIndex === 0 ? (t.seller_type === 'department' ? 'ลูกค้าสมาชิก/องค์กร' : 'บุคคลทั่วไป') : '',
          'ผู้ขาย': itemIndex === 0 ? t.seller : '',
          'ประเภทขยะ': item.waste_type_name,
          'น้ำหนัก (กก.)': item.weight,
          'ราคาต่อหน่วย (บาท)': item.price_per_unit,
          'ยอดย่อย (บาท)': item.amount,
          'น้ำหนักรวม (กก.)': itemIndex === 0 ? t.total_weight : '',
          'ยอดรวม (บาท)': itemIndex === 0 ? t.total_amount : '',
          'วันที่บันทึก': itemIndex === 0 ? (() => {
            try {
              const date = new Date(t.created_at || '');
              return isNaN(date.getTime()) ? 'วันที่ไม่ถูกต้อง' : date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              });
            } catch {
              return 'วันที่ไม่ถูกต้อง';
            }
          })() : ''
        }))
      );
      
      const transactionSheet = XLSX.utils.json_to_sheet(transactionData);
      XLSX.utils.book_append_sheet(workbook, transactionSheet, 'รายการทั้งหมด');
      
      // Waste Type Analysis
      const wasteTypeAnalysis = this.generateWasteTypeAnalysis(transactions);
      const wasteTypeSheet = XLSX.utils.json_to_sheet(wasteTypeAnalysis);
      XLSX.utils.book_append_sheet(workbook, wasteTypeSheet, 'วิเคราะห์ประเภทขยะ');
      
      // Seller Analysis
      const sellerAnalysis = this.generateSellerAnalysis(transactions);
      const sellerSheet = XLSX.utils.json_to_sheet(sellerAnalysis);
      XLSX.utils.book_append_sheet(workbook, sellerSheet, 'วิเคราะห์ผู้ขาย');
      
      // Monthly Report
      const monthlyReport = this.generateMonthlyReport(transactions);
      const monthlySheet = XLSX.utils.json_to_sheet(monthlyReport);
      XLSX.utils.book_append_sheet(workbook, monthlySheet, 'รายงานรายเดือน');
      
      const fileName = filename || `รายงานขยะรีไซเคิล_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw new Error('เกิดข้อผิดพลาดในการส่งออกไฟล์ Excel');
    }
  }
  
  // Export to CSV
  static exportToCSV(transactions: Transaction[], filename?: string): void {
    try {
      const csvData = transactions.flatMap((t, index) => 
        t.items.map((item, itemIndex) => ({
          'ลำดับ': itemIndex === 0 ? index + 1 : '',
          'เลขที่ใบเสร็จ': itemIndex === 0 ? t.receipt_number : '',
          'วันที่': itemIndex === 0 ? (() => {
            try {
              const date = new Date(t.date);
              return isNaN(date.getTime()) ? 'วันที่ไม่ถูกต้อง' : date.toLocaleDateString('th-TH');
            } catch {
              return 'วันที่ไม่ถูกต้อง';
            }
          })() : '',
          'เวลา': itemIndex === 0 ? t.time : '',
          'ประเภทผู้ขาย': itemIndex === 0 ? (t.seller_type === 'department' ? 'ลูกค้าสมาชิก/องค์กร' : 'บุคคลทั่วไป') : '',
          'ผู้ขาย': itemIndex === 0 ? t.seller : '',
          'ประเภทขยะ': item.waste_type_name,
          'น้ำหนัก (กก.)': item.weight,
          'ราคาต่อหน่วย (บาท)': item.price_per_unit,
          'ยอดย่อย (บาท)': item.amount,
          'ยอดรวม (บาท)': itemIndex === 0 ? t.total_amount : ''
        }))
      );
      
      const worksheet = XLSX.utils.json_to_sheet(csvData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      
      const fileName = filename || `รายการขยะรีไซเคิล_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.csv`;
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, fileName);
      
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      throw new Error('เกิดข้อผิดพลาดในการส่งออกไฟล์ CSV');
    }
  }
  
  // Export to JSON
  static async exportToJSON(filename?: string): Promise<void> {
    try {
      const allData = await supabaseStorage.exportAllData();
      const fileName = filename || `ข้อมูลระบบขยะรีไซเคิล_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.json`;
      const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      throw new Error('เกิดข้อผิดพลาดในการส่งออกไฟล์ JSON');
    }
  }
  
  // Generate Summary Report PDF
  static async generateSummaryReportPDF(transactions: Transaction[], dateRange?: { from: string; to: string }): Promise<void> {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add Thai font support
      pdf.setFont('helvetica');
      pdf.setFontSize(16);
      
      // Header
      pdf.text('รายงานสรุปการรับซื้อขยะรีไซเคิล', 105, 20, { align: 'center' });
      pdf.text('ร้านรับซื้อของเก่า รักษ์โลก', 105, 30, { align: 'center' });
      
      if (dateRange) {
        pdf.setFontSize(12);
        pdf.text(`ระหว่างวันที่ ${dateRange.from} ถึง ${dateRange.to}`, 105, 40, { align: 'center' });
      }
      
      // Summary Statistics
      const stats = await supabaseStorage.getStatistics();
      pdf.setFontSize(14);
      pdf.text('สถิติรวม', 20, 60);
      
      pdf.setFontSize(12);
      let yPos = 75;
      pdf.text(`จำนวนรายการทั้งหมด: ${stats.totalTransactions.toLocaleString()} รายการ`, 20, yPos);
      yPos += 10;
      pdf.text(`ยอดรวมทั้งหมด: ${stats.totalAmount.toLocaleString()} บาท`, 20, yPos);
      yPos += 10;
      pdf.text(`น้ำหนักรวม: ${stats.totalWeight.toLocaleString()} กิโลกรัม`, 20, yPos);
      yPos += 10;
      pdf.text(`ค่าเฉลี่ยต่อรายการ: ${transactions.length > 0 ? (stats.totalAmount / stats.totalTransactions).toFixed(2) : '0.00'} บาท`, 20, yPos);
      yPos += 15;
      
      // Top Waste Types
      pdf.setFontSize(14);
      pdf.text('ประเภทขยะยอดนิยม', 20, yPos);
      yPos += 15;
      
      pdf.setFontSize(10);
      const sortedWasteTypes = Object.entries(stats.wasteTypeStats)
        .sort(([,a], [,b]) => b.amount - a.amount)
        .slice(0, 5);
      
      sortedWasteTypes.forEach(([wasteType, data], index) => {
        pdf.text(`${index + 1}. ${wasteType}: ${data.amount.toLocaleString()} บาท (${data.weight.toFixed(1)} กก.)`, 20, yPos);
        yPos += 8;
      });
      
      // Footer
      pdf.setFontSize(10);
      pdf.text(`สร้างรายงานเมื่อ: ${new Date().toLocaleDateString('th-TH')} ${new Date().toLocaleTimeString('th-TH')}`, 20, 280);
      
      const fileName = `รายงานสรุป_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF report:', error);
      throw new Error('เกิดข้อผิดพลาดในการสร้างรายงาน PDF');
    }
  }
  
  // Import from JSON
  static async importFromJSON(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          // Import transactions
          if (data.transactions && Array.isArray(data.transactions)) {
            for (const transaction of data.transactions) {
              await supabaseStorage.saveTransaction(transaction);
            }
          }
          
          // Import waste types
          if (data.wasteTypes && Array.isArray(data.wasteTypes)) {
            for (const wasteType of data.wasteTypes) {
              await supabaseStorage.saveWasteType(wasteType);
            }
          }
          
          // Import persons
          if (data.persons && Array.isArray(data.persons)) {
            for (const person of data.persons) {
              await supabaseStorage.savePerson(person);
            }
          }
          
          resolve(true);
        } catch (error) {
          console.error('Import error:', error);
          reject(new Error('ไฟล์ JSON ไม่ถูกต้องหรือเกิดข้อผิดพลาดในการนำเข้าข้อมูล'));
        }
      };
      reader.onerror = () => reject(new Error('เกิดข้อผิดพลาดในการอ่านไฟล์'));
      reader.readAsText(file);
    });
  }
  
  // Helper methods for generating analysis data
  private static generateSummaryData(transactions: Transaction[]) {
    const totalAmount = transactions.reduce((sum, t) => sum + t.total_amount, 0);
    const totalWeight = transactions.reduce((sum, t) => sum + t.total_weight, 0);
    
    return [
      { 'รายการ': 'จำนวนรายการทั้งหมด', 'ค่า': transactions.length, 'หน่วย': 'รายการ' },
      { 'รายการ': 'ยอดรวมทั้งหมด', 'ค่า': totalAmount, 'หน่วย': 'บาท' },
      { 'รายการ': 'น้ำหนักรวม', 'ค่า': totalWeight, 'หน่วย': 'กิโลกรัม' },
      { 'รายการ': 'ค่าเฉลี่ยต่อรายการ', 'ค่า': transactions.length > 0 ? totalAmount / transactions.length : 0, 'หน่วย': 'บาท' },
      { 'รายการ': 'น้ำหนักเฉลี่ยต่อรายการ', 'ค่า': transactions.length > 0 ? totalWeight / transactions.length : 0, 'หน่วย': 'กิโลกรัม' }
    ];
  }
  
  private static generateWasteTypeAnalysis(transactions: Transaction[]) {
    const analysis = transactions.reduce((acc, t) => {
      t.items.forEach(item => {
        if (!acc[item.waste_type_name]) {
          acc[item.waste_type_name] = { count: 0, weight: 0, amount: 0 };
        }
        acc[item.waste_type_name].count++;
        acc[item.waste_type_name].weight += item.weight;
        acc[item.waste_type_name].amount += item.amount;
      });
      return acc;
    }, {} as Record<string, { count: number; weight: number; amount: number }>);
    
    return Object.entries(analysis).map(([wasteType, data], index) => ({
      'ลำดับ': index + 1,
      'ประเภทขยะ': wasteType,
      'จำนวนรายการ': data.count,
      'น้ำหนักรวม (กก.)': data.weight.toFixed(2),
      'ยอดรวม (บาท)': data.amount.toFixed(2),
      'ค่าเฉลี่ยต่อรายการ (บาท)': (data.amount / data.count).toFixed(2),
      'น้ำหนักเฉลี่ยต่อรายการ (กก.)': (data.weight / data.count).toFixed(2)
    }));
  }
  
  private static generateSellerAnalysis(transactions: Transaction[]) {
    const analysis = transactions.reduce((acc, t) => {
      if (!acc[t.seller]) {
        acc[t.seller] = { count: 0, weight: 0, amount: 0, type: t.seller_type };
      }
      acc[t.seller].count++;
      acc[t.seller].weight += t.total_weight;
      acc[t.seller].amount += t.total_amount;
      return acc;
    }, {} as Record<string, { count: number; weight: number; amount: number; type: string }>);
    
    return Object.entries(analysis).map(([seller, data], index) => ({
      'ลำดับ': index + 1,
      'ผู้ขาย': seller,
      'ประเภท': data.type === 'department' ? 'ลูกค้าสมาชิก/องค์กร' : 'บุคคลทั่วไป',
      'จำนวนรายการ': data.count,
      'น้ำหนักรวม (กก.)': data.weight.toFixed(2),
      'ยอดรวม (บาท)': data.amount.toFixed(2),
      'ค่าเฉลี่ยต่อรายการ (บาท)': (data.amount / data.count).toFixed(2)
    }));
  }
  
  private static generateMonthlyReport(transactions: Transaction[]) {
    const monthlyData = transactions.reduce((acc, t) => {
      try {
        const date = new Date(t.date);
        const month = isNaN(date.getTime()) ? 'ไม่ระบุเดือน' : date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long' });
        if (!acc[month]) {
          acc[month] = { count: 0, weight: 0, amount: 0 };
        }
        acc[month].count++;
        acc[month].weight += t.total_weight;
        acc[month].amount += t.total_amount;
        return acc;
      } catch {
        const month = 'ไม่ระบุเดือน';
        if (!acc[month]) {
          acc[month] = { count: 0, weight: 0, amount: 0 };
        }
        acc[month].count++;
        acc[month].weight += t.total_weight;
        acc[month].amount += t.total_amount;
        return acc;
      }
    }, {} as Record<string, { count: number; weight: number; amount: number }>);
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      'เดือน': month,
      'จำนวนรายการ': data.count,
      'น้ำหนักรวม (กก.)': data.weight.toFixed(2),
      'ยอดรวม (บาท)': data.amount.toFixed(2),
      'ค่าเฉลี่ยต่อรายการ (บาท)': (data.amount / data.count).toFixed(2)
    }));
  }
}