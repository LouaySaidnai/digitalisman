const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function debugPrix() {
  try {
    const produits = await prisma.produit.findMany({
      select: {
        id: true,
        nom: true,
        prix: true
      }
    });

    console.log('=== DEBUG PRIX ===');
    produits.forEach(p => {
      console.log(`\nProduit: ${p.nom}`);
      console.log(`Prix (type): ${typeof p.prix}`);
      console.log(`Prix (valeur):`, JSON.stringify(p.prix, null, 2));
    });

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugPrix(); 