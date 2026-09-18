import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AJS Technologies | We build what’s next",
  description: "Thoughtful websites, custom software, mobile applications, AI solutions, and IT services. Build your next chapter with AJS Technologies.",
  icons: {
    icon: "/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.svg",
    apple: "/ASJ%20Logo/ASJ_POR_BLUE_LogoWithoutText.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
