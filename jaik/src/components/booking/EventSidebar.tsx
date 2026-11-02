import { CalendarCheck2, Clock3, Video } from "lucide-react";
import { COMPANY_NAME, EVENT_TITLE, MEETING_DURATION_MINUTES } from "@/lib/booking";

type EventSidebarProps = {
  summary?: string;
  timezone?: string;
  showBack?: boolean;
  onBack?: () => void;
};

export default function EventSidebar({
  summary,
  timezone,
  showBack = false,
  onBack,
}: EventSidebarProps) {
  return (
    <aside className="h-full border-b border-gray-200 p-6 text-gray-900 lg:border-b-0 lg:border-r">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-7 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-[#006bff] hover:text-[#006bff]"
          aria-label="Go back"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
      )}

      <img
        src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/logo-1.webp"
        alt="Jaivik Technology logo"
        className="mb-8 h-12 w-auto object-contain"
      />

      <p className="mb-2 text-sm font-semibold text-gray-500">{COMPANY_NAME}</p>
      <h1 className="mb-7 text-2xl font-bold leading-tight text-gray-950">{EVENT_TITLE}</h1>

      <div className="space-y-4 text-sm font-medium text-gray-600">
        <div className="flex gap-3">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
          <span>{MEETING_DURATION_MINUTES} min</span>
        </div>
        <div className="flex gap-3">
          <Video className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
          <span>Web conferencing details provided upon confirmation</span>
        </div>
        {summary && (
          <div className="flex gap-3 pt-2">
            <CalendarCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#006bff]" />
            <span className="text-gray-800">{summary}</span>
          </div>
        )}
        {timezone && <p className="pl-8 text-gray-500">{timezone}</p>}
      </div>
    </aside>
  );
}
