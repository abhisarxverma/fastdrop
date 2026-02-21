import { Skeleton } from "@/components/ui/skeleton";

export default function SessionLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 space-y-8">
      
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 space-y-4"
          >
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}