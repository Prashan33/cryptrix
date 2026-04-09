const CoinOverviewSkeleton = () => {
  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <div className="skeleton size-14 rounded-full" />
        <div className="info gap-3">
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-8 w-48 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CoinOverviewSkeleton;
