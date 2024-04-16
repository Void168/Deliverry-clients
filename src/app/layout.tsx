import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "../provider/NextUiProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Culinary Tom",
  description: "Delivery Food Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
