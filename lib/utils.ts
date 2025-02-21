import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backgroundStyle2 = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    background-image:
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 2px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 2px);
    background-size: 100px 100px; /* Taille des carrés */
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;
