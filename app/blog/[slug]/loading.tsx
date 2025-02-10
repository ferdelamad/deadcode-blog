export default function BlogPostLoading() {
  return (
    <div className="container max-w-2xl py-10">
      <div className="space-y-8 animate-pulse">
        {/* Category */}
        <div className="h-4 w-24 bg-muted rounded" />
        
        {/* Title */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded" />
          <div className="h-8 w-1/2 bg-muted rounded" />
        </div>

        {/* Meta info */}
        <div className="flex gap-2">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>

        {/* Content */}
        <div className="space-y-4 pt-8">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-11/12 bg-muted rounded" />
          <div className="h-4 w-4/5 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
} 