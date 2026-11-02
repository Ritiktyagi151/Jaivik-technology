import { Request, Response } from "express";
import MobileApp from "../models/mobileApp.model";
import { asyncHandler } from "../utils/asyncHandler";

// @desc    Get all apps
// @route   GET /api/mobile-apps
// @access  Public
export const getMobileApps = asyncHandler(
  async (req: Request, res: Response) => {
    const { platform, isActive } = req.query;
    const filter: any = {};
    if (platform) filter.platform = platform;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const apps = await MobileApp.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: apps.length, data: apps });
  }
);

// @desc    Get featured apps
// @route   GET /api/mobile-apps/featured
// @access  Public
export const getFeaturedMobileApps = asyncHandler(
  async (req: Request, res: Response) => {
    const apps = await MobileApp.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, count: apps.length, data: apps });
  }
);

// @desc    Get single app
// @route   GET /api/mobile-apps/:id
// @access  Public
export const getMobileApp = asyncHandler(
  async (req: Request, res: Response) => {
    const app = await MobileApp.findById(req.params.id);
    if (!app) {
      res.status(404);
      throw new Error("Mobile app not found");
    }
    res.status(200).json({ success: true, data: app });
  }
);

// @desc    Create new app
// @route   POST /api/mobile-apps
// @access  Private/Admin
export const createMobileApp = asyncHandler(
  async (req: Request, res: Response) => {
    const app = await MobileApp.create(req.body);
    res.status(201).json({ success: true, data: app });
  }
);

// @desc    Update app
// @route   PUT /api/mobile-apps/:id
// @access  Private/Admin
export const updateMobileApp = asyncHandler(
  async (req: Request, res: Response) => {
    let app = await MobileApp.findById(req.params.id);
    if (!app) {
      res.status(404);
      throw new Error("Mobile app not found");
    }
    app = await MobileApp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: app });
  }
);

// @desc    Delete app
// @route   DELETE /api/mobile-apps/:id
// @access  Private/Admin
export const deleteMobileApp = asyncHandler(
  async (req: Request, res: Response) => {
    const app = await MobileApp.findById(req.params.id);
    if (!app) {
      res.status(404);
      throw new Error("Mobile app not found");
    }
    await app.deleteOne();
    res.status(200).json({ success: true, data: {} });
  }
);

// @desc    Update app order
// @route   PATCH /api/mobile-apps/order
// @access  Private/Admin
export const updateMobileAppOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { mobileApps } = req.body;
    if (!Array.isArray(mobileApps)) {
      res.status(400);
      throw new Error("Mobile apps must be an array");
    }
    const updatePromises = mobileApps.map(
      (app: { id: string; order: number }) =>
        MobileApp.findByIdAndUpdate(app.id, { order: app.order }, { new: true })
    );
    await Promise.all(updatePromises);
    const updated = await MobileApp.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: updated });
  }
);
