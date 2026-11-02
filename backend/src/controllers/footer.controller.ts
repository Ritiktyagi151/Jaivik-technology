import { Request, Response } from "express";
import Footer from "../models/footer.model";
import { TrashEntry } from "../models/trash.model";

const getRemovedItems = (before: any[] = [], after: any[] = [], keyOf: (value: any) => string) => {
  const unmatched = [...after];
  const removed: Array<{ item: any; index: number }> = [];
  before.forEach((item, index) => {
    const matchIndex = unmatched.findIndex((candidate) => keyOf(candidate) === keyOf(item));
    if (matchIndex === -1) removed.push({ item, index });
    else unmatched.splice(matchIndex, 1);
  });
  return removed;
};

// READ: Data fetch karne ke liye
export const getFooter = async (req: Request, res: Response) => {
  try {
    const footer = await Footer.findOne();
    // Agar DB khali hai toh default empty object bhejien taaki frontend crash na ho
    return res.status(200).json(footer || {
      description: "",
      socials: {},
      contacts: { offices: [], email: "", phones: [] },
      copyright: ""
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching footer data" });
  }
};

// UPDATE/CREATE: Full CRUD Support
export const saveFooter = async (req: Request, res: Response) => {
  const createdTrashIds: unknown[] = [];
  try {
    let footer = await Footer.findOne();

    if (footer) {
      const previousOffices = footer.contacts?.offices || [];
      const nextOffices = req.body.contacts?.offices || [];
      const previousPhones = footer.contacts?.phones || [];
      const nextPhones = req.body.contacts?.phones || [];

      const removedOffices = getRemovedItems(
        previousOffices,
        nextOffices,
        (office) => `${office.label || ""}:${office.address || ""}`
      );
      const removedPhones = getRemovedItems(
        previousPhones,
        nextPhones,
        (phone) => String(phone)
      );

      for (const { item, index } of removedOffices) {
        const entry = await TrashEntry.create({
          modelName: "FooterItem",
          label: `Footer · Office · ${item.label || item.address || "Untitled"}`,
          record: item,
          restoreMode: "footer-item",
          parentId: String(footer._id),
          restorePath: "contacts.offices",
          restoreIndex: index,
        });
        createdTrashIds.push(entry._id);
      }

      for (const { item, index } of removedPhones) {
        const entry = await TrashEntry.create({
          modelName: "FooterItem",
          label: `Footer · Phone · ${item}`,
          record: { value: item },
          restoreMode: "footer-item",
          parentId: String(footer._id),
          restorePath: "contacts.phones",
          restoreIndex: index,
        });
        createdTrashIds.push(entry._id);
      }
    }
    
    // Frontend se poora object tempData ke roop mein aayega
    const updateData = {
      description: req.body.description,
      socials: req.body.socials,
      contacts: req.body.contacts, // Dynamic Offices aur Phones isme honge
      copyright: req.body.copyright
    };

    if (!footer) {
      footer = new Footer(updateData);
    } else {
      // Existing data ko update karein
      footer.set(updateData);
    }

    const savedFooter = await footer.save();
    return res.status(200).json({ 
      success: true, 
      message: "Footer updated successfully", 
      data: savedFooter 
    });
  } catch (err: any) {
    if (createdTrashIds.length) {
      await TrashEntry.deleteMany({ _id: { $in: createdTrashIds } }).catch(() => undefined);
    }
    return res.status(400).json({ 
      success: false, 
      message: "Save failed", 
      error: err.message 
    });
  }
};
