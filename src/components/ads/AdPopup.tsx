"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { X, ExternalLink } from 'lucide-react';

export default function AdPopup() {
  const [ad, setAd] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      // 1. Vérifier si l'utilisateur a déjà vu une pub aujourd's hui
      const lastSeen = localStorage.getItem('last_ad_popup_seen');
      const now = new Date().getTime();
      
      // Si la pub a été vue il y a moins de 24 heures (24 * 60 * 60 * 1000 ms), on ne fait rien
      if (lastSeen && now - parseInt(lastSeen) < 86400000) {
        return; 
      }

      try {
        const q = query(
          collection(db, "ads"),
          where("type", "==", "popup"),
          where("active", "==", true),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setAd(querySnapshot.docs[0].data());
          
          const timer = setTimeout(() => {
            setIsOpen(true);
            // 2. Enregistrer le moment où la pub est apparue
            localStorage.setItem('last_ad_popup_seen', now.toString());
          }, 4000); // 4 secondes pour être sûr que la page est chargée
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error("Erreur popup:", error);
      }
    };
    fetchPopup();
  }, []);

  if (!ad || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-700">
      <div className="relative w-full max-w-[420px] bg-white rounded-[45px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500">
        
        {/* Bouton Fermer */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all hover:rotate-90"
        >
          <X size={24} />
        </button>

        <div className="relative h-[500px] w-full">
          <img 
            src={ad.image} 
            alt={ad.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-10 text-center space-y-5">
            <div className="inline-block bg-brand-yellow text-brand-blue px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] italic shadow-lg">
              Flash Info
            </div>
            
            <h3 className="text-3xl font-black text-white uppercase italic leading-tight drop-shadow-lg">
              {ad.title}
            </h3>
            
            <a 
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-brand-blue px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-yellow hover:scale-105 transition-all shadow-2xl"
            >
              Découvrir maintenant <ExternalLink size={16} />
            </a>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="block w-full text-[10px] text-white/60 font-bold uppercase hover:text-white transition-colors tracking-widest"
            >
              Ignorer pour le moment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}