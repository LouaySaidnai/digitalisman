'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding } from 'react-icons/fa'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation basique
    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (formData.motDePasse.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setLoading(false)
      return
    }

    try {
      // Préparer les données pour l'API
      const apiData = {
        email: formData.email,
        password: formData.motDePasse,
        nom: formData.nom,
        prenom: formData.prenom
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      const data = await response.json()
      
      if (response.status === 201) {
        // Succès - compte créé
        setSuccess('Compte créé avec succès ! Redirection...')
        // Redirection vers la page de connexion après 2 secondes
        setTimeout(() => {
          window.location.href = '/Login'
        }, 2000)
      } else if (response.status === 400 && (data.error?.toLowerCase().includes('email') || data.error?.toLowerCase().includes('utilisé'))) {
        // Email déjà utilisé
        setError('Cet email est lié à une autre connexion')
      } else if (response.status === 400) {
        // Autres erreurs de validation
        setError(data.error || 'Veuillez vérifier les informations saisies')
      } else {
        // Erreurs générales
        setError(data.error || 'Erreur lors de la création du compte. Veuillez réessayer.')
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <Link 
          href="/Login" 
          className="inline-flex items-center text-[#7A5230] hover:text-[#5C3A00] mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Retour à la connexion
        </Link>

        {/* Carte principale */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-[#4B2E05] mb-2">Créer un compte</h1>
            <p className="text-[#5C3A00]">Rejoignez notre communauté d'entrepreneurs</p>
          </div>

          {/* Messages d'erreur/succès */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-4 rounded-xl mb-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 mb-1">
                    Erreur d'inscription
                  </h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {error}
                  </p>
                  {error.includes('lié à une autre connexion') && (
                    <div className="mt-3">
                      <Link 
                        href="/Login" 
                        className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                      >
                        → Se connecter avec cet email
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
              {success}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-[#4B2E05] mb-2">
                  Prénom *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                    placeholder="Votre prénom"
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
                </div>
              </div>
              
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-[#4B2E05] mb-2">
                  Nom *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4B2E05] mb-2">
                Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-[#4B2E05] mb-2">
                Téléphone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
              </div>
            </div>

            {/* Entreprise */}
            <div>
              <label htmlFor="entreprise" className="block text-sm font-medium text-[#4B2E05] mb-2">
                Entreprise
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  placeholder="Nom de votre entreprise"
                />
                <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-[#4B2E05] mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="motDePasse"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  placeholder="Minimum 6 caractères"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7A5230] hover:text-[#5C3A00] transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-[#4B2E05] mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmerMotDePasse"
                  name="confirmerMotDePasse"
                  value={formData.confirmerMotDePasse}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  placeholder="Répétez votre mot de passe"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7A5230]" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7A5230] hover:text-[#5C3A00] transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Création en cours...
                </div>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          {/* Lien vers la connexion */}
          <div className="text-center mt-8">
            <p className="text-[#5C3A00]">
              Déjà un compte ?{' '}
              <Link 
                href="/Login" 
                className="text-[#7A5230] hover:text-[#5C3A00] font-semibold transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 