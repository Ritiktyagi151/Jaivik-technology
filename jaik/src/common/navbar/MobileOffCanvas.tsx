"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  digitalMarketingItems,
  filmProductionItems,
  seoServiceItems,
  softwareDevelopmentItems,
  websiteDevelopmentItems,
} from "../../configs/navConfigs";

type MobileOffCanvasProps = {
  expandedMenus: Record<string, boolean>;
  toggleOffCanvas: () => void;
  toggleSubmenu: (menuKey: string) => void;
};

const renderMenuItems = (
  items: typeof softwareDevelopmentItems,
  toggleOffCanvas: () => void
) =>
  items.map((item, index) => (
    <li key={index} className="my-1">
      <Link
        href={item.href}
        className="block rounded-lg bg-gray-900/70 p-3 transition-colors duration-200 hover:bg-gray-800"
        onClick={toggleOffCanvas}
      >
        <div className="flex items-center space-x-3">
          <img
            src={item.img}
            alt={item.text}
            className="h-12 w-12 rounded-md object-cover"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
          />
          <span className="text-sm font-medium text-gray-200">{item.text}</span>
        </div>
      </Link>
    </li>
  ));

const MobileSubmenu = ({
  id,
  title,
  items,
  expandedMenus,
  toggleSubmenu,
  toggleOffCanvas,
}: {
  id: string;
  title: string;
  items: typeof softwareDevelopmentItems;
  expandedMenus: Record<string, boolean>;
  toggleSubmenu: (menuKey: string) => void;
  toggleOffCanvas: () => void;
}) => (
  <li>
    <button
      onClick={() => toggleSubmenu(id)}
      className="menu-item-with-arrow my-1 w-full rounded-lg bg-gray-800/50 px-4 py-2 text-left text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
    >
      {title}
      <span
        aria-hidden="true"
        className={`menu-arrow ${expandedMenus[id] ? "expanded" : ""}`}
      >
        v
      </span>
    </button>
    <ul className={`sub-menu pl-4 ${expandedMenus[id] ? "expanded" : ""}`}>
      {renderMenuItems(items, toggleOffCanvas)}
    </ul>
  </li>
);

const MobileOffCanvas = ({
  expandedMenus,
  toggleOffCanvas,
  toggleSubmenu,
}: MobileOffCanvasProps) => {
  return (
    <>
      <div
        className="offcanvas-overlay fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleOffCanvas}
      />

      <div
        id="offcanvas-mobile-menu"
        className="offcanvas offcanvas-mobile-menu fixed left-0 top-0 z-[1000] h-full w-[350px] translate-x-0 transform overflow-y-auto bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-transform duration-500 sm:w-[320px] md:w-[350px] customScroll"
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <p className="text-lg font-bold text-red-500">Menu</p>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
            onClick={toggleOffCanvas}
            aria-label="Close menu"
          >
            <span aria-hidden="true" className="text-sm font-bold leading-none">
              X
            </span>
          </button>
        </div>

        <div className="inner flex flex-col customScroll">
          <div className="offcanvas-menu flex-1 p-4">
            <ul className="m-0 list-none space-y-1 p-0">
              <li>
                <Link
                  href="/"
                  className="block rounded-lg border-b border-gray-700/50 px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800 hover:text-red-400"
                  onClick={toggleOffCanvas}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block rounded-lg border-b border-gray-700/50 px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800 hover:text-red-400"
                  onClick={toggleOffCanvas}
                >
                  About Us
                </Link>
              </li>

              <li>
                <button
                  onClick={() => toggleSubmenu("services")}
                  className="menu-item-with-arrow w-full rounded-lg border-b border-gray-700/50 px-4 py-3 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800 hover:text-red-400"
                >
                  Services
                  <span
                    aria-hidden="true"
                    className={`menu-arrow ${
                      expandedMenus.services ? "expanded" : ""
                    }`}
                  >
                    v
                  </span>
                </button>

                <div
                  className={`sub-menu pl-4 ${
                    expandedMenus.services ? "expanded" : ""
                  } customScroll`}
                  style={{
                    maxHeight: expandedMenus.services ? "300px" : "0",
                    overflowY: "auto",
                  }}
                >
                  <ul>
                    <MobileSubmenu
                      id="software"
                      title="Software Development"
                      items={softwareDevelopmentItems}
                      expandedMenus={expandedMenus}
                      toggleSubmenu={toggleSubmenu}
                      toggleOffCanvas={toggleOffCanvas}
                    />
                    <MobileSubmenu
                      id="website"
                      title="Website Development"
                      items={websiteDevelopmentItems}
                      expandedMenus={expandedMenus}
                      toggleSubmenu={toggleSubmenu}
                      toggleOffCanvas={toggleOffCanvas}
                    />
                    <MobileSubmenu
                      id="digital"
                      title="Digital Marketing"
                      items={digitalMarketingItems}
                      expandedMenus={expandedMenus}
                      toggleSubmenu={toggleSubmenu}
                      toggleOffCanvas={toggleOffCanvas}
                    />
                    <MobileSubmenu
                      id="seo"
                      title="Google SEO Services"
                      items={seoServiceItems}
                      expandedMenus={expandedMenus}
                      toggleSubmenu={toggleSubmenu}
                      toggleOffCanvas={toggleOffCanvas}
                    />
                    <MobileSubmenu
                      id="film"
                      title="Film Production"
                      items={filmProductionItems}
                      expandedMenus={expandedMenus}
                      toggleSubmenu={toggleSubmenu}
                      toggleOffCanvas={toggleOffCanvas}
                    />
                  </ul>
                </div>
              </li>

              {[
                ["Our Blogs", "/blogs"],
                ["Contact", "/contact-us"],
                ["Book a call with us (30 Minute Meeting)", "/book"],
                ["Career", "/careers"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-lg border-b border-gray-700/50 px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800 hover:text-red-400"
                    onClick={toggleOffCanvas}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-700 p-4">
            <p className="mb-3 text-center text-sm font-semibold text-gray-400">
              Follow Us
            </p>
            <ul className="flex justify-center space-x-3">
              {[
                {
                  label: "Facebook",
                  href: "",
                  className: "bg-blue-600 hover:bg-blue-700",
                  icon: <FaFacebookF aria-hidden="true" />,
                },
                {
                  label: "X",
                  href: "",
                  className: "bg-neutral-800 hover:bg-neutral-700",
                  icon: <FaXTwitter aria-hidden="true" />,
                },
                {
                  label: "Instagram",
                  href: "",
                  className: "bg-pink-500 hover:bg-pink-600",
                  icon: <FaInstagram aria-hidden="true" />,
                },
              ].map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    className={`${social.className} flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Jaivik Technology on ${social.label}`}
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileOffCanvas;
