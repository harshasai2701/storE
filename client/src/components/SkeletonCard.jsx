const SkeletonCard = () => {
  return (
    <div className="group block animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full overflow-hidden bg-gray-200 dark:bg-zinc-800 rounded-xl border border-transparent dark:border-zinc-800"></div>
      
      {/* Title Skeleton */}
      <div className="mt-4 h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2"></div>
      
      {/* Price Skeleton */}
      <div className="mt-4 h-6 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonCard;
