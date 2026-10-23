import type { Metadata } from "next";
import { Instrument_Sans, Cormorant_Garamond } from "next/font/google";
import { Navbar, Footer } from "../shared/components";
import "lenis/dist/lenis.css";
import "@calarys/ui/styles.css";
import "@/shared/styles/globals.css";
import "@/shared/styles/tokens.css";
import { SmoothScrollProvider } from "../shared/providers/smooth-scroll-provider";
import { toExplorerItems } from "@/features/explorer";
import { getComponentDefinitions } from "@/registry/component-registry";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
});
export const metadata: Metadata = {
  title: "Calarys",
  description: "Designed with intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${cormorantGaramond.variable} antialiased`}
    >
      <body className="relative w-full min-h-svh flex flex-col">
        <SmoothScrollProvider>
          <Navbar searchItems={toExplorerItems(getComponentDefinitions())} />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
