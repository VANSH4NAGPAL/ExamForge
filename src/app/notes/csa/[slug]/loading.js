export default function NoteLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header Skeleton */}
      <div className="bg-[#111] border-b border-[#2A2A2A] pt-4 md:pt-10 pb-6 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-16 h-4 bg-[#2A2A2A] rounded animate-pulse"></div>
            <span className="text-[#2A2A2A]">/</span>
            <div className="w-20 h-4 bg-[#2A2A2A] rounded animate-pulse"></div>
            <span className="text-[#2A2A2A]">/</span>
            <div className="w-32 h-4 bg-[#2A2A2A] rounded animate-pulse"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#2A2A2A] animate-pulse flex-shrink-0"></div>
            <div className="w-64 md:w-96 h-8 md:h-10 bg-[#2A2A2A] rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Paragraph block */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-[95%] h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-[85%] h-4 bg-muted rounded animate-pulse"></div>
          </div>

          {/* Heading */}
          <div className="w-48 h-8 bg-muted rounded animate-pulse mt-12 mb-6"></div>

          {/* Another Paragraph block */}
          <div className="flex flex-col gap-3 mb-10">
            <div className="w-[90%] h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-[80%] h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-[95%] h-4 bg-muted rounded animate-pulse"></div>
          </div>

          {/* Table skeleton */}
          <div className="w-full h-48 bg-muted border border-border rounded-xl animate-pulse mt-10 mb-8"></div>
        </div>
      </div>
    </div>
  );
}
