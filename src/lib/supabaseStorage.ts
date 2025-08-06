import { supabase } from "@/integrations/supabase/client";

// Type casting for our custom tables that aren't in the generated types yet
type SupabaseClient = typeof supabase;

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
      console.log("Saving transaction:", transaction);
      
      // Save main transaction
      const { data: transactionData, error: transactionError } = await (supabase as any)
        .from('transactions')
        .insert({
          receipt_number: transaction.receipt_number,
          date: transaction.date,
          time: transaction.time,
          seller_type: transaction.seller_type,
          seller: transaction.seller,
          total_weight: transaction.total_weight,
          total_amount: transaction.total_amount
        })
        .select()
        .single();

      if (transactionError) {
        console.error("Transaction save error:", transactionError);
        throw transactionError;
      }

      // Save transaction items
      const itemsToInsert = transaction.items.map(item => ({
        transaction_id: transactionData.id,
        waste_type_id: item.waste_type_id,
        waste_type_name: item.waste_type_name,
        weight: item.weight,
        price_per_unit: item.price_per_unit,
        amount: item.amount
      }));

      const { error: itemsError } = await (supabase as any)
        .from('transaction_items')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error("Transaction items save error:", itemsError);
        throw itemsError;
      }

      return {
        ...transactionData,
        items: transaction.items
      };
    } catch (error) {
      console.error("Error saving transaction:", error);
      return null;
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    try {
      const { data: transactions, error } = await (supabase as any)
        .from('transactions')
        .select(`
          *,
          transaction_items (
            waste_type_id,
            waste_type_name,
            weight,
            price_per_unit,
            amount
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error loading transactions:", error);
        return [];
      }

      return transactions?.map(transaction => ({
        id: transaction.id,
        receipt_number: transaction.receipt_number,
        date: transaction.date,
        time: transaction.time,
        seller_type: transaction.seller_type,
        seller: transaction.seller,
        items: transaction.transaction_items?.map((item: any) => ({
          waste_type_id: item.waste_type_id,
          waste_type_name: item.waste_type_name,
          weight: item.weight,
          price_per_unit: item.price_per_unit,
          amount: item.amount
        })) || [],
        total_weight: transaction.total_weight,
        total_amount: transaction.total_amount,
        created_at: transaction.created_at,
        updated_at: transaction.updated_at
      })) || [];
    } catch (error) {
      console.error("Error loading transactions:", error);
      return [];
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      // Delete transaction items first
      await (supabase as any)
        .from('transaction_items')
        .delete()
        .eq('transaction_id', id);

      // Delete transaction
      const { error } = await (supabase as any)
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting transaction:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return false;
    }
  }

  // Waste Type Management
  async getWasteTypes(): Promise<WasteType[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('waste_types')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error("Error loading waste types:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error loading waste types:", error);
      return [];
    }
  }

  async saveWasteType(wasteType: Omit<WasteType, 'id' | 'created_at' | 'updated_at'>): Promise<WasteType | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('waste_types')
        .insert(wasteType)
        .select()
        .single();

      if (error) {
        console.error("Error saving waste type:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error saving waste type:", error);
      return null;
    }
  }

  async updateWasteType(id: string, updates: Partial<WasteType>): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('waste_types')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error("Error updating waste type:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error updating waste type:", error);
      return false;
    }
  }

  async deleteWasteType(id: string): Promise<boolean> {
    try {
      const { error } = await (supabase as any)
        .from('waste_types')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        console.error("Error deleting waste type:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting waste type:", error);
      return false;
    }
  }

  // Person Management
  async getPersons(): Promise<Person[]> {
    try {
      const { data, error } = await (supabase as any)
        .from('persons')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error("Error loading persons:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error loading persons:", error);
      return [];
    }
  }

  async savePerson(person: Omit<Person, 'id' | 'created_at' | 'updated_at'>): Promise<Person | null> {
    try {
      const { data, error } = await (supabase as any)
        .from('persons')
        .insert(person)
        .select()
        .single();

      if (error) {
        console.error("Error saving person:", error);
        return null;
      }

      return data;
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