import mongoose, { Schema, Document } from "mongoose";

export interface ITrashEntry extends Document {
  modelName: string;
  label: string;
  record: Record<string, unknown>;
  deletedAt: Date;
  restoreMode?: "document" | "about-item" | "about-text" | "footer-item";
  parentId?: string;
  restorePath?: string;
  restoreIndex?: number;
}

const trashSchema = new Schema<ITrashEntry>(
  {
    modelName: { type: String, required: true, index: true },
    label: { type: String, required: true },
    record: { type: Schema.Types.Mixed, required: true },
    deletedAt: { type: Date, default: Date.now, index: true },
    restoreMode: { type: String, enum: ["document", "about-item", "about-text", "footer-item"], default: "document" },
    parentId: { type: String },
    restorePath: { type: String },
    restoreIndex: { type: Number },
  },
  { timestamps: true }
);

export const TrashEntry = mongoose.model<ITrashEntry>("TrashEntry", trashSchema);
