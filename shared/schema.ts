import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hybridSales = pgTable("hybrid_sales", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").notNull().references(() => users.id),
  contractAddress: text("contract_address").notNull(),
  tokenId: text("token_id").notNull(),
  network: text("network").notNull(),
  minimumPrice: decimal("minimum_price", { precision: 18, scale: 8 }).notNull(),
  saleStartDate: timestamp("sale_start_date").notNull(),
  saleEndDate: timestamp("sale_end_date").notNull(),
  paymentAddress: text("payment_address").notNull(),
  paymentCurrency: text("payment_currency").notNull().default("ETH"),
  totalRaised: decimal("total_raised", { precision: 18, scale: 8 }).default("0"),
  isActive: boolean("is_active").default(true),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const saleParticipations = pgTable("sale_participations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  saleId: varchar("sale_id").notNull().references(() => hybridSales.id),
  participantId: varchar("participant_id").notNull().references(() => users.id),
  contributionAmount: decimal("contribution_amount", { precision: 18, scale: 8 }).notNull(),
  fractionalShares: decimal("fractional_shares", { precision: 18, scale: 8 }),
  transactionHash: text("transaction_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  walletAddress: true,
});

export const insertHybridSaleSchema = createInsertSchema(hybridSales).omit({
  id: true,
  totalRaised: true,
  isActive: true,
  isCompleted: true,
  createdAt: true,
}).extend({
  minimumPrice: z.string().min(1, "Minimum price is required"),
  saleStartDate: z.string().min(1, "Start date is required"),
  saleEndDate: z.string().min(1, "End date is required"),
});

export const insertParticipationSchema = createInsertSchema(saleParticipations).omit({
  id: true,
  fractionalShares: true,
  transactionHash: true,
  createdAt: true,
}).extend({
  contributionAmount: z.string().min(1, "Contribution amount is required"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type HybridSale = typeof hybridSales.$inferSelect;
export type InsertHybridSale = z.infer<typeof insertHybridSaleSchema>;
export type SaleParticipation = typeof saleParticipations.$inferSelect;
export type InsertParticipation = z.infer<typeof insertParticipationSchema>;
