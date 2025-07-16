'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    role: 'User',
    status: 'Active'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser({
          prenom: userData.prenom || '',
          nom: userData.nom || '',
          email: userData.email,
          role: userData.role,
          status: userData.status
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to load user data');
        router.push('/admin/users_admin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      alert('User updated successfully!');
      router.push('/admin/users_admin');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  const handleCancel = () => {
    router.push('/admin/users_admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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
          <a href="/admin/users_admin" className="text-blue-600 font-medium">Users</a>
          <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit User</h1>
        </header>
        
        {/* Edit Form */}
        <section className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                value={user.prenom}
                onChange={(e) => setUser({ ...user, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                value={user.nom}
                onChange={(e) => setUser({ ...user, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
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
                Status
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
                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded shadow hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default function EditUserProtected({ params }: { params: { id: string } }) {
  return (
    <AdminProtection>
      <EditUser params={params} />
    </AdminProtection>
  );
} 