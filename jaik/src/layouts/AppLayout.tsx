"use client";

import React from "react";
import Navbar from "../common/navbar/Navbar";
import DeferredChatbot from "./DeferredChatbot";
import DeferredFooter from "./DeferredFooter";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <DeferredChatbot />
      <DeferredFooter />
    </>
  );
};

export default AppLayout;
