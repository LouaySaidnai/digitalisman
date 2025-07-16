'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaTimesCircle, FaShoppingCart, FaHome } from 'react-icons/fa'
import Head from 'next/head'
import { useRef } from 'react'

export default function PaymentCancelPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setSessionId(urlParams.get('session_id'))
  }, [])

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center font-poppins relative">
        {/* Badge étoile vintage */}
        {/* SUPPRIMER LE BADGE VINTAGE */}
        {/* Ruban vintage */}
        {/* SUPPRIMER LE RUBAN VINTAGE */}
        <div className="max-w-2xl mx-auto px-4 py-10 text-center shadow-vintage rounded-3xl bg-[#fdf6e3] border-4 border-[#e9dbc0] relative overflow-hidden" style={{boxShadow:'0 8px 32px 0 rgba(60,40,10,0.12), 0 1.5px 0 #e9dbc0'}}>
          {/* Motif vintage */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-100 rounded-full opacity-30 blur-2xl z-0"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-100 rounded-full opacity-30 blur-2xl z-0"></div>
          {/* Icône d'annulation animée */}
          <div className="w-24 h-24 bg-gradient-to-br from-[#b91c1c] to-[#e9dbc0] rounded-full mx-auto mb-8 flex items-center justify-center animate-none shadow-lg">
            <FaTimesCircle className="text-white text-6xl drop-shadow-lg" />
          </div>
          {/* Titre */}
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight" style={{color:'#7A5230', fontFamily:'Pacifico, cursive'}}>Paiement annulé</h1>
          <p className="text-lg text-[#7A5230] mb-6 font-medium" style={{fontFamily:'Poppins, sans-serif'}}>Oups, votre paiement n'a pas été finalisé.</p>
          {/* Message de réassurance */}
          <div className="bg-white/90 rounded-xl p-5 mb-8 flex flex-col items-center shadow-md">
            <span className="text-[#b91c1c] font-semibold text-lg mb-1">Aucun montant n'a été débité de votre compte.</span>
            <span className="text-[#7A5230] text-sm">Vous pouvez réessayer ou revenir à votre panier.</span>
          </div>
          {/* Informations de session */}
          {sessionId && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#D6C4A2] shadow-sm">
              <p className="text-sm text-[#5C3A00] mb-2 font-semibold">Référence de session :</p>
              <p className="font-mono text-[#7A5230] font-bold text-base">{sessionId}</p>
            </div>
          )}
          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <Link
              href="/Panier"
              className="inline-flex items-center bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 shadow-md font-poppins"
              style={{fontFamily:'Poppins, sans-serif'}}
            >
              <FaShoppingCart className="mr-2" />
              Retour au panier
            </Link>
            <Link
              href="/"
              className="inline-flex items-center bg-[#e9dbc0] text-[#7A5230] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#f5ecd7] transition-all duration-300 shadow-md border-2 border-[#b9986f] font-poppins"
              style={{fontFamily:'Poppins, sans-serif'}}
            >
              <FaHome className="mr-2" />
              Retour à l'accueil
            </Link>
          </div>
          {/* Bouton de contact avec menu */}
          <div className="relative flex flex-col items-center mt-4" ref={menuRef}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="bg-[#7A5230] text-white px-4 py-2 rounded-lg font-semibold text-base shadow-md hover:bg-[#B9986F] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B9986F]"
              style={{fontFamily:'Poppins, sans-serif'}}
            >
              Contacter le support
            </button>
            {showMenu && (
              <div className="absolute top-12 z-30 bg-white border border-[#e9dbc0] rounded-xl shadow-lg py-1 w-48 animate-fade-in flex flex-col text-sm">
                <a
                  href="mailto:testmalek2004@gmail.com"
                  className="px-4 py-2 text-[#7A5230] hover:bg-[#f5ecd7] rounded-t-xl font-medium transition-colors duration-150 flex items-center gap-2"
                  style={{fontFamily:'Poppins, sans-serif'}}
                  onClick={() => setShowMenu(false)}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Par email
                </a>
                <div className="h-px bg-[#e9dbc0] mx-3 my-0.5" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=testmalek2004@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[#7A5230] hover:bg-[#f5ecd7] rounded-b-xl font-medium transition-colors duration-150 flex items-center gap-2 border-t-0"
                  style={{fontFamily:'Poppins, sans-serif'}}
                  onClick={() => setShowMenu(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 48 48"><g><rect fill="#fff" height="48" rx="8" width="48"/><path d="M24 24.6L8.4 13.2A2 2 0 0 1 10 10h28a2 2 0 0 1 1.6 3.2L24 24.6z" fill="#EA4335"/><path d="M24 24.6l15.6-11.4A2 2 0 0 1 38 10H10a2 2 0 0 1-1.6 3.2L24 24.6z" fill="#34A853"/><path d="M24 24.6L8.4 34.8A2 2 0 0 0 10 38h28a2 2 0 0 0 1.6-3.2L24 24.6z" fill="#FBBC05"/><path d="M24 24.6l15.6 10.2A2 2 0 0 0 38 38H10a2 2 0 0 0-1.6-3.2L24 24.6z" fill="#4285F4"/></g></svg>
                  Via Gmail
                </a>
              </div>
            )}
          </div>
          {/* Note */}
          <p className="text-xs text-[#5C3A00] mt-6 opacity-70 font-poppins" style={{fontFamily:'Poppins, sans-serif'}}>
            Si vous rencontrez des difficultés, n'hésitez pas à nous contacter. Merci de votre confiance.
          </p>
        </div>
      </main>
      {/* Ajoute une animation fade-in pour le menu */}
      <style jsx global>{`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.25s ease;
      }
      `}</style>
    </>
  )
} 