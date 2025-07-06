'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaCheckCircle, FaStar, FaArrowRight, FaPlay, FaClock, FaUsers, FaShieldAlt, FaImage, FaVideo, FaGift, FaExclamationTriangle, FaPlus } from 'react-icons/fa'

// Fonction pour formater le prix
function formatPrix(prix: any): string {
  if (!prix) return 'Prix sur demande';
  
  // Si c'est une string, on essaie de la parser comme JSON
  if (typeof prix === 'string') {
    try {
      const parsedPrix = JSON.parse(prix);
      // Maintenant on traite l'objet parsé
      if (parsedPrix.format) return parsedPrix.format;
      if (parsedPrix.original) return parsedPrix.original;
      if (parsedPrix.montant && parsedPrix.devise) {
        return `${parsedPrix.montant} ${parsedPrix.devise}`;
      }
      if (parsedPrix.montant) {
        return `${parsedPrix.montant}€`;
      }
      // Si on a des clés comme "Atelier", "Programme", etc.
      const keys = Object.keys(parsedPrix);
      if (keys.length > 0) {
        return parsedPrix[keys[0]]; // Retourne la première valeur
      }
    } catch (e) {
      // Si ce n'est pas du JSON valide, on retourne la string telle quelle
      return prix;
    }
  }
  
  // Si c'est un objet (cas rare mais possible)
  if (typeof prix === 'object') {
    if (prix.format) return prix.format;
    if (prix.original) return prix.original;
    if (prix.montant && prix.devise) {
      return `${prix.montant} ${prix.devise}`;
    }
    if (prix.montant) {
      return `${prix.montant}€`;
    }
    const keys = Object.keys(prix);
    if (keys.length > 0) {
      return prix[keys[0]];
    }
  }
  
  return 'Prix sur demande';
}

interface Produit {
  id: number
  nom: string
  slug: string
  sousTitre?: string
  description: string
  conceptFondateur?: string
  cible?: string
  problemeResolu?: string
  niveauPriorite?: number
  contenu?: string
  processus?: string
  duree?: string
  prix: string
  prixOriginal?: string
  optionsTarification?: any // JSON object
  garantie?: string
  conditionsPaiement?: string
  preuves?: string
  temoignages?: string
  resultatsAttendus?: string
  differenciation?: string
  avantagesCompetitifs?: string
  integrationEcosysteme?: string
  entonnoirNaturel?: string
  argumentsCommerciaux?: string
  urgence?: string
  exemplesConcrets?: string
  casPratiques?: string
  livrable: string
  livrablesDetailles?: string
  supportsInclus?: string
  faq?: any // JSON object
  objectionsAnticipees?: string
  statut: string
  dateCreation: string
  dateModification: string
  // Champs médias ajoutés
  imageHero?: string
  videoUrl?: string
  imageProblemes?: string
  gifSolution?: string
}

