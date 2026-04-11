import { Suspense } from 'react';
import CoinOverview from '@/components/ui/home/CoinOverview';
import CoinOverviewSkeleton from '@/components/ui/home/CoinOverviewSkeleton';
import TrendingCoins from '@/components/ui/home/TrendingCoins';
import TrendingCoinsSkeleton from '@/components/ui/home/TrendingCoinsSkeleton';
import Categories from '@/components/ui/home/Categories';
import { CategoriesFallback } from '@/components/ui/home/fallback';

const Page = () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewSkeleton />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsSkeleton />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
