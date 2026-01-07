"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Landmark, Building2, CarFront, BadgeDollarSign } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const otherServices = [
    { name: 'Banque & Épargne', href: '/banque', icon: <Landmark className="w-5 h-5 text-brand-blue" /> },
    { name: 'Finance & Projets', href: '/finance', icon: <BadgeDollarSign className="w-5 h-5 text-brand-blue" /> },
    { name: 'Immobilier', href: '/immobilier', icon: <Building2 className="w-5 h-5 text-brand-blue" /> },
    { name: 'Automobile', href: '/automobile', icon: <CarFront className="w-5 h-5 text-brand-blue" /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Iverservice Logo" width={75} height={50} className="object-contain" priority />
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-brand-brown hover:text-brand-blue font-semibold transition">Accueil</Link>
            <Link href="/a-propos" className="text-brand-brown hover:text-brand-blue font-semibold transition">À Propos</Link>
            <Link href="/assurances" className="text-brand-brown hover:text-brand-blue font-semibold transition">Assurances</Link>

            {/* DROPDOWN AUTRES SERVICES */}
            <div 
              className="relative group h-full flex items-center" 
              onMouseEnter={() => setIsDropdownOpen(true)} 
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center text-brand-brown group-hover:text-brand-blue font-semibold gap-1 transition h-full">
                Autres services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-[80px] left-0 w-64 bg-white border-2 border-brand-yellow shadow-2xl rounded-2xl py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Nos spécialités</div>
                  {otherServices.map((service) => (
                    <Link 
                      key={service.name} 
                      href={service.href} 
                      className="flex items-center gap-3 px-4 py-3 text-sm text-brand-brown hover:bg-brand-yellow/10 hover:text-brand-blue transition-colors font-bold"
                    >
                      <span className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">{service.icon}</span>
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="bg-brand-yellow text-brand-brown px-6 py-2.5 rounded-xl hover:brightness-105 transition-all shadow-md font-black border border-brand-brown/10 uppercase text-xs">
              Contactez-nous
            </Link>
          </div>

          {/* BOUTON MOBILE (BURGER) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-blue focus:outline-none">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-brand-brown font-bold hover:bg-gray-50 rounded-xl">Accueil</Link>
            <Link href="/a-propos" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-brand-brown font-bold hover:bg-gray-50 rounded-xl">À Propos</Link>
            <Link href="/assurances" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-brand-blue font-bold bg-brand-yellow/10 rounded-xl">Assurances</Link>
            
            <div className="pt-4 pb-2 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Autres Services</div>
            {otherServices.map((service) => (
              <Link 
                key={service.name} 
                href={service.href} 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-brand-brown font-semibold hover:bg-gray-50 rounded-xl"
              >
                {service.icon} {service.name}
              </Link>
            ))}
            
            <div className="pt-6">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-brand-blue text-brand-yellow py-4 rounded-2xl font-black uppercase shadow-lg">
                    Nous Contacter
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;