import { fetcher } from '@/lib/coingecko.actions';
import TopMovers from '@/components/ui/TopMovers';

const TopMoversWrapper = async () => {
  const coins = await fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    price_change_percentage: '24h',
  });

  const sorted = [...coins].filter((c) => c.price_change_percentage_24h != null);
  const gainers = [...sorted]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);
  const losers = [...sorted]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return <TopMovers gainers={gainers} losers={losers} />;
};

export default TopMoversWrapper;
