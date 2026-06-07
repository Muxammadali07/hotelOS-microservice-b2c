interface Props {
  label: string;
  variant?: "green" | "yellow" | "red" | "blue" | "gray" | "orange" | "primary";
}

const styles: Record<string, string> = {
  green:   "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
  yellow:  "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
  red:     "bg-red-500/10 text-red-400 ring-1 ring-red-500/20",
  blue:    "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20",
  gray:    "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",
  orange:  "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20",
  primary: "bg-primary-500/10 text-primary-400 ring-1 ring-primary-500/20",
};

export default function Badge({ label, variant = "gray" }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}

export function roomStatusBadge(status: string) {
  const map: Record<string, "green" | "yellow" | "red" | "blue" | "gray" | "primary"> = {
    Available: "green", Reserved: "primary", Cleaning: "yellow",
    OOS: "red", Active: "blue", Archived: "gray",
  };
  return <Badge label={status} variant={map[status] ?? "gray"} />;
}

export function bookingStatusBadge(status: string) {
  const map: Record<string, "green" | "yellow" | "red" | "blue" | "gray"> = {
    PendingPayment: "yellow", Confirmed: "blue", Active: "green",
    Cancelled: "gray", TimedOut: "red", Completed: "gray",
  };
  return <Badge label={status} variant={map[status] ?? "gray"} />;
}

export function orderStatusBadge(status: string) {
  const map: Record<string, "green" | "yellow" | "orange" | "blue"> = {
    Received: "yellow", Preparing: "orange", OutForDelivery: "blue", Delivered: "green",
  };
  return <Badge label={status} variant={map[status] ?? "gray"} />;
}

export function priorityBadge(priority: string) {
  const map: Record<string, "green" | "yellow" | "red" | "blue"> = {
    Low: "green", Normal: "blue", High: "yellow", Critical: "red",
  };
  return <Badge label={priority} variant={map[priority] ?? "gray"} />;
}
