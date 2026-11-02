import { Request, Response } from "express";
import { Client } from "../models/client.model";

// ✅ GET ALL CLIENTS
export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: clients });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ CREATE CLIENT
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, website, status, order, logo } = req.body;
    let logoPath = req.file ? `/uploads/${req.file.filename}` : logo;

    if (!logoPath) {
      res.status(400).json({ success: false, message: "Logo is required" });
      return; // ✅ Added return to fix TS7030
    }

    const client = await Client.create({
      name,
      logo: logoPath,
      website,
      status: status || "active",
      order: Number(order) || 0,
    });

    res.status(201).json({ success: true, data: client });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE CLIENT
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Client not found" });
      return;
    }
    res.json({ success: true, message: "Deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE CLIENT
export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.logo = `/uploads/${req.file.filename}`;

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!client) {
      res.status(404).json({ success: false, message: "Client not found" });
      return;
    }

    res.json({ success: true, data: client });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};