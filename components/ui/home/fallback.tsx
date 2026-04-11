export const CategoriesFallback = () => (
  <div id="categories-fallback" className="custom-scrollbar">
    <h4>Top Categories</h4>
    <div className="mt-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-purple-100/5">
          <div className="skeleton category-skeleton" />
          <div className="top-gainers-cell">
            {Array.from({ length: 3 }).map((__, j) => (
              <div key={j} className="skeleton coin-skeleton" />
            ))}
          </div>
          <div className="skeleton value-skeleton-sm" />
          <div className="skeleton value-skeleton-md" />
          <div className="skeleton value-skeleton-lg" />
        </div>
      ))}
    </div>
  </div>
);
