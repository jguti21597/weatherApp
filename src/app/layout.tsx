import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather",
  description: "Weather App For Cyclists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("relative h-full antialiased font-sans bg", inter.className)}>
        <main className="relative flex flex-col min-h-screen mx-auto w-full max-w-screen-xl p-2.5 md:px-20">
          <Navbar/>
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
