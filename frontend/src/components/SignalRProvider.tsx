"use client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRoomStore } from "@/store/roomStore";
import { useBookingStore } from "@/store/bookingStore";
import { startConnection } from "@/lib/signalr";
import type { RoomStatus, BookingStatus } from "@/types";

export default function SignalRProvider({ children }: { children: React.ReactNode }) {
  const user                        = useAuthStore((s) => s.user);
  const updateRoomStatus            = useRoomStore((s) => s.updateRoomStatus);
  const handleBookingStatusUpdated  = useBookingStore((s) => s.handleBookingStatusUpdated);
  const fetchBookings               = useBookingStore((s) => s.fetchBookings);
  const bookingFilter               = useBookingStore((s) => s.filter);

  // Stable ref so event callbacks don't stale-close over filter
  const filterRef = useRef(bookingFilter);
  useEffect(() => { filterRef.current = bookingFilter; }, [bookingFilter]);

  useEffect(() => {
    if (!user) return;

    let conn: Awaited<ReturnType<typeof startConnection>> | null = null;
    let mounted = true;

    const setup = async () => {
      try {
        conn = await startConnection();
        if (!mounted) return;

        // ── Join all channels this user cares about ────────────────
        // "rooms"    — room status updates (all staff need this)
        // "bookings" — booking status changes (reception + manager)
        // "housekeeping" — cleaning events (CleaningStaff + manager)
        // Hub auto-joins user:{userId} personal channel on connect.

        const channels = ["rooms", "bookings"];
        if (["CleaningStaff", "Manager", "Receptionist"].includes(user.role)) {
          channels.push("housekeeping");
        }

        for (const ch of channels) {
          await conn.invoke("JoinChannel", ch);
        }

        // ── Room status updated ───────────────────────────────────
        conn.on("RoomStatusUpdated", (data: unknown) => {
          // Server sends PascalCase anonymous objects
          const ev = data as { RoomId?: string; roomId?: string; NewStatus?: string; newStatus?: string };
          const roomId    = ev?.RoomId    ?? ev?.roomId;
          const newStatus = ev?.NewStatus ?? ev?.newStatus;
          if (roomId && newStatus) {
            updateRoomStatus(roomId, newStatus as RoomStatus);
          }
        });

        // ── Booking status updated ────────────────────────────────
        conn.on("BookingStatusUpdated", (data: unknown) => {
          const ev = data as { BookingId?: string; bookingId?: string; NewBookingStatus?: string; newBookingStatus?: string };
          const bookingId = ev?.BookingId ?? ev?.bookingId;
          const newStatus = ev?.NewBookingStatus ?? ev?.newBookingStatus;
          if (bookingId && newStatus) {
            handleBookingStatusUpdated(bookingId, newStatus);
          }
        });

        // ── Reservation created / expired ─────────────────────────
        // These push room status changes too, but we also refresh bookings
        conn.on("ReservationCreated", () =>
          fetchBookings(filterRef.current as BookingStatus | undefined)
        );
        conn.on("ReservationExpired", () =>
          fetchBookings(filterRef.current as BookingStatus | undefined)
        );

        // ── Payment confirmed ─────────────────────────────────────
        conn.on("PaymentConfirmed", () =>
          fetchBookings(filterRef.current as BookingStatus | undefined)
        );

      } catch {
        // SignalR hub unavailable — degrade gracefully
      }
    };

    setup();

    return () => {
      mounted = false;
      conn?.off("RoomStatusUpdated");
      conn?.off("BookingStatusUpdated");
      conn?.off("ReservationCreated");
      conn?.off("ReservationExpired");
      conn?.off("PaymentConfirmed");
    };
  }, [user, updateRoomStatus, handleBookingStatusUpdated, fetchBookings]);

  return <>{children}</>;
}
