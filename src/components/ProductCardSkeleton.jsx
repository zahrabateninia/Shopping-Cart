import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ProductCardSkeleton() {
  return (
    <SkeletonTheme
      baseColor="var(--color-base-dark-800)"
      highlightColor="var(--color-base-dark-700)"
      borderRadius="0.75rem"
      duration={1.8} // smoother shimmer timing
    >
      <style>{`
        .react-loading-skeleton {
          --base-color: var(--color-base-dark-800);
          --highlight-color: var(--color-base-dark-700);
          background: linear-gradient(
            120deg,
            var(--base-color) 25%,
            var(--highlight-color) 50%,
            var(--base-color) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <article
        className="
          w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]
          h-[380px]
          bg-[var(--color-base-dark-900)]
          border border-[var(--color-base-dark-700)]
          rounded-2xl shadow-md overflow-hidden flex flex-col
          transition-all duration-300
        "
      >
        {/* Image area */}
        <div className="relative flex-shrink-0 h-48 bg-[var(--color-base-dark-800)] flex items-center justify-center p-4">
          <Skeleton height="100%" width="100%" />
        </div>

        {/* Text content */}
        <div className="flex flex-col p-6 flex-1 gap-3">
          <Skeleton height={20} width="80%" />
          <Skeleton count={2} height={14} width="90%" />

          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <Skeleton height={20} width={60} />
              <Skeleton height={12} width={40} />
            </div>
            <Skeleton height={36} width={90} />
          </div>
        </div>
      </article>
    </SkeletonTheme>
  )
}
