"use client";
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Home, Map, Building2, PenTool, HardHat, X, Upload, Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

// Composant Principal
export default function ImmobilierPage() {
  const [activeModal, setActiveModal] = useState<'achat' | 'gestion' | 'construction' | null>(null);
  const [loading, setLoading] = useState(false);

  const closeModal = () => setActiveModal(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const finalData: any = {};

      formData.forEach((value, key) => {
        if (!(value instanceof File)) finalData[key] = value;
      });

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
            finalData[input.name] = result.secure_url;
          }
        }
      }

      await addDoc(collection(db, "demandes_immo"), {
        categorie: "Immobilier",
        type_projet: activeModal,
        ...finalData,
        createdAt: serverTimestamp(),
        status: "en_attente"
      });

      alert("🏠 Votre projet immobilier a été transmis avec succès !");
      closeModal();
    } catch (error) {
      console.error(error);
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
              Expertise Immobilière CI
            </span>
            <h1 className="text-5xl md:text-6xl font-black leading-tight italic">
              Bâtir et sécuriser <br /> 
              <span className="text-brand-yellow">votre patrimoine</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
              Que vous cherchiez un terrain, un logement ou un investissement, notre équipe vous accompagne avec des offres fiables et sécurisées.
            </p>
            <button 
              onClick={() => setActiveModal('achat')}
              className="bg-brand-yellow text-brand-brown px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              FAIRE UNE DEMANDE <ArrowRight size={20} />
            </button>
          </div>
          
          {/* --- REMPLACEMENT PAR UNE IMAGE RÉELLE --- */}
          <div className="relative h-[450px] rounded-[50px] border-8 border-white/10 overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Immobilier de luxe Côte d'Ivoire" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-blue/10"></div>
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl flex items-center gap-3">
              <div className="bg-brand-yellow p-2 rounded-lg">
                <Home size={24} className="text-brand-blue" />
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-blue uppercase">Propriétés Vérifiées</p>
                <p className="text-xs font-bold text-gray-500 italic">100% Sécurisé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-blue uppercase italic mb-6 underline decoration-brand-yellow">Nos solutions immobilières</h2>
          <p className="text-brand-brown font-medium">Des services clés en main pour concrétiser vos projets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ImmoCard icon={<Home />} title="Achat et vente" desc="Accompagnement personnalisé pour vendre ou acheter une maison." />
          <ImmoCard icon={<Map />} title="Achat de terrain" desc="Terrains viabilisés, titrés et prêts pour vos projets." />
          <ImmoCard icon={<Building2 />} title="Gestion locative" desc="Gestion complète de vos biens avec rigueur et transparence." />
          <ImmoCard icon={<PenTool />} title="Architecture" desc="Conception de plans modernes et fonctionnels." />
          <ImmoCard icon={<HardHat />} title="Construction" desc="Suivi rigoureux du chantier de A à Z." />
          <div className="bg-brand-blue rounded-[35px] p-8 flex flex-col justify-center items-center text-center text-white shadow-xl">
              <h4 className="font-black text-xl mb-4 italic">Un projet spécifique ?</h4>
              <button onClick={() => setActiveModal('construction')} className="bg-brand-yellow text-brand-brown px-6 py-3 rounded-xl font-black uppercase text-sm hover:scale-105 transition-all">Lancer mon projet</button>
          </div>
        </div>
      </section>

      {/* --- MODAL --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-blue/90 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-white w-full max-w-2xl rounded-[35px] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-[35px]">
              <h3 className="text-xl font-black text-brand-blue uppercase italic">Demande Immobilière</h3>
              <button onClick={closeModal} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="nom" label="Nom complet" type="text" required />
                <Input name="telephone" label="Téléphone" type="tel" required />
              </div>
              <Input name="email" label="Adresse Email" type="email" required />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Détails de votre besoin</label>
                <textarea name="message" className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-brand-yellow outline-none font-bold text-brand-blue min-h-[100px]" placeholder="Précisez votre demande..."></textarea>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-brand-blue text-brand-yellow py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-brand-brown transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>TRANSMETTRE <Send size={20} /></>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Composants Internes d'aide
function ImmoCard({ icon, title, desc }: any) {
  return (
    <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:border-brand-yellow transition-all group">
      <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 group-hover:bg-brand-yellow transition-colors">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-black text-brand-blue uppercase mb-3">{title}</h3>
      <p className="text-brand-brown text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function Input({ label, type, name, required }: any) {
  return (
    <div className="flex-1">
      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 ml-2 tracking-widest">{label}</label>
      <input name={name} required={required} type={type} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-brand-yellow rounded-xl outline-none font-bold text-brand-blue" />
    </div>
  );
}