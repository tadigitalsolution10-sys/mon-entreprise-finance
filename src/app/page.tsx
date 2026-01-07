"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSpace from "@/components/ads/AdSpace"; 
import { Shield, Landmark, Car, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1516491617412-ddc1a36412e1?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200"
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* SECTION HERO */}
      <section className="relative h-[600px] lg:h-[800px] flex items-center overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover shadow-inner"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase italic">
              Toutes vos solutions financières <br /> 
              <span className="text-brand-yellow">en un seul endroit.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-100 font-bold max-w-xl leading-relaxed">
              Assurance, Banque, Immobilier et Automobile. Nous vous accompagnons dans chaque étape de votre vie avec expertise et transparence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assurances" className="bg-brand-yellow text-brand-blue px-8 py-4 rounded-xl font-black hover:scale-105 transition-all text-center shadow-xl uppercase italic">
                Nos Assurances
              </Link>
              <Link href="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-xl font-black hover:bg-white hover:text-brand-blue transition-all text-center uppercase italic">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === currentImage ? "bg-brand-yellow" : "bg-white/30"}`}></div>
          ))}
        </div>
      </section>

      {/* SECTION SERVICES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-brand-blue mb-4 uppercase italic">Nos Domaines d'Expertise</h2>
            <div className="h-2 w-24 bg-brand-yellow mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              title="Assurances" 
              desc="Auto, Vie et Non-vie. Une protection sur mesure pour vous et vos proches." 
              icon={<Shield className="w-8 h-8 text-brand-blue" />} 
              link="/assurances" 
              color="border-brand-blue" 
            />
            <ServiceCard 
              title="Banque & Finance" 
              desc="Gestion de compte, épargne et financement de vos projets internationaux." 
              icon={<Landmark className="w-8 h-8 text-brand-blue" />} 
              link="/banque" 
              color="border-brand-blue" 
            />
            <ServiceCard 
              title="Immobilier" 
              desc="Gestion locative, achat et vente de biens immobiliers de prestige." 
              icon={<Home className="w-8 h-8 text-brand-blue" />} 
              link="/immobilier" 
              color="border-brand-blue" 
            />
            <ServiceCard 
              title="Automobile" 
              desc="Vente de véhicules et solutions de financement adaptées." 
              icon={<Car className="w-8 h-8 text-brand-blue" />} 
              link="/automobile" 
              color="border-brand-blue" 
            />
          </div>
        </div>
      </section>

      {/* --- BANDEAU PUBLICITAIRE TYPE JUMIA --- */}
      <div className="bg-white">
        <AdSpace type="interstitial" />
      </div>

      {/* SECTION POURQUOI NOUS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-black text-brand-blue uppercase italic leading-none">Pourquoi choisir <br/><span className="text-brand-yellow">Iverservices ?</span></h2>
            <div className="space-y-4">
              <FeatureItem text="Un interlocuteur unique pour tous vos besoins." />
              <FeatureItem text="Des solutions personnalisées et transparentes." />
              <FeatureItem text="Une gestion digitale simplifiée." />
              <FeatureItem text="Expertise internationale en Côte d'Ivoire." />
            </div>
          </div>
          <div className="lg:w-1/2 bg-brand-blue p-10 rounded-[40px] border-b-8 border-brand-yellow shadow-2xl">
            <p className="italic text-white text-xl mb-6 font-medium leading-relaxed">
              "Grâce à leur service de financement, j'ai pu concrétiser mon projet immobilier en moins de 3 mois. Une équipe réactive et professionnelle."
            </p>
            <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                    <p className="font-black text-brand-yellow uppercase text-sm">Jean Dupont</p>
                    <p className="text-blue-200 text-xs font-bold italic">Client Fidèle</p>
                </div>
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center font-black text-brand-blue">JD</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sous-composants
function ServiceCard({ title, desc, icon, link, color }: any) {
  return (
    <div className={`bg-white p-8 rounded-[35px] shadow-sm border-b-4 ${color} hover:shadow-xl hover:-translate-y-2 transition-all group`}>
      <div className="mb-6 p-4 bg-gray-50 inline-block rounded-2xl group-hover:bg-brand-yellow transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-black text-brand-blue mb-3 uppercase italic">{title}</h3>
      <p className="text-gray-500 mb-6 text-sm font-bold leading-relaxed">{desc}</p>
      <Link href={link} className="text-brand-blue font-black flex items-center gap-2 hover:text-brand-yellow transition-all uppercase text-xs tracking-widest">
        DÉCOUVRIR <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl hover:bg-brand-yellow/10 transition-colors cursor-default">
      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
      <span className="text-brand-blue font-black uppercase text-xs italic tracking-wider">{text}</span>
      {/* --- BANDEAU PUBLICITAIRE BAS DE PAGE --- */}
      <div className="pb-12 bg-white">
        <AdSpace type="footer_banner" />
      </div>
    </div>
  );
}