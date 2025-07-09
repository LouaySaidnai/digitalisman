"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Un email de récupération a été envoyé à votre adresse email.");
      } else {
        setMessage(data.error || "Une erreur s'est produite.");
      }
    } catch (error) {
      setMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center relative overflow-hidden">
      <div className="h-screen w-screen flex justify-center items-center bg-[#F5E9D1] relative">
        {/* Antique Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='antique' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 0h100v100H0z' fill='%237A5230' fill-opacity='0.02'/%3E%3Cpath d='M0 0h2v2H0zM98 0h2v2h-2zM0 98h2v2H0zM98 98h2v2h-2z' fill='%237A5230' fill-opacity='0.1'/%3E%3Cpath d='M25 25h50v50H25z' fill='none' stroke='%237A5230' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Cpath d='M35 35h30v30H35z' fill='none' stroke='%237A5230' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23antique)'/%3E%3C/svg%3E")`
          }} />
        </div>
        
        {/* Antique Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E9D1] via-[#E8D5B5] to-[#D6C4A2] opacity-90"></div>
        
        {/* Vintage Paper Texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`
        }}></div>
        
        {/* Antique Corner Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-[#7A5230]"></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#B9986F]"></div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-[#7A5230]"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#B9986F]"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
          <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-[#7A5230]"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[#B9986F]"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
          <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-[#7A5230]"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#B9986F]"></div>
        </div>
        
        {/* Antique Border Frame */}
        <div className="absolute inset-8 border border-[#7A5230]/20 rounded-lg"></div>
        <div className="absolute inset-12 border border-[#B9986F]/10 rounded-lg"></div>
        
        <div className="grid gap-8 relative z-10">
          <div
            id="back-div"
            className="bg-gradient-to-br from-[#7A5230] via-[#A8875E] to-[#B9986F] rounded-[32px] m-4 shadow-2xl"
          >
            <div
              className="border-[24px] border-transparent rounded-[28px] bg-gradient-to-br from-white via-[#FEFCF8] to-[#F5E9D1] shadow-2xl xl:p-12 2xl:p-12 lg:p-10 md:p-10 sm:p-6 m-2 relative overflow-hidden"
            >
              {/* Antique Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`
              }}></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-[#7A5230]/30"></div>
              <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-[#7A5230]/30"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-[#7A5230]/30"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-[#7A5230]/30"></div>
              
              <div className="relative z-10">
                <h1 className="pt-8 pb-8 font-bold text-[#4B2E05] text-4xl text-center cursor-default tracking-wide">
                  Mot de passe oublié
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#7A5230] to-[#B9986F] mx-auto mb-8 rounded-full"></div>
                
                <p className="text-[#5C3A00] text-center mb-6">
                  Entrez votre adresse email pour recevoir un lien de récupération
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Message */}
                  {message && (
                    <div className={`px-4 py-3 rounded-lg text-center ${
                      isSuccess 
                        ? "bg-green-50 border border-green-200 text-green-700" 
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}>
                      {message}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[#4B2E05] text-lg font-medium">Email</label>
                    <div className="relative">
                      <input
                        id="email"
                        className="w-full px-4 py-4 border-2 border-[#D6C4A2] bg-white/80 backdrop-blur-sm rounded-xl shadow-sm placeholder-[#A8875E] focus:outline-none focus:border-[#7A5230] focus:ring-4 focus:ring-[#7A5230]/10 transition-all duration-300 ease-in-out"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <button
                    className="relative w-full bg-gradient-to-r from-[#7A5230] via-[#A8875E] to-[#B9986F] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
                    type="submit"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B9986F] via-[#A8875E] to-[#7A5230] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>ENVOYER LE LIEN</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </form>
                
                <div className="flex flex-col mt-6 items-center justify-center text-sm">
                  <Link
                    href="/Login"
                    className="group text-[#B9986F] hover:text-[#7A5230] transition-all duration-200 ease-in-out"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-[#B9986F] to-[#7A5230] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                      ← Retour à la connexion
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 