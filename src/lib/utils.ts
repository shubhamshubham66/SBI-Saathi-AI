import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicts.
 * Used by all Shadcn UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
