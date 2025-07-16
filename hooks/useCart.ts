import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './useAuth'

export interface CartItem {
  id: number
  nom: string
  prix: string
  quantite: number
  description?: string
  slug?: string
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error)
        setCartItems([])
      }
    }
    setIsLoading(false)
  }, [])

  // Sauvegarder le panier dans localStorage à chaque modification (LocalStorage est un stockage cote client qui persiste même après la fermeture du navigateur et la deconnexion du site)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoading])

  // Ajouter un produit au panier
  const addToCart = (product: Omit<CartItem, 'quantite'>) => {
    if (!isAuthenticated) {
      router.push('/Login')
      return false
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      
      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantite: item.quantite + 1 }
            : item
        )
      } else {
        // Sinon, ajouter le nouveau produit
        return [...prev, { ...product, quantite: 1 }]
      }
    })

    return true
  }

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantite: newQuantity }
          : item
      )
    )
  }

  // Supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // Vider le panier
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  // Calculer le total
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const prix = parseFloat(item.prix.replace('€', ''))
      return total + (prix * item.quantite)
    }, 0)
  }

  // Obtenir le nombre total d'articles
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantite, 0)
  }

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
    getItemCount,
    isLoading
  }
} 