'use client';

import React from 'react';
import AdminProtection from '@/components/AdminProtection';

function AdminDashboard() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="text-blue-600 font-medium">Tableau de bord</a>
          <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Utilisateurs</a>
          <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Produits</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
          <a href="/admin/messages_admin" className="text-gray-700 hover:text-blue-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <div className="flex gap-3">
            <a 
              href="/"
              className="bg-[#D2B48C] text-[#5D4037] px-4 py-2 rounded shadow hover:bg-[#C4A484] transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Voir le site
            </a>
            <button 
              onClick={handleLogout}
              className="bg-[#8B7355] text-white px-4 py-2 rounded shadow hover:bg-[#A89078] transition"
            >
              Déconnexion
            </button>
          </div>
        </header>
        {/* Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-600">1,245</span>
            <span className="text-gray-500 mt-2">Utilisateurs</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-green-600">€12,340</span>
            <span className="text-gray-500 mt-2">Ventes</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-500">23</span>
            <span className="text-gray-500 mt-2">Commandes aujourd'hui</span>
          </div>
        </section>
        {/* Recent Activity */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Activité récente</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between text-gray-700">
              <span>Nouvel utilisateur inscrit</span>
              <span className="text-sm text-gray-400">Il y a 2 min</span>
            </li>
            <li className="py-2 flex justify-between text-gray-700">
              <span>Commande #1234 terminée</span>
              <span className="text-sm text-gray-400">Il y a 10 min</span>
            </li>
            <li className="py-2 flex justify-between text-gray-700">
              <span>Produit "Grains de café" mis à jour</span>
              <span className="text-sm text-gray-400">Il y a 1 heure</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default function AdminDashboardProtected() {
  return (
    <AdminProtection>
      <AdminDashboard />
    </AdminProtection>
  );
} 