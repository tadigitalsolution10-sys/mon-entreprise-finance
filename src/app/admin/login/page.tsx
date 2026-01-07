"use client";
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/ads'); // Redirection après succès
    } catch (error) {
      alert("Identifiants incorrects");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-blue p-6">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md space-y-6">
        <h1 className="text-2xl font-black text-brand-blue uppercase italic text-center">
          Connexion <span className="text-brand-yellow">Admin</span>
        </h1>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 border rounded-2xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          className="w-full p-4 border rounded-2xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-brand-blue text-brand-yellow p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-brown transition-all">
          Se connecter
        </button>
      </form>
    </div>
  );
}