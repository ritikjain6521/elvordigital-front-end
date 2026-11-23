"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    const token = sessionStorage.getItem("znv_admin_token");
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // If on login page, render clean login view without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If checking authentication or unauthenticated, block view and show redirect spinner
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#070614] flex flex-col items-center justify-center text-center p-4">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-base font-bold text-white">Verifying Administrative Access...</h3>
        <p className="text-xs text-[#A7A3BC] mt-1">Direct access without credentials is restricted. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090816] text-white flex overflow-x-hidden">
      {/* Sidebar */}
      <Suspense fallback={<div className="w-64 bg-[#111027] shrink-0 hidden lg:block" />}>
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </Suspense>

      {/* Main Panel Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Suspense fallback={<div className="h-16 bg-[#111027]" />}>
          <AdminNavbar collapsed={collapsed} setMobileOpen={setMobileOpen} />
        </Suspense>

        <main className="flex-1 p-3 sm:p-4 lg:p-6 mt-16 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[50vh] text-[#A7A3BC] text-sm">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                Loading admin module...
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

