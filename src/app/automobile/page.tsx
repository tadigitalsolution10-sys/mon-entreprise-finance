"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Car, Key, ShieldCheck, CreditCard, X, Send, Loader2, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';

export default function AutomobilePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");

  const openModal = (modelName: string = "") => {
    setSelectedModel(modelName);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      await addDoc(collection(db, "demandes_auto"), {
        ...data,
        categorie: "Automobile",
        createdAt: serverTimestamp(),
        status: "en_attente"
      });

      alert("🚗 Votre demande automobile a été transmise avec succès !");
      setShowModal(false);
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* --- HERO SECTION --- */}
      <section className="bg-brand-blue pt-32 pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-6">
            <span className="bg-brand-yellow text-brand-brown px-4 py-1 rounded-full font-bold text-sm uppercase tracking-widest">
              Solutions Mobilité CI
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic leading-tight">
              Achat & <br /> 
              <span className="text-brand-yellow">Location Auto</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
              Iverservices vous accompagne dans l'acquisition ou la location de votre véhicule avec des solutions de financement adaptées.
            </p>
            <button 
              onClick={() => openModal()}
              className="bg-brand-yellow text-brand-brown px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all flex items-center gap-3 uppercase italic"
            >
              Faire une demande <ArrowRight size={24} />
            </button>
          </div>
          
          <div className="relative hidden lg:block">
             <div className="absolute inset-0 bg-brand-yellow/20 blur-[100px] rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800" 
               alt="Luxury Car" 
               className="relative z-10 rounded-[60px] border-4 border-white/10 shadow-2xl rotate-3"
             />
          </div>
        </div>
      </section>

      {/* --- NOS OFFRES AVEC PHOTOS RÉELLES --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-blue uppercase italic mb-4">Nos offres disponibles</h2>
          <div className="h-2 w-24 bg-brand-yellow mx-auto rounded-full mb-6"></div>
          <p className="text-brand-brown font-bold uppercase tracking-widest text-sm">Réservez ou achetez votre véhicule en quelques clics</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <VehicleCard 
            img="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600"
            title="Suzuki Dzire 2015" 
            type="SUV" 
            status="Disponible maintenant" 
            desc="Véhicule robuste et idéal pour vos déplacements professionnels ou familiaux en ville."
            onSelect={() => openModal("Suzuki Dzire 2015")}
          />
          <VehicleCard 
            img="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600"
            title="Renault Duster" 
            type="Berline" 
            status="En stock" 
            desc="Le confort et l'élégance réunis pour vos trajets urbains et interurbains quotidiens."
            onSelect={() => openModal("Renault Duster")}
          />
          <VehicleCard 
            img="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600"
            title="Kia Sportage" 
            type="Utilitaire" 
            status="Prêt à l'emploi" 
            desc="Parfait pour vos livraisons ou vos activités professionnelles nécessitant du volume."
            onSelect={() => openModal("Kia Sportage")}
          />
        </div>
      </section>

      {/* --- SERVICES RÉCAPITULATIFS --- */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AutoCard icon={<Car size={32}/>} title="Achat" desc="Neuf & Occasion" />
          <AutoCard icon={<Key size={32}/>} title="Location" desc="Courte & Longue durée" />
          <AutoCard icon={<ShieldCheck size={32}/>} title="Assurance" desc="Protection complète" />
          <AutoCard icon={<CreditCard size={32}/>} title="Crédit" desc="Facilités de paiement" />
        </div>
      </section>

      {/* --- MODAL DE DEMANDE --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-blue/95 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[40px] relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 bg-brand-yellow text-brand-blue flex justify-between items-center">
              <div>
                <h3 className="font-black uppercase italic text-2xl leading-none">Demande Auto</h3>
                <p className="text-[10px] font-bold opacity-70 mt-1 uppercase">Partenaire Mobilité Iverservices</p>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-white/50 p-3 rounded-full hover:bg-white transition-colors"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="nom" placeholder="Votre nom" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold text-brand-blue focus:ring-2 ring-brand-yellow transition-all" />
                <input name="telephone" placeholder="Téléphone" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold text-brand-blue focus:ring-2 ring-brand-yellow transition-all" />
              </div>
              
              <select name="type_service" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold text-brand-blue">
                <option value="achat_location">Achat ou Location</option>
                <option value="assurance">Assurance Auto</option>
                <option value="financement">Financement / Crédit</option>
              </select>

              <div className="relative">
                <input 
                    name="modele_prefere" 
                    defaultValue={selectedModel} 
                    placeholder="Modèle souhaité" 
                    className="w-full p-4 bg-gray-50 border-2 border-brand-yellow rounded-2xl outline-none font-black text-brand-blue" 
                />
                <div className="absolute right-4 top-4 text-brand-yellow opacity-40"><Car size={20}/></div>
              </div>
              
              <textarea name="details" placeholder="Informations complémentaires (budget, durée...)" className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold text-brand-blue min-h-[100px]"></textarea>

              <button 
                disabled={loading}
                className="w-full bg-brand-blue text-brand-yellow py-5 rounded-2xl font-black text-xl hover:bg-brand-brown transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>ENVOYER MA DEMANDE <Send size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant Carte Véhicule avec Image
function VehicleCard({ img, title, type, status, desc, onSelect }: any) {
  return (
    <div className="bg-white rounded-[45px] overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-gray-100">
      <div className="h-56 overflow-hidden relative">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-brand-yellow text-brand-blue px-4 py-1 rounded-full text-[10px] font-black uppercase italic shadow-lg">
          Location & Achat
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase mb-2">
          <CheckCircle2 size={14} /> {status}
        </div>
        <h3 className="text-2xl font-black text-brand-blue uppercase italic mb-1">{title}</h3>
        <p className="text-brand-brown font-bold text-xs mb-4 uppercase tracking-tighter">Catégorie : {type}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden">{desc}</p>
        <button 
          onClick={onSelect} 
          className="w-full py-4 bg-brand-blue text-white rounded-2xl font-black group-hover:bg-brand-yellow group-hover:text-brand-blue transition-all uppercase italic text-sm shadow-md"
        >
          Faire une demande
        </button>
      </div>
    </div>
  );
}

function AutoCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-[35px] text-center border-2 border-gray-50 hover:border-brand-yellow transition-all">
      <div className="text-brand-yellow flex justify-center mb-4">{icon}</div>
      <h4 className="font-black text-brand-blue uppercase text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs font-bold uppercase">{desc}</p>
    </div>
  );
}