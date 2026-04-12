import { formatCurrency, formatPercentage } from '@/lib/utils';

interface PriceStatsProps {
  coin: CoinDetailsData;
}

const StatRow = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-purple-100/5 last:border-none">
    <span className="text-sm text-purple-100">{label}</span>
    <div className="text-right">
      <p className="text-sm font-semibold">{value}</p>
      {sub && <p className="text-xs text-purple-100">{sub}</p>}
    </div>
  </div>
);

const PriceStats = ({ coin }: PriceStatsProps) => {
  const m = coin.market_data;

  const circulatingSupply = m.circulating_supply ?? 0;
  const maxSupply = m.max_supply ?? m.total_supply ?? 0;
  const supplyPct = maxSupply > 0 ? Math.min((circulatingSupply / maxSupply) * 100, 100) : null;

  const athDate = m.ath_date?.usd ? new Date(m.ath_date.usd).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  const atlDate = m.atl_date?.usd ? new Date(m.atl_date.usd).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  return (
    <div className="bg-dark-500 rounded-xl px-5 py-4 mt-6 space-y-1">
      <h4 className="text-lg font-semibold mb-3">Price Statistics</h4>

      <StatRow
        label="All-Time High"
        value={formatCurrency(m.ath?.usd ?? 0)}
        sub={`${formatPercentage(m.ath_change_percentage?.usd ?? 0)} · ${athDate ?? ''}`}
      />
      <StatRow
        label="All-Time Low"
        value={formatCurrency(m.atl?.usd ?? 0)}
        sub={`${formatPercentage(m.atl_change_percentage?.usd ?? 0)} · ${atlDate ?? ''}`}
      />
      <StatRow
        label="Fully Diluted Val."
        value={m.fully_diluted_valuation?.usd ? formatCurrency(m.fully_diluted_valuation.usd) : '—'}
      />
      <StatRow
        label="Circulating Supply"
        value={circulatingSupply.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        sub={`${coin.symbol.toUpperCase()}`}
      />
      {maxSupply > 0 && (
        <StatRow
          label="Max Supply"
          value={maxSupply.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        />
      )}

      {supplyPct !== null && (
        <div className="pt-3">
          <div className="flex justify-between text-xs text-purple-100 mb-1.5">
            <span>Circulating</span>
            <span>{supplyPct.toFixed(1)}% of max</span>
          </div>
          <div className="h-2 w-full bg-dark-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${supplyPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceStats;
