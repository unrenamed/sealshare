import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export * from "./openpgp";
export * from "./rand";
export * from "./unkey";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDurationToTimestamp(duration: string): number {
  const currentTimeInMillis = Date.now();
  const durationUnitsInMillis: Record<string, number> = {
    h: 60 * 60 * 1000, // 1 hour in milliseconds
    d: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    w: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
  };

  const value = parseInt(duration.slice(0, -1), 10);
  const unit = duration.slice(-1);

  if (!durationUnitsInMillis[unit]) {
    throw new Error(
      "Invalid time unit. Use 'h' for hours, 'd' for days, or 'w' for weeks."
    );
  }

  return currentTimeInMillis + value * durationUnitsInMillis[unit];
}
