'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ConverterProps {
  symbol: string;
  icon: string;
  priceList: { usd: number; [key: string]: number };
}

const CURRENCIES = ['usd', 'eur', 'gbp', 'jpy', 'btc', 'eth'] as const;
type Currency = (typeof CURRENCIES)[number];

const Converter = ({ symbol, icon, priceList }: ConverterProps) => {
  const [amount, setAmount] = useState<string>('1');
  const [currency, setCurrency] = useState<Currency>('usd');

  const price = priceList[currency] ?? priceList.usd;
  const result = (parseFloat(amount) || 0) * price;

  return (
    <div id="converter">
      <h4>Converter</h4>

      <div className="panel">
        <p className="text-sm text-purple-100 mb-2">{symbol.toUpperCase()}</p>
        <div className="input-wrapper">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
            placeholder="0"
            min="0"
          />
          <div className="coin-info">
            <Image src={icon} alt={symbol} width={20} height={20} className="rounded-full" />
            <p>{symbol.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div className="divider">
        <span className="line" />
        <span className="icon">⇅</span>
      </div>

      <div className="panel">
        <p className="text-sm text-purple-100 mb-2">{currency.toUpperCase()}</p>
        <div className="output-wrapper">
          <p>{isNaN(result) ? '0.00' : result.toLocaleString('en-US', { maximumFractionDigits: 6 })}</p>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-dark-400 border-none text-purple-100 font-semibold text-xs cursor-pointer focus:outline-none px-2"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
