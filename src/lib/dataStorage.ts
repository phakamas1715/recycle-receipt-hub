// Data Storage และ Management System
export interface TransactionItem {
  wasteTypeId: string;
  wasteTypeName: string;
  weight: number;
  pricePerUnit: number;
  amount: number;
}

export interface Transaction {
  id: string;
  receiptNumber: string;
  date: string;
  time: string;
  sellerType: "department" | "person";
  seller: string;
  items: TransactionItem[];
  totalWeight: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WasteType {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  description?: string;
  greenStandard: boolean;
  hazardLevel: 'ต่ำ' | 'กลาง' | 'สูง';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Person {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class DataStorage {
  private readonly STORAGE_KEYS = {
    TRANSACTIONS: 'recycling_transactions',
    WASTE_TYPES: 'recycling_waste_types',
    DEPARTMENTS: 'recycling_departments',
    PERSONS: 'recycling_persons',
    SETTINGS: 'recycling_settings'
  };

  // Transaction Management
  saveTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
    const transactions = this.getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    transactions.push(newTransaction);
    localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return newTransaction;
  }

  getTransactions(): Transaction[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  }

  getTransactionById(id: string): Transaction | null {
    const transactions = this.getTransactions();
    return transactions.find(t => t.id === id) || null;
  }

  updateTransaction(id: string, updates: Partial<Transaction>): boolean {
    try {
      const transactions = this.getTransactions();
      const index = transactions.findIndex(t => t.id === id);
      if (index === -1) return false;

      transactions[index] = {
        ...transactions[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
      return true;
    } catch (error) {
      console.error('Error updating transaction:', error);
      return false;
    }
  }

  deleteTransaction(id: string): boolean {
    try {
      const transactions = this.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  }

  // Waste Types Management
  getWasteTypes(): WasteType[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.WASTE_TYPES);
      if (!data) {
        // Initialize with default waste types
        const defaultWasteTypes: WasteType[] = [
          { id: "1", name: "กระดาษ A4/หนังสือพิมพ์", price: 3.5, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - กระดาษ", greenStandard: true, hazardLevel: "ต่ำ", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "2", name: "พลาสติก PET ขวดน้ำ", price: 12, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - พลาสติก", greenStandard: true, hazardLevel: "ต่ำ", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "3", name: "กระป๋องอลูมิเนียม", price: 45, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - โลหะ", greenStandard: true, hazardLevel: "ต่ำ", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "4", name: "แก้วใส", price: 1.5, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - แก้ว", greenStandard: true, hazardLevel: "ต่ำ", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "5", name: "เหล็กเศษ", price: 8, unit: "กิโลกรัม", category: "ขยะรีไซเคิล - โลหะ", greenStandard: true, hazardLevel: "ต่ำ", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ];
        this.saveWasteTypes(defaultWasteTypes);
        return defaultWasteTypes;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading waste types:', error);
      return [];
    }
  }

  saveWasteTypes(wasteTypes: WasteType[]): void {
    localStorage.setItem(this.STORAGE_KEYS.WASTE_TYPES, JSON.stringify(wasteTypes));
  }

  saveWasteType(wasteType: WasteType): WasteType {
    const wasteTypes = this.getWasteTypes();
    const existingIndex = wasteTypes.findIndex(w => w.id === wasteType.id);
    
    const wasteTypeWithDefaults = {
      ...wasteType,
      isActive: wasteType.isActive ?? true,
      createdAt: wasteType.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
      wasteTypes[existingIndex] = wasteTypeWithDefaults;
    } else {
      wasteTypes.push(wasteTypeWithDefaults);
    }
    
    this.saveWasteTypes(wasteTypes);
    return wasteTypeWithDefaults;
  }

  updateWasteType(id: string, wasteType: WasteType): WasteType {
    const wasteTypes = this.getWasteTypes();
    const index = wasteTypes.findIndex(w => w.id === id);
    
    if (index >= 0) {
      wasteTypes[index] = {
        ...wasteType,
        updatedAt: new Date().toISOString()
      };
      this.saveWasteTypes(wasteTypes);
    }
    
    return wasteType;
  }

  deleteWasteType(id: string): boolean {
    const wasteTypes = this.getWasteTypes();
    const filteredWasteTypes = wasteTypes.filter(w => w.id !== id);
    
    if (filteredWasteTypes.length !== wasteTypes.length) {
      this.saveWasteTypes(filteredWasteTypes);
      return true;
    }
    
    return false;
  }

  addWasteType(wasteType: Omit<WasteType, 'id' | 'createdAt' | 'updatedAt'>): WasteType {
    const wasteTypes = this.getWasteTypes();
    const newWasteType: WasteType = {
      ...wasteType,
      id: `WT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    wasteTypes.push(newWasteType);
    this.saveWasteTypes(wasteTypes);
    return newWasteType;
  }

  // Departments Management
  getDepartments(): Department[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.DEPARTMENTS);
      if (!data) {
        // Initialize with default departments
        const defaultDepartments: Department[] = [
          { id: "1", name: "NSO - บริหารกลุ่มการพยาบาล", code: "NSO", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "2", name: "ER - งานการพยาบาลผู้ป่วยอุบัติเหตุฉุกเฉินและนิติเวช", code: "ER", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "3", name: "OR - งานการพยาบาลผู้ป่วยผ่าตัดและวิสัญญีพยาบาล", code: "OR", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "4", name: "LR - งานการพยาบาลผู้คลอด", code: "LR", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: "5", name: "งานการพยาบาลโรคไต", code: "KID", isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          // ... all 48 departments from your original list
        ];
        this.saveDepartments(defaultDepartments);
        return defaultDepartments;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading departments:', error);
      return [];
    }
  }

  saveDepartments(departments: Department[]): void {
    localStorage.setItem(this.STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }

  // Persons Management
  getPersons(): Person[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PERSONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading persons:', error);
      return [];
    }
  }

  savePersons(persons: Person[]): void {
    localStorage.setItem(this.STORAGE_KEYS.PERSONS, JSON.stringify(persons));
  }

  addPerson(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Person {
    const persons = this.getPersons();
    const newPerson: Person = {
      ...person,
      id: `PER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    persons.push(newPerson);
    this.savePersons(persons);
    return newPerson;
  }

  // Settings Management
  getSettings(): Record<string, any> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading settings:', error);
      return {};
    }
  }

  saveSetting(key: string, value: any): void {
    const settings = this.getSettings();
    settings[key] = value;
    localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  // Data Export/Import
  exportAllData(): {
    transactions: Transaction[];
    wasteTypes: WasteType[];
    departments: Department[];
    persons: Person[];
    settings: Record<string, any>;
    exportDate: string;
  } {
    return {
      transactions: this.getTransactions(),
      wasteTypes: this.getWasteTypes(),
      departments: this.getDepartments(),
      persons: this.getPersons(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    };
  }

  importData(data: any): boolean {
    try {
      if (data.transactions) {
        localStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
      }
      if (data.wasteTypes) {
        localStorage.setItem(this.STORAGE_KEYS.WASTE_TYPES, JSON.stringify(data.wasteTypes));
      }
      if (data.departments) {
        localStorage.setItem(this.STORAGE_KEYS.DEPARTMENTS, JSON.stringify(data.departments));
      }
      if (data.persons) {
        localStorage.setItem(this.STORAGE_KEYS.PERSONS, JSON.stringify(data.persons));
      }
      if (data.settings) {
        localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Statistics
  getStatistics() {
    const transactions = this.getTransactions();
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalWeight = transactions.reduce((sum, t) => sum + t.weight, 0);
    
    // Group by waste type
    const wasteTypeStats = transactions.reduce((acc, t) => {
      if (!acc[t.wasteType]) {
        acc[t.wasteType] = { count: 0, weight: 0, amount: 0 };
      }
      acc[t.wasteType].count++;
      acc[t.wasteType].weight += t.weight;
      acc[t.wasteType].amount += t.totalAmount;
      return acc;
    }, {} as Record<string, { count: number; weight: number; amount: number }>);

    // Group by seller
    const sellerStats = transactions.reduce((acc, t) => {
      if (!acc[t.seller]) {
        acc[t.seller] = { count: 0, weight: 0, amount: 0 };
      }
      acc[t.seller].count++;
      acc[t.seller].weight += t.weight;
      acc[t.seller].amount += t.totalAmount;
      return acc;
    }, {} as Record<string, { count: number; weight: number; amount: number }>);

    return {
      totalTransactions,
      totalAmount,
      totalWeight,
      averageAmount: totalTransactions > 0 ? totalAmount / totalTransactions : 0,
      averageWeight: totalTransactions > 0 ? totalWeight / totalTransactions : 0,
      wasteTypeStats,
      sellerStats
    };
  }
}

export const dataStorage = new DataStorage();