'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa'

export default function PaymentSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setSessionId(urlParams.get('session_id'))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        {/* Icône de succès */}
        <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center">
          <FaCheckCircle className="text-white text-4xl" />
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold text-[#4B2E05] mb-4">
          Paiement réussi !
        </h1>

        {/* Message */}
        <p className="text-xl text-[#5C3A00] mb-8">
          Votre commande a été validée avec succès ! Un email de confirmation avec tous les détails de votre commande vous a été envoyé.
        </p>

        {/* Informations de session */}
        {sessionId && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-sm text-[#5C3A00] mb-2">
              Référence de paiement :
            </p>
            <p className="font-mono text-[#7A5230] font-semibold">
              {sessionId}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105"
          >
            <FaHome className="mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Note */}
        <p className="text-sm text-[#5C3A00] mt-8">
          Si vous avez des questions, n'hésitez pas à nous contacter.
        </p>
      </div>
    </main>
  )
} 