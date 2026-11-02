"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink: React.FC<{
  to: string;
  name: string;
}> = ({ to = "", name = "" }) => {
  const pathname = usePathname();

  return (
    <Link
      href={to}
      className={`whitespace-nowrap uppercase text-[12px] px-2.5 transition-all duration-300 py-1 ${
        pathname === to ? "text-red-500" : "text-white hover:text-red-500"
      }`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
