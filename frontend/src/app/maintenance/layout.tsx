"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

const icon = (path: string) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const NAV = [
  { href: "/maintenance", label: "Tickets", icon: icon("M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z") },
];

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Maintenance" navItems={NAV} allowedRoles={["MaintenanceStaff", "Manager", "Receptionist"]}>
      {children}
    </DashboardLayout>
  );
}
