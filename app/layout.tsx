import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/back-to-top";

// ITC Cheltenham Std, licensed by the client — the new display face.
// Archivo moves to a secondary role (eyebrow labels); Inter stays for body copy.
const cheltenham = localFont({
  src: [
    { path: "../public/fonts/cheltenham/CheltenhamStdLight.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/cheltenham/CheltenhamStdLightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/cheltenham/CheltenhamStdBook.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/cheltenham/CheltenhamStdBookItalic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/cheltenham/CheltenhamStdBold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/cheltenham/CheltenhamStdBoldItalic.otf", weight: "700", style: "italic" },
    { path: "../public/fonts/cheltenham/CheltenhamStdUltra.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-cheltenham",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const SITE_URL = "https://piusandnoblelp.com";
const SITE_DESCRIPTION =
  "Full-service law firm in Abuja, Nigeria. Corporate, real estate, litigation, energy, data protection and AI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pius & Noble LP",
  description: SITE_DESCRIPTION,
  applicationName: "Pius & Noble LP",
  authors: [{ name: "Pius & Noble LP" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Pius & Noble LP",
    title: "Pius & Noble LP",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pius & Noble LP — Legal Practitioners, Abuja, Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pius & Noble LP",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // Proposal draft: keep out of search results until the firm approves it.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cheltenham.variable} ${archivo.variable} ${inter.variable}`}>
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
