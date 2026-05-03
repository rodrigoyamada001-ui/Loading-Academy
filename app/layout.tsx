import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Loading Academy | Formação Ministerial Digital",
  description: "Preparando líderes para a próxima geração.",
  manifest: "/manifest.webmanifest",
  applicationName: "Loading Academy",
  appleWebApp: {
    capable: true,
    title: "Loading Academy",
    statusBarStyle: "black-translucent"
  },
  icons: {
    apple: "/icon.svg",
    shortcut: "/icon.svg"
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
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
