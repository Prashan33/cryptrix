'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface RecentTradesProps {
  trades: Trade[];
  currentPrice?: number;
}

function formatTimeAgo(timestamp?: number): string {
  if (!timestamp) return 'just now';
  const diff = Math.floor((Date.now() - timestamp * 1000) / 1000);
  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
}

function generateDummyTrades(basePrice: number): Trade[] {
  const now = Math.floor(Date.now() / 1000);
  const offsets = [2, 15, 33, 61, 90, 122, 155];
  const types: ('buy' | 'sell')[] = ['buy', 'sell', 'buy', 'sell', 'buy', 'sell', 'buy'];
  const amounts = [0.0124, 0.2341, 0.0052, 1.0, 0.0317, 0.45, 0.0088];

  return offsets.map((offset, i) => {
    const price = basePrice * (1 + (Math.random() * 0.002 - 0.001));
    const amount = amounts[i];
    return {
      price: parseFloat(price.toFixed(2)),
      amount,
      value: parseFloat((price * amount).toFixed(2)),
      type: types[i],
      timestamp: now - offset,
    };
  });
}

const RecentTrades = ({ trades, currentPrice }: RecentTradesProps) => {
  const displayTrades = trades.length
    ? trades
    : generateDummyTrades(currentPrice ?? 1);

  return (
    <div className="trades-table custom-scrollbar max-h-64 overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="hover:bg-transparent!">
            <TableHead className="bg-dark-400 text-purple-100 py-3 pl-5">Price</TableHead>
            <TableHead className="bg-dark-400 text-purple-100 py-3">Amount</TableHead>
            <TableHead className="bg-dark-400 text-purple-100 py-3">Value</TableHead>
            <TableHead className="bg-dark-400 text-purple-100 py-3">Buy/Sell</TableHead>
            <TableHead className="bg-dark-400 text-purple-100 py-3 pr-5 text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTrades.map((trade, i) => (
            <TableRow key={i} className="border-b border-purple-100/5 hover:bg-dark-400/30!">
              <TableCell className={cn('pl-5 py-3 font-medium', trade.type === 'buy' ? 'text-green-500' : 'text-red-500')}>
                ${trade.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="py-3 text-sm">{trade.amount?.toFixed(4)}</TableCell>
              <TableCell className="py-3 text-sm">${trade.value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
              <TableCell className="py-3">
                <span className={cn('text-xs font-semibold px-2 py-0.5 rounded', trade.type === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500')}>
                  {trade.type?.toUpperCase()}
                </span>
              </TableCell>
              <TableCell suppressHydrationWarning className="py-3 pr-5 text-right text-sm text-purple-100">
                {formatTimeAgo(trade.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTrades;
