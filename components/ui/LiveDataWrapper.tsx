'use client';

import { useState } from 'react';
import CandleSticksChart from '@/components/ui/CandleSticksChart';
import CoinHeader from '@/components/ui/CoinHeader';
import ExchangeListings from '@/components/ui/ExchangeListings';
import CoinDescription from '@/components/ui/CoinDescription';

const LiveDataWrapper = ({ coinId, coin, coinOHLCData }: LiveDataProps) => {
  const [liveInterval, setLiveInterval] = useState<'1s' | '1m'>('1s');

  return (
    <div id="live-data-wrapper">
      <div className="trend">
        <CoinHeader coin={coin} />
        <CandleSticksChart
          coinId={coinId}
          data={coinOHLCData ?? []}
          height={320}
          initialPeriod="daily"
          mode="historical"
          liveInterval={liveInterval}
          setLiveInterval={setLiveInterval}
        />
      </div>

      <CoinDescription description={coin.description?.en ?? ''} name={coin.name} />

      <div className="divider" />

      <div className="trades">
        <h4>Exchange Listings</h4>
        <ExchangeListings tickers={coin.tickers ?? []} />
      </div>
    </div>
  );
};

export default LiveDataWrapper;
