import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant"
});

export const metadata: Metadata = {
  title: "Loading Academy",
  description: "Preparing the next generation",
  manifest: "/manifest.webmanifest",
  applicationName: "Loading Academy",
  appleWebApp: {
    capable: true,
    title: "Loading Academy",
    statusBarStyle: "black-translucent"
  }
};

export const viewport: Viewport = {
  themeColor: "#050509",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${cormorant.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
