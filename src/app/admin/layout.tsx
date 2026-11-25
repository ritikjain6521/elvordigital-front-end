import React from "react";
import AdminLayoutClient from "@/components/admin/layout/AdminLayoutClient";

export const metadata = {
  title: "Admin Control Panel | ElvorDigital",
  description: "Enterprise digital product marketplace management dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
