// src/models/Navbar.ts
import mongoose, { Schema, Document } from "mongoose";

export interface SubMenuItem {
  text: string;
  href: string;
  img?: string;
}

export interface NavMenu {
  title: string; // e.g. "Software Development"
  href: string; // parent link
  items: SubMenuItem[]; // dropdown items
}

export interface NavLink {
  name: string; // e.g. "About Us"
  href: string; // e.g. "/about"
}

export interface SocialLink {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface NavbarDoc extends Document {
  topLinks: NavLink[]; // Top bar navlinks
  menus: NavMenu[]; // Dropdown menus (software, website, seo…)
  extraLinks: NavLink[]; // Footer-level links like "Career", "Blogs"
  socials: SocialLink; // Social icons
  logoUrl: string;
}

const SubMenuSchema = new Schema<SubMenuItem>(
  {
    text: { type: String, required: true },
    href: { type: String, required: true },
    img: String,
  },
  { _id: false }
);

const NavMenuSchema = new Schema<NavMenu>(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
    items: [SubMenuSchema],
  },
  { _id: false }
);

const NavLinkSchema = new Schema<NavLink>(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
);

const NavbarSchema = new Schema<NavbarDoc>(
  {
    topLinks: [NavLinkSchema],
    menus: [NavMenuSchema],
    extraLinks: [NavLinkSchema],
    socials: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      youtube: String,
    },
    logoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<NavbarDoc>("Navbar", NavbarSchema);
