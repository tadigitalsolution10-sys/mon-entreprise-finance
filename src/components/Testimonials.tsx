"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, CheckCircle2, Star, Building2 } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { 
    category: "ASSISTANCE ADMINISTRATIVE", 
    quote: "Un accompagnement rapide et sans stressrise en charge complète", 
    content: "iverservices nous a grandement aidé pour toutes les formalités. service fiable et professionnel", 
    author: "Technologie / Ivoire Technocom", 
    date: "Mai 2025",
    image: "/partners/ivoire.png" 
  },
  { 
    category: "Conseil Financier", 
    quote: "Des conseils claires et adaptés", 
    content: "Grace a iverservices, nous avons mieux structuré notre gestion fiancière", 
    author: "Technologie / Expand Telecoms", 
    date: "Février 2025",
    image: "/partners/expand.jfif" 
  },
  { 
    category: "Immobilier", 
    quote: "Accompagnement de A à Z", 
    content: "Nous avons acheté notre local professionnel avec un suivi complet.", 
    author: "Home Medical Service", 
    date: "Mars 2025",
    image: "/partners/hms.png" 
  },
  { 
    category: "Gestion Automobile", 
    quote: "Une prises en charges complètes et éfficaces", 
    content: "L'immatriculation de notre flotte a été réalisée rapidement, sans erreur.", 
    author: "Agros Expectise", 
    date: "Février 2025",
    image: "/partners/expectise.jfif" 
  },
  { 
    category: "Nutrikar", 
    quote: "Une prise en charge complète et éfficace", 
    content: "L'immatriculation de notre flotte a été réalisée rapidement, sans erreur.", 
    author: "Nutrikar", 
    date: "Février 2025",
    image: "/partners/nutrikar.jfif" 
  },
  { 
    category: "Gestion Automobile", 
    quote: "Rapidité d'exécution", 
    content: "Gestion de flotte impeccable pour nos besoins en transport.", 
    author: "IUTEA / Epure Architecture", 
    date: "Février 2025",
    image: "/partners/IUTEA.jfif" 
  },
  { 
    category: "Gestion Automobile", 
    quote: "Expertise technique", 
    content: "Solution idéale pour le suivi de nos véhicules de société.", 
    author: "Nouvelle Vision", 
    date: "Juillet 2025",
    image: "https://images.pexels.com/photos/1181311/pexels-photo-1181311.jpeg?auto=compress&cs=tinysrgb&w=400" 
  },
  { 
    category: "Gestion Automobile", 
    quote: "Sérieux et rigueur", 
    content: "Immatriculation sans soucis pour l'ensemble de nos actifs.", 
    author: "EPURE ARCHITECTURE", 
    date: "Juillet 2025",
    image: "/partners/epure.jfif" 
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-brand-yellow font-black uppercase tracking-widest text-sm">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-blue mt-2 uppercase italic leading-tight">
            Ils nous font <span className="text-brand-yellow">confiance</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-16"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-100 rounded-[40px] shadow-sm hover:shadow-2xl transition-all h-[450px] flex flex-col overflow-hidden group relative">
                
                {/* Image d'illustration de l'entreprise */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img 
                    src={t.image} 
                    alt={t.author} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <span className="bg-brand-yellow text-brand-brown text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                      {t.category}
                    </span>
                  </div>
                </div>

                {/* Contenu du témoignage */}
                <div className="p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex text-brand-yellow gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-current" />)}
                      </div>
                      <Quote className="text-brand-yellow opacity-20" size={24} />
                    </div>
                    
                    <h4 className="text-brand-blue font-black italic text-md leading-tight mb-3">
                      "{t.quote}"
                    </h4>
                    
                    <p className="text-brand-brown/80 text-xs font-medium leading-relaxed line-clamp-3">
                      {t.content}
                    </p>
                  </div>

                  {/* Infos Client */}
                  <div className="pt-5 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue">
                        <Building2 size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-brand-blue font-black text-[10px] uppercase truncate">
                          {t.author}
                        </p>
                        <p className="text-gray-400 text-[9px] font-bold">
                          {t.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ligne d'accentuation au survol */}
                <div className="absolute top-0 right-0 w-1.5 h-0 bg-brand-yellow group-hover:h-full transition-all duration-500"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #CBA557 !important;
          width: 30px;
          border-radius: 6px;
          transition: all 0.3s;
        }
      `}</style>
    </section>
  );
}