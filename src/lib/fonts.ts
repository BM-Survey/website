import { Roboto, Urbanist } from "next/font/google";

/** Display font — headings, numbers and brand marks. */
export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

/** Body font — paragraphs and UI copy. */
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});
