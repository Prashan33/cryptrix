import { fetcher } from "@/lib/coingecko.actions";
import DataTable from "@/components/ui/DataTable";
import CoinsPagination from "@/components/ui/CoinsPagination";
import Image from "next/image";
import Link from "next/link";
import { cn, formatPercentage, formatPrice } from "@/lib/utils";

const PER_PAGE = 20;
const TOTAL_PAGES = 10;

const Coins = async ({ searchParams }: NextPageProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);

  const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    order: "market_cap_desc",
    sparkline: "false",
    price_change_percentage: "24h",
    per_page: PER_PAGE,
    page: currentPage,
  });

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="token-info">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatPrice(coin.current_price),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const isTrendingUp = (coin.price_change_percentage_24h ?? 0) > 0;
        return (
          <span
            className={cn("change-value", {
              "text-green-600": isTrendingUp,
              "text-red-500": !isTrendingUp,
            })}
          >
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => formatPrice(coin.market_cap),
    },
  ];

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>
        <DataTable
          tableClassName="coins-table"
          columns={columns}
          data={coinsData}
          rowKey={(coin) => coin.id}
        />
        <CoinsPagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          hasMorePages={currentPage < TOTAL_PAGES}
        />
      </div>
    </main>
  );
};

export default Coins;
