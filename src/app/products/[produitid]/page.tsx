'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaCheckCircle, FaStar, FaArrowRight, FaPlay, FaClock, FaUsers, FaShieldAlt, FaImage, FaVideo, FaGift, FaExclamationTriangle, FaPlus, FaCompass, FaGraduationCap, FaHandshake, FaLightbulb, FaSeedling, FaChartLine } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'

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
  conceptFondateur?: { probleme: string; solution: string } // JSON object
  cible?: string
  niveauPriorite?: number
  contenu?: string
  processus?: string // Description du processus
  duree?: string
  prix: any // JSON object
  prixOriginal?: string
  garantie?: string
  conditionsPaiement?: string
  temoignages?: string
  argumentsCommerciaux?: string
  urgence?: string
  livrablesDetailles?: string
  supportsInclus?: string
  QuestionReponse?: any // JSON object
  scriptType?: string
  format?: string
  statut: string
  dateCreation: string
  dateModification: string
  // Champs médias ajoutés
  imageHero?: string
  videoUrl?: string
  gifSolution?: string
  
  // Disponibilité
  disponibilite?: string
}

// Fonction pour choisir une icône selon le nom du produit
function getIcon(name: string) {
  const lower = name.toLowerCase()
  
  // Coaching/Accompagnement
  if (lower.includes("coaching") || lower.includes("accompagnement")) return <FaUsers className="text-white text-6xl" />
  
  // Business/Stratégie
  if (lower.includes("business") || lower.includes("stratégie")) return <FaChartLine className="text-white text-6xl" />
  
  // Formation/Éducation
  if (lower.includes("formation") || lower.includes("webinaire")) return <FaGraduationCap className="text-white text-6xl" />
  
  // Innovation/Création
  if (lower.includes("innovation") || lower.includes("création")) return <FaLightbulb className="text-white text-6xl" />
  
  // Growth/Development
  if (lower.includes("croissance") || lower.includes("développement")) return <FaSeedling className="text-white text-6xl" />
  
  // Africa/Startup programs
  if (lower.includes("caméléon") || lower.includes("marchand")) return <FaCompass className="text-white text-6xl" />
  if (lower.includes("mentor") && lower.includes("afrique")) return <FaGraduationCap className="text-white text-6xl" />
  if (lower.includes("african") && lower.includes("co-founder")) return <FaHandshake className="text-white text-6xl" />
  
  // Default for strategy/consulting
  return <FaChartLine className="text-white text-6xl" />
}

