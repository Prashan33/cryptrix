'use client';

import { useEffect, useState } from 'react';
import CandleSticksChart from '@/components/ui/CandleSticksChart';
import CoinHeader from '@/components/ui/CoinHeader';
import ExchangeListings from '@/components/ui/ExchangeListings';
import CoinDescription from '@/components/ui/CoinDescription';
import { getLivePrice } from '@/lib/coingecko.actions';

const POLL_INTERVAL_MS = 15000;

const LiveDataWrapper = ({ coinId, coin, coinOHLCData }: LiveDataProps) => {
  const [liveInterval, setLiveInterval] = useState<'1s' | '1m'>('1s');
  const [livePrice, setLivePrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      const price = await getLivePrice(coinId);
      if (!cancelled && price != null) setLivePrice(price);
    };

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [coinId]);

  return (
    <div id="live-data-wrapper">
      <div className="trend">
        <CoinHeader coin={coin} livePrice={livePrice} />
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
