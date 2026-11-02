"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatMonthTitle,
  isPastDate,
  parseDateKey,
  toDateKey,
} from "@/lib/booking";

type CalendarPickerProps = {
  selectedDate: string;
  onSelectDate: (dateKey: string) => void;
  visibleMonth: Date;
  onChangeMonth: (date: Date) => void;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPicker({
  selectedDate,
  onSelectDate,
  visibleMonth,
  onChangeMonth,
}: CalendarPickerProps) {
  const todayKey = toDateKey(new Date());
  const selectedKey = selectedDate || todayKey;
  const monthStart = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();
  const mondayOffset = (monthStart.getDay() + 6) % 7;
  const cells = Array.from({ length: mondayOffset + daysInMonth }, (_, index) => {
    if (index < mondayOffset) return null;
    return new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - mondayOffset + 1);
  });

  const changeMonth = (amount: number) => {
    onChangeMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1));
  };

  return (
    <section>
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-950">{formatMonthTitle(visibleMonth)}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase text-gray-500">
        {weekDays.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const dateKey = toDateKey(date);
          const disabled = isPastDate(date);
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedKey;

          return (
            <button
              type="button"
              key={dateKey}
              disabled={disabled}
              onClick={() => onSelectDate(dateKey)}
              className={`aspect-square rounded-full text-sm font-bold transition ${
                isSelected
                  ? "bg-[#006bff] text-white shadow-md shadow-blue-500/25"
                  : isToday
                  ? "bg-blue-50 text-[#006bff] ring-1 ring-[#006bff]/25"
                  : "text-gray-800 hover:bg-gray-100"
              } ${disabled ? "cursor-not-allowed text-gray-300 hover:bg-transparent" : ""}`}
              aria-label={parseDateKey(dateKey).toDateString()}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}
