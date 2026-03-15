import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LakeReel – Fishing Reports & Tackle",
  description: "Real-time fishing reports, lake conditions, and tackle recommendations for anglers.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-slate-950 text-white`}>
        <AuthProvider>
          <main className="min-h-dvh pb-20">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
