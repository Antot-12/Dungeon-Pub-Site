import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Skeleton className="h-16 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
}
