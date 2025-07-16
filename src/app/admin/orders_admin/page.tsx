'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

interface Order {
  id: number;
  numeroFacture: string;
  dateFacture: string;
  datePaiement: string | null;
  clientId: string;
  clientEmail: string;
  clientName: string;
  produits: any[];
  nombreProduits: number;
  sousTotal: number;
  reduction: number;
  total: number;
  statut: string;
  statutAcces: string;
  methodePaiement: string;
  referencePaiement: string | null;
  couponUtilise: {
    code: string;
    description: string;
  } | null;
  dateAcces: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

function OrdersAdmin() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payee':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'annulee':
        return 'bg-red-100 text-red-800';
      case 'remboursee':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getAccessStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiree':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleRefund = async (orderId: number, orderNumber: string) => {
    if (confirm(`Êtes-vous sûr de vouloir rembourser la facture ${orderNumber} ?\n\nCette action est irréversible et révoquera l'accès aux formations.`)) {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}/refund`, {
          method: 'POST',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process refund');
        }

        alert('Remboursement effectué avec succès !');
        fetchOrders(); // Recharger la liste
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Échec du remboursement');
      }
    }
  };

  const handleCancel = async (orderId: number, orderNumber: string) => {
    if (confirm(`Êtes-vous sûr de vouloir annuler la facture ${orderNumber} ?\n\nCette action est irréversible.`)) {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            statut: 'annulee',
            statutAcces: 'expiree',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to cancel order');
        }

        alert('Facture annulée avec succès !');
        fetchOrders(); // Recharger la liste
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Échec de l\'annulation');
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
            <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="/admin/orders_admin" className="text-blue-600 font-medium">Orders</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Chargement des commandes...</div>
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
            <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="/admin/orders_admin" className="text-blue-600 font-medium">Orders</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-4">Erreur lors du chargement des commandes</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button 
                onClick={fetchOrders}
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
          <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Produits</a>
          <a href="/admin/orders_admin" className="text-blue-600 font-medium">Commandes</a>
          <a href="/admin/messages_admin" className="text-gray-700 hover:text-blue-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Commandes</h1>
          <a 
            href="/"
            className="bg-[#D2B48C] text-[#5D4037] px-4 py-2 rounded shadow hover:bg-[#C4A484] transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voir le site
          </a>
        </header>
        {/* Orders Table */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">Toutes les Commandes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Facture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accès</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.numeroFacture}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.clientName}</div>
                      <div className="text-sm text-gray-500">{order.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.nombreProduits} produit(s)</div>
                      <div className="text-sm text-gray-500">
                        {order.produits.slice(0, 2).map((produit: any, index: number) => (
                          <span key={index}>
                            {produit.nomProduit}
                            {index < Math.min(2, order.produits.length - 1) ? ', ' : ''}
                          </span>
                        ))}
                        {order.produits.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                      {order.reduction > 0 && (
                        <div className="text-sm text-green-600">-{formatCurrency(order.reduction)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.statut)}`}>
                        {order.statut === 'payee' ? 'Payée' :
                         order.statut === 'en_attente' ? 'En attente' :
                         order.statut === 'annulee' ? 'Annulée' :
                         order.statut === 'remboursee' ? 'Remboursée' : order.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessStatusColor(order.statutAcces)}`}>
                        {order.statutAcces === 'active' ? 'Actif' :
                         order.statutAcces === 'en_attente' ? 'En attente' :
                         order.statutAcces === 'expiree' ? 'Expiré' : order.statutAcces}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.dateFacture)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-[#8B7355] hover:text-[#A89078] mr-3">
                        Voir
                      </button>
                      {order.statut === 'payee' && (
                        <button 
                          onClick={() => handleRefund(order.id, order.numeroFacture)}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                        >
                          Rembourser
                        </button>
                      )}
                      {order.statut === 'en_attente' && (
                        <button 
                          onClick={() => handleCancel(order.id, order.numeroFacture)}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          Annuler
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        Accès
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

export default function OrdersAdminProtected() {
  return (
    <AdminProtection>
      <OrdersAdmin />
    </AdminProtection>
  );
} 