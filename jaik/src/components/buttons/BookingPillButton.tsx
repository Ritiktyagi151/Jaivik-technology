import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BookingPillButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">;

export default function BookingPillButton({
  href = "/book",
  children,
  className = "",
  ...props
}: BookingPillButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-red-500/60 bg-red-600 px-4 text-center text-xs font-extrabold uppercase leading-none text-white shadow-[0_0_18px_rgba(220,38,38,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-700 hover:shadow-[0_0_22px_rgba(239,68,68,0.35)] focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-black ${className}`}
      {...props}
    >
      <CalendarDays
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
      />
      {children ?? (
        <span className="whitespace-nowrap">
          Book a Call <span className="hidden xl:inline">(30 min)</span>
        </span>
      )}
    </Link>
  );
}
