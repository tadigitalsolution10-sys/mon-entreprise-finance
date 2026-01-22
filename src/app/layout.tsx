import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import Partners from "@/components/Partners"; 
import AdPopup from "@/components/ads/AdPopup";
import CookieBanner from "@/components/ads/CookieBanner"; 
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics"; // <--- 1. IMPORT DU TRAQUEUR

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note : Si ton layout devient un "Client Component" à cause de Analytics, 
// les Metadata doivent normalement être exportées depuis un fichier layout.server.tsx 
// ou Analytics doit être importé dynamiquement. Mais pour l'instant, testons comme ça :
export const metadata = {
  title: "Iverservices | Votre Partenaire d'Affaires en cote d'ivoire",
  description: "Solutions d'assurances, services bancaires, immobilier et finance en Côte d'Ivoire.",
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
        {/* 2. LE TRAQUEUR ANALYTICS (Invisible, suit chaque visite) */}
        <Analytics />

        {/* Navbar fixe en haut */}
        <Navbar />
        
        {/* Main prend tout l'espace restant pour pousser le footer en bas */}
        <main className="flex-grow overflow-x-hidden pt-20">
          {children}
        </main>

        {/* Sections globales affichées sur toutes les pages */}
        <Partners />    
        <Testimonials /> 
        
        {/* Footer en bas */}
        <Footer />
        
        <AdPopup />
        <CookieBanner />

        {/* Widget WhatsApp */}
        <WhatsAppFloating />
      </body>
    </html>
  );
}