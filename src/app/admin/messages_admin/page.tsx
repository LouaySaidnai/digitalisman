'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

interface Message {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  objet: string;
  message: string;
  createdAt: string;
  age: string;
}

function MessagesAdmin() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
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

  const handleDeleteMessage = async (messageId: number, senderName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le message de ${senderName} ?`)) {
      try {
        const response = await fetch(`/api/admin/messages/${messageId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete message');
        }

        // Remove message from local state
        setMessages(messages.filter(message => message.id !== messageId));
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
        alert('Message supprimé avec succès !');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Échec de la suppression du message');
      }
    }
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      alert('Échec de la copie de l\'email');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <aside className="w-64 bg-white shadow-md flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin</h2>
          <nav className="flex flex-col gap-4">
            <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Utilisateurs</a>
            <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Produits</a>
            <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
            <a href="/admin/messages_admin" className="text-blue-600 font-medium">Messages</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Chargement des messages...</div>
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
            <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Utilisateurs</a>
            <a href="/admin/products_admin" className="text-gray-700 hover:text-blue-600 font-medium">Produits</a>
            <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
            <a href="/admin/messages_admin" className="text-blue-600 font-medium">Messages</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-4">Erreur lors du chargement des messages</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button 
                onClick={fetchMessages}
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
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Commandes</a>
          <a href="/admin/messages_admin" className="text-blue-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Paramètres</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des messages */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700">Messages reçus ({messages.length})</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Aucun message reçu
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-[#F5E6D3] border-[#8B7355]' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 truncate">{message.nom}</h3>
                        <span className="text-xs text-gray-500">{message.age}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.objet}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.email}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Détails du message */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <section className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMessage.objet}</h2>
                    <p className="text-gray-600">De : {selectedMessage.nom}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id, selectedMessage.nom)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Supprimer
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <p className="text-gray-900">{selectedMessage.nom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <p className="text-gray-900">{selectedMessage.telephone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.objet}`, '_blank')}
                      className="bg-[#8B7355] text-white px-4 py-2 rounded shadow hover:bg-[#A89078] transition"
                    >
                      Répondre par email
                    </button>
                    <button
                      onClick={() => handleCopyEmail(selectedMessage.email)}
                      className={`px-4 py-2 rounded shadow transition flex items-center gap-2 ${
                        copiedEmail === selectedMessage.email
                          ? 'bg-green-600 text-white'
                          : 'bg-[#D2B48C] text-[#5D4037] hover:bg-[#C4A484]'
                      }`}
                    >
                      {copiedEmail === selectedMessage.email ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Copié !
                        </>
                      ) : (
                        'Copier l\'email'
                      )}
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-white rounded-lg shadow p-6">
                <div className="text-center text-gray-500">
                  <p className="text-lg">Sélectionnez un message pour voir les détails</p>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MessagesAdminProtected() {
  return (
    <AdminProtection>
      <MessagesAdmin />
    </AdminProtection>
  );
} 