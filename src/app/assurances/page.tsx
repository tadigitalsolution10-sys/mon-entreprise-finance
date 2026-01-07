"use client";
import React, { useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, Heart, Car, Send, Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function InsurancePage() {
  const [activeTab, setActiveTab] = useState<'vie' | 'non-vie'>('vie');
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'standard' | 'auto'>('standard');
  const [selectedService, setSelectedService] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [fileCarteGrise, setFileCarteGrise] = useState<File | null>(null);
  const [filePermis, setFilePermis] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openForm = (service: string) => {
    setSelectedService(service);
    setFormMode(service.toLowerCase().includes('auto') ? 'auto' : 'standard');
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "iverservices_preset"); 
    data.append("cloud_name", "dugxgkqjh");

    const res = await fetch(`https://api.cloudinary.com/v1_1/dugxgkqjh/image/upload`, {
      method: "POST",
      body: data
    });
    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let carteGriseUrl = "";
      let permisUrl = "";

      if (fileCarteGrise) carteGriseUrl = await uploadToCloudinary(fileCarteGrise);
      if (filePermis) permisUrl = await uploadToCloudinary(filePermis);

      await addDoc(collection(db, "demandes_assurances"), {
        nom: formData.get('fullname'),
        telephone: formData.get('phone'),
        service: selectedService,
        mode: formMode,
        details: formData.get('details') || "",
        carte_grise: carteGriseUrl,
        permis: permisUrl,
        createdAt: serverTimestamp(),
        status: "en_attente"
      });

      alert("🚀 Votre demande a été transmise avec succès ! Un conseiller vous contactera.");
      setShowForm(false);
      setFileCarteGrise(null);
      setFilePermis(null);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const assurancesVie = [
    { title: "Prévoyance Décès", desc: "Capital garanti pour vos proches en cas de coup dur." },
    { title: "Assistance Funéraire", desc: "Accompagner dignement un parent sans s'appauvrir." },
    { title: "Épargne & Retraite", desc: "Préparez votre avenir avec des solutions sécurisées." },
    { title: "Étude des enfants", desc: "Financer les études supérieures en toute sérénité." },
    { title: "Santé", desc: "Accédez à des soins de qualité pour toute la famille." },
  ];

  const assurancesNonVie = [
    { title: "Assurance Auto", desc: "Tiers simple, Complet ou Tous Risques selon vos besoins." },
    { title: "Assurance Habitation", desc: "Protégez votre logement contre les sinistres du quotidien." },
    { title: "Assurance Voyage", desc: "Voyagez avec une couverture santé et bagages complète." },
    { title: "Multirisque Pro", desc: "Sécurisez votre entreprise, vos locaux et votre matériel." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-brand-blue pt-32 pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-yellow/5 skew-x-12 translate-x-20 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-white space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
              <ShieldCheck className="text-brand-yellow w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-tighter">Courtier agréé en Côte d'Ivoire</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] uppercase italic">
              Avec <span className="text-brand-yellow">iverservices</span>, gérez tout en ligne
            </h1>
            <p className="text-blue-100 text-lg max-w-lg font-medium leading-relaxed">
              Plus besoin de vous déplacer. Obtenez vos cotations d'assurance vie et auto en quelques clics avec un accompagnement d'experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => openForm("Demande Générale")} className="bg-brand-yellow text-brand-blue px-10 py-5 rounded-[20px] font-black text-xl shadow-2xl hover:scale-105 transition-all uppercase italic">
                Devenez assuré
              </button>
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-[20px] border border-white/10">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <span className="text-sm font-bold">Réponse sous 30 min</span>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] rounded-[50px] overflow-hidden border-[12px] border-white/5 shadow-2xl group animate-in fade-in slide-in-from-right duration-1000">
             <img 
               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
               alt="Conseillère Iverservices" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent"></div>
             <div className="absolute top-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="bg-brand-yellow p-2 rounded-lg">
                  <FileText className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-brand-blue uppercase">Dernière Cotation</p>
                  <p className="text-xs font-bold text-gray-500 italic">Il y a 2 min</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION COMMENT ÇA MARCHE --- */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard number="01" title="Choix de l'offre" text="Parcourez nos solutions Vie et Non-Vie adaptées au marché ivoirien." />
          <StepCard number="02" title="Scan documents" text="Prenez en photo votre carte grise ou pièce d'identité via le formulaire." />
          <StepCard number="03" title="Livraison" text="Recevez votre attestation directement chez vous ou au bureau." />
        </div>
      </section>

      {/* --- SECTION CATALOGUE --- */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-brand-blue uppercase italic mb-4">Votre Protection sur Mesure</h2>
            <div className="w-20 h-2 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-100 p-2 rounded-[25px] border-2 border-brand-blue/5 shadow-inner">
            <button onClick={() => setActiveTab('vie')} className={`px-10 py-4 rounded-[20px] font-black transition-all uppercase italic text-xs tracking-widest ${activeTab === 'vie' ? 'bg-brand-blue text-brand-yellow shadow-lg scale-105' : 'text-brand-brown hover:bg-white'}`}>
              Assurances Vie
            </button>
            <button onClick={() => setActiveTab('non-vie')} className={`px-10 py-4 rounded-[20px] font-black transition-all uppercase italic text-xs tracking-widest ${activeTab === 'non-vie' ? 'bg-brand-blue text-brand-yellow shadow-lg scale-105' : 'text-brand-brown hover:bg-white'}`}>
              Assurances Non-Vie
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(activeTab === 'vie' ? assurancesVie : assurancesNonVie).map((item, index) => (
            <div key={index} className="bg-white p-10 rounded-[40px] border-2 border-gray-50 hover:border-brand-yellow transition-all shadow-sm hover:shadow-2xl group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-yellow/5 rounded-full group-hover:bg-brand-yellow/20 transition-colors"></div>
              <div className="bg-brand-yellow/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {activeTab === 'vie' ? <Heart className="text-brand-blue w-8 h-8" /> : <Car className="text-brand-blue w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black text-brand-blue mb-4 uppercase italic leading-tight">{item.title}</h3>
              <p className="text-brand-brown/70 font-medium mb-10 leading-relaxed text-sm">{item.desc}</p>
              <button onClick={() => openForm(item.title)} className="w-full py-5 rounded-[20px] border-2 border-brand-blue text-brand-blue font-black hover:bg-brand-blue hover:text-brand-yellow transition-all uppercase italic text-xs tracking-widest">
                Demander une étude
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- FORMULAIRE DYNAMIQUE --- */}
      {showForm && (
        <section id="devis-form" className="py-20 bg-brand-blue/5 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-brand-blue p-10 md:p-14 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative">
                <div className="text-center md:text-left">
                  <h3 className="text-4xl font-black uppercase italic text-brand-yellow mb-2">{selectedService}</h3>
                  <p className="text-blue-100 font-bold italic uppercase text-xs tracking-[0.2em]">Formulaire de cotation rapide</p>
                </div>
                
                <div className="bg-white/10 p-2 rounded-[22px] backdrop-blur-xl flex border border-white/10">
                  <button onClick={() => setFormMode('standard')} className={`flex items-center gap-2 px-6 py-3 rounded-[18px] font-black uppercase text-[10px] tracking-widest transition-all ${formMode === 'standard' ? 'bg-brand-yellow text-brand-blue shadow-lg' : 'text-white hover:bg-white/5'}`}>
                    <FileText size={16} /> Détails
                  </button>
                  <button onClick={() => setFormMode('auto')} className={`flex items-center gap-2 px-6 py-3 rounded-[18px] font-black uppercase text-[10px] tracking-widest transition-all ${formMode === 'auto' ? 'bg-brand-yellow text-brand-blue shadow-lg' : 'text-white hover:bg-white/5'}`}>
                    <Car size={16} /> Carte Grise
                  </button>
                </div>
                <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-red-500 transition-all">
                  <X size={24} />
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InputField name="fullname" label="Nom & Prénoms" placeholder="Ex: Koffi Kouassi" required />
                  <InputField name="phone" label="WhatsApp" placeholder="+225 07..." required />
                </div>

                {formMode === 'auto' ? (
                  <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <UploadField 
                        label="Scan Carte Grise" 
                        sub={fileCarteGrise ? "Document prêt" : "Prendre en photo"} 
                        onChange={(file: File | null) => setFileCarteGrise(file)} 
                      />
                      <UploadField 
                        label="Scan Permis" 
                        sub={filePermis ? "Document prêt" : "Facultatif"} 
                        onChange={(file: File | null) => setFilePermis(file)} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    <label className="block text-brand-blue font-black mb-4 uppercase text-xs italic tracking-widest">Décrivez votre besoin</label>
                    <textarea name="details" rows={5} className="w-full p-8 rounded-[30px] bg-gray-50 border-2 border-transparent focus:border-brand-yellow outline-none transition-all font-medium text-brand-brown" placeholder="Ex: Je souhaite assurer mes 3 enfants pour leurs études..."></textarea>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-brand-blue text-brand-yellow py-8 rounded-[30px] font-black text-2xl flex items-center justify-center gap-6 hover:bg-brand-brown transition-all shadow-2xl disabled:opacity-50 uppercase italic"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Valider ma demande <Send className="w-7 h-7" /></>}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* --- COMPOSANTS DE STRUCTURE --- */

interface StepCardProps {
  number: string;
  title: string;
  text: string;
}

function StepCard({ number, title, text }: StepCardProps) {
    return (
      <div className="flex items-start gap-6 p-8 rounded-[35px] bg-white border-b-8 border-brand-yellow shadow-sm hover:shadow-md transition-all">
        <span className="text-5xl font-black text-brand-yellow/40 italic">{number}</span>
        <div>
          <h4 className="font-black text-brand-blue uppercase italic text-sm mb-2">{title}</h4>
          <p className="text-brand-brown text-xs font-bold leading-relaxed opacity-80">{text}</p>
        </div>
      </div>
    );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
}

function InputField({ label, placeholder, name, required }: InputFieldProps) {
  return (
    <div>
      <label className="block text-brand-blue font-black mb-4 uppercase text-xs italic tracking-widest">{label}</label>
      <input name={name} required={required} type="text" className="w-full p-6 rounded-[25px] bg-gray-50 border-2 border-transparent focus:border-brand-yellow outline-none transition-all font-bold text-brand-brown" placeholder={placeholder} />
    </div>
  );
}

interface UploadFieldProps {
  label: string;
  sub: string;
  onChange: (file: File | null) => void;
}

function UploadField({ label, sub, onChange }: UploadFieldProps) {
  return (
    <div className="relative group">
      <label className="block text-brand-blue font-black mb-4 uppercase text-xs italic tracking-widest">{label}</label>
      <div className="flex flex-col items-center justify-center w-full h-44 border-4 border-dashed border-gray-100 rounded-[35px] bg-gray-50 group-hover:bg-white group-hover:border-brand-yellow transition-all cursor-pointer text-center px-6 relative overflow-hidden">
        <div className="bg-brand-yellow/10 p-4 rounded-2xl mb-3 group-hover:bg-brand-yellow transition-colors">
          <Upload className="text-brand-blue" />
        </div>
        <span className="text-brand-blue font-black uppercase text-[10px] tracking-widest">{sub}</span>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="absolute inset-0 opacity-0 cursor-pointer" 
        />
      </div>
    </div>
  );
}