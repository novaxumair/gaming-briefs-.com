import { Press_Start_2P, Share_Tech_Mono } from "next/font/google";

export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-share-tech-mono",
  preload: true,
  adjustFontFallback: true,
});

export const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
  preload: true,
  adjustFontFallback: true,
});

export const siteFontVariables = `${shareTechMono.variable} ${pressStart2P.variable}`;
