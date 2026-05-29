import type { Review } from "@prood/types"
import { Badge } from "@prood/ui/components/badge"
import { ReviewStars } from "@prood/ui/components/review-stars"
import { cn } from "@prood/ui/lib/utils"

export interface ReviewCardProps {
  review: Review
  className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl border p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="font-medium">{review.authorName}</span>
        {review.verified ? <Badge variant="secondary">Verified</Badge> : null}
      </div>
      <ReviewStars rating={review.rating} size={14} />
      {review.title ? <h4 className="font-medium">{review.title}</h4> : null}
      {review.body ? (
        <p className="text-muted-foreground text-sm">{review.body}</p>
      ) : null}
      <span className="text-muted-foreground text-xs">
        {new Date(review.createdAt).toLocaleDateString()}
      </span>
    </div>
  )
}