export default function ProduitDetail({ params }: { params: { produitid: string } }) {
  const { produitid } = params;
  const [produit, setProduit] = useState<Produit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { addToCart } = useCart()

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

  // Fonction pour formater le prix
  const formatPrix = (prix: any) => {
    if (typeof prix === 'object' && prix.format) return prix.format
    if (typeof prix === 'object' && prix.original) return prix.original
    if (typeof prix === 'string') return prix
    return 'Prix sur demande'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
      
      {/* 1. HERO SECTION : Vidéo témoignage + CTA fort */}
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
              {getIcon(produit.nom)}
              <p className="text-2xl font-bold mt-4">Image Hero</p>
            </div>
          </div>
        )}

        {/* Overlay pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenu principal */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 -mt-64">
          <div className="bg-[#f5ecd7]/90 backdrop-blur-sm rounded-3xl p-12 mb-8 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#4B2E05]">
              {produit.nom}
            </h1>
            <h2 className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[#5C3A00]">
              {produit.sousTitre || "Sous-titre du produit"}
            </h2>
            
            {/* Informations détaillées */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
              {produit.cible && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold text-[#7A5230]">CIBLE</h3>
                  </div>
                  <p className="text-sm text-[#4B2E05]">{produit.cible}</p>
                </div>
              )}
              
              {produit.duree && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold text-[#7A5230]">DURÉE</h3>
                  </div>
                  <p className="text-sm text-[#4B2E05]">{produit.duree}</p>
                </div>
              )}
              
              {produit.niveauPriorite && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h3 className="text-sm font-bold text-[#7A5230]">PRIORITÉ</h3>
                  </div>
                  <p className="text-sm text-[#4B2E05]">
                    Niveau {produit.niveauPriorite} 
                    {produit.niveauPriorite === 1 && ' (Urgent)'}
                    {produit.niveauPriorite === 2 && ' (Moyen)'}
                    {produit.niveauPriorite === 3 && ' (Complémentaire)'}
                  </p>
                </div>
              )}
              
              {produit.format && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold text-[#7A5230]">FORMAT</h3>
                  </div>
                  <p className="text-sm text-[#4B2E05]">{produit.format}</p>
                </div>
              )}
              
              {produit.scriptType && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold text-[#7A5230]">QUESTION MAGIQUE</h3>
                  </div>
                  <p className="text-sm text-[#4B2E05] italic">"{produit.scriptType}"</p>
                </div>
              )}
              
              {produit.urgence && (
                <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-400 transform hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-red-700 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold text-red-700">URGENCE</h3>
                  </div>
                  <p className="text-sm text-red-800">{produit.urgence}</p>
                </div>
              )}
            </div>
            
            <p className="text-lg font-semibold text-white bg-[#7A5230] backdrop-blur-sm px-6 py-3 rounded-xl inline-block hover:bg-[#8B603A] transition-colors">
              {produit.argumentsCommerciaux || "Découvrir maintenant"}
            </p>
          </div>
        </div>

        {/* Vidéo de témoignage */}
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
                  <FaVideo className="text-4xl mx-auto mb-4" />
                  <p className="text-xl font-bold mb-2">VIDÉO TÉMOIGNAGE</p>
                  <p className="text-sm opacity-90">Témoignage client de 2-3 minutes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      

      {/* 2. PROBLÈME DOULOUREUX : Aligné sur les "pain points" */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center flex items-center justify-center">
            <svg className="w-12 h-12 text-[#7A5230] mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Le Problème Douloureux
            <svg className="w-12 h-12 text-[#7A5230] ml-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </h2>
          
          {/* Liste des problèmes */}
          {produit.conceptFondateur && (
            <div className="bg-white border-2 border-[#4B2E05] rounded-3xl p-8">
              <div className="space-y-6">
                {(produit.conceptFondateur.probleme || '').split('.').filter(probleme => probleme.trim()).map((probleme, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-[#7A5230] rounded-full mt-2"></div>
                    <p className="text-xl font-medium text-[#4B2E05] leading-relaxed">
                      {probleme.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. SOLUTION : Présentation produit avec GIF animé */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#7A5230] mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Notre Solution
            <svg className="w-12 h-12 text-[#7A5230] ml-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </h2>
          
          {/* Solution */}
          {produit.conceptFondateur && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#4B2E05] rounded-3xl p-8 mb-12">
              <div className="space-y-6">
                {(produit.conceptFondateur.solution || '').split('.').filter(solution => solution.trim()).map((solution, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-[#7A5230] rounded-full mt-2"></div>
                    <p className="text-xl font-medium text-[#4B2E05] leading-relaxed">
                      {solution.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* GIF animé */}
          {produit.gifSolution ? (
            <img 
              src={produit.gifSolution} 
              alt="gif animation produit" 
              className="w-full h-96 object-cover rounded-3xl shadow-xl mb-12" 
            />
          ) : (
            <div className="w-full h-96 bg-black rounded-3xl shadow-xl mb-12 flex items-center justify-center border-4 border-dashed border-white/50">
              <div className="text-center text-white bg-black/60 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
                <FaGift className="text-4xl mx-auto mb-4" />
                <p className="text-2xl font-bold mb-3">🎬 GIF ANIMÉ MANQUANT</p>
                <p className="text-sm mb-4">Présentation produit avec GIF animé</p>
              </div>
            </div>
          )}
          
       
        </div>
      </section>

      {/* 4. PROCESSUS : Timeline visuelle */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center flex items-center justify-center">
            <svg className="w-12 h-12 text-[#7A5230] mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 10-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Processus Détaillé
            <svg className="w-12 h-12 text-[#7A5230] ml-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 10-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </h2>
          
          {/* Processus simplifié */}
          {produit.processus ? (
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#4B2E05]">Notre Processus</h3>
                    {produit.duree && (
                      <span className="bg-[#7A5230] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {produit.duree}
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-white/60 rounded-2xl p-6 border-l-4 border-[#7A5230]">
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-line text-[#5C3A00] leading-relaxed">
                        {(produit.processus || '').split('\n').map((line, index) => (
                          <p key={index}>{line.trim()}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#4B2E05]">Processus personnalisé</h3>
                    {produit.duree && (
                      <span className="bg-[#7A5230] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {produit.duree}
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-white/60 rounded-2xl p-6 border-l-4 border-[#7A5230]">
                    <h4 className="text-lg font-semibold text-[#4B2E05] mb-3 flex items-center">
                      <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Livrable
                    </h4>
                    <p className="text-[#5C3A00] leading-relaxed">{produit.livrablesDetailles || 'Processus personnalisé selon vos besoins'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. CALENDRIER DES WEBINAIRES : Section interactive */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#f0e6d0] via-[#e8dcc0] to-[#f5ecd7] relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#7A5230]/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-[#B9986F]/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#4B2E05]/10 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-[#7A5230]/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#4B2E05] mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#7A5230] mr-6 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Calendrier des Webinaires
              <svg className="w-12 h-12 text-[#7A5230] ml-6 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24" style={{transform: 'scaleX(-1)'}}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </h2>
            <p className="text-xl text-[#5C3A00] max-w-3xl mx-auto leading-relaxed">
              Découvrez nos webinaires collectifs et consultations individuelles. 
              Planifiez votre formation et transformez votre projet en réalité !
            </p>
          </div>

          {/* Cartes des types de webinaires */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Webinaires Collectifs */}
            <a href="/meeting-calendar/webinaires" className="group bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-[#7A5230]/20 block">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Webinaires Collectifs</h3>
                <p className="text-[#5C3A00] mb-6">
                  Sessions interactives en groupe avec échanges entre entrepreneurs
                </p>
                <ul className="text-left space-y-2 text-[#5C3A00] mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Contenu structuré et progressif
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Questions-réponses en direct
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Accès aux enregistrements
                  </li>
                </ul>
                <div className="flex items-center justify-center text-[#7A5230] font-semibold group-hover:translate-x-2 transition-transform">
                  Voir le calendrier
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Consultations Individuelles */}
            <a href="/meeting-calendar/consultations-individuelles" className="group bg-gradient-to-br from-[#e8dcc0] to-[#d4c4a8] rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border-2 border-transparent hover:border-[#7A5230]/20 block">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5C3A00] to-[#7A5230] rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Consultations Individuelles</h3>
                <p className="text-[#5C3A00] mb-6">
                  Accompagnement personnalisé pour votre projet spécifique
                </p>
                <ul className="text-left space-y-2 text-[#5C3A00] mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#5C3A00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Analyse de votre projet
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#5C3A00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Conseils adaptés
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#5C3A00] mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Plan d'action détaillé
                  </li>
                </ul>
                <div className="flex items-center justify-center text-[#5C3A00] font-semibold group-hover:translate-x-2 transition-transform">
                  Voir le calendrier
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

        

          {/* Statistiques animées */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center group">
              <div className="text-4xl font-bold text-[#7A5230] mb-2 group-hover:scale-110 transition-transform">
                <span className="animate-count-up" data-target="50">0</span>+
              </div>
              <p className="text-[#5C3A00] font-medium">Webinaires par mois</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-[#7A5230] mb-2 group-hover:scale-110 transition-transform">
                <span className="animate-count-up" data-target="500">0</span>+
              </div>
              <p className="text-[#5C3A00] font-medium">Entrepreneurs formés</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-[#7A5230] mb-2 group-hover:scale-110 transition-transform">
                <span className="animate-count-up" data-target="95">0</span>%
              </div>
              <p className="text-[#5C3A00] font-medium">Taux de satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TARIFICATION & GARANTIE : Options claires + badge de confiance */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center flex items-center justify-center">
            <svg className="w-10 h-10 text-[#7A5230] mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Tarification & Garantie
            <svg className="w-10 h-10 text-[#7A5230] ml-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          </h2>
          
          {/* Options de tarification */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {produit.prix && typeof produit.prix === 'object' && Object.keys(produit.prix).length > 1 && !produit.prix.original && !produit.prix.promo ? (
              // Affichage des options multiples (comme pour "Le Produit, C'est Vous")
              Object.entries(produit.prix).map(([key, prix]: [string, any], index) => (
                <div key={key} className={`bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform relative ${index === 1 ? 'ring-4 ring-[#B9986F]' : ''}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      POPULAIRE
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">{key}</h3>
                  <p className="text-4xl font-bold text-[#7A5230] mb-6">{prix}</p>
                  
                  {/* Bouton Ajouter au panier pour chaque option */}
                  <button 
                    onClick={() => {
                      if (addToCart({
                        id: produit.id,
                        nom: `${produit.nom} - ${key}`,
                        prix: prix,
                        description: produit.sousTitre || produit.contenu || '',
                        slug: produit.slug
                      })) {
                        alert(`Option "${key}" ajoutée au panier !`);
                      }
                    }}
                    className="group relative w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white py-3 px-6 rounded-xl font-semibold text-base hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Choisir cette option
                    </div>
                  </button>
                </div>
              ))
            ) : (
              // Affichage d'un prix unique
              <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#7A5230] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                  Tarification
                  <svg className="w-6 h-6 text-[#7A5230] ml-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </h3>
                <p className="text-4xl font-bold text-[#7A5230]">
                  {formatPrix(produit.prix)}
                </p>
                {produit.conditionsPaiement && (
                  <p className="text-sm text-[#5C3A00] mt-2">{produit.conditionsPaiement}</p>
                )}
                
                {/* Bouton Ajouter au panier */}
                <div className="mt-8">
                  <button 
                    onClick={() => {
                      if (addToCart({
                        id: produit.id,
                        nom: produit.nom,
                        prix: formatPrix(produit.prix),
                        description: produit.sousTitre || produit.contenu || '',
                        slug: produit.slug
                      })) {
                        alert('Produit ajouté au panier !');
                      }
                    }}
                    className="group relative w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                  >
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Ajouter au panier
                      <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                  
                  {/* Badge de disponibilité */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      produit.disponibilite === 'disponible' ? 'bg-green-100 text-green-800' :
                      produit.disponibilite === 'non disponible' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                        produit.disponibilite === 'disponible' ? 'bg-green-500' :
                        produit.disponibilite === 'non disponible' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}></div>
                      {produit.disponibilite === 'disponible' ? 'Disponible' :
                       produit.disponibilite === 'non disponible' ? 'Non disponible' :
                       'Inconnu'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Badge de confiance */}
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-6 shadow-lg">
              <FaShieldAlt className="text-4xl text-[#7A5230] mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#4B2E05]">{produit.garantie || "Satisfait ou remboursé 30 jours"}</h3>{/*par defaut 30 jours pour rembourser */}
                <p className="text-[#5C3A00]">Votre satisfaction est notre priorité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF : Témoignages sectoriels */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
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
              <h3 className="font-bold text-[#4B2E05] mb-4">Arguments Commerciaux</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.argumentsCommerciaux || 'Arguments commerciaux à ajouter'}"</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Livrables</h3>
              <p className="text-lg italic text-[#5C3A00]">"{Array.isArray(produit.livrablesDetailles)
                ? produit.livrablesDetailles.map((livrable: string) => livrable.trim()).join('\n')
                : (typeof produit.livrablesDetailles === 'string'
                    ? produit.livrablesDetailles.split('\n').map((livrable: string) => livrable.trim()).join('\n')
                    : null)}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ : Objections anticipées */}
      <section className="py-20 px-6 bg-[#f0e6d0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center flex items-center justify-center">
            <svg className="w-10 h-10 text-[#7A5230] mr-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Questions fréquentes
            <svg className="w-10 h-10 text-[#7A5230] ml-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </h2>
          <div className="max-h-96 overflow-y-auto space-y-6 pr-2">
            {produit.QuestionReponse && typeof produit.QuestionReponse === 'object' && produit.QuestionReponse.faq ? (
              produit.QuestionReponse.faq.slice(0, 3).map((faq: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg transform origin-bottom transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <h3 className="text-xl font-bold text-[#4B2E05] mb-4 flex items-center">
                    <svg className="w-6 h-6 text-[#7A5230] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {faq.question}
                  </h3>
                  <p className="text-[#5C3A00] text-lg leading-relaxed">
                    {faq.reponse}
                  </p>
                </div>
              ))
            ) : (
              <div 
                className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 shadow-lg text-center transform origin-bottom transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  animation: 'slideUp 0.6s ease-out forwards'
                }}
              >
                <h3 className="text-xl font-bold text-[#4B2E05] mb-4">FAQ en cours de préparation</h3>
                <p className="text-[#5C3A00] text-lg">Les questions fréquentes seront ajoutées prochainement.</p>
              </div>
            )}
          </div>
          
          {/* Indicateur de scroll si plus de 3 questions */}
          {produit.QuestionReponse && typeof produit.QuestionReponse === 'object' && produit.QuestionReponse.faq && produit.QuestionReponse.faq.length > 3 && (
            <div className="text-center mt-6">
              <div className="inline-flex items-center text-[#7A5230] text-sm">
                <svg className="w-4 h-4 mr-2 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Faites défiler pour voir plus de questions
              </div>
            </div>
          )}
        </div>
        
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .max-h-96::-webkit-scrollbar {
            width: 8px;
          }
          
          .max-h-96::-webkit-scrollbar-track {
            background: #f0e6d0;
            border-radius: 4px;
          }
          
          .max-h-96::-webkit-scrollbar-thumb {
            background: #7A5230;
            border-radius: 4px;
          }
          
          .max-h-96::-webkit-scrollbar-thumb:hover {
            background: #B9986F;
          }
        `}</style>
      </section>

     
    </main>
  )
} 