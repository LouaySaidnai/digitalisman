"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Charger les credentials sauvegardés au montage du composant
  useEffect(() => {
    const savedCredentials = localStorage.getItem('savedCredentials');
    if (savedCredentials) {
      const { email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials);
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Réinitialiser l'erreur
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        // Gérer l'erreur avec un message plus clair
        console.error("Erreur de connexion:", result.error);
        if (result.error === "CredentialsSignin") {
          setError("Email ou mot de passe incorrect");
        } else {
          setError("Erreur lors de la connexion. Veuillez réessayer.");
        }
      } else {
        // Connexion réussie
        if (rememberMe) {
          // Sauvegarder les credentials
          localStorage.setItem('savedCredentials', JSON.stringify({ email, password }));
        } else {
          // Supprimer les credentials sauvegardés
          localStorage.removeItem('savedCredentials');
        }
        router.push('/');
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
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
                <h1 className="pt-8 pb-8 font-bold text-[#4B2E05] text-5xl text-center cursor-default tracking-wide">
                  Se connecter
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#7A5230] to-[#B9986F] mx-auto mb-8 rounded-full"></div>
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  isLoading={isLoading}
                  error={error}
                  handleSubmit={handleSubmit}
                />
                
                <div className="flex flex-col mt-6 items-center justify-center text-sm">
                  <h3 className="text-[#4B2E05]">
                    Pas encore de compte ?
                    <a
                      className="group text-[#B9986F] hover:text-[#7A5230] transition-all duration-200 ease-in-out ml-1"
                      href="/register"
                    >
                      <Link href="/Register" className="bg-left-bottom bg-gradient-to-r from-[#B9986F] to-[#7A5230] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                        Créer un compte
                      </Link>
                    </a>
                  </h3>
                </div>
                
                {/* Third Party Authentication Options */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#D6C4A2]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-br from-white via-[#FEFCF8] to-[#F5E9D1] text-[#A8875E] font-medium">Ou se connecter avec</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center flex-wrap gap-3">
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px]" src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/" alt="Google" />
                  </button>
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px]" src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/" alt="Linkedin" />
                  </button>
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px] filter dark:invert" src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/" alt="Github" />
                  </button>
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px]" src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/" alt="Facebook" />
                  </button>
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px]" src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/" alt="Twitter" />
                  </button>
                  <button type="button" className="hover:scale-105 ease-in-out duration-300 shadow-lg p-3 rounded-xl m-1 bg-white/80 backdrop-blur-sm border border-[#D6C4A2] hover:border-[#A8875E] transition-all duration-200">
                    <img className="max-w-[25px]" src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/" alt="Apple" />
                  </button>
                </div>
                
                <div className="text-center mt-6 text-sm">
                  <p className="text-[#A8875E]">
                    En vous connectant, vous acceptez nos
                    <a className="group text-[#B9986F] hover:text-[#7A5230] transition-all duration-200 ease-in-out mx-1" href="#">
                      <span className="bg-left-bottom bg-gradient-to-r from-[#B9986F] to-[#7A5230] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                        Conditions d'utilisation
                      </span>
                    </a>
                    et notre
                    <a className="group text-[#B9986F] hover:text-[#7A5230] transition-all duration-200 ease-in-out mx-1" href="#">
                      <span className="bg-left-bottom bg-gradient-to-r from-[#B9986F] to-[#7A5230] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                        Politique de confidentialité
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
