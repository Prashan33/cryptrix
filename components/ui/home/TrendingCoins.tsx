import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '@/components/ui/DataTable';
import { formatCurrency } from '@/lib/utils';

type TrendingRow = TrendingCoin & {
  livePrice: number;
  liveChange24h: number;
};

type SimplePriceResponse = Record<string, { usd?: number; usd_24h_change?: number }>;

const COLUMNS: DataTableColumn<TrendingRow>[] = [
  {
    header: 'Coin',
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Image src={row.item.thumb} alt={row.item.name} width={32} height={32} className="rounded-full" />
        <div>
          <p className="font-semibold">{row.item.name}</p>
          <p className="text-xs text-purple-100 uppercase">{row.item.symbol}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Rank',
    headClassName: 'text-right',
    cellClassName: 'text-right',
    cell: (row) => <span className="text-purple-100">#{row.item.market_cap_rank}</span>,
  },
  {
    header: 'Price',
    headClassName: 'text-right',
    cellClassName: 'text-right font-semibold',
    cell: (row) => formatCurrency(row.livePrice),
  },
  {
    header: '24h',
    headClassName: 'text-right pr-5',
    cellClassName: 'text-right pr-5',
    cell: (row) => {
      const change = row.liveChange24h;
      return (
        <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {change >= 0 ? '+' : ''}
          {change.toFixed(2)}%
        </span>
      );
    },
  },
];

const TrendingCoins = async () => {
  const { coins } = await fetcher<{ coins: TrendingCoin[] }>('/search/trending');

  const ids = coins.map((c) => c.item.id).join(',');
  const prices = await fetcher<SimplePriceResponse>('/simple/price', {
    ids,
    vs_currencies: 'usd',
    include_24hr_change: 'true',
  });

  const rows: TrendingRow[] = coins.map((c) => ({
    ...c,
    livePrice: prices[c.item.id]?.usd ?? c.item.data.price,
    liveChange24h:
      prices[c.item.id]?.usd_24h_change ?? c.item.data.price_change_percentage_24h.usd,
  }));

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div className="overflow-y-auto max-h-115 custom-scrollbar rounded-xl">
        <DataTable
          columns={COLUMNS}
          data={rows}
          rowKey={(row) => row.item.id}
          tableClassName="trending-coins-table"
          headerClassName="sticky top-0 z-10"
        />
      </div>
    </div>
  );
};

export default TrendingCoins;
