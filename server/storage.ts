import { type User, type InsertUser, type HybridSale, type InsertHybridSale, type SaleParticipation, type InsertParticipation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getHybridSale(id: string): Promise<HybridSale | undefined>;
  getHybridSales(): Promise<HybridSale[]>;
  createHybridSale(sale: InsertHybridSale): Promise<HybridSale>;
  updateHybridSale(id: string, updates: Partial<HybridSale>): Promise<HybridSale | undefined>;
  
  getSaleParticipations(saleId: string): Promise<SaleParticipation[]>;
  createParticipation(participation: InsertParticipation): Promise<SaleParticipation>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private hybridSales: Map<string, HybridSale>;
  private participations: Map<string, SaleParticipation>;

  constructor() {
    this.users = new Map();
    this.hybridSales = new Map();
    this.participations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      walletAddress: insertUser.walletAddress || null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getHybridSale(id: string): Promise<HybridSale | undefined> {
    return this.hybridSales.get(id);
  }

  async getHybridSales(): Promise<HybridSale[]> {
    return Array.from(this.hybridSales.values());
  }

  async createHybridSale(insertSale: InsertHybridSale): Promise<HybridSale> {
    const id = randomUUID();
    const sale: HybridSale = {
      ...insertSale,
      id,
      totalRaised: "0",
      isActive: true,
      isCompleted: false,
      createdAt: new Date(),
      saleStartDate: new Date(insertSale.saleStartDate),
      saleEndDate: new Date(insertSale.saleEndDate),
      paymentCurrency: insertSale.paymentCurrency || "ETH",
    };
    this.hybridSales.set(id, sale);
    return sale;
  }

  async updateHybridSale(id: string, updates: Partial<HybridSale>): Promise<HybridSale | undefined> {
    const existing = this.hybridSales.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.hybridSales.set(id, updated);
    return updated;
  }

  async getSaleParticipations(saleId: string): Promise<SaleParticipation[]> {
    return Array.from(this.participations.values()).filter(
      (participation) => participation.saleId === saleId
    );
  }

  async createParticipation(insertParticipation: InsertParticipation): Promise<SaleParticipation> {
    const id = randomUUID();
    const participation: SaleParticipation = {
      ...insertParticipation,
      id,
      fractionalShares: null,
      transactionHash: null,
      createdAt: new Date(),
    };
    this.participations.set(id, participation);
    return participation;
  }
}

export const storage = new MemStorage();
