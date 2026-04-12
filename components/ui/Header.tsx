import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/coingecko.actions";
import { SearchModal } from "@/components/ui/SearchModal";

const Header = async () => {
  let trendingCoins: TrendingCoin[] = [];
  try {
    const data = await fetcher<{ coins: TrendingCoin[] }>('/search/trending');
    trendingCoins = data.coins;
  } catch {
    trendingCoins = [];
  }

  return (
    <header className="w-full h-20 bg-dark-700 border-b border-dark-400">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 mx-auto max-w-360">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/cryptrix-logo.svg" alt="Cryptrix" width={210} height={70} className="object-contain" />
          <span className="text-white font-bold text-xl tracking-wide"></span>
        </Link>

        <nav className="flex h-full items-center">
          <Link href="/" className="px-6 py-5 flex items-center h-full font-medium text-white transition-all hover:text-white cursor-pointer">
            Home
          </Link>
          <SearchModal initialTrendingCoins={trendingCoins} />
          <Link href="/coins" className="px-6 py-5 flex items-center h-full font-medium text-purple-100 transition-all hover:text-white cursor-pointer">
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