export default function ProduitDetail({ params }: { params: { produitid: string } }) {
  const { produitid } = params
  const [produit, setProduit] = useState<Produit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchProduit = async () => {
      try {
        const response = await fetch(`/api/produits/${produitid}`)
        if (!response.ok) {
          throw new Error('Produit non trouvé')
        }
        const data = await response.json()
        setProduit(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }

    fetchProduit()
  }, [produitid, mounted])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7A5230] mx-auto"></div>
          <p className="mt-4 text-[#5C3A00] text-xl">Chargement...</p>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7A5230] mx-auto"></div>
          <p className="mt-4 text-[#5C3A00] text-xl">Chargement du produit...</p>
        </div>
      </main>
    )
  }

  if (error || !produit) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-[#5C3A00] mb-6">{error || 'Produit non trouvé'}</p>
          <Link href="/products" className="inline-flex items-center bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white px-6 py-3 rounded-xl hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all">
            <FaArrowLeft className="mr-2" />
            Retour aux produits
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
      

      {/* Hero Section : Vidéo témoignage + CTA fort */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Image Hero en arrière-plan */}
        {produit.imageHero ? (
          <img
            src={produit.imageHero}
            alt={produit.nom}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A5230] to-[#B9986F] flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-dashed border-white/50">
                <FaImage className="text-4xl" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto border-2 border-dashed border-white/50">
                <p className="text-2xl font-bold mb-3">🖼️ IMAGE HERO MANQUANTE</p>
                <p className="text-lg opacity-90 mb-4">Image principale du produit</p>
                <div className="text-sm opacity-75 space-y-1">
                  <p>📏 <strong>Dimensions recommandées :</strong> 1200x800px</p>
                  <p>🎨 <strong>Format :</strong> JPG ou PNG</p>
                  <p>💡 <strong>Conseil :</strong> Image de haute qualité représentative du produit</p>
                  <p>📍 <strong>Emplacement :</strong> Champ "imageHero" dans la base de données</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenu principal - Titre, sous-titre, CTA */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {produit.nom}
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              {produit.sousTitre || "Sous-titre du produit à ajouter"}
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-semibold text-white bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl inline-block">
              {produit.argumentsCommerciaux || "Découvrir maintenant"}
            </p>
          </div>
        </div>

        {/* Vidéo de témoignage*/}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {produit.videoUrl ? (
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
                  🎥 VIDÉO TÉMOIGNAGE CLIENT
                </p>
              </div>
              <video
                autoPlay
                muted
                loop
                className="w-[500px] h-[375px] object-cover rounded-2xl shadow-2xl"
              >
                <source src={produit.videoUrl} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm inline-block">
                  🎥 VIDÉO TÉMOIGNAGE CLIENT
                </p>
              </div>
              <div className="w-[500px] h-[375px] bg-black rounded-2xl shadow-2xl flex items-center justify-center border-4 border-dashed border-white/50">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-white/50">
                    <FaVideo className="text-3xl" />
                  </div>
                  <p className="text-xl font-bold mb-2">VIDÉO TÉMOIGNAGE</p>
                  <p className="text-sm opacity-90 mb-2">Témoignage client de 2-3 minutes</p>
                  <div className="text-xs opacity-75 space-y-1">
                    <p>📹 <strong>Format :</strong> MP4 recommandé</p>
                    <p>⏱️ <strong>Durée :</strong> 2-3 minutes</p>
                    <p>📏 <strong>Résolution :</strong> 1920x1080px minimum</p>
                    <p>💡 <strong>Conseil :</strong> Témoignage authentique et impactant</p>
                    <p>📍 <strong>Emplacement :</strong> Champ "videoUrl"</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Problème Douloureux : Aligné sur les "pain points" du document original */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Le Problème Douloureux</h2>
         
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"{produit.problemeResolu?.split('.')[0] || 'Problème principal à identifier'}"</h3>
              <p className="text-sm text-[#5C3A00]">Problème principal identifié</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-2xl text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"Mes clients ne voient pas ma vraie valeur"</h3>
              <p className="text-sm text-[#5C3A00]">Manque de différenciation</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"Je ne sais pas comment standardiser mon expertise"</h3>
              <p className="text-sm text-[#5C3A00]">Besoin de structuration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution : Présentation produit avec GIF animé */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12">Notre Solution</h2>
          
          {/* GIF animé */}
          {produit.gifSolution ? (
            <img 
              src={produit.gifSolution} 
              alt="Animation solution" 
              className="w-full h-96 object-cover rounded-3xl shadow-xl mb-12" 
            />
          ) : (
            <div className="w-full h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-xl mb-12 flex items-center justify-center border-4 border-dashed border-blue-400">
              <div className="text-center text-[#7A5230] bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-blue-400">
                  <FaGift className="text-3xl text-blue-600" />
                </div>
                <p className="text-2xl font-bold mb-3">🎬 GIF ANIMÉ MANQUANT</p>
                <p className="text-sm mb-4">Animation montrant la transformation du problème vers la solution</p>
                <div className="text-xs opacity-75 space-y-1">
                  <p>⏱️ <strong>Durée :</strong> 3-5 secondes</p>
                  <p>📹 <strong>Format :</strong> GIF ou MP4</p>
                  <p>🎯 <strong>Objectif :</strong> Montrer avant/après</p>
                  <p>💡 <strong>Conseil :</strong> Animation fluide et impactante</p>
                  <p>📍 <strong>Emplacement :</strong> Champ "gifSolution"</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#7A5230] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Étape 1</h3>
              <p className="text-lg text-[#5C3A00]">Diagnostic et cartographie</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#B9986F] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Étape 2</h3>
              <p className="text-lg text-[#5C3A00]">Packaging et structuration</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#7A5230] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Étape 3</h3>
              <p className="text-lg text-[#5C3A00]">Automatisation et scaling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processus : Timeline visuelle */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Processus Détaillé</h2>
          <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold">Étape</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Durée</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Livrable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B9986F]">
                  {produit.processus && produit.processus.split('\n').map((etape, index) => {
                    const parts = etape.split(' - ')
                    if (parts.length >= 2) {
                      return (
                        <tr key={index} className="hover:bg-white/50">
                          <td className="px-8 py-6 font-semibold text-[#4B2E05]">{parts[0]}</td>
                          <td className="px-8 py-6 text-[#5C3A00]">{parts[1]}</td>
                          <td className="px-8 py-6 text-[#5C3A00]">{parts[2] || ''}</td>
                        </tr>
                      )
                    }
                    return null
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Différenciation : Comparaison vs. formations publiques (Pôle emploi/CCI) */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Différenciation</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold">Critère</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Formations Publiques (Pôle Emploi/CCI)</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Notre Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-[#f5ecd7]/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Personnalisation</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Modèles génériques</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">Offres sur-mesure pour votre secteur</td>
                  </tr>
                  <tr className="hover:bg-[#f5ecd7]/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Suivi</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Maximum 2 semaines</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">3 mois d'accès communauté</td>
                  </tr>
                  <tr className="hover:bg-[#f5ecd7]/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Résultat</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Théorie</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">Catalogue opérationnel</td>
                  </tr>
                  <tr className="hover:bg-[#f5ecd7]/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Prix</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Subventionné mais limité</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">Investissement rentable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Tarification & Garantie : Options claires + badge de confiance */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Tarification & Garantie</h2>
          
          {/* Options de tarification */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {produit.optionsTarification ? (
              Object.entries(produit.optionsTarification).map(([key, option]: [string, any], index) => (
                <div key={key} className={`bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform relative ${index === 1 ? 'ring-4 ring-[#B9986F]' : ''}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      POPULAIRE
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">{option.nom}</h3>
                  <p className="text-4xl font-bold text-[#7A5230] mb-6">{option.prix}€</p>
                  <p className="text-sm text-[#5C3A00]">{option.duree}</p>
                </div>
              ))
            ) : (
              <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Tarification</h3>
                <p className="text-4xl font-bold text-[#7A5230]">{formatPrix(produit.prix)}</p>
              </div>
            )}
          </div>
          
          {/* Badge de confiance */}
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-6 shadow-lg">
              <FaShieldAlt className="text-4xl text-[#7A5230] mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#4B2E05]">{produit.garantie || "Satisfait ou remboursé 30 jours"}</h3>
                <p className="text-[#5C3A00]">Votre satisfaction est notre priorité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof : Témoignages sectoriels */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Ils ont transformé leur business</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Témoignage Client</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.temoignages || 'Témoignage client à ajouter'}"</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Preuves</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.preuves || 'Preuves de résultats à ajouter'}"</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Résultats</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.resultatsAttendus || 'Résultats attendus à ajouter'}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ : Objections anticipées */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {produit.faq && typeof produit.faq === 'string' && produit.faq.split('\n').filter((line: string) => line.trim().startsWith('Q:')).map((faq: string, index: number) => {
              const [question, answer] = faq.split('R:')
              if (!answer) return null
              
              return (
                <div key={index} className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-[#4B2E05] mb-4">
                    {question.replace('Q:', '').trim()}
                  </h3>
                  <p className="text-[#5C3A00] text-lg">
                    {answer.trim()}
                  </p>
                </div>
              )
            })}
            
            {/* Objections anticipées */}
            {produit.objectionsAnticipees && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-red-800 mb-4">Objections anticipées</h3>
                <div className="text-red-700">
                  {produit.objectionsAnticipees.split('\n').map((objection, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{objection}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre expertise ?</h2>
          <p className="text-xl mb-8 opacity-90">
            {produit.argumentsCommerciaux || "Argument commercial à ajouter"}
          </p>
          {produit.urgence && (
            <p className="text-lg mb-6 opacity-90 bg-red-500/20 px-4 py-2 rounded-lg">
              ⚠️ {produit.urgence}
            </p>
          )}
          <button className="bg-white text-[#7A5230] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg text-lg transform hover:scale-105">
            Commencer ma transformation
          </button>
        </div>
      </section>
    </main>
  )
} 