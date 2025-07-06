const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkDB() {
  try {
    const produits = await prisma.produit.findMany({
      take: 3,
      select: {
        id: true,
        nom: true,
        prix: true
      }
    });

    console.log('=== DONNÉES DE LA BASE ===');
    produits.forEach((p, index) => {
      console.log(`\n--- Produit ${index + 1} ---`);
      console.log('ID:', p.id);
      console.log('Nom:', p.nom);
      console.log('Prix:', p.prix);
      console.log('Type de prix:', typeof p.prix);
    });

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDB(); 