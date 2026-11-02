"use client";

import { useState } from "react";
import type navmenuInterface from "../../interfaces/navmenuInterface";
import Link from "next/link";

const NavMenu: React.FC<navmenuInterface> = ({
  title = "",
  menu = [],
  href = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="group text-uppercase shrink-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <Link
        href={href}
        aria-haspopup={menu.length > 0 ? "true" : undefined}
        aria-expanded={menu.length > 0 ? isOpen : undefined}
        onClick={(event) => {
          if (menu.length > 0 && window.matchMedia("(hover: none)").matches) {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
        className="flex items-center whitespace-nowrap px-[clamp(0.28rem,0.42vw,0.625rem)] py-2.5 font-semibold uppercase text-white transition-colors duration-300 hover:text-red-500"
      >
        {title}
      </Link>
      {menu.length > 0 && (
        <div className={`absolute left-4 right-4 top-full z-[100] transition-opacity duration-200 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 rounded-md bg-main-secondary/85 p-5 shadow-lg backdrop-blur-md">
            {menu.map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href as string}
                className="container-img group/item relative block overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-full rounded-md shadow-lg transition-transform duration-300 group-hover/item:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={260}
                  height={150}
                />
                <div className="image-text absolute left-0 right-0 top-0 px-1 py-1 text-center text-sm font-medium text-white transition-all duration-300">
                  {item.text}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

export default NavMenu;
