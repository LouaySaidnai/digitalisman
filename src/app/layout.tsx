"use client";

import { useState } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  const handleLoginLogout = () => {
    setIsConnected(!isConnected);
  };

  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-[#4B2E05] shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-[#F5E9D1]">50+</h1>
          <nav className="space-x-4 flex items-center">
            {isConnected ? (
              <>
                <Link href="/mes-offres" className="text-[#F5E9D1] font-medium hover:underline">
                  Mes offres
                </Link>
                <button
                  aria-label="Se déconnecter"
                  onClick={handleLoginLogout}
                  className="text-[#F5E9D1] font-medium hover:underline"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <button
                aria-label="Se connecter"
                onClick={handleLoginLogout}
                className="text-[#F5E9D1] font-medium hover:underline"
              >
                Se connecter
              </button>
            )}
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
