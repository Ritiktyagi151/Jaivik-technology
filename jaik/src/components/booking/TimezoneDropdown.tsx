"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { DEFAULT_TIMEZONE } from "@/lib/booking";

type TimezoneDropdownProps = {
  value: string;
  onChange: (timezone: string) => void;
};

function getTimezones() {
  const supported =
    typeof Intl !== "undefined" && "supportedValuesOf" in Intl
      ? (Intl.supportedValuesOf("timeZone") as string[])
      : [DEFAULT_TIMEZONE, "UTC", "America/New_York", "Europe/London", "Asia/Dubai"];

  return Array.from(new Set([DEFAULT_TIMEZONE, ...supported])).sort();
}

export default function TimezoneDropdown({ value, onChange }: TimezoneDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const timezones = useMemo(getTimezones, []);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return timezones;
    return timezones.filter((timezone) => timezone.toLowerCase().includes(normalized));
  }, [query, timezones]);

  return (
    <div className="relative mt-10">
      <label className="mb-2 block text-sm font-bold text-gray-900">Time zone</label>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-800 transition hover:border-[#006bff] focus:border-[#006bff] focus:outline-none focus:ring-2 focus:ring-[#006bff]/15"
      >
        <span className="truncate">{value || DEFAULT_TIMEZONE}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search timezone"
              className="h-10 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="mt-2 max-h-64 overflow-y-auto">
            {filtered.map((timezone) => (
              <button
                type="button"
                key={timezone}
                onClick={() => {
                  onChange(timezone);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-[#006bff]"
              >
                <span className="truncate">{timezone}</span>
                {timezone === value && <Check className="h-4 w-4 text-[#006bff]" />}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-gray-500">No timezone found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
