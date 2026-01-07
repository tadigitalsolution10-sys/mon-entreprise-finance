"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { 
  FileText, Phone, Lock, Landmark, ShieldCheck, 
  Mail, LogOut, Clock, Home, MessageSquare, TrendingUp, Car, Inbox 
} from 'lucide-react';

// Types mis à jour : 5 services + contact
type TabType = 'assurances' | 'banque' | 'immobilier' | 'finance' | 'auto' | 'contact';

export default function AdminDashboard() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('assurances');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = "iverservices2026"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);

    const collections = {
      assurances: "demandes_assurances",
      banque: "demandes_banque",
      immobilier: "demandes_immo",
      finance: "demandes_finance",
      auto: "demandes_auto",
      contact: "messages_contact" // Nouvelle collection
    };

    const q = query(collection(db, collections[activeTab]), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDemandes(docs);
      setLoading(false);
    }, (error) => {
      console.error("Erreur Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-blue flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[30px] shadow-2xl w-full max-w-md text-center border-b-8 border-brand-yellow">
          <div className="bg-brand-yellow w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-brand-blue w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black uppercase italic text-brand-blue">Accès Iverservices</h2>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input 
              type="password" 
              placeholder="Code secret" 
              className="w-full p-4 rounded-xl bg-gray-100 border-2 border-transparent focus:border-brand-yellow outline-none text-center font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-brand-blue text-brand-yellow py-4 rounded-xl font-black uppercase shadow-lg">Entrer</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* MENU DES ONGLETS */}
        <div className="flex flex-wrap justify-center bg-white p-2 rounded-2xl shadow-sm mb-10 gap-1 border border-gray-100">
          <TabButton active={activeTab === 'assurances'} onClick={() => setActiveTab('assurances')} icon={<ShieldCheck size={16}/>} label="Assurances" />
          <TabButton active={activeTab === 'banque'} onClick={() => setActiveTab('banque')} icon={<Landmark size={16}/>} label="Banque" />
          <TabButton active={activeTab === 'immobilier'} onClick={() => setActiveTab('immobilier')} icon={<Home size={16}/>} label="Immo" />
          <TabButton active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} icon={<TrendingUp size={16}/>} label="Finance" />
          <TabButton active={activeTab === 'auto'} onClick={() => setActiveTab('auto')} icon={<Car size={16}/>} label="Auto" />
          <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} icon={<Inbox size={16}/>} label="Messages" />
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse font-black text-brand-blue uppercase italic">Synchronisation...</div>
        ) : (
          <div className="space-y-4">
            {demandes.length === 0 ? (
              <div className="bg-white p-20 rounded-[40px] text-center text-gray-400 font-bold border-2 border-dashed border-gray-200 uppercase">Aucune donnée</div>
            ) : (
              demandes.map((item) => (
                <div key={item.id} className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-6 group">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-brand-yellow/20 text-brand-blue text-[10px] font-black rounded-lg uppercase">
                          {item.sujet || item.type_service || item.type_projet || "Contact"}
                        </span>
                        <span className="text-gray-400 text-xs font-bold flex items-center gap-1 italic">
                          <Clock size={12} /> {item.createdAt?.toDate().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-brand-blue uppercase">{item.nom}</h3>
                      <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500 mt-2">
                        <a href={`tel:${item.telephone}`} className="flex items-center gap-1 hover:text-brand-blue"><Phone size={14} className="text-brand-yellow"/> {item.telephone}</a>
                        <span className="flex items-center gap-1"><Mail size={14} className="text-brand-yellow"/> {item.email}</span>
                      </div>
                      {item.message && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-2xl text-xs font-medium text-brand-brown border-l-4 border-brand-yellow italic">
                          "{item.message}"
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 w-full lg:w-auto">
                      <a href={`https://wa.me/${item.telephone?.replace(/\s/g, '')}`} target="_blank" className="flex-1 lg:flex-none bg-green-500 text-white px-6 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg">
                        <MessageSquare size={16} /> WHATSAPP
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 transition-all ${active ? 'bg-brand-blue text-white shadow-lg scale-105' : 'text-gray-400 hover:text-brand-blue hover:bg-gray-50'}`}>
      {icon} {label}
    </button>
  );
}