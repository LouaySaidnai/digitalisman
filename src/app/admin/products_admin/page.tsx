'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  category: string;
  status: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
  testResultsCount: number;
}

function ProductsAdmin() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId: number) => {
    router.push(`/admin/products_admin/edit/${productId}`);
  };

  const handleDelete = async (productId: number, productName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${productName} ?`)) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete product');
        }

        // Remove product from local state
        setProducts(products.filter(product => product.id !== productId));
        alert('Produit supprimé avec succès !');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Échec de la suppression du produit');
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
            <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Users</a>
            <a href="/admin/products_admin" className="text-blue-600 font-medium">Products</a>
            <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Chargement des produits...</div>
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
            <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Users</a>
            <a href="/admin/products_admin" className="text-blue-600 font-medium">Products</a>
            <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-4">Erreur lors du chargement des produits</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button 
                onClick={fetchProducts}
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
          <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Utilisateurs</a>
          <a href="/admin/products_admin" className="text-blue-600 font-medium">Produits</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
          <a href="/admin/messages_admin" className="text-gray-700 hover:text-blue-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Produits</h1>
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
              onClick={() => router.push('/admin/products_admin/add')}
              className="bg-[#8B7355] text-white px-4 py-2 rounded shadow hover:bg-[#A89078] transition"
            >
              Ajouter un Produit
            </button>
          </div>
        </header>
        {/* Products Table */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Tous les Produits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sous-titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponibilité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(product.name || '')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{String(product.subtitle || '')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{String(product.price || '')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{String(product.category || '')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.availability === 'disponible' ? 'bg-green-100 text-green-800' : 
                        product.availability === 'non disponible' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(product.id)}
                        className="text-[#8B7355] hover:text-[#A89078] mr-3"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
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

export default function ProductsAdminProtected() {
  return (
    <AdminProtection>
      <ProductsAdmin />
    </AdminProtection>
  );
} 