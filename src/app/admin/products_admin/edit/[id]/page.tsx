'use client';

import React, { useState, useEffect } from 'react';
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

interface Product {
  id: number;
  nom: string;
  sousTitre: string;
  slug: string;
  prix: string;
  prixOriginal: string | null;
  format: string | null;
  statut: string;
  disponibilite: string;
  meeting: any;
}

function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/products/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      
      // Parser le champ prix qui est un JSON string
      let parsedPrix = '';
      try {
        if (typeof data.prix === 'string') {
          const prixData = JSON.parse(data.prix);
          parsedPrix = prixData.prix || '';
        } else if (data.prix && typeof data.prix === 'object') {
          parsedPrix = data.prix.prix || '';
        }
      } catch (error) {
        console.error('Error parsing prix JSON:', error);
        parsedPrix = '';
      }
      
      // Créer un produit avec le prix parsé
      const productWithParsedPrix = {
        ...data,
        prix: parsedPrix
      };
      
      setProduct(productWithParsedPrix);
      
      // Convertir les données meeting en événements pour le calendrier
      if (data.meeting) {
        const convertedEvents: Event[] = [];
        Object.entries(data.meeting).forEach(([title, eventList]: [string, any]) => {
          if (Array.isArray(eventList)) {
            eventList.forEach((event: any, index: number) => {
              // Créer un ID unique basé sur le titre, la date et l'heure
              const uniqueId = `${title}-${event.date}-${event.time.replace(/[^0-9]/g, '')}`;
              convertedEvents.push({
                id: uniqueId,
                title: title,
                date: event.date,
                time: event.time,
                type: event.type,
                duration: event.duration,
                lien: event.lien
              });
            });
          }
        });
        setEvents(convertedEvents);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setSaving(true);
    
    try {
      // Convertir les événements en format meeting pour la base de données
      const meetingData: { [key: string]: any[] } = {};
      
      console.log('Événements à sauvegarder:', events);
      
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

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: product.nom,
          sousTitre: product.sousTitre,
          slug: product.slug,
          prix: product.prix,
          prixOriginal: product.prixOriginal,
          format: product.format,
          statut: product.statut,
          disponibilite: product.disponibilite,
          meeting: Object.keys(meetingData).length > 0 ? meetingData : null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      alert('Produit modifié avec succès !');
      router.push('/admin/products_admin');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Échec de la modification du produit');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/products_admin');
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    
    const name = e.target.value;
    setProduct({ ...product, nom: name });
    
    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
    
    setProduct(prev => prev ? { ...prev, nom: name, slug } : null);
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
            <div className="text-xl text-gray-600">Chargement du produit...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
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
              <div className="text-xl text-red-600 mb-4">Erreur lors du chargement du produit</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button 
                onClick={fetchProduct}
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
          <a href="/admin/users_admin" className="text-gray-700 hover:text-blue-600 font-medium">Users</a>
          <a href="/admin/products_admin" className="text-blue-600 font-medium">Products</a>
          <a href="/admin/orders_admin" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Settings</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Modifier le Produit</h1>
        </header>
        
        {/* Edit Product Form */}
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
                  value={product.nom}
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
                value={product.sousTitre || ''}
                onChange={(e) => setProduct({ ...product, sousTitre: e.target.value })}
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
                  value={product.prix}
                  onChange={(e) => setProduct({ ...product, prix: e.target.value })}
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
                  value={product.prixOriginal || ''}
                  onChange={(e) => setProduct({ ...product, prixOriginal: e.target.value })}
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
                  value={product.format || ''}
                  onChange={(e) => setProduct({ ...product, format: e.target.value })}
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
                  value={product.statut}
                  onChange={(e) => setProduct({ ...product, statut: e.target.value })}
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
                  value={product.disponibilite}
                  onChange={(e) => setProduct({ ...product, disponibilite: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="disponible">Disponible</option>
                  <option value="non disponible">Non disponible</option>
                  <option value="bientôt disponible">Bientôt disponible</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#8B7355] text-white px-6 py-2 rounded shadow hover:bg-[#A89078] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder les Modifications'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
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
            Modifiez les webinaires et consultations individuelles pour ce produit. 
            Les clients pourront voir ces événements sur la page du produit.
          </p>
          {events.length > 0 && (
            <div className="mb-4 p-3 bg-[#F5E6D3] border border-[#8B7355] rounded-lg">
              <p className="text-[#8B7355] text-sm">
                📅 {events.length} événement(s) configuré(s). N'oubliez pas de sauvegarder les modifications du produit pour enregistrer les changements.
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

export default function EditProductProtected({ params }: { params: { id: string } }) {
  return (
    <AdminProtection>
      <EditProduct params={params} />
    </AdminProtection>
  );
} 