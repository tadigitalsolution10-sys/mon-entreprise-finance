"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';

export default function StatsPage() {
  const [visitesAujourdhui, setVisitesAujourdhui] = useState(0);
  const [historique, setHistorique] = useState<{date: string, count: number}[]>([]);
  const [topPages, setTopPages] = useState<{page: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    // 1. Ecouter les visites du jour
    const qToday = query(collection(db, "visites"), where("date", "==", today));
    const unsubToday = onSnapshot(qToday, (snap) => {
      setVisitesAujourdhui(snap.size);
    });

    // 2. Récupérer les données globales pour le top pages et l'historique
    const qAll = query(collection(db, "visites"), orderBy("fullTimestamp", "desc"), limit(1000));
    const unsubAll = onSnapshot(qAll, (snap) => {
      const data = snap.docs.map(doc => doc.data());
      
      // Calcul Top Pages
      const pagesCount: any = {};
      const historyCount: any = {};
      
      data.forEach(v => {
        pagesCount[v.page] = (pagesCount[v.page] || 0) + 1;
        historyCount[v.date] = (historyCount[v.date] || 0) + 1;
      });

      // Formater pour l'affichage
      const formattedPages = Object.entries(pagesCount)
        .map(([page, count]) => ({ page, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const formattedHistory = Object.entries(historyCount)
        .map(([date, count]) => ({ date, count: count as number }))
        .slice(0, 7);

      setTopPages(formattedPages);
      setHistorique(formattedHistory);
      setLoading(false);
    });

    return () => { unsubToday(); unsubAll(); };
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Chargement des analyses...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Tableau de Bord Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Carte Visites du Jour */}
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Visiteurs Unique / Jour</p>
          <p className="text-6xl font-black italic">{visitesAujourdhui}</p>
          <div className="mt-4 text-xs font-bold bg-white/20 inline-block px-3 py-1 rounded-full">
            En direct de Firebase
          </div>
        </div>

        {/* Top Pages */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-400">Pages les plus populaires</h2>
          <div className="space-y-4">
            {topPages.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">{p.page === "/" ? "Accueil" : p.page}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 bg-blue-100 rounded-full w-32 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${(p.count / visitesAujourdhui) * 100}%` }}></div>
                  </div>
                  <span className="text-xs font-black">{p.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historique simple */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
        <h2 className="text-sm font-black uppercase tracking-widest mb-8 opacity-50">Activité des 7 derniers jours</h2>
        <div className="flex items-end justify-between h-40 gap-2">
          {historique.map((h, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-500 rounded-t-xl transition-all duration-1000" 
                style={{ height: `${Math.max((h.count / 10) * 100, 10)}%`, maxHeight: '100%' }}
              ></div>
              <p className="text-[8px] mt-3 font-bold opacity-50 rotate-45">{h.date.split('-').slice(1).join('/')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}