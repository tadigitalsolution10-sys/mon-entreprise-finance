"use client";
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase'; // Assure-toi que 'auth' est exporté dans ton firebase.ts
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Trash2, Power, ExternalLink, Image as ImageIcon, PlusCircle, LogOut, ShieldCheck } from 'lucide-react';

export default function AdminAdsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  // --- SÉCURITÉ : VÉRIFICATION DE L'ACCÈS ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthorized(true);
        fetchAds(); // Charger les pubs si connecté
      } else {
        router.push('/admin/login'); // Rediriger vers login si non connecté
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  // 1. Charger les publicités
  const fetchAds = async () => {
    try {
      const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const adsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAds(adsList);
    } catch (error) {
      console.error("Erreur chargement ads:", error);
    }
  };

  // 2. Changer le statut
  const toggleAdStatus = async (adId: string, currentStatus: boolean) => {
    try {
      const adRef = doc(db, "ads", adId);
      await updateDoc(adRef, { active: !currentStatus });
      await fetchAds();
    } catch (error) {
      alert("Erreur lors de la modification");
    }
  };

  // 3. Supprimer
  const deleteAd = async (adId: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette publicité ?")) {
      try {
        await deleteDoc(doc(db, "ads", adId));
        await fetchAds();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  // 4. Soumission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("🚀 Envoi vers Cloudinary...");

    const file = e.target.image.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "iverservices_preset");

    try {
      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/dugxgkqjh/image/upload`,
        { method: "POST", body: formData }
      );
      const imageData = await cloudinaryRes.json();

      setStatus("💾 Enregistrement Firebase...");

      await addDoc(collection(db, "ads"), {
        title: e.target.title.value,
        link: e.target.link.value,
        type: e.target.type.value,
        image: imageData.secure_url,
        active: true,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Succès !");
      e.target.reset();
      fetchAds();
    } catch (error) {
      setStatus("❌ Erreur de publication.");
    } finally {
      setLoading(false);
    }
  };

  // Empêcher le flash du contenu avant la vérification de l'auth
  if (!isAuthorized) return null;

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER DE NAVIGATION ADMIN */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Session sécurisée</p>
              <p className="text-sm font-black text-brand-blue uppercase italic">{auth.currentUser?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
          >
            Déconnexion <LogOut size={16} />
          </button>
        </div>

        {/* SECTION FORMULAIRE */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-black text-brand-blue uppercase italic mb-8 flex items-center gap-3">
            <PlusCircle className="text-brand-yellow" size={32} />
            Espace <span className="text-brand-yellow">Publicitaire</span>
          </h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[40px] shadow-sm space-y-6 border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase mb-2 text-gray-400 tracking-widest">Détails de l'annonce</label>
                <input name="title" required className="w-full p-4 border rounded-2xl outline-none focus:border-brand-yellow transition-all" placeholder="Titre de l'annonce" />
              </div>
              <input name="link" required className="w-full p-4 border rounded-2xl outline-none focus:border-brand-yellow transition-all" placeholder="Lien de redirection (https://...)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase mb-2 text-gray-400 tracking-widest">Emplacement</label>
                <select name="type" className="w-full p-4 border rounded-2xl outline-none bg-white font-bold text-sm">
                  <option value="interstitial">Bannière Milieu (Accueil)</option>
                  <option value="footer_banner">Bannière Bas de page (Footer)</option>
                  <option value="popup">Fenêtre Pop-up</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase mb-2 text-gray-400 tracking-widest">Image</label>
                <input type="file" name="image" required className="text-[10px] pt-2 w-full" />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-brand-blue text-brand-yellow p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-brown transition-all disabled:opacity-50 shadow-xl"
            >
              {loading ? "Traitement..." : "Mettre en ligne l'annonce"}
            </button>
            {status && <div className={`text-center p-3 rounded-xl font-bold text-xs ${status.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-brand-blue'}`}>{status}</div>}
          </form>
        </div>

        {/* SECTION GESTION / LISTE DES PUBS */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b pb-4">
            <h2 className="text-xl font-black text-brand-blue uppercase italic">
              Gestion des <span className="text-brand-yellow">Annonces</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className={`bg-white p-5 rounded-[30px] shadow-sm border-2 transition-all ${ad.active ? 'border-green-100' : 'border-red-100 opacity-75'}`}>
                <div className="flex gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
                    <img src={ad.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${ad.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                          {ad.active ? 'Actif' : 'Inactif'}
                        </span>
                        <span className="text-gray-400 font-bold text-[8px] uppercase truncate italic bg-gray-50 px-2 py-0.5 rounded-md">
                            {ad.type === 'interstitial' ? 'Milieu Page' : ad.type === 'footer_banner' ? 'Bas de Page' : 'Pop-up'}
                        </span>
                      </div>
                      <h3 className="text-brand-blue font-black text-sm uppercase truncate mt-2">{ad.title}</h3>
                      <a href={ad.link} target="_blank" className="text-brand-yellow text-[9px] font-bold flex items-center gap-1 hover:underline mt-1">
                        Lien <ExternalLink size={10} />
                      </a>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => toggleAdStatus(ad.id, ad.active)}
                        className={`flex-grow flex items-center justify-center gap-2 p-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${ad.active ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}
                      >
                        <Power size={12} /> {ad.active ? "Désactiver" : "Activer"}
                      </button>
                      <button onClick={() => deleteAd(ad.id)} className="bg-red-50 text-red-600 p-2.5 rounded-xl"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}