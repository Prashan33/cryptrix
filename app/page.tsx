import { Suspense } from 'react';
import CoinOverview from '@/components/ui/home/CoinOverview';
import CoinOverviewSkeleton from '@/components/ui/home/CoinOverviewSkeleton';
import TrendingCoins from '@/components/ui/home/TrendingCoins';
import TrendingCoinsSkeleton from '@/components/ui/home/TrendingCoinsSkeleton';

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

      <section className="">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default Page;
