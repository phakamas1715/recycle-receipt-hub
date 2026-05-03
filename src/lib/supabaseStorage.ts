// This file has been updated to use localStorage instead of Supabase 
// to bypass the "Supabase project is paused" error and keep the app completely offline/local.

import { dataStorage } from "./dataStorage";

export interface TransactionItem {
  waste_type_id: string;
  waste_type_name: string;
  weight: number;
  price_per_unit: number;
  amount: number;
}

export interface Transaction {
  id?: string;
  receipt_number: string;
  date: string;
  time: string;
  seller_type: "department" | "person";
  seller: string;
  items: TransactionItem[];
  total_weight: number;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface WasteType {
  id?: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  description?: string;
  green_standard: boolean;
  hazard_level: 'ต่ำ' | 'กลาง' | 'สูง';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Person {
  id?: string;
  name: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

class SupabaseStorage {
  // Transaction Management
  async saveTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction | null> {
    try {
      // Map to dataStorage format
      const localTransaction = {
        receiptNumber: transaction.receipt_number,
        date: transaction.date,
        time: transaction.time,
        sellerType: transaction.seller_type,
        seller: transaction.seller,
        totalWeight: transaction.total_weight,
        totalAmount: transaction.total_amount,
        items: transaction.items.map(item => ({
          wasteTypeId: item.waste_type_id,
          wasteTypeName: item.waste_type_name,
          weight: item.weight,
          pricePerUnit: item.price_per_unit,
          amount: item.amount
        }))
      };

      const saved = dataStorage.saveTransaction(localTransaction);
      
      return {
        ...transaction,
        id: saved.id,
        created_at: saved.createdAt,
        updated_at: saved.updatedAt
      };
    } catch (error) {
      console.error("Error saving transaction:", error);
      return null;
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    try {
      const localData = dataStorage.getTransactions();
      
      return localData.map(t => ({
        id: t.id,
        receipt_number: t.receiptNumber,
        date: t.date,
        time: t.time,
        seller_type: t.sellerType,
        seller: t.seller,
        total_weight: t.totalWeight,
        total_amount: t.totalAmount,
        created_at: t.createdAt,
        updated_at: t.updatedAt,
        items: (t.items || []).map(item => ({
          waste_type_id: item.wasteTypeId,
          waste_type_name: item.wasteTypeName,
          weight: item.weight,
          price_per_unit: item.pricePerUnit,
          amount: item.amount
        }))
      }));
    } catch (error) {
      console.error("Error loading transactions:", error);
      return [];
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      return dataStorage.deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return false;
    }
  }

  // Waste Type Management
  async getWasteTypes(): Promise<WasteType[]> {
    try {
      const localData = dataStorage.getWasteTypes();
      return localData.map(w => ({
        id: w.id,
        name: w.name,
        price: w.price,
        unit: w.unit,
        category: w.category,
        description: w.description,
        green_standard: w.greenStandard,
        hazard_level: w.hazardLevel,
        is_active: w.isActive,
        created_at: w.createdAt,
        updated_at: w.updatedAt
      }));
    } catch (error) {
      console.error("Error loading waste types:", error);
      return [];
    }
  }

  async saveWasteType(wasteType: Omit<WasteType, 'id' | 'created_at' | 'updated_at'>): Promise<WasteType | null> {
    try {
      const saved = dataStorage.saveWasteType({
        name: wasteType.name,
        price: wasteType.price,
        unit: wasteType.unit,
        category: wasteType.category,
        description: wasteType.description,
        greenStandard: wasteType.green_standard,
        hazardLevel: wasteType.hazard_level,
        isActive: wasteType.is_active
      });

      return {
        ...wasteType,
        id: saved.id,
        created_at: saved.createdAt,
        updated_at: saved.updatedAt
      };
    } catch (error) {
      console.error("Error saving waste type:", error);
      return null;
    }
  }

  async updateWasteType(id: string, updates: Partial<WasteType>): Promise<boolean> {
    try {
      const allWasteTypes = dataStorage.getWasteTypes();
      const existing = allWasteTypes.find(w => w.id === id);
      if (!existing) return false;

      const merged = {
        ...existing,
        name: updates.name !== undefined ? updates.name : existing.name,
        price: updates.price !== undefined ? updates.price : existing.price,
        unit: updates.unit !== undefined ? updates.unit : existing.unit,
        category: updates.category !== undefined ? updates.category : existing.category,
        description: updates.description !== undefined ? updates.description : existing.description,
        greenStandard: updates.green_standard !== undefined ? updates.green_standard : existing.greenStandard,
        hazardLevel: updates.hazard_level !== undefined ? updates.hazard_level : existing.hazardLevel,
        isActive: updates.is_active !== undefined ? updates.is_active : existing.isActive
      };

      dataStorage.updateWasteType(id, merged);
      return true;
    } catch (error) {
      console.error("Error updating waste type:", error);
      return false;
    }
  }

  async deleteWasteType(id: string): Promise<boolean> {
    try {
      return dataStorage.deleteWasteType(id);
    } catch (error) {
      console.error("Error deleting waste type:", error);
      return false;
    }
  }

  // Person Management
  async getPersons(): Promise<Person[]> {
    try {
      const localData = dataStorage.getPersons();
      return localData.map(p => ({
        id: p.id,
        name: p.name,
        phone: p.phone,
        address: p.address,
        is_active: p.isActive,
        created_at: p.createdAt,
        updated_at: p.updatedAt
      }));
    } catch (error) {
      console.error("Error loading persons:", error);
      return [];
    }
  }

  async savePerson(person: Omit<Person, 'id' | 'created_at' | 'updated_at'>): Promise<Person | null> {
    try {
      const saved = dataStorage.addPerson({
        name: person.name,
        phone: person.phone,
        address: person.address,
        isActive: person.is_active
      });

      return {
        ...person,
        id: saved.id,
        created_at: saved.createdAt,
        updated_at: saved.updatedAt
      };
    } catch (error) {
      console.error("Error saving person:", error);
      return null;
    }
  }

  // Statistics
  async getStatistics() {
    try {
      const transactions = await this.getTransactions();
      const totalTransactions = transactions.length;
      const totalAmount = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
      const totalWeight = transactions.reduce((sum, t) => sum + (t.total_weight || 0), 0);
      
      // Group by waste type
      const wasteTypeStats = transactions.reduce((acc, t) => {
        const items = t.items || [];
        items.forEach(item => {
          if (item && item.waste_type_name) {
            if (!acc[item.waste_type_name]) {
              acc[item.waste_type_name] = { count: 0, weight: 0, amount: 0 };
            }
            acc[item.waste_type_name].count++;
            acc[item.waste_type_name].weight += item.weight || 0;
            acc[item.waste_type_name].amount += item.amount || 0;
          }
        });
        return acc;
      }, {} as Record<string, { count: number; weight: number; amount: number }>);

      // Group by seller
      const sellerStats = transactions.reduce((acc, t) => {
        const seller = t.seller || 'ไม่ระบุชื่อ';
        if (!acc[seller]) {
          acc[seller] = { count: 0, weight: 0, amount: 0 };
        }
        acc[seller].count++;
        acc[seller].weight += t.total_weight || 0;
        acc[seller].amount += t.total_amount || 0;
        return acc;
      }, {} as Record<string, { count: number; weight: number; amount: number }>);

      return {
        totalTransactions,
        totalAmount,
        totalWeight,
        wasteTypeStats,
        sellerStats
      };
    } catch (error) {
      console.error("Error getting statistics:", error);
      return {
        totalTransactions: 0,
        totalAmount: 0,
        totalWeight: 0,
        wasteTypeStats: {},
        sellerStats: {}
      };
    }
  }

  // Export all data
  async exportAllData() {
    try {
      const [transactions, wasteTypes, persons] = await Promise.all([
        this.getTransactions(),
        this.getWasteTypes(),
        this.getPersons()
      ]);

      return {
        transactions,
        wasteTypes,
        persons,
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error("Error exporting data:", error);
      return null;
    }
  }
}

export const supabaseStorage = new SupabaseStorage();