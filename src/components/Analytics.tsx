"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const reportVisit = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Format 2024-05-20
        
        await addDoc(collection(db, "visites"), {
          date: today,
          fullTimestamp: serverTimestamp(),
          page: pathname,
          platform: navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop"
        });
      } catch (e) {
        console.error("Erreur analytics:", e);
      }
    };

    reportVisit();
  }, [pathname]); // Se déclenche à chaque changement de page

  return null; // Ce composant est invisible
}