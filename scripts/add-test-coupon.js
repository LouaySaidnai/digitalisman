const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addTestCoupon() {
  try {
    console.log('🔄 Ajout d\'un coupon de test...')

    // Vérifier si le coupon existe déjà
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: 'TEST10' }
    })

    if (existingCoupon) {
      console.log('✅ Le coupon TEST10 existe déjà!')
      console.log('Code: TEST10')
      console.log('Description: Test - 10% de réduction')
      console.log('Type: Pourcentage')
      console.log('Valeur: 10%')
      return
    }

    // Créer le coupon de test
    const coupon = await prisma.coupon.create({
      data: {
        code: 'TEST10',
        description: 'Test - 10% de réduction',
        typeReduction: 'pourcentage',
        valeurReduction: 10,
        montantMinimum: 20,
        montantMaximum: 50,
        nombreUtilisationsMax: 100,
        nombreUtilisationsParUtilisateur: 1,
        dateDebut: new Date('2024-01-01'),
        dateFin: new Date('2025-12-31'),
        actif: true
      }
    })

    console.log('✅ Coupon créé avec succès!')
    console.log('Code: TEST10')
    console.log('Description: Test - 10% de réduction')
    console.log('Type: Pourcentage')
    console.log('Valeur: 10%')
    console.log('Montant minimum: 20€')
    console.log('Montant maximum de réduction: 50€')

  } catch (error) {
    console.error('❌ Erreur lors de la création du coupon:', error)
    
    // Si l'erreur est liée aux tables manquantes, on peut créer un coupon simple
    if (error.message.includes('Table') || error.message.includes('doesn\'t exist')) {
      console.log('⚠️  Les tables Coupon n\'existent pas encore.')
      console.log('💡 Vous devez d\'abord créer les tables avec Prisma.')
      console.log('   Commandes à exécuter:')
      console.log('   1. npx prisma db push')
      console.log('   2. node scripts/add-test-coupon.js')
    }
  } finally {
    await prisma.$disconnect()
  }
}

addTestCoupon() 