import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
