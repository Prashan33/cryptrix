import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-20 bg-dark-700 border-b border-dark-400">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 mx-auto max-w-360">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logoo.png" alt="Cryptrix" width={50} height={40} className="object-contain" />
          <span className="text-white font-bold text-xl tracking-wide">Cryptrix</span>
        </Link>

        <nav className="flex h-full items-center">
          <Link href="/" className="px-6 py-5 flex items-center h-full font-medium text-white transition-all hover:text-white cursor-pointer">
            Home
          </Link>
          <Link href="/search" className="px-6 py-5 flex items-center h-full font-medium text-purple-100 transition-all hover:text-white cursor-pointer">
            Search
          </Link>
          <Link href="/coins" className="px-6 py-5 flex items-center h-full font-medium text-purple-100 transition-all hover:text-white cursor-pointer">
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
