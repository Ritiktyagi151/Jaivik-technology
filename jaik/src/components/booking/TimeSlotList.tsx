"use client";

import { useRouter } from "next/navigation";
import { createTimeSlots, isPastTimeSlot, timeToLabel } from "@/lib/booking";

type TimeSlotListProps = {
  selectedDate: string;
  selectedTime: string;
  timezone: string;
  onSelectTime: (time: string) => void;
};

const slots = createTimeSlots();

export default function TimeSlotList({
  selectedDate,
  selectedTime,
  timezone,
  onSelectTime,
}: TimeSlotListProps) {
  const router = useRouter();

  const goNext = () => {
    const params = new URLSearchParams({
      date: selectedDate,
      time: selectedTime,
      timezone,
    });
    router.push(`/book/details?${params.toString()}`);
  };

  return (
    <aside className="h-full border-t border-gray-200 p-6 lg:border-l lg:border-t-0">
      <p className="mb-4 text-sm font-bold text-gray-950">Available times</p>
      <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
        {slots.map((slot) => {
          const selected = selectedTime === slot;
          const disabled = isPastTimeSlot(selectedDate, slot);

          if (selected) {
            return (
              <div key={slot} className="grid grid-cols-[1fr_auto] gap-2">
                <button
                  type="button"
                  onClick={() => onSelectTime(slot)}
                  className="min-h-12 rounded-lg bg-gray-600 px-4 text-sm font-bold text-white"
                >
                  {timeToLabel(slot)}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="min-h-12 rounded-lg bg-[#006bff] px-5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            );
          }

          return (
            <button
              type="button"
              key={slot}
              disabled={disabled}
              onClick={() => onSelectTime(slot)}
              className={`min-h-12 w-full rounded-lg border px-4 text-sm font-bold transition ${
                disabled
                  ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
                  : "border-[#006bff] bg-white text-[#006bff] hover:border-blue-700 hover:bg-blue-50"
              }`}
            >
              {timeToLabel(slot)}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
