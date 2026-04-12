'use server';

import qs from 'query-string';

const BASE_URL= process.env.COINGECKO_BASE_URL;

const API_KEY= process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate = 60,
  ): Promise<T> {
    const url = qs.stringifyUrl(
      {
        url: `${BASE_URL}/${endpoint}`,
        query: params,
      },
      { skipEmptyString: true, skipNull: true },
    );
  
    const response = await fetch(url, {
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
      next: { revalidate },
    });
  
    if (!response.ok) {
      const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
  
      throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `);
    }
  
    return response.json();
  }

export async function getLivePrice(coinId: string): Promise<number | null> {
  try {
    const url = `${BASE_URL}/simple/price?ids=${encodeURIComponent(coinId)}&vs_currencies=usd`;
    const response = await fetch(url, {
      headers: {
        'x-cg-demo-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
      cache: 'no-store',
    });
    if (!response.ok) return null;
    const data: Record<string, { usd: number }> = await response.json();
    return data[coinId]?.usd ?? null;
  } catch {
    return null;
  }
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const searchData = await fetcher<{ coins: { id: string; name: string; symbol: string; market_cap_rank: number | null; thumb: string; large: string }[] }>(
    '/search',
    { query },
    0,
  );

  const top = searchData.coins.slice(0, 10);
  if (top.length === 0) return [];

  const ids = top.map((c) => c.id).join(',');
  const markets = await fetcher<{ id: string; current_price: number; price_change_percentage_24h: number }[]>(
    '/coins/markets',
    { vs_currency: 'usd', ids, per_page: '10', page: '1' },
    0,
  );

  const priceMap = new Map(markets.map((m) => [m.id, m]));

  return top.map((coin) => {
    const market = priceMap.get(coin.id);
    return {
      ...coin,
      data: {
        price: market?.current_price,
        price_change_percentage_24h: market?.price_change_percentage_24h ?? 0,
      },
    };
  });
}

export async function getPools(
  _coinId: string,
  network: string | null,
  contractAddress: string | null,
): Promise<{ id: string }> {
  if (!network || !contractAddress) return { id: '' };

  try {
    const url = `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${contractAddress}/pools?page=1`;
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return { id: '' };
    const json = await response.json();
    const poolAddress = json?.data?.[0]?.attributes?.address ?? '';
    return { id: poolAddress };
  } catch {
    return { id: '' };
  }
}
  
 