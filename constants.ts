import { CandlestickSeriesOptions, DeepPartial } from 'lightweight-charts';

export const PERIOD_CONFIG: Record<Period, { days: number; interval?: string }> = {
  daily: { days: 1 },
  weekly: { days: 7 },
  monthly: { days: 30 },
  '3months': { days: 90 },
  '6months': { days: 180 },
  yearly: { days: 365 },
  max: { days: 365 },
};

export const PERIOD_BUTTONS: { value: Period; label: string }[] = [
  { value: 'daily', label: '1D' },
  { value: 'weekly', label: '1W' },
  { value: 'monthly', label: '1M' },
  { value: '3months', label: '3M' },
  { value: '6months', label: '6M' },
  { value: 'yearly', label: '1Y' },
  { value: 'max', label: 'Max' },
];

export const LIVE_INTERVAL_BUTTONS: { value: '1s' | '1m'; label: string }[] = [
  { value: '1s', label: '1s' },
  { value: '1m', label: '1m' },
];

export const getChartConfig = (height: number, showTime: boolean) => ({
  layout: {
    background: { color: 'transparent' },
    textColor: '#a3aed0',
  },
  grid: {
    vertLines: { color: '#1e2833' },
    horzLines: { color: '#1e2833' },
  },
  timeScale: {
    borderColor: '#1e2833',
    timeVisible: showTime,
    secondsVisible: false,
  },
  rightPriceScale: {
    borderColor: '#1e2833',
  },
  localization: {
    priceFormatter: (price: number) =>
      '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  height,
});

export const getCandlestickConfig = (): DeepPartial<CandlestickSeriesOptions> => ({
  upColor: '#76da44',
  downColor: '#ff685f',
  borderUpColor: '#76da44',
  borderDownColor: '#ff685f',
  wickUpColor: '#76da44',
  wickDownColor: '#ff685f',
});
