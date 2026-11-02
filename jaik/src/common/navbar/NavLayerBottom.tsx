import Link from "next/link";
import {
  digitalMarketingItems,
  filmProductionItems,
  seoServiceItems,
  softwareDevelopmentItems,
  websiteDevelopmentItems,
} from "../../configs/navConfigs";
import type navmenuInterface from "../../interfaces/navmenuInterface";
import NavMenu from "./NavMenu";
import BookingPillButton from "@/components/buttons/BookingPillButton";

// 🔑 Import your LanguageSelector (flag-based)
import LanguageSelector from "./LanguageSelector"; // <-- path correct

const NavLayerBottom: React.FC<{
  isSticky: boolean;
}> = ({ isSticky = false }) => {
  const dropdowns: navmenuInterface[] = [
    {
      title: "Software Development",
      menu: softwareDevelopmentItems,
      href: "/cusotmized-software", // typo fixed
    },
    {
      title: "Website Development",
      menu: websiteDevelopmentItems,
      href: "/website-development-company",
    },
    {
      title: "Digital Marketing",
      menu: digitalMarketingItems,
      href: "/digital-marketing-agency-in-india",
    },
    {
      title: "google SEO Services",
      menu: seoServiceItems,
      href: "/seo-services-in-india",
    },
    {
      title: "Film Production",
      menu: filmProductionItems,
      href: "/film-production",
    },
  ];

  return (
    <>
      <div
        className={`header-main relative transition-all shadow-xs shadow-neutral-950 duration-300 font-poppins ${
          isSticky ? "shadow-md bg-gray-900" : ""
        }`}
        style={
          isSticky
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 99,
                animation: "sticky 0.3s ease-out",
              }
            : undefined
        }
      >
        <div className="laptop-view flex w-full items-center justify-between gap-3 px-3 py-2 xl:px-4">
          {/* Left - Logo + Menus */}
          <div className="main-menu flex min-w-0 flex-1 items-center gap-2">
            <div className="w-[92px] shrink-0 pt-1 lg:w-[105px] xl:w-[130px]">
              <Link href="/">
                <img
                  src="/Jaivik-logo.webp"
                  alt="Logo"
                  className="w-full"
                  width={130}
                  height={45}
                  decoding="async"
                  fetchPriority="high"
                />
              </Link>
            </div>
            <ul className="flex min-w-0 flex-1 list-none flex-nowrap items-center justify-start text-[clamp(11px,0.86vw,16px)]">
              {dropdowns.map((item, index) => (
                <NavMenu key={index} {...item} />
              ))}
            </ul>
          </div>

          {/* Right - Language Selector with flags */}
          <ul className="relative flex shrink-0 list-none items-center gap-2">
            <li>
              <BookingPillButton className="h-9 px-2 text-[10px] xl:px-4 xl:text-[11px]" />
            </li>
            <li className="ml-auto">
              <LanguageSelector />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavLayerBottom;
