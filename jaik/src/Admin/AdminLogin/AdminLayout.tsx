"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    router.replace("/admin");
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-auth");
    if (!token) router.replace("/admin");
    else setAllowed(true);
  }, [router]);

  if (!allowed) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950">
      <header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-lg border-b border-gray-800">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold">J</div>
           <h1 className="text-xl font-bold tracking-tight">Admin <span className="text-red-500">Panel</span></h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
           {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;