import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Partners from "@/components/Partners"; // <--- Import des Partenaires
import AdPopup from "@/components/ads/AdPopup";
import CookieBanner from "@/components/ads/CookieBanner"; // Importe le ici
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées pour le SEO
export const metadata: Metadata = {
  title: "Iverservices | Votre Partenaire d'Affaires en cote d'ivoire",
  description: "Solutions d'assurances, services bancaires, immobilier et finance en Côte d'Ivoire. Bâtissez et sécurisez votre avenir avec Iverservices.",
  icons: {
    icon: "/logo.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white flex flex-col min-h-screen`}
      >
        {/* Navbar fixe en haut */}
        <Navbar />
        
        {/* Main prend tout l'espace restant pour pousser le footer en bas */}
        <main className="flex-grow overflow-x-hidden pt-20">
          {children}
        </main>

        {/* Sections globales affichées sur toutes les pages */}
        <Partners />    {/* <--- Affichage des Partenaires */}
        <Testimonials /> {/* <--- Affichage des Témoignages */}
        
        {/* Footer en bas */}
        <Footer />
        {/* AJOUTE LE POP-UP ICI */}
        <AdPopup />
        <CookieBanner />

        {/* Widget WhatsApp */}
        <WhatsAppFloating />
      </body>
    </html>
  );
}