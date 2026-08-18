import type { Metadata } from "next";
import { Instrument_Sans, Cormorant_Garamond } from "next/font/google";
import { Navbar, Footer } from "../shared/components";
import "@calarys/ui/styles.css";
import "@/shared/styles/globals.css";
import "@/shared/styles/tokens.css";
import { SmoothScrollProvider } from "../shared/providers/smooth-scroll-provider";

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
      className={`${instrumentSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="relative w-full min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
