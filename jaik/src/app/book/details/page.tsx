"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import EventSidebar from "@/components/booking/EventSidebar";
import {
  DEFAULT_TIMEZONE,
  formatMeetingSummary,
  toDateKey,
  type BookingSelection,
} from "@/lib/booking";

function DetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selection = useMemo<BookingSelection>(() => {
    return {
      date: searchParams?.get("date") || toDateKey(new Date()),
      time: searchParams?.get("time") || "10:00",
      timezone: searchParams?.get("timezone") || DEFAULT_TIMEZONE,
    };
  }, [searchParams]);

  const summary = formatMeetingSummary(selection.date, selection.time);

  return (
    <main className="bg-[#f7f8fb] px-4 py-8 text-gray-900 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)] lg:min-h-[650px] lg:grid-cols-[330px_1fr]">
        <EventSidebar
          showBack
          onBack={() => router.push("/book")}
          summary={summary}
          timezone={selection.timezone}
        />
        <BookingForm selection={selection} />
      </div>
    </main>
  );
}

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-[#f7f8fb] px-4 py-12 text-gray-900">
          <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
            Loading booking details...
          </div>
        </main>
      }
    >
      <DetailsContent />
      <div className="sr-only">
        <Link href="/book">Back to booking</Link>
      </div>
    </Suspense>
  );
}
