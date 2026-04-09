const TrendingCoinsSkeleton = () => {
  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div className="mt-2 space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-purple-100/5">
            <div className="flex items-center gap-3">
              <div className="skeleton size-8 rounded-full" />
              <div className="space-y-1.5">
                <div className="skeleton h-3.5 w-24 rounded" />
                <div className="skeleton h-3 w-10 rounded" />
              </div>
            </div>
            <div className="skeleton h-3.5 w-10 rounded" />
            <div className="skeleton h-3.5 w-20 rounded" />
            <div className="skeleton h-3.5 w-14 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoinsSkeleton;
