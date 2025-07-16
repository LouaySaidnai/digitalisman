'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaShoppingBag, FaCreditCard, FaShieldAlt, FaCheckCircle } from 'react-icons/fa'
import { useCart } from '../../../hooks/useCart'

export default function PanierPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  // Calculer le total
  const subtotal = getTotal()
  const total = subtotal - discount

  // Appliquer un coupon
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      alert('Veuillez entrer un code de réduction')
      return
    }

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: couponCode,
          montantCommande: subtotal
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setDiscount(data.coupon.montantReduction)
        alert(`Coupon appliqué ! ${data.coupon.description}`)
        setCouponCode('')
      } else {
        alert(data.error || 'Code coupon invalide')
      }
    } catch (error) {
      console.error('Erreur validation coupon:', error)
      alert('Erreur lors de la validation du code de réduction')
    }
  }

  // Procéder au paiement
  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      // Créer la session de paiement Stripe
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          couponCode: couponCode || null,
          montantReduction: discount
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Rediriger vers Stripe Checkout
        window.location.href = data.url
      } else {
        const errorData = await response.json()
        alert(`Erreur: ${errorData.error}`)
      }
    } catch (error) {
      alert('Erreur lors de la création de la session de paiement. Veuillez réessayer.')
      console.error('Erreur checkout:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#7A5230] hover:text-[#5C3A00] mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Retour à l'accueil
          </Link>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full flex items-center justify-center mr-4">
              <FaShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#4B2E05]">Mon Panier</h1>
              <p className="text-[#5C3A00] text-lg">{cartItems.length} article{cartItems.length > 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Panier vide */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-6 flex items-center justify-center">
              <FaShoppingBag className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#4B2E05] mb-4">Votre panier est vide</h2>
            <p className="text-[#5C3A00] mb-8">Découvrez nos produits et commencez votre transformation entrepreneuriale</p>
            <Link 
              href="/products" 
              className="inline-flex items-center bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105"
            >
              <FaPlus className="mr-2" />
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Articles du panier */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6">
                <h2 className="text-2xl font-bold text-[#4B2E05] mb-6">Articles</h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-6 bg-gradient-to-r from-[#f5ecd7] to-[#f3e6c4] rounded-2xl border border-[#B9986F]/20">
                      {/* Image du produit */}
                      <div className="w-20 h-20 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaShoppingBag className="text-white text-2xl" />
                      </div>
                      
                      {/* Détails du produit */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#4B2E05] mb-1">{item.nom}</h3>
                        <p className="text-[#5C3A00] text-sm mb-2">{item.description}</p>
                        <p className="text-xl font-bold text-[#7A5230]">{item.prix}</p>
                      </div>
                      
                      {/* Contrôles de quantité */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantite - 1)}
                          className="w-8 h-8 bg-[#7A5230] text-white rounded-full flex items-center justify-center hover:bg-[#8B603A] transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        
                        <span className="text-lg font-semibold text-[#4B2E05] min-w-[2rem] text-center">
                          {item.quantite}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantite + 1)}
                          className="w-8 h-8 bg-[#7A5230] text-white rounded-full flex items-center justify-center hover:bg-[#8B603A] transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      
                      {/* Bouton supprimer */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code promo */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-[#4B2E05] mb-4">Code promo</h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Entrez votre code promo"
                    className="flex-1 px-4 py-3 bg-white/60 border border-[#B9986F]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A5230] focus:border-transparent transition-all"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-3 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white rounded-xl font-semibold hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300"
                  >
                    Appliquer
                  </button>
                </div>
                <p className="text-sm text-[#5C3A00] mt-2">
                  Codes disponibles : WELCOME10, BUSINESS20, FLASH50, FIRST5
                </p>
              </div>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-[#4B2E05] mb-6">Résumé</h2>
                
                {/* Détails des prix */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#5C3A00]">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  
                  <div className="border-t border-[#B9986F]/30 pt-4">
                    <div className="flex justify-between text-xl font-bold text-[#4B2E05]">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Bouton de paiement */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-6"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Traitement...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaCreditCard className="mr-2" />
                      Procéder au paiement
                    </div>
                  )}
                </button>

                {/* Garanties */}
                <div className="space-y-4">
                  <div className="flex items-center text-[#5C3A00]">
                    <FaShieldAlt className="text-[#7A5230] mr-3" />
                    <span className="text-sm">Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center text-[#5C3A00]">
                    <FaCheckCircle className="text-[#7A5230] mr-3" />
                    <span className="text-sm">Accès immédiat aux formations</span>
                  </div>
                  <div className="flex items-center text-[#5C3A00]">
                    <FaCheckCircle className="text-[#7A5230] mr-3" />
                    <span className="text-sm">Garantie 30 jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 