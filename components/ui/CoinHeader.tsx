import Image from 'next/image';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface CoinHeaderProps {
  coin: CoinDetailsData;
  livePrice?: number;
}

const CoinHeader = ({ coin, livePrice }: CoinHeaderProps) => {
  const price = livePrice ?? coin.market_data.current_price.usd;
  const change24h = coin.market_data.price_change_percentage_24h_in_currency.usd;
  const change30d = coin.market_data.price_change_percentage_30d_in_currency.usd;
  const priceChange24h = coin.market_data.price_change_24h_in_currency.usd;
  const isUp = change24h >= 0;

  return (
    <div id="coin-header">
      <div className="info">
        <Image src={coin.image.large} alt={coin.name} width={50} height={50} className="rounded-full" />
        <h3>{coin.name}</h3>
      </div>

      <div className="price-row">
        <h1>{formatCurrency(price)}</h1>
        <span className={`badge text-sm font-semibold px-2 py-1 rounded ${isUp ? 'badge-up' : 'badge-down'}`}>
          {formatPercentage(change24h)} (24h)
        </span>
      </div>

      <ul className="stats">
        <li className="pr-4">
          <span className="label text-sm">Today</span>
          <div className="value">
            <span className={change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
              {formatPercentage(change24h)}
            </span>
          </div>
        </li>
        <li className="px-4">
          <span className="label text-sm">30 Days</span>
          <div className="value">
            <span className={change30d >= 0 ? 'text-green-500' : 'text-red-500'}>
              {formatPercentage(change30d)}
            </span>
          </div>
        </li>
        <li className="px-4">
          <span className="label text-sm">Price Change (24h)</span>
          <div className="value">
            <span className={priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}>
              {priceChange24h >= 0 ? '+' : ''}{formatCurrency(priceChange24h)}
            </span>
          </div>
        </li>
        <li className="px-4">
          <span className="label text-sm">Market Cap Rank</span>
          <div className="value font-semibold">#{coin.market_cap_rank}</div>
        </li>
      </ul>
    </div>
  );
};

export default CoinHeader;
