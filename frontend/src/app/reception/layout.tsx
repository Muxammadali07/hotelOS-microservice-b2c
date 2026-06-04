"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";

const icon = (path: string) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const NAV = [
  { href: "/reception", label: "Overview", icon: icon("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6") },
  { href: "/reception/bookings", label: "Bookings", icon: icon("M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z") },
  { href: "/reception/rooms", label: "Rooms", icon: icon("M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4") },
  { href: "/reception/walkin", label: "Walk-in", icon: icon("M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z") },
];

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout title="Reception" navItems={NAV} allowedRoles={["Receptionist", "Manager"]}>
      {children}
    </DashboardLayout>
  );
}
