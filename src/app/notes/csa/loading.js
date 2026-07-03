export default function NotesLoading() {
  return (
    <div className="min-h-screen bg-bg p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-16 h-4 bg-muted rounded animate-pulse"></div>
          <span className="text-muted-fg">/</span>
          <div className="w-32 h-4 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="mb-10">
          <div className="w-72 h-10 bg-muted rounded animate-pulse mb-4"></div>
          <div className="w-full max-w-md h-5 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card block border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse"></div>
                <div className="w-6 h-4 rounded bg-muted animate-pulse"></div>
              </div>
              <div className="w-3/4 h-6 bg-muted rounded animate-pulse mb-3"></div>
              <div className="w-1/2 h-6 bg-muted rounded animate-pulse"></div>
              <div className="mt-8 pt-4 border-t border-border flex items-center gap-2">
                <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
