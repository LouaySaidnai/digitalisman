'use client'

import { useEffect, useState, use } from 'react'
import { PrismaClient } from '@/generated/prisma'
import Link from 'next/link'
import { FaArrowLeft, FaCheckCircle, FaStar, FaArrowRight, FaPlay, FaClock, FaUsers, FaShieldAlt } from 'react-icons/fa'

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

export default function ProduitDetail({ params }: { params: Promise<{ produitid: string }> }) {
  const { produitid } = use(params)
  const [produit, setProduit] = useState<Produit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [produitid])

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Vidéo témoignage ou placeholder */}
        {produit.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={produit.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A5230] to-[#B9986F] flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPlay className="text-4xl" />
              </div>
              <p className="text-xl mb-4">[VIDÉO TÉMOIGNAGE À AJOUTER]</p>
              <p className="text-lg opacity-80">Témoignage client de 2-3 minutes</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {produit.nom}
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {produit.sousTitre}
          </h2>
          <button className="bg-white text-[#7A5230] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg mb-6 text-lg">
            {produit.argumentsCommerciaux || "Découvrir maintenant"}
          </button>
          <p className="text-lg opacity-90">Rejoint par 142 ex-cadres comme vous en 2024</p>
        </div>
      </section>

      {/* Problème Douloureux : Aligné sur les "pain points" du document original */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Le Problème Douloureux</h2>
          
          {/* Image des problèmes sectoriels */}
          {produit.imageProblemes ? (
            <img 
              src={produit.imageProblemes} 
              alt="Problèmes sectoriels" 
              className="w-full h-64 object-cover rounded-3xl shadow-xl mb-12" 
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl shadow-xl mb-12 flex items-center justify-center">
              <div className="text-center text-[#7A5230]">
                <p className="text-xl font-bold mb-2">[IMAGE À AJOUTER]</p>
                <p>Représentation visuelle des problèmes sectoriels</p>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"{produit.problemeResolu?.split('.')[0]}"</h3>
              <p className="text-sm text-gray-500">Problème principal identifié</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"Mes clients ne voient pas ma vraie valeur"</h3>
              <p className="text-sm text-gray-500">Manque de différenciation</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#4B2E05] mb-4">"Je ne sais pas comment standardiser mon expertise"</h3>
              <p className="text-sm text-gray-500">Besoin de structuration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution : Présentation produit avec GIF animé */}
      <section className="py-20 px-6 bg-white">
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
            <div className="w-full h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-xl mb-12 flex items-center justify-center">
              <div className="text-center text-[#7A5230]">
                <p className="text-xl font-bold mb-2">[GIF ANIMÉ À AJOUTER]</p>
                <p>Animation montrant la transformation du problème vers la solution</p>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-4">Étape 1</h3>
              <p className="text-lg">Diagnostic et cartographie</p>
            </div>
            <div className="bg-gradient-to-r from-[#B9986F] to-[#7A5230] text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-4">Étape 2</h3>
              <p className="text-lg">Packaging et structuration</p>
            </div>
            <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-bold mb-4">Étape 3</h3>
              <p className="text-lg">Automatisation et scaling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processus : Timeline visuelle */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Processus Détaillé</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold">Étape</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Durée</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Livrable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {produit.processus && produit.processus.split('\n').map((etape, index) => {
                    const parts = etape.split(' - ')
                    if (parts.length >= 2) {
                      return (
                        <tr key={index} className="hover:bg-gray-50">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Différenciation</h2>
          <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-bold">Critère</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Formations Publiques (Pôle Emploi/CCI)</th>
                    <th className="px-8 py-6 text-left text-lg font-bold">Notre Solution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B9986F]">
                  <tr className="hover:bg-white/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Personnalisation</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Modèles génériques</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">Offres sur-mesure pour votre secteur</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Suivi</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Maximum 2 semaines</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">3 mois d'accès communauté</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-8 py-6 font-semibold text-[#4B2E05]">Résultat</td>
                    <td className="px-8 py-6 text-[#5C3A00]">Théorie</td>
                    <td className="px-8 py-6 text-[#5C3A00] font-semibold">Catalogue opérationnel</td>
                  </tr>
                  <tr className="hover:bg-white/50">
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Tarification & Garantie</h2>
          
          {/* Options de tarification */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {produit.optionsTarification ? (
              (() => {
                try {
                  const options = JSON.parse(produit.optionsTarification)
                  return Object.entries(options).map(([key, option]: [string, any], index) => (
                    <div key={key} className={`bg-white rounded-3xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform ${index === 1 ? 'ring-4 ring-[#B9986F]' : ''}`}>
                      {index === 1 && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          POPULAIRE
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">{option.nom}</h3>
                      <p className="text-4xl font-bold text-[#7A5230] mb-6">{option.prix}€</p>
                      <p className="text-sm text-[#5C3A00] mb-6">{option.duree}</p>
                      <button className="w-full bg-[#B9986F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7A5230] transition-all">
                        Choisir cette option
                      </button>
                    </div>
                  ))
                } catch (e) {
                  return (
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                      <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Tarification</h3>
                      <p className="text-4xl font-bold text-[#7A5230] mb-6">{produit.prix}</p>
                      <button className="w-full bg-[#B9986F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7A5230] transition-all">
                        Découvrir
                      </button>
                    </div>
                  )
                }
              })()
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-4">Tarification</h3>
                <p className="text-4xl font-bold text-[#7A5230] mb-6">{produit.prix}</p>
                <button className="w-full bg-[#B9986F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#7A5230] transition-all">
                  Découvrir
                </button>
              </div>
            )}
          </div>
          
          {/* Badge de confiance */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-2xl p-6 shadow-lg">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Ils ont transformé leur business</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 text-center shadow-lg">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Témoignage Client</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.temoignages}"</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 text-center shadow-lg">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Preuves</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.preuves}"</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] rounded-2xl p-8 text-center shadow-lg">
              <div className="w-20 h-20 bg-[#7A5230] rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-[#4B2E05] mb-4">Résultats</h3>
              <p className="text-lg italic text-[#5C3A00]">"{produit.resultatsAttendus}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ : Objections anticipées */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#4B2E05] mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {produit.faq && typeof produit.faq === 'string' && produit.faq.split('\n').filter((line: string) => line.trim().startsWith('Q:')).map((faq: string, index: number) => {
              const [question, answer] = faq.split('R:')
              if (!answer) return null
              
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
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
            {produit.argumentsCommerciaux}
          </p>
          {produit.urgence && (
            <p className="text-lg mb-6 opacity-90 bg-red-500/20 px-4 py-2 rounded-lg">
              ⚠️ {produit.urgence}
            </p>
          )}
          <button className="bg-white text-[#7A5230] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg text-lg">
            Commencer ma transformation
          </button>
        </div>
      </section>
    </main>
  )
} 