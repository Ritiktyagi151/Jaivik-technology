"use client";

import { useCallback, useEffect, useRef } from "react";

export const useBackButtonModal = (
  isOpen: boolean,
  onClose: () => void,
  modalKey = "media-player"
) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const currentState =
      typeof window.history.state === "object" && window.history.state !== null
        ? window.history.state
        : {};

    if (currentState.modalKey !== modalKey) {
      window.history.pushState(
        { ...currentState, modalKey },
        "",
        window.location.href
      );
    }

    const handlePopState = () => {
      onCloseRef.current();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, modalKey]);

  return useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.modalKey === modalKey
    ) {
      window.history.back();
      return;
    }

    onCloseRef.current();
  }, [modalKey]);
};
