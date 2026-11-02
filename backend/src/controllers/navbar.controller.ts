// src/controllers/navbar.controller.ts
import { Request, Response } from "express";
import Navbar from "../models/navbar.model";

// GET Navbar
export const getNavbar = async (req: Request, res: Response) => {
  try {
    const navbar = await Navbar.findOne();
    return res.json(navbar ?? {});
  } catch (err) {
    return res.status(500).json({ message: "Error fetching navbar" });
  }
};

// POST Navbar (create or update)
export const saveNavbar = async (req: Request, res: Response) => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = new Navbar(req.body);
    } else {
      navbar.set(req.body);
    }
    await navbar.save();
    return res.json(navbar);
  } catch (err) {
    return res.status(400).json({ message: "Error saving navbar", error: err });
  }
};
