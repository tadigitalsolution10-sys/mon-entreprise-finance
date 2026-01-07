"use client";
import React from 'react';

const partners = [
  { name: "NSIA Banque", logo: "/partners/NSIA.png" },
  { name: "BOA", logo: "/partners/BOA.png" },
  { name: "Coris Bank", logo: "/partners/CORIS.png" },
  { name: "Atlantique Bank", logo: "/partners/ATLANTIQUE.png" },
  { name: "GT Bank", logo: "/partners/GTBANK.png" },
  // On duplique pour que la boucle soit fluide
  { name: "NSIA Banque", logo: "/partners/NSIA.png" },
  { name: "BOA", logo: "/partners/BOA.png" },
  { name: "Coris Bank", logo: "/partners/CORIS.png" },
  { name: "Atlantique Bank", logo: "/partners/ATLANTIQUE.png" },
  { name: "GT Bank", logo: "/partners/GTBANK.png" },
];

export default function Partners() {
  return (
    <section className="py-12 bg-white border-t border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Nos Partenaires Institutionnels
        </p>
      </div>

      {/* Container du slider */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center gap-12 md:gap-24">
          {partners.map((partner, index) => (
            <div key={index} className="w-32 md:w-40 h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Deuxième groupe identique pour l'effet de boucle infinie */}
        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap items-center gap-12 md:gap-24 ml-12 md:ml-24">
          {partners.map((partner, index) => (
            <div key={`dup-${index}`} className="w-32 md:w-40 h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ajout des styles CSS pour l'animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
      `}</style>
    </section>
  );
}