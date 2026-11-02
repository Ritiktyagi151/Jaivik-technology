import { Request, Response } from "express";
import { About } from "../models/about.model";
import { TrashEntry } from "../models/trash.model";

const getItemKey = (item: any, path: "stats" | "promoters"): string => {
  if (item?._id) return String(item._id);
  if (path === "stats" && item?.dataId) return `dataId:${item.dataId}`;
  if (path === "promoters" && (item?.name || item?.role)) {
    return `promoter:${item.name || ""}:${item.role || ""}`;
  }
  return JSON.stringify(item);
};

const removedItems = (before: any[] = [], after: any[] = [], path: "stats" | "promoters") => {
  const unmatched = [...after];
  const removed: Array<{ item: any; index: number }> = [];

  before.forEach((item, index) => {
    const key = getItemKey(item, path);
    const matchIndex = unmatched.findIndex((candidate) => getItemKey(candidate, path) === key);
    if (matchIndex === -1) removed.push({ item, index });
    else unmatched.splice(matchIndex, 1);
  });

  return removed;
};

// GET Data
export const getAboutContent = async (req: Request, res: Response) => {
  try {
    const content = await About.findOne();
    res.status(200).json(content || {}); 
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST/UPDATE Data (Handling Frontend's axios.post)
export const updateAboutContent = async (req: Request, res: Response) => {
  const createdTrashIds: unknown[] = [];
  try {
    const previous = await About.findOne().lean();
    const oldAbout = previous?.aboutPage as any;
    const newAbout = req.body?.aboutPage;

    if (previous && oldAbout && newAbout) {
      const removedStats = removedItems(
        oldAbout.stats?.stats || [],
        newAbout.stats?.stats || [],
        "stats"
      );
      const removedPromoters = removedItems(
        oldAbout.promoters || [],
        newAbout.promoters || [],
        "promoters"
      );

      for (const { item, index } of removedStats) {
        const entry = await TrashEntry.create({
          modelName: "AboutItem",
          label: `About Us · Statistic · ${item.label || item.value || "Untitled"}`,
          record: item,
          restoreMode: "about-item",
          parentId: String(previous._id),
          restorePath: "aboutPage.stats.stats",
          restoreIndex: index,
        });
        createdTrashIds.push(entry._id);
      }

      for (const { item, index } of removedPromoters) {
        const entry = await TrashEntry.create({
          modelName: "AboutItem",
          label: `About Us · Leader · ${item.name || "Untitled"}`,
          record: item,
          restoreMode: "about-item",
          parentId: String(previous._id),
          restorePath: "aboutPage.promoters",
          restoreIndex: index,
        });
        createdTrashIds.push(entry._id);
      }

      const oldParagraphs = oldAbout.aboutSection?.content || [];
      const newParagraphs = newAbout.aboutSection?.content || [];
      for (let index = 0; index < oldParagraphs.length; index += 1) {
        const value = oldParagraphs[index];
        if (typeof value === "string" && value.trim() && !String(newParagraphs[index] || "").trim()) {
          const entry = await TrashEntry.create({
            modelName: "AboutItem",
            label: `About Us · Paragraph ${index + 1}`,
            record: { value },
            restoreMode: "about-text",
            parentId: String(previous._id),
            restorePath: "aboutPage.aboutSection.content",
            restoreIndex: index,
          });
          createdTrashIds.push(entry._id);
        }
      }

      for (const section of ["mission", "vision"] as const) {
        const value = oldAbout.missionVision?.[section]?.content;
        const nextValue = newAbout.missionVision?.[section]?.content;
        if (typeof value === "string" && value.trim() && !String(nextValue || "").trim()) {
          const entry = await TrashEntry.create({
            modelName: "AboutItem",
            label: `About Us · ${section === "mission" ? "Mission" : "Vision"} content`,
            record: { value },
            restoreMode: "about-text",
            parentId: String(previous._id),
            restorePath: `aboutPage.missionVision.${section}.content`,
          });
          createdTrashIds.push(entry._id);
        }
      }

      const emptyableFields = [
        { path: "aboutPage.aboutSection.title", label: "About Us heading", value: oldAbout.aboutSection?.title, next: newAbout.aboutSection?.title },
        { path: "aboutPage.stats.title", label: "About Us statistics heading", value: oldAbout.stats?.title, next: newAbout.stats?.title },
        { path: "aboutPage.missionVision.mission.title", label: "Mission heading", value: oldAbout.missionVision?.mission?.title, next: newAbout.missionVision?.mission?.title },
        { path: "aboutPage.missionVision.vision.title", label: "Vision heading", value: oldAbout.missionVision?.vision?.title, next: newAbout.missionVision?.vision?.title },
      ];

      for (const field of emptyableFields) {
        if (typeof field.value === "string" && field.value.trim() && !String(field.next || "").trim()) {
          const entry = await TrashEntry.create({
            modelName: "AboutItem",
            label: `About Us · ${field.label}`,
            record: { value: field.value },
            restoreMode: "about-text",
            parentId: String(previous._id),
            restorePath: field.path,
          });
          createdTrashIds.push(entry._id);
        }
      }
    }

    const content = await About.findOneAndUpdate(
      {}, 
      req.body, 
      { 
        new: true, 
        upsert: true, 
        runValidators: false 
      }
    );

    res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: content
    });
  } catch (error: any) {
    if (createdTrashIds.length) {
      await TrashEntry.deleteMany({ _id: { $in: createdTrashIds } }).catch(() => undefined);
    }
    console.error("Save Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
