import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertHybridSaleSchema, insertParticipationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all hybrid sales
  app.get("/api/hybrid-sales", async (req, res) => {
    try {
      const sales = await storage.getHybridSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hybrid sales" });
    }
  });

  // Get specific hybrid sale
  app.get("/api/hybrid-sales/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await storage.getHybridSale(id);
      
      if (!sale) {
        return res.status(404).json({ message: "Hybrid sale not found" });
      }
      
      res.json(sale);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hybrid sale" });
    }
  });

  // Create new hybrid sale
  app.post("/api/hybrid-sales", async (req, res) => {
    try {
      const result = insertHybridSaleSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const validatedData = result.data;
      const sale = await storage.createHybridSale(validatedData);
      res.status(201).json(sale);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid sale data" });
    }
  });

  // Get participations for a sale
  app.get("/api/hybrid-sales/:id/participations", async (req, res) => {
    try {
      const { id } = req.params;
      const participations = await storage.getSaleParticipations(id);
      res.json(participations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch participations" });
    }
  });

  // Create new participation
  app.post("/api/hybrid-sales/:id/participations", async (req, res) => {
    try {
      const { id: saleId } = req.params;
      const result = insertParticipationSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const validatedData = result.data;
      
      // Check if sale exists
      const sale = await storage.getHybridSale(saleId);
      if (!sale) {
        return res.status(404).json({ message: "Hybrid sale not found" });
      }
      
      const participationData = { ...validatedData, saleId };
      const participation = await storage.createParticipation(participationData);
      
      res.status(201).json(participation);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid participation data" });
    }
  });

  // User management endpoints
  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const { email, walletAddress } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.json(existingUser);
      }
      
      const user = await storage.createUser({ email, walletAddress });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
