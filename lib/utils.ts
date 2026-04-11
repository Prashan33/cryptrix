import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number): string {
  if (value >= 1_000_000_000) {
    return '$' + (value / 1_000_000_000).toFixed(2) + 'B';
  }
  if (value >= 1_000_000) {
    return '$' + (value / 1_000_000).toFixed(2) + 'M';
  }
  return formatCurrency(value);
}

export const ELLIPSIS = '...' as const;

export function buildPageNumbers(currentPage: number, totalPages: number): (number | typeof ELLIPSIS)[] {
  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);
  if (currentPage > 3) pages.push(ELLIPSIS);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < totalPages - 2) pages.push(ELLIPSIS);
  pages.push(totalPages);

  return pages;
}

export function formatPercentage(value: number | null | undefined): string {
  if (value == null) return 'N/A';
  return (value >= 0 ? '+' : '') + value.toFixed(2) + '%';
}

export function convertOHLCData(data: OHLCData[]) {
  return data.map(([time, open, high, low, close]) => ({
    time: time as unknown as import('lightweight-charts').Time,
    open,
    high,
    low,
    close,
  }));
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}
