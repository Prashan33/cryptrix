import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

interface ExchangeListingsProps {
  tickers: Ticker[];
}

const ExchangeListings = ({ tickers }: ExchangeListingsProps) => {
  return (
    <div className="bg-dark-500 rounded-xl overflow-hidden mt-2">
      <div className="max-h-130 overflow-y-auto custom-scrollbar">
        <Table className="table-fixed w-full">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="hover:bg-transparent!">
              <TableHead className="bg-dark-400 text-purple-100 py-3 pl-5 text-xs w-[42%]">Exchange</TableHead>
              <TableHead className="bg-dark-400 text-purple-100 py-3 text-xs w-[18%]">Pair</TableHead>
              <TableHead className="bg-dark-400 text-purple-100 py-3 text-right text-xs w-[25%]">Price (USD)</TableHead>
              <TableHead className="bg-dark-400 text-purple-100 py-3 pr-5 text-right text-xs w-[15%]">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickers.map((ticker, i) => (
              <TableRow key={i} className="border-b border-purple-100/5 hover:bg-dark-400/30! relative">
                <TableCell className="pl-5 py-3 text-sm font-bold text-green-500">
                  {ticker.trade_url && (
                    <Link href={ticker.trade_url} target="_blank" aria-label={ticker.market.name} className="absolute inset-0 z-10" />
                  )}
                  <div className="truncate">{ticker.market.name}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-1 text-xs min-w-0">
                    <span className="font-medium truncate">{ticker.base}</span>
                    <span className="text-purple-100 shrink-0">/</span>
                    <span className="text-purple-100 truncate">{ticker.target}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right text-sm font-medium">
                  <div className="truncate">{formatCurrency(ticker.converted_last.usd)}</div>
                </TableCell>
                <TableCell className="py-3 pr-5 text-right">
                  {ticker.trade_url && (
                    <Link
                      href={ticker.trade_url}
                      target="_blank"
                      className="relative z-20 inline-flex items-center justify-end gap-1 text-xs text-purple-100 hover:text-white transition-colors"
                    >
                      Trade <ArrowUpRight size={10} />
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExchangeListings;
