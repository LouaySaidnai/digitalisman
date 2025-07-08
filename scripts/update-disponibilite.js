const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateDisponibilite() {
  try {
    console.log('🔄 Mise à jour de la disponibilité des produits...\n');

    // Mettre à jour tous les produits avec une disponibilité par défaut
    const updatedProduits = await prisma.produit.updateMany({
      where: {
        disponibilite: null
      },
      data: {
        disponibilite: 'immédiate'
      }
    });

    console.log(`✅ ${updatedProduits.count} produits mis à jour avec 'disponibilite: immédiate'`);

    // Afficher tous les produits avec leur disponibilité
    const produits = await prisma.produit.findMany({
      select: {
        id: true,
        nom: true,
        disponibilite: true
      }
    });

    console.log('\n📋 État actuel des produits:');
    produits.forEach(produit => {
      console.log(`   - ${produit.nom} (ID: ${produit.id}): ${produit.disponibilite || 'Non défini'}`);
    });

    console.log('\n🎯 Valeurs possibles pour disponibilite:');
    console.log('   - "immédiate" (vert)');
    console.log('   - "sur commande" (jaune)');
    console.log('   - "épuisé" (rouge)');
    console.log('   - Texte personnalisé (gris)');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
updateDisponibilite(); 