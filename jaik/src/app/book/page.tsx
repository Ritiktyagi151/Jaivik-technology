"use client";

import { useState } from "react";
import CalendarPicker from "@/components/booking/CalendarPicker";
import EventSidebar from "@/components/booking/EventSidebar";
import TimeSlotList from "@/components/booking/TimeSlotList";
import TimezoneDropdown from "@/components/booking/TimezoneDropdown";
import { DEFAULT_TIMEZONE, toDateKey } from "@/lib/booking";

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);

  return (
    <main className="bg-[#f7f8fb] px-4 py-8 text-gray-900 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl overflow-visible rounded-xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)] lg:min-h-[720px] lg:grid-cols-[300px_minmax(420px,1fr)_280px]">
        <EventSidebar />
        <section className="p-6 lg:p-10">
          <h2 className="mb-8 text-2xl font-bold text-gray-950">Select a Date &amp; Time</h2>
          <CalendarPicker
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
            }}
            visibleMonth={visibleMonth}
            onChangeMonth={setVisibleMonth}
          />
          <TimezoneDropdown value={timezone} onChange={setTimezone} />
        </section>
        <TimeSlotList
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timezone={timezone}
          onSelectTime={setSelectedTime}
        />
      </div>
    </main>
  );
}
