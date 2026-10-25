import { Fraunces, Instrument_Sans } from "next/font/google";

/** Fraunces with the soft axis, the face of the Tessila wordmark, for headings. */
export const display = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"], display: "swap", variable: "--font-display" });

/** Instrument Sans for everything else. */
export const text = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-text" });
