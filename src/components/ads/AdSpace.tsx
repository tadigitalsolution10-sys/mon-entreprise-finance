"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { ArrowRight, Megaphone } from 'lucide-react';

export default function AdSpace({ type }: { type: string }) {
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const q = query(
          collection(db, "ads"), 
          where("type", "==", type), 
          where("active", "==", true),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAd(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Erreur pub:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [type]);

  if (loading || !ad) return null;

  return (
    <div className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <a 
          href={ad.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex items-center w-full h-20 md:h-28 bg-brand-blue rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
        >
          {/* Image sur le côté gauche (style Jumia) */}
          <div className="absolute right-0 top-0 h-full w-1/3 md:w-1/2 overflow-hidden">
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent"></div>
          </div>

          {/* Contenu textuel horizontal */}
          <div className="relative z-10 flex items-center justify-between w-full px-6 md:px-12">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-brand-yellow rounded-full items-center justify-center text-brand-blue shrink-0 animate-pulse">
                <Megaphone size={20} className="-rotate-12" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-brand-yellow font-black text-[10px] uppercase tracking-widest italic leading-none mb-1">
                  Offre Partenaire
                </span>
                <h3 className="text-white text-sm md:text-xl font-black uppercase italic leading-tight truncate max-w-[200px] md:max-w-md">
                  {ad.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 md:px-6 md:py-3 rounded-xl font-black text-[10px] md:text-xs uppercase hover:bg-brand-yellow transition-colors shrink-0 shadow-lg">
              Voir <span className="hidden md:inline">l'offre</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Petit tag "Ad" */}
          <div className="absolute top-0 left-0 bg-black/20 px-2 py-0.5 rounded-br-lg">
             <span className="text-[8px] text-white/50 font-bold uppercase">Publicité</span>
          </div>
        </a>
      </div>
    </div>
  );
}