'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

interface TopMoversProps {
  gainers: CoinMarketData[];
  losers: CoinMarketData[];
}

const CoinRow = ({ coin }: { coin: CoinMarketData }) => {
  const isUp = coin.price_change_percentage_24h >= 0;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-purple-100/5 last:border-none">
      <div className="flex items-center gap-2">
        <Image src={coin.image} alt={coin.name} width={28} height={28} className="rounded-full" />
        <div>
          <p className="text-sm font-semibold leading-tight">{coin.name}</p>
          <p className="text-xs text-purple-100 uppercase">{coin.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{formatCurrency(coin.current_price)}</p>
        <p className={cn('text-xs font-medium', isUp ? 'text-green-500' : 'text-red-500')}>
          {formatPercentage(coin.price_change_percentage_24h)}
        </p>
      </div>
    </div>
  );
};

const TopMovers = ({ gainers, losers }: TopMoversProps) => {
  const [tab, setTab] = useState<'gainers' | 'losers'>('gainers');
  const coins = tab === 'gainers' ? gainers : losers;

  return (
    <div id="top-gainers-losers">
      <div className="tabs-list flex border-b border-dark-500 mb-2">
        <button
          onClick={() => setTab('gainers')}
          className={cn(
            'tabs-trigger text-base font-semibold py-2 pr-6 transition-colors',
            tab === 'gainers' ? 'text-white border-b-2 border-green-500' : 'text-purple-100',
          )}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setTab('losers')}
          className={cn(
            'tabs-trigger text-base font-semibold py-2 px-6 transition-colors',
            tab === 'losers' ? 'text-white border-b-2 border-red-500' : 'text-purple-100',
          )}
        >
          Top Losers
        </button>
      </div>

      <div className="mt-2">
        {coins.map((coin) => (
          <CoinRow key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
