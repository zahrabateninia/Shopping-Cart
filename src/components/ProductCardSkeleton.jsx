import React from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ProductCardSkeleton() {
  return (
    <article className="max-w-xs w-full bg-white rounded-xl border-gray-200 shadow-sm overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-52 bg-gray-100 m-4 rounded-xl">
        <Skeleton height="100%" width="100%" borderRadius="0.75rem" />
      </div>

      {/* Text skeletons */}
      <div className="flex flex-col p-4 gap-2 min-h-[140px]">
        {/* Title */}
        <Skeleton height={20} width="80%" />

        {/* Description */}
        <Skeleton count={2} height={14} />

        {/* Price + Category + Button */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <Skeleton height={20} width={60} />
            <Skeleton height={12} width={40} />
          </div>

          <Skeleton height={36} width={90} borderRadius="0.5rem" />
        </div>
      </div>
    </article>
  )
}
