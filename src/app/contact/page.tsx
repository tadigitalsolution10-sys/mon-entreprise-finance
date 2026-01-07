"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, clock } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      await addDoc(collection(db, "messages_contact"), {
        ...data,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- PARTIE GAUCHE : INFOS & IMAGES --- */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-black text-brand-blue uppercase italic mb-4">
                Contactez <span className="text-brand-yellow">Iverservices</span>
              </h1>
              <p className="text-brand-brown font-bold text-lg">
                Une question ? Un projet ? Notre équipe vous répond sous 24h.
              </p>
            </div>

            {/* Image d'accueil client */}
            <div className="relative rounded-[40px] overflow-hidden h-64 shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=800" 
                alt="Support Client Iverservices" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/20"></div>
            </div>

            {/* Cartes de contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactInfoCard 
                icon={<Phone className="text-brand-yellow" />} 
                title="Téléphone" 
                detail="+225 27 22 23 04 86" 
              />
              <ContactInfoCard 
                icon={<Mail className="text-brand-yellow" />} 
                title="Email" 
                detail="info@ivsc-iverservices.com" 
              />
              <ContactInfoCard 
                icon={<MapPin className="text-brand-yellow" />} 
                title="Bureau" 
                detail="Abidjan, Angré Chateau/CIV" 
              />
              <div className="bg-gray-50 p-6 rounded-[30px] flex items-center gap-4">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                 </div>
                 <p className="text-[10px] font-black text-brand-blue uppercase">Disponible du Lundi au Samedi</p>
              </div>
            </div>

            {/* Deuxième image décorative */}
            <div className="rounded-[40px] overflow-hidden h-40">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                  alt="Bureaux" 
                  className="w-full h-full object-cover opacity-80"
                />
            </div>
          </div>

          {/* --- PARTIE DROITE : FORMULAIRE --- */}
          <div className="bg-brand-blue p-8 md:p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full -mr-16 -mt-16"></div>
            
            <h2 className="text-2xl font-black text-brand-yellow uppercase italic mb-8 flex items-center gap-3">
              <MessageSquare /> Envoyez un message
            </h2>

            {sent ? (
              <div className="bg-white/10 p-10 rounded-[30px] text-center border-2 border-brand-yellow border-dashed">
                <div className="bg-brand-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Send className="text-brand-blue" />
                </div>
                <h3 className="text-white font-black text-xl uppercase mb-2">Message envoyé !</h3>
                <p className="text-blue-100 font-bold text-sm">Merci de votre confiance. Nous revenons vers vous très rapidement.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-brand-yellow font-black uppercase text-xs underline">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-brand-yellow uppercase ml-2 tracking-widest">Nom complet</label>
                  <input name="nom" required className="w-full p-4 bg-white/5 rounded-2xl border-2 border-white/10 outline-none text-white font-bold focus:border-brand-yellow transition-all" placeholder="Ex: Jean Koffi" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-brand-yellow uppercase ml-2 tracking-widest">Email</label>
                    <input name="email" type="email" required className="w-full p-4 bg-white/5 rounded-2xl border-2 border-white/10 outline-none text-white font-bold focus:border-brand-yellow transition-all" placeholder="votre@email.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-brand-yellow uppercase ml-2 tracking-widest">Téléphone</label>
                    <input name="telephone" type="tel" required className="w-full p-4 bg-white/5 rounded-2xl border-2 border-white/10 outline-none text-white font-bold focus:border-brand-yellow transition-all" placeholder="+225..." />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-brand-yellow uppercase ml-2 tracking-widest">Sujet</label>
                  <select name="sujet" className="w-full p-4 bg-white/10 rounded-2xl border-2 border-white/10 outline-none text-white font-bold focus:border-brand-yellow">
                    <option className="text-brand-blue" value="general">Information Générale</option>
                    <option className="text-brand-blue" value="partenariat">Partenariat</option>
                    <option className="text-brand-blue" value="reclamation">Réclamation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-brand-yellow uppercase ml-2 tracking-widest">Message</label>
                  <textarea name="message" required className="w-full p-4 bg-white/5 rounded-2xl border-2 border-white/10 outline-none text-white font-bold focus:border-brand-yellow transition-all min-h-[150px]" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-brand-yellow text-brand-blue py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 uppercase italic"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Envoyer le message <Send size={20}/></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, title, detail }: any) {
  return (
    <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100 hover:border-brand-yellow transition-all group">
      <div className="mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h4>
      <p className="text-brand-blue font-black text-sm">{detail}</p>
    </div>
  );
}