"use client";

import { Suspense } from "react";

// import ChatBot from "../ai/ChatBot"
import BrochureButton from "../components/buttons/BrochureButton";
import ReviewModalGate from "../components/modals/ReviewModalGate";

const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Suspense>
        {children}
        <BrochureButton />
        <ReviewModalGate />
      </Suspense>
    </>
  );
};

export default AppProvider;
