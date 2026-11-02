import { NextFunction, Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import { TrashEntry } from "../models/trash.model";

const getRecordLabel = (record: Record<string, any>): string =>
  record.title ||
  record.name ||
  record.draft?.title ||
  record.published?.title ||
  record.text ||
  record.slug ||
  record.url ||
  String(record._id);

export const moveToTrashBeforeDelete = (modelName: string): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model = mongoose.model(modelName);
      const record = await model.findById(req.params.id).lean();

      if (!record) {
        res.status(404).json({ success: false, message: "Record not found" });
        return;
      }

      const entry = await TrashEntry.create({
        modelName,
        label: getRecordLabel(record as Record<string, any>),
        record,
      });

      try {
        await model.findByIdAndDelete(req.params.id);
      } catch (error) {
        await entry.deleteOne();
        throw error;
      }

      res.status(200).json({
        success: true,
        message: "Moved to trash",
        trashId: entry._id,
      });
    } catch (error) {
      next(error);
    }
  };
