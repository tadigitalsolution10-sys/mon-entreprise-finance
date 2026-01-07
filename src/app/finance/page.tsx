"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PiggyBank, Briefcase, TrendingUp, HandCoins, ShieldCheck, X, Send, Loader2, ArrowRight, Wallet } from 'lucide-react';

export default function FinancePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      await addDoc(collection(db, "demandes_finance"), {
        ...data,
        categorie: "Finance",
        createdAt: serverTimestamp(),
        status: "en_attente"
      });

      alert("✅ Votre demande financière a été transmise. Un conseiller vous contactera.");
      setShowModal(false);
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-brand-blue pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <span className="bg-brand-yellow text-brand-brown px-4 py-1 rounded-full font-bold text-sm uppercase">
              Solutions Financières CI
            </span>
            <h1 className="text-5xl md:text-6xl font-black italic leading-tight">
              Donnez vie à vos <br /> 
              <span className="text-brand-yellow">ambitions</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl">
              Spécialiste du financement en Côte d’Ivoire, nous vous accompagnons dans vos projets : microcrédit, placements et conseils financiers rapides.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-brand-yellow text-brand-brown px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              FAITES VOTRE DEMANDE <ArrowRight size={20} />
            </button>
          </div>
          
          {/* --- REMPLACEMENT PAR UNE IMAGE RÉELLE --- */}
          <div className="relative h-[450px] rounded-[50px] overflow-hidden border-8 border-white/10 shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Croissance financière et réussite" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-5 rounded-2xl flex items-center gap-4 shadow-xl">
              <div className="bg-brand-yellow p-3 rounded-xl">
                <TrendingUp className="text-brand-blue w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-brand-blue uppercase">Projets Financés</p>
                <p className="text-lg font-bold text-brand-brown">+500 en 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-blue uppercase italic mb-6 underline decoration-brand-yellow">La finance accessible à tous</h2>
          <p className="text-brand-brown font-medium italic">
            "Bien gérer ses finances, ce n’est pas seulement épargner : c’est savoir investir intelligemment."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FinCard icon={<HandCoins />} title="Microcrédit" desc="Financement rapide pour vos besoins urgents ou petits projets." />
          <FinCard icon={<Briefcase />} title="Crédit Entreprise" desc="Boostez votre activité avec nos solutions de financement pro." />
          <FinCard icon={<PiggyBank />} title="Placements" desc="Optimisez votre épargne avec des rendements sécurisés." />
          <FinCard icon={<ShieldCheck />} title="Conseils" desc="Un accompagnement pour mieux gérer et diversifier vos revenus." />
        </div>
      </section>

      {/* --- FORM MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-blue/95 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[40px] relative z-10 overflow-hidden shadow-2xl">
            <div className="p-8 bg-brand-yellow text-brand-blue flex justify-between items-center">
              <h3 className="font-black uppercase italic text-xl">Nouvelle Demande</h3>
              <button onClick={() => setShowModal(false)} className="bg-white/50 p-2 rounded-full"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <input name="nom" placeholder="Nom complet" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold focus:ring-2 ring-brand-yellow" />
              <input name="telephone" placeholder="Téléphone" required type="tel" className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold focus:ring-2 ring-brand-yellow" />
              
              <select name="service_finance" className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold text-gray-500">
                <option value="">Type de solution</option>
                <option value="microcredit">Microcrédit</option>
                <option value="credit_conso">Crédit à la consommation</option>
                <option value="financement_pro">Financement d'entreprise</option>
                <option value="placement">Placement / Épargne</option>
              </select>

              <input name="montant" placeholder="Montant souhaité (FCFA)" className="w-full p-4 bg-gray-100 rounded-2xl outline-none font-bold focus:ring-2 ring-brand-yellow" />

              <button 
                disabled={loading}
                className="w-full bg-brand-blue text-brand-yellow py-5 rounded-2xl font-black text-xl hover:bg-brand-brown transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "DEMANDER L'ACCOMPAGNEMENT"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FinCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white border-2 border-gray-50 p-8 rounded-[35px] hover:border-brand-yellow transition-all text-center">
      <div className="text-brand-blue mb-4 flex justify-center">{React.cloneElement(icon, { size: 40 })}</div>
      <h4 className="font-black text-brand-blue uppercase text-sm mb-2">{title}</h4>
      <p className="text-gray-500 text-xs font-bold leading-relaxed">{desc}</p>
    </div>
  );
}