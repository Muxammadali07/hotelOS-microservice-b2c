"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

const icon = (path: string) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const NAV = [
  { href: "/kitchen", label: "Order Board", icon: icon("M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2") },
];

export default function KitchenLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Kitchen" navItems={NAV} allowedRoles={["KitchenStaff", "Server", "Manager"]}>
      {children}
    </DashboardLayout>
  );
}
