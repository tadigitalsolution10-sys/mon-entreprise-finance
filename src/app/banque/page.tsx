"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Landmark, Users, Briefcase, X, Upload, Send, Loader2, CheckCircle } from 'lucide-react';

export default function BanquePage() {
  const [activeModal, setActiveModal] = useState<'ouverture' | 'epargne' | 'dat' | null>(null);
  const [loading, setLoading] = useState(false);

  const closeModal = () => setActiveModal(null);

  // --- FONCTION D'ENVOI CORRIGÉE ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const finalData: any = {}; 

      // 1. Extraire uniquement les textes (Ignorer les objets File ici)
      formData.forEach((value, key) => {
        if (!(value instanceof File)) {
          finalData[key] = value;
        }
      });

      // 2. Gérer les uploads vers Cloudinary
      const fileInputs = e.currentTarget.querySelectorAll('input[type="file"]');
      for (const input of Array.from(fileInputs) as HTMLInputElement[]) {
        if (input.files && input.files[0]) {
          const fileData = new FormData();
          fileData.append("file", input.files[0]);
          fileData.append("upload_preset", "iverservices_preset");
          fileData.append("cloud_name", "dugxgkqjh");

          const res = await fetch(`https://api.cloudinary.com/v1_1/dugxgkqjh/image/upload`, {
            method: "POST",
            body: fileData
          });
          
          if (res.ok) {
            const result = await res.json();
            // On enregistre l'URL du lien Cloudinary dans le champ correspondant
            finalData[input.name] = result.secure_url;
          }
        }
      }

      // 3. Envoi à Firebase (finalData ne contient plus d'objets File invalides)
      await addDoc(collection(db, "demandes_banque"), {
        type_demande: activeModal,
        ...finalData,
        createdAt: serverTimestamp(),
        status: "en_attente"
      });

      alert("🎉 Votre demande bancaire a été transmise avec succès !");
      closeModal();
    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-brand-blue pt-32 pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-6">
            <span className="bg-brand-yellow text-brand-brown px-4 py-1 rounded-full font-bold text-sm uppercase tracking-widest">
              Partenaire Bancaire CI
            </span>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Bâtissez votre avenir <br /> 
              <span className="text-brand-yellow">en toute confiance</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Acteur engagé du secteur bancaire en Côte d’Ivoire, iverservice vous accompagne avec des services financiers innovants, sûrs et accessibles.
            </p>
            <button 
              onClick={() => setActiveModal('ouverture')}
              className="bg-brand-yellow text-brand-brown px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all uppercase"
            >
              Ouvrez votre compte en ligne
            </button>
          </div>
          
          {/* IMAGE RÉELLE PROFESSIONNELLE AJOUTÉE ICI */}
          <div className="relative h-[450px] rounded-[40px] border-8 border-white/10 overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1000" 
                alt="Conseiller bancaire professionnel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/20"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-2xl flex items-center gap-3">
                <div className="bg-brand-yellow p-2 rounded-lg">
                  <Landmark size={24} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-brand-blue uppercase">Service Certifié</p>
                  <p className="text-xs font-bold text-gray-500 italic">Accompagnement VIP</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-blue uppercase italic mb-6">Nos solutions bancaires</h2>
          <p className="text-brand-brown font-medium leading-relaxed">
            Gamme complète de services financiers pour particuliers et professionnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <Users className="text-brand-yellow w-10 h-10" />
              <h3 className="text-2xl font-black text-brand-blue uppercase">Pour Particuliers</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ServiceItem title="Comptes courants & épargne" desc="Gérez vos dépenses et faites fructifier votre argent." />
              <ServiceItem title="Cartes bancaires" desc="Des cartes sécurisées pour vos achats mondiaux." />
              <ServiceItem title="Crédit personnel" desc="Financez vos projets avec des prêts souples." />
              <ServiceItem title="Épargne jeunesse" desc="Aidez vos enfants à bien démarrer." />
            </div>
          </div>

          <div className="bg-brand-blue p-10 rounded-[40px] text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Briefcase className="text-brand-yellow w-10 h-10" />
              <h3 className="text-2xl font-black uppercase">Pour Professionnels</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ServiceItem white title="Comptes professionnels" desc="Gestion optimale de vos opérations financières." />
              <ServiceItem white title="Financement d'entreprise" desc="Soutenez la croissance de votre activité." />
              <ServiceItem white title="Crédit d'équipement" desc="Investissez dans du matériel ou du stock." />
              <ServiceItem white title="Sécurisation des paiements" desc="Opérations financières sécurisées." />
            </div>
          </div>
        </div>
      </section>

      {/* --- ACTIONS RAPIDES --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-brand-blue mb-10 uppercase">Placement & Épargne</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button onClick={() => setActiveModal('epargne')} className="flex-1 bg-white border-4 border-brand-yellow p-8 rounded-3xl font-black text-brand-blue hover:scale-105 transition-all shadow-sm">
                    COMPTE ÉPARGNE
                </button>
                <button onClick={() => setActiveModal('dat')} className="flex-1 bg-brand-yellow p-8 rounded-3xl font-black text-brand-brown hover:scale-105 transition-all shadow-xl">
                    COMPTE D.A.T
                </button>
            </div>
        </div>
      </section>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-blue/90 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-2xl rounded-[35px] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-[35px]">
              <h3 className="text-xl font-black text-brand-blue uppercase italic">
                {activeModal === 'ouverture' && "Ouverture de compte"}
                {activeModal === 'epargne' && "Formulaire Épargne"}
                {activeModal === 'dat' && "Formulaire D.A.T"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {activeModal === 'ouverture' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="email" label="Adresse Email" type="email" required />
                    <Input name="phone" label="Téléphone" type="tel" required />
                  </div>
                  <Input name="habitation" label="Lieu d'habitation" type="text" required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileInput name="attestation_travail" label="Attestation de travail" />
                    <FileInput name="certificat_residence" label="Certificat de résidence" />
                    <FileInput name="piece_identite" label="Pièce d'identité" />
                    <FileInput name="photo_identite" label="Photo d'identité" />
                  </div>
                </>
              )}

              {(activeModal === 'epargne' || activeModal === 'dat') && (
                <>
                  <Select name="banque" label="Sélectionnez la banque" options={["NSIA Banque", "BOA", "Coris Bank", "Atlantique Bank", "GT Bank"]} />
                  <Input name="fullname" label="Nom complet" type="text" required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="email" label="Adresse Email" type="email" required />
                    <Input name="phone" label="Téléphone" type="tel" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileInput name="piece_identite" label="Pièce d'identité" />
                    <FileInput name="certificat_residence" label="Certificat de résidence" />
                  </div>
                  {activeModal === 'dat' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="montant" label="Montant 1er dépôt (FCFA)" type="number" required />
                        <Select name="duree" label="Durée du placement" options={["6 mois", "12 mois", "18 mois", "24 mois", "36 mois", "60 mois"]} />
                    </div>
                  )}
                </>
              )}

              <button 
                disabled={loading}
                className="w-full bg-brand-blue text-brand-yellow py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-brand-brown transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>TRANSMETTRE LE DOSSIER <Send size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceItem({ title, desc, white }: any) {
  return (
    <div className="flex gap-4 items-start group">
      <div className={`mt-1 bg-brand-yellow p-1 rounded-full group-hover:scale-110 transition-transform`}>
        <CheckCircle size={16} className="text-brand-blue" />
      </div>
      <div>
        <h4 className={`font-bold uppercase text-sm ${white ? 'text-brand-yellow' : 'text-brand-blue'}`}>{title}</h4>
        <p className={`text-xs ${white ? 'text-blue-100/70' : 'text-brand-brown/70'}`}>{desc}</p>
      </div>
    </div>
  );
}

function Input({ label, type, name, required }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 ml-2 tracking-widest">{label}</label>
      <input name={name} required={required} type={type} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-brand-yellow rounded-xl outline-none font-bold text-brand-blue transition-all" />
    </div>
  );
}

function Select({ label, options, name }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 ml-2 tracking-widest">{label}</label>
      <select name={name} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-brand-yellow rounded-xl outline-none font-bold text-brand-blue transition-all">
        <option value="">-- Choisissez --</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function FileInput({ label, name }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 ml-2 tracking-widest">{label}</label>
      <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-50 hover:bg-white hover:border-brand-blue transition-all cursor-pointer">
        <Upload size={18} className="text-brand-blue mr-2" />
        <span className="text-[10px] font-black text-brand-brown uppercase italic">Joindre</span>
        <input name={name} type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}