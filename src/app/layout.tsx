import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });
const OpenSans= Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interlude",
  description: "Interlude is a blog made by Henrique William, designed to document his journey as developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetBrainsMono.className} ${OpenSans.className}`}>{children}</body>
    </html>
  );
}
