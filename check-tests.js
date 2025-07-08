const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkTests() {
  try {
    console.log('🔍 Consultation des résultats de tests...\n')
    
    // Compter les tests
    const count = await prisma.testResult.count()
    console.log(`📊 Nombre total de tests : ${count}\n`)
    
    if (count === 0) {
      console.log('📝 Aucun test effectué pour le moment.')
      return
    }
    
    // Voir les derniers tests
    const tests = await prisma.testResult.findMany({
      include: {
        produit: {
          select: {
            nom: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })
    
    console.log('📋 Derniers résultats de tests :')
    console.log('ID | UserID | Personnalité | Produit recommandé | Date')
    console.log('---|--------|--------------|-------------------|------')
    
    tests.forEach(test => {
      const produit = test.produit ? test.produit.nom : 'Aucun'
      const date = test.createdAt.toLocaleDateString('fr-FR')
      console.log(`${test.id} | ${test.userId} | ${test.personality} | ${produit} | ${date}`)
    })
    
    // Statistiques par personnalité
    const stats = await prisma.testResult.groupBy({
      by: ['personality'],
      _count: {
        personality: true
      }
    })
    
    console.log('\n📈 Répartition par personnalité :')
    stats.forEach(stat => {
      console.log(`${stat.personality} : ${stat._count.personality} tests`)
    })
    
    console.log('\n✅ Consultation terminée !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la consultation :', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTests() 