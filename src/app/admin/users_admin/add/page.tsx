'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

function AddUser() {
  const router = useRouter();
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    role: 'User',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          nom: user.nom,
          prenom: user.prenom,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      alert('Utilisateur créé avec succès !');
      router.push('/admin/users_admin');
      // Optionally refresh the users list on the admin page
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Échec de la création de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/users_admin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/admin/users_admin" className="text-blue-600 font-medium">Users</a>
          <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Ajouter un Nouvel Utilisateur</h1>
        </header>
        
        {/* Add User Form */}
        <section className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="prenom"
                value={user.prenom}
                onChange={(e) => setUser({ ...user, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez le prénom"
              />
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="nom"
                value={user.nom}
                onChange={(e) => setUser({ ...user, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez le nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Entrez l'adresse email"
              />
            </div>

            <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
                placeholder="Entrez le mot de passe (minimum 6 caractères)"
              />
            </div>

            <div>
                              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Rôle
                </label>
              <select
                id="role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>

            <div>
                              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
              <select
                id="status"
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#8B7355] text-white px-6 py-2 rounded shadow hover:bg-[#A89078] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création...' : 'Créer l\'Utilisateur'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="bg-[#D2B48C] text-[#5D4037] px-6 py-2 rounded shadow hover:bg-[#C4A484] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default function AddUserProtected() {
  return (
    <AdminProtection>
      <AddUser />
    </AdminProtection>
  );
} 