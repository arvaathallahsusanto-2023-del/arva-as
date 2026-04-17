import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARJECT | Islamic Economics Research Network",
  description: "Connecting Islamic Economics research with real-world stakeholders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#020409] text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
