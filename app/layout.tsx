import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EMO MUSIC",
  description: "EMO PUNK MUSIC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased grid grid-cols-12",
          fontSans.variable
        )}
      >
        <main className="flex min-h-screen flex-col col-start-3 col-end-11 border-x-2  bg-neutral-900 max-sm:col-start-1 max-sm:col-end-13">
          {children}
        </main>
      </body>
    </html>
  );
}
