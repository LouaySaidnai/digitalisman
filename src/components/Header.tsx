"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const { getItemCount } = useCart();

  const handleLogin = () => {
    console.log('Bouton Se connecter cliqué');
    router.push('/Login');
  };

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  return (
    <header className="bg-gradient-to-r from-[#4B2E05] via-[#7A5230] to-[#4B2E05] shadow-lg border-b-2 border-[#B9986F]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo avec navigation vers home */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <h1 className="text-4xl font-bold text-[#F5E9D1] group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  50+
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#B9986F] to-[#A8875E] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <div className="w-1 h-8 bg-gradient-to-b from-[#B9986F] to-[#A8875E] rounded-full"></div>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/Panier"
                  className="relative group px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span className="text-[#F5E9D1] font-medium text-lg group-hover:text-white transition-colors duration-300">
                    Mon panier
                  </span>
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {getItemCount()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-[#B9986F]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B9986F] to-[#A8875E] group-hover:w-full transition-all duration-300"></div>
                </Link>
                
                <button
                  aria-label="Se déconnecter"
                  onClick={handleLogout}
                  className="relative group px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <span className="text-[#F5E9D1] font-medium text-lg group-hover:text-white transition-colors duration-300">
                    Se déconnecter
                  </span>
                  <div className="absolute inset-0 bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></div>
                </button>
              </>
            ) : (
              <Link
                href="/Login"
                className="relative group px-6 py-3 rounded-lg transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#B9986F] to-[#A8875E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-[#F5E9D1] font-medium text-lg group-hover:text-white transition-colors duration-300">
                  Se connecter
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 