"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chatbot = dynamic(() => import("../pages/home/Chatbot"), {
  ssr: false,
  loading: () => null,
});

const DeferredChatbot = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId = 0;
    let idleId = 0;

    const show = () => {
      timeoutId = window.setTimeout(() => setShouldRender(true), 4000);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(show, { timeout: 5000 });
    } else {
      show();
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return shouldRender ? <Chatbot /> : null;
};

export default DeferredChatbot;
