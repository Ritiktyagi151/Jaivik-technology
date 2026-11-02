import { Request, Response } from "express";
import mongoose from "mongoose";
import { TrashEntry } from "../models/trash.model";
import { About } from "../models/about.model";
import Footer from "../models/footer.model";

export const listTrash = async (_req: Request, res: Response): Promise<void> => {
  try {
    const entries = await TrashEntry.find()
      .select("modelName label deletedAt")
      .sort({ deletedAt: -1 })
      .lean();
    res.json({ success: true, data: entries });
  } catch {
    res.status(500).json({ success: false, message: "Could not load trash" });
  }
};

export const restoreTrashEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const entry = await TrashEntry.findById(req.params.id);
    if (!entry) {
      res.status(404).json({ success: false, message: "Trash item not found" });
      return;
    }

    if (entry.restoreMode === "about-item" || entry.restoreMode === "about-text") {
      const restorePaths = new Set([
        "aboutPage.stats.stats",
        "aboutPage.promoters",
        "aboutPage.aboutSection.content",
        "aboutPage.missionVision.mission.content",
        "aboutPage.missionVision.vision.content",
        "aboutPage.aboutSection.title",
        "aboutPage.stats.title",
        "aboutPage.missionVision.mission.title",
        "aboutPage.missionVision.vision.title",
      ]);
      if (!entry.parentId || !entry.restorePath || !restorePaths.has(entry.restorePath)) {
        res.status(400).json({ success: false, message: "About item restore details are invalid" });
        return;
      }

      const update: Record<string, unknown> = entry.restoreMode === "about-text"
        ? {
            $set: {
              [entry.restoreIndex === undefined
                ? entry.restorePath
                : `${entry.restorePath}.${entry.restoreIndex}`]: entry.record.value,
            },
          }
        : {
            $push: {
              [entry.restorePath]: {
                $each: [entry.record],
                $position: Math.max(0, entry.restoreIndex || 0),
              },
            },
          };
      const result = await About.updateOne({ _id: entry.parentId }, update);
      if (!result.matchedCount) {
        res.status(404).json({ success: false, message: "Original About Us content was not found" });
        return;
      }
    } else if (entry.restoreMode === "footer-item") {
      const restorePaths = new Set(["contacts.offices", "contacts.phones"]);
      if (!entry.parentId || !entry.restorePath || !restorePaths.has(entry.restorePath)) {
        res.status(400).json({ success: false, message: "Footer item restore details are invalid" });
        return;
      }

      const value = entry.restorePath === "contacts.phones" ? entry.record.value : entry.record;
      const result = await Footer.updateOne(
        { _id: entry.parentId },
        {
          $push: {
            [entry.restorePath]: {
              $each: [value],
              $position: Math.max(0, entry.restoreIndex || 0),
            },
          },
        }
      );
      if (!result.matchedCount) {
        res.status(404).json({ success: false, message: "Original footer was not found" });
        return;
      }
    } else {
      const model = mongoose.models[entry.modelName];
      if (!model) {
        res.status(400).json({ success: false, message: "Original content type is unavailable" });
        return;
      }
      await model.create(entry.record);
    }
    await entry.deleteOne();
    res.json({ success: true, message: "Item restored" });
  } catch (error: any) {
    if (error?.code === 11000) {
      res.status(409).json({ success: false, message: "A conflicting record already exists" });
      return;
    }
    res.status(500).json({ success: false, message: "Could not restore item" });
  }
};

export const permanentlyDeleteTrashEntry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entry = await TrashEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      res.status(404).json({ success: false, message: "Trash item not found" });
      return;
    }
    res.json({ success: true, message: "Item permanently deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Could not permanently delete item" });
  }
};
