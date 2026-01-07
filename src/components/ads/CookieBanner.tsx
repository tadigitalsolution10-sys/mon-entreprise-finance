"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si le cookie a déjà été accepté
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Afficher la bannière après 2 secondes
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[110] md:left-auto md:max-w-md animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-brand-blue border-2 border-brand-yellow/30 p-6 rounded-[30px] shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="bg-brand-yellow/20 p-3 rounded-2xl shrink-0">
            <ShieldCheck className="text-brand-yellow" size={28} />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-white font-black uppercase italic text-sm tracking-wider">
              Respect de votre <span className="text-brand-yellow">Vie Privée</span>
            </h4>
            <p className="text-blue-100 text-[11px] leading-relaxed font-medium">
              Iverservices utilise des cookies pour améliorer votre expérience, analyser le trafic et personnaliser nos solutions financières.
            </p>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={acceptCookies}
                className="bg-brand-yellow text-brand-blue px-6 py-2.5 rounded-xl font-black uppercase text-[10px] hover:scale-105 transition-all shadow-lg"
              >
                Accepter tout
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/50 hover:text-white px-4 py-2.5 rounded-xl font-bold uppercase text-[10px] transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="text-white/30 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}