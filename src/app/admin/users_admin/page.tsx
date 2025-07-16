'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  facturesCount: number;
  couponsCount: number;
}

function UsersAdmin() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId: string) => {
    router.push(`/admin/users_admin/edit/${userId}`);
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${userName} ?`)) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete user');
        }

        // Remove user from local state
        setUsers(users.filter(user => user.id !== userId));
        alert('Utilisateur supprimé avec succès !');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Échec de la suppression de l\'utilisateur');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
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
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Chargement des utilisateurs...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
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
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-4">Erreur lors du chargement des utilisateurs</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button 
                onClick={fetchUsers}
                className="bg-[#8B7355] text-white px-4 py-2 rounded shadow hover:bg-[#A89078] transition"
              >
                Réessayer
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
          <a href="/admin/users_admin" className="text-blue-600 font-medium">Utilisateurs</a>
          <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Produits</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
          <a href="/admin/messages_admin" className="text-gray-700 hover:text-blue-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Utilisateurs</h1>
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
              onClick={() => router.push('/admin/users_admin/add')}
              className="bg-[#8B7355] text-white px-4 py-2 rounded shadow hover:bg-[#A89078] transition"
            >
              Ajouter un Utilisateur
            </button>
          </div>
        </header>
        {/* Users Table */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Tous les Utilisateurs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(user.id)}
                        className="text-[#8B7355] hover:text-[#A89078] mr-3"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function UsersAdminProtected() {
  return (
    <AdminProtection>
      <UsersAdmin />
    </AdminProtection>
  );
} 