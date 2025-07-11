// my-app/src/app/recuperation-mdp/page.tsx
"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";

function RecuperationMdpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    try {
      // Appel API pour réinitialiser le mot de passe
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la réinitialisation.");
      } else {
        router.push("/Login");
      }
    } catch (err) {
      setError("Erreur lors de la réinitialisation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center min-h-screen bg-[#F5E9D1]">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 relative z-10">
        <h1 className="font-bold text-[#4B2E05] text-3xl text-center mb-6">Réinitialisation du mot de passe</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-[#4B2E05] text-lg font-medium">Nouveau mot de passe</label>
            <input
              id="password"
              className="w-full px-4 py-4 border-2 border-[#D6C4A2] bg-white/80 rounded-xl shadow-sm placeholder-[#A8875E] focus:outline-none focus:border-[#7A5230] focus:ring-4 focus:ring-[#7A5230]/10 transition-all duration-300"
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-[#4B2E05] text-lg font-medium">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              className="w-full px-4 py-4 border-2 border-[#D6C4A2] bg-white/80 rounded-xl shadow-sm placeholder-[#A8875E] focus:outline-none focus:border-[#7A5230] focus:ring-4 focus:ring-[#7A5230]/10 transition-all duration-300"
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="relative w-full bg-gradient-to-r from-[#7A5230] via-[#A8875E] to-[#B9986F] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RecuperationMdpPage() {
  return (
    <Suspense>
      <RecuperationMdpForm />
    </Suspense>
  );
}