import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import CandleSticksChart from '@/components/ui/CandleSticksChart';

const CoinOverview = async () => {
  const [coin, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>('/coins/bitcoin', {
      localization: 'false',
      tickers: 'false',
      community_data: 'false',
      developer_data: 'false',
    }),
    fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
      vs_currency: 'usd',
      days: 1,
    }),
  ]);

  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
        <div className="info">
          <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
      <CandleSticksChart data={coinOHLCData} coinId={coin.id} />
    </div>
  );
};

export default CoinOverview;
