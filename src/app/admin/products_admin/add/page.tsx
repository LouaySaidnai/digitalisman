'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';
import AdminEventCalendar from '@/components/AdminEventCalendar';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'webinaire' | 'individuel';
  duration: string;
  lien?: string;
}

function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    subtitle: '',
    slug: '',
    price: '',
    originalPrice: '',
    category: '',
    status: 'actif',
    availability: 'disponible'
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convertir les événements en format meeting pour la base de données
      const meetingData: { [key: string]: any[] } = {};
      
      events.forEach(event => {
        const eventName = event.title;
        if (!meetingData[eventName]) {
          meetingData[eventName] = [];
        }
        
        meetingData[eventName].push({
          date: event.date,
          type: event.type,
          time: event.time,
          duration: event.duration,
          lien: event.lien || null
        });
      });
      
      console.log('Données meeting à envoyer:', meetingData);

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          meeting: Object.keys(meetingData).length > 0 ? meetingData : null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      alert('Produit créé avec succès !');
      router.push('/admin/products_admin');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Échec de la création du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/products_admin');
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProduct({ ...product, name });
    
    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
    
    setProduct(prev => ({ ...prev, name, slug }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
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
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Ajouter un Nouveau Produit</h1>
        </header>
        
        {/* Add Product Form */}
        <section className="bg-white rounded-lg shadow p-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du Produit *
                </label>
                <input
                  type="text"
                  id="name"
                  value={product.name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Entrez le nom du produit"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Identifiant URL *
                </label>
                <input
                  type="text"
                  id="slug"
                  value={product.slug}
                  onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="product-slug"
                />
                <p className="text-xs text-gray-500 mt-1">Généré automatiquement à partir du nom, mais peut être modifié</p>
              </div>
            </div>

            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Sous-titre
              </label>
              <input
                type="text"
                id="subtitle"
                value={product.subtitle}
                onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Entrez le sous-titre du produit"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix
                </label>
                <input
                  type="text"
                  id="price"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 497€"
                />
              </div>

              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix Original
                </label>
                <input
                  type="text"
                  id="originalPrice"
                  value={product.originalPrice}
                  onChange={(e) => setProduct({ ...product, originalPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 697€"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie/Format
                </label>
                <select
                  id="category"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Coaching live">Coaching live</option>
                  <option value="Formation">Formation</option>
                  <option value="Webinaire">Webinaire</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Programme">Programme</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  id="status"
                  value={product.status}
                  onChange={(e) => setProduct({ ...product, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilité
                </label>
                <select
                  id="availability"
                  value={product.availability}
                  onChange={(e) => setProduct({ ...product, availability: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="disponible">Disponible</option>
                  <option value="non disponible">Non disponible</option>
                  <option value="inconnu">Inconnu</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#8B7355] text-white px-6 py-2 rounded shadow hover:bg-[#A89078] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création...' : 'Créer le Produit'}
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

        {/* Calendrier des événements */}
        <section className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendrier des Événements</h2>
          <p className="text-gray-600 mb-6">
            Ajoutez des webinaires et consultations individuelles pour ce produit. 
            Les clients pourront voir ces événements sur la page du produit.
          </p>
          {events.length > 0 && (
            <div className="mb-4 p-3 bg-[#F5E6D3] border border-[#8B7355] rounded-lg">
              <p className="text-[#8B7355] text-sm">
                📅 {events.length} événement(s) configuré(s). N'oubliez pas de sauvegarder le produit pour enregistrer les événements.
              </p>
            </div>
          )}
          <AdminEventCalendar 
            events={events} 
            onEventsChange={setEvents} 
          />
        </section>
      </main>
    </div>
  );
}

export default function AddProductProtected() {
  return (
    <AdminProtection>
      <AddProduct />
    </AdminProtection>
  );
} 