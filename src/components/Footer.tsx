"use client";
import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLONNE 1 : LOGO & INFOS */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-brand-yellow italic">Iverservices</h2>
            <p className="text-blue-100/80 leading-relaxed text-sm">
              Bienvenue chez Iverservices, votre partenaire de confiance pour assurer votre véhicule, vos voyages et votre santé. Des offres flexibles, rapides et à portée de main.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* COLONNE 2 : LIENS RAPIDES */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-brand-yellow pl-3">Links</h3>
            <ul className="space-y-4 text-blue-100/70 text-sm font-medium">
              <li><FooterLink href="/about">À propos</FooterLink></li>
              <li><FooterLink href="/assurances">Assurance</FooterLink></li>
              <li><FooterLink href="/devis">Devis</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/faq">FAQ's</FooterLink></li>
            </ul>
          </div>

          {/* COLONNE 3 : CONTACT DIRECT */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-brand-yellow pl-3">Contacts</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-2 rounded-lg text-brand-yellow">
                    <MapPin size={20} />
                </div>
                <span className="text-sm text-blue-100/80">Abidjan, Angré Chateau/CIV</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-2 rounded-lg text-brand-yellow">
                    <Phone size={20} />
                </div>
                <span className="text-sm text-blue-100/80">+225 27 22 23 04 86/ 07 07 63 39 35</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-2 rounded-lg text-brand-yellow">
                    <Mail size={20} />
                </div>
                <span className="text-sm text-blue-100/80">info@ivsc-iverservices.com</span>
              </li>
            </ul>
          </div>

          {/* COLONNE 4 : NEWSLETTER */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-l-4 border-brand-yellow pl-3">Newsletter</h3>
            <p className="text-sm text-blue-100/70 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières offres et conseils.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-brand-yellow transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bg-brand-yellow text-brand-brown p-2 rounded-lg hover:scale-105 transition-all">
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* BARRE DE COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-blue-100/40 font-medium">
          <p>Copyright 2025 All Rights Reserved by De vincy Tene</p>
        </div>
      </div>
    </footer>
  );
}

// Petits composants internes pour le style
function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-brand-yellow transition-colors flex items-center gap-2 group">
      <span className="w-0 h-[2px] bg-brand-yellow group-hover:w-3 transition-all"></span>
      {children}
    </Link>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-brown transition-all cursor-pointer">
      {icon}
    </div>
  );
}