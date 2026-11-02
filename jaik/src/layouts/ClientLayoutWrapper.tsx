"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AppLayout = dynamic(() => import("./AppLayout"), {
  loading: () => null,
});

const AdminLayout = dynamic(() => import("./AdminLayout"), {
  loading: () => null,
});

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/admin/dashboard")) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }
  return <AppLayout>{children}</AppLayout>;
}
