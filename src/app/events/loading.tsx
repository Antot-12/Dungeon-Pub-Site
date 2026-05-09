import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Skeleton className="h-16 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-4" />
        <Skeleton className="h-4 w-full max-w-lg mx-auto" />
      </header>

      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border/50 rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            <Skeleton className="md:w-1/3 h-64 md:h-auto" />
            <div className="p-6 flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
