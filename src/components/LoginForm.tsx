"use client";

import React, { useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  isLoading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  isLoading,
  error,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
          {error}
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

      <div className="space-y-2">
        <label htmlFor="password" className="block text-[#4B2E05] text-lg font-medium">Mot de passe</label>
        <div className="relative">
          <input
            id="password"
            className="w-full px-4 py-4 pr-12 border-2 border-[#D6C4A2] bg-white/80 backdrop-blur-sm rounded-xl shadow-sm placeholder-[#A8875E] focus:outline-none focus:border-[#7A5230] focus:ring-4 focus:ring-[#7A5230]/10 transition-all duration-300 ease-in-out"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-[#A8875E] hover:text-[#7A5230] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7A5230]/20 rounded-lg"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              // Icône œil barré (masqué)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              // Icône œil (visible)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <div className="w-5 h-5 border-2 border-[#A8875E] rounded-md peer-checked:bg-[#7A5230] peer-checked:border-[#7A5230] transition-all duration-200 group-hover:border-[#7A5230]"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <span className="text-[#5C3A00] text-sm font-medium group-hover:text-[#4B2E05] transition-colors duration-200">Se souvenir de moi</span>
        </label>
        
        <Link
          href="/forgot-password"
          className="group text-[#B9986F] hover:text-[#7A5230] transition-all duration-200 ease-in-out text-sm font-medium"
        >
          <span className="bg-left-bottom bg-gradient-to-r from-[#B9986F] to-[#7A5230] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
            Mot de passe oublié ?
          </span>
        </Link>
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
              <span>Connexion en cours...</span>
            </>
          ) : (
            <>
              <span>SE CONNECTER</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default LoginForm;