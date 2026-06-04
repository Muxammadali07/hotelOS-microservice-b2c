export function SkeletonRow({ cols = 4 }: { cols?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-surface-800 rounded-md" />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 animate-pulse">
      <div className="h-4 bg-surface-800 rounded-md w-2/3 mb-4" />
      <div className="h-3 bg-surface-800 rounded-md w-1/2 mb-2.5" />
      <div className="h-3 bg-surface-800 rounded-md w-3/4" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-surface-700 border-t-brand-500 animate-spin" />
        <p className="text-zinc-500 text-xs tracking-wide uppercase">Loading</p>
      </div>
    </div>
  );
}
