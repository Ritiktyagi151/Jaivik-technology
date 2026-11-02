"use client";

export const REVIEW_MODAL_OPEN_EVENT = "Jaivik Technology:review-modal-open";

export const openReviewModal = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REVIEW_MODAL_OPEN_EVENT));
};
