"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { REVIEW_MODAL_OPEN_EVENT } from "./reviewModalEvents";

const ReviewModal = dynamic(() => import("./ReviewModal"), {
  ssr: false,
  loading: () => null,
});

const ReviewModalGate = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(REVIEW_MODAL_OPEN_EVENT, open);
    return () => window.removeEventListener(REVIEW_MODAL_OPEN_EVENT, open);
  }, []);

  return isOpen ? <ReviewModal onClose={() => setIsOpen(false)} /> : null;
};

export default ReviewModalGate;
