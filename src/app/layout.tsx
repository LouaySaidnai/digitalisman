"use client";

import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          {!isAdminPage && <Header />}
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
