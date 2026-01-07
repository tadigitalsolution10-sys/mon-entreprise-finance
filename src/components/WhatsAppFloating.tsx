"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloating() {
  const phoneNumber = "2250000000000"; // REMPLACEZ PAR VOTRE NUMÉRO (Format international sans +)
  const message = "Bonjour MultiServ Corp, j'aimerais avoir des informations sur vos services.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3"
    >
      {/* Tooltip qui apparaît au survol */}
      <span className="bg-white text-brand-blue px-4 py-2 rounded-xl shadow-xl font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100">
        Besoin d'aide ?
      </span>
      
      {/* Le bouton rond */}
      <div className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 relative animate-bounce">
        <MessageCircle size={32} fill="currentColor" />
        {/* Petit point de notification */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
      </div>
    </a>
  );
}