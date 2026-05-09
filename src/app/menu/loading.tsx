import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Skeleton className="h-16 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-6" />
        <Skeleton className="h-10 w-48 mx-auto" />
      </header>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-border/20">
            <Skeleton className="h-14 w-full mb-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
