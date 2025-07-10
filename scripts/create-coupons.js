const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createCoupons() {
  try {
    console.log('🔄 Création des coupons de test...')

    // Supprimer les coupons existants
    await prisma.utilisationCoupon.deleteMany()
    await prisma.coupon.deleteMany()

    // Créer les coupons
    const coupons = [
      {
        code: 'WELCOME10',
        description: 'Bienvenue - 10% de réduction',
        typeReduction: 'pourcentage',
        valeurReduction: 10,
        montantMinimum: 50,
        montantMaximum: 100,
        nombreUtilisationsMax: 100,
        nombreUtilisationsParUtilisateur: 1,
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2025-12-31'),
        actif: true
      },
      {
        code: 'BUSINESS20',
        description: 'Business - 20% de réduction',
        typeReduction: 'pourcentage',
        valeurReduction: 20,
        montantMinimum: 100,
        montantMaximum: 200,
        nombreUtilisationsMax: 50,
        nombreUtilisationsParUtilisateur: 1,
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2025-06-30'),
        actif: true
      },
      {
        code: 'FLASH50',
        description: 'Flash - 50€ de réduction',
        typeReduction: 'montant_fixe',
        valeurReduction: 50,
        montantMinimum: 200,
        montantMaximum: 50,
        nombreUtilisationsMax: 25,
        nombreUtilisationsParUtilisateur: 1,
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2024-12-31'),
        actif: true
      },
      {
        code: 'FIRST5',
        description: 'Première commande - 5€ de réduction',
        typeReduction: 'montant_fixe',
        valeurReduction: 5,
        montantMinimum: 20,
        montantMaximum: 5,
        nombreUtilisationsMax: 1000,
        nombreUtilisationsParUtilisateur: 1,
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2025-12-31'),
        actif: true
      }
    ]

    for (const couponData of coupons) {
      const coupon = await prisma.coupon.create({
        data: couponData
      })
      console.log(`✅ Coupon créé: ${coupon.code} - ${coupon.description}`)
    }

    console.log('🎉 Tous les coupons ont été créés avec succès!')
    console.log('\n📋 Codes disponibles:')
    console.log('- WELCOME10: 10% de réduction (min 50€, max 100€)')
    console.log('- BUSINESS20: 20% de réduction (min 100€, max 200€)')
    console.log('- FLASH50: 50€ de réduction (min 200€)')
    console.log('- FIRST5: 5€ de réduction (min 20€)')

  } catch (error) {
    console.error('❌ Erreur lors de la création des coupons:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createCoupons() 