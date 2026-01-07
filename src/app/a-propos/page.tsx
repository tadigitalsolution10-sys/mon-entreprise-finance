"use client";
import React from 'react';
import Counter from '@/components/Counter';
import { Target, Users, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HEADER SECTION - Fond avec image stylisée */}
      <section className="relative bg-brand-blue py-32 text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1500" 
          alt="Bureaux Modernes" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight italic">
            Votre partenaire fiable <span className="text-brand-yellow">Iverservices</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto font-medium leading-relaxed italic">
            Une entreprise dynamique et innovante spécialisée dans la fourniture de solutions complètes et personnalisées dans plusieurs secteurs stratégiques.
          </p>
        </div>
      </section>

      {/* NOTRE MISSION & HISTOIRE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-brand-blue mb-8 border-b-4 border-brand-yellow inline-block pb-2 uppercase italic">
              Notre Mission
            </h2>
            <p className="text-brand-brown text-lg leading-relaxed font-medium">
              <span className="text-brand-blue font-black">Iverservices</span> est spécialisée dans les secteurs de l'Assurances, Banque, Finance, Immobilier, Automobile et Divers. Notre mission est de mettre en relation nos différents partenaires d'affaire, en leurs offrant des services de qualité, fiables, performants et adaptés à leurs besoins spécifiques.
            </p>
            <p className="text-brand-brown/80 leading-relaxed italic">
              Grâce à notre approche orientée client, nous privilégions la qualité, la transparence, et la satisfaction pour bâtir des relations durables basées sur la confiance.
            </p>

            {/* COMPTEURS ANIMÉS */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="bg-gray-50 p-6 rounded-[30px] border-l-8 border-brand-yellow shadow-sm">
                <p className="text-4xl font-black text-brand-blue mb-1">
                  <Counter target={10} />+
                </p>
                <p className="text-[10px] text-brand-brown font-black uppercase tracking-widest opacity-70">
                  Années d'expertise
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[30px] border-l-8 border-brand-yellow shadow-sm">
                <p className="text-4xl font-black text-brand-blue mb-1">
                  <Counter target={2500} />+
                </p>
                <p className="text-[10px] text-brand-brown font-black uppercase tracking-widest opacity-70">
                  Clients satisfaits
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE / VISUEL ÉQUIPE */}
          <div className="relative h-[550px] rounded-[60px] overflow-hidden shadow-2xl group border-8 border-gray-50">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
               alt="Collaboration Equipe" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
             <div className="absolute bottom-10 left-10 text-white">
                <p className="text-brand-yellow font-black uppercase italic tracking-widest text-sm">Innovation & Rigueur</p>
                <h3 className="text-2xl font-black uppercase">L'excellence au quotidien</h3>
             </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR - Avec Image de fond légère */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-brand-blue uppercase italic">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-brand-brown font-bold max-w-2xl mx-auto">
              Une entreprise polyvalente, fiable et orientée client au service de votre réussite.
            </p>
            <div className="w-24 h-2 bg-brand-yellow mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureBox 
              title="Services sur mesure" 
              text="Des solutions adaptées à vos projets personnels et professionnels avec une personnalisation totale."
            />
            <FeatureBox 
              title="Gain de temps" 
              text="Une prise en charge rapide et efficace pour vous simplifier la vie au quotidien."
            />
            <FeatureBox 
              title="Accompagnement de proximité" 
              text="Une équipe disponible, à l'écoute et prête à vous conseiller à chaque étape."
            />
            <FeatureBox 
              title="Expertise transversale" 
              text="Une maîtrise parfaite de plusieurs domaines clés (Assurance, Banque, Immo, Auto)."
            />
          </div>
        </div>
      </section>

      {/* NOS VALEURS (PILIERS) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<ShieldCheck className="w-10 h-10 text-brand-blue" />}
              title="Qualité"
              text="Nous visons l'excellence dans chaque service délivré."
            />
            <ValueCard 
              icon={<Target className="w-10 h-10 text-brand-blue" />}
              title="Transparence"
              text="Une communication claire et honnête pour une confiance totale."
            />
            <ValueCard 
              icon={<Users className="w-10 h-10 text-brand-blue" />}
              title="Satisfaction"
              text="Votre réussite et votre sourire sont nos meilleurs indicateurs."
            />
            <ValueCard 
              icon={<Zap className="w-10 h-10 text-brand-blue" />}
              title="Innovation"
              text="Nous anticipons le marché pour vous offrir le meilleur de demain."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION - Avec image réelle en arrière-plan */}
      <section className="relative py-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1500" 
          alt="Poignée de main" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-blue/90 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase italic leading-tight">
            Bâtissons ensemble <br /> <span className="text-brand-yellow">votre avenir</span>
          </h2>
          <button className="bg-brand-yellow text-brand-blue px-12 py-6 rounded-[20px] font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase italic tracking-widest border-b-4 border-brand-brown">
            Démarrer un projet
          </button>
        </div>
      </section>

    </div>
  );
}

// Composants de support
function ValueCard({ icon, title, text }: any) {
  return (
    <div className="bg-gray-50 p-10 rounded-[40px] border-2 border-transparent hover:border-brand-yellow transition-all group shadow-sm hover:shadow-xl">
      <div className="mb-6 bg-white w-20 h-20 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-brand-yellow transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-black text-brand-blue mb-2 uppercase italic">{title}</h3>
      <p className="text-brand-brown/70 text-sm font-bold">{text}</p>
    </div>
  );
}

function FeatureBox({ title, text }: any) {
  return (
    <div className="flex gap-6 bg-white p-8 rounded-[35px] shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-brand-yellow/30">
      <div className="flex-shrink-0">
        <div className="bg-brand-yellow p-3 rounded-full shadow-md">
          <CheckCircle2 className="text-brand-blue w-6 h-6" />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-black text-brand-blue uppercase italic mb-2">{title}</h4>
        <p className="text-brand-brown text-sm font-medium leading-relaxed">{text}</p>
      </div>
    </div>
  );
}