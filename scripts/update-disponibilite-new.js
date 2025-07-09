const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateDisponibiliteNew() {
  try {
    console.log('🔄 Mise à jour de la disponibilité avec les nouvelles valeurs...\n');

    // Mettre à jour tous les produits avec "immédiate" vers "disponible"
    const updatedProduits = await prisma.produit.updateMany({
      where: {
        disponibilite: 'immédiate'
      },
      data: {
        disponibilite: 'disponible'
      }
    });

    console.log(`✅ ${updatedProduits.count} produits mis à jour avec 'disponibilite: disponible'`);

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
      console.log(`   - ${produit.nom} (ID: ${produit.id}): ${produit.disponibilite || 'Inconnu'}`);
    });

    console.log('\n🎯 Nouvelles valeurs possibles pour disponibilite:');
    console.log('   - "disponible" (vert)');
    console.log('   - "non disponible" (rouge)');
    console.log('   - Autre valeur ou null (bleu - "Inconnu")');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
updateDisponibiliteNew(); 