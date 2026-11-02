"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { BookingSelection, formatMeetingSummary } from "@/lib/booking";

const emailListSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!value?.trim()) return true;
    const emails = value
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    return emails.every((email) => z.string().email().safeParse(email).success);
  }, {
    message: "Enter valid guest emails separated by commas.",
  });

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  guestEmails: emailListSchema,
  notes: z.string().optional(),
});

type FormValues = z.input<typeof formSchema>;

type BookingFormProps = {
  selection: BookingSelection;
};

type ScheduleResponse = {
  success?: boolean;
  meetLink?: string;
  warnings?: string[];
  message?: string;
  errors?: Record<string, string[]>;
};

export default function BookingForm({ selection }: BookingFormProps) {
  const [showGuests, setShowGuests] = useState(false);
  const [result, setResult] = useState<ScheduleResponse | null>(null);
  const [submitError, setSubmitError] = useState("");
  const summary = useMemo(
    () => formatMeetingSummary(selection.date, selection.time),
    [selection.date, selection.time]
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema as never) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: "",
      email: "",
      guestEmails: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setResult(null);
    setSubmitError("");

    const response = await fetch("/api/schedule-meeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        guestEmails: values.guestEmails || "",
        ...selection,
      }),
    });

    const data = (await response.json().catch(() => null)) as ScheduleResponse | null;

    if (!response.ok || !data?.success) {
      setSubmitError(data?.message || "Could not schedule the event. Please try again.");
      return;
    }

    setResult(data);
  };

  if (result?.success) {
    return (
      <div className="p-6 text-gray-900 lg:p-10">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-bold uppercase text-[#006bff]">Event scheduled</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">{summary}</h2>
          <p className="mt-2 text-sm text-gray-600">{selection.timezone}</p>
          {result.meetLink ? (
            <a
              href={result.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#006bff] px-5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Join Meeting
            </a>
          ) : (
            <p className="mt-5 text-sm font-semibold text-amber-700">
              Meeting saved, but Google Meet link was not created.
            </p>
          )}
          {result.meetLink && (
            <p className="mt-4 break-all text-sm text-gray-700">Meet link: {result.meetLink}</p>
          )}
          {result.warnings && result.warnings.length > 0 && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              {result.warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-gray-900 lg:p-10">
      <h2 className="text-2xl font-bold text-gray-950">Enter Details</h2>

      <div className="mt-7 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-900">Name *</span>
          <input
            {...register("name")}
            className="min-h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none transition focus:border-[#006bff] focus:ring-2 focus:ring-[#006bff]/15"
          />
          {errors.name && <span className="mt-1 block text-sm text-red-600">{errors.name.message}</span>}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-900">Email *</span>
          <input
            type="email"
            {...register("email")}
            className="min-h-12 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none transition focus:border-[#006bff] focus:ring-2 focus:ring-[#006bff]/15"
          />
          {errors.email && <span className="mt-1 block text-sm text-red-600">{errors.email.message}</span>}
        </label>

        <div>
          <button
            type="button"
            onClick={() => setShowGuests((visible) => !visible)}
            className="inline-flex min-h-10 items-center rounded-full border border-[#006bff] px-4 text-sm font-bold text-[#006bff] transition hover:bg-blue-50"
          >
            {showGuests ? "Hide Guests" : "Add Guests"}
          </button>
          {showGuests && (
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-gray-900">Guest emails</span>
              <textarea
                {...register("guestEmails")}
                rows={3}
                placeholder=", "
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#006bff] focus:ring-2 focus:ring-[#006bff]/15"
              />
              {errors.guestEmails && (
                <span className="mt-1 block text-sm text-red-600">{errors.guestEmails.message}</span>
              )}
            </label>
          )}
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-gray-900">
            Please share anything that will help prepare for our meeting
          </span>
          <textarea
            {...register("notes")}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#006bff] focus:ring-2 focus:ring-[#006bff]/15"
          />
        </label>
      </div>

      <p className="mt-6 text-xs leading-6 text-gray-500">
        By proceeding, you agree to receive meeting details and related communication from Jaivik Technology
        Technology India. Your information is used only to schedule and prepare for this meeting.
      </p>

      {submitError && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-[#006bff] px-6 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isSubmitting ? "Scheduling..." : "Schedule Event"}
      </button>
    </form>
  );
}
