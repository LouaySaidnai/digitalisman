const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkMeetingData() {
  try {
    // Récupérer tous les produits
    const produits = await prisma.produit.findMany({
      select: {
        id: true,
        nom: true,
        meeting: true
      }
    });

    console.log('📋 Produits dans la base de données:');
    produits.forEach((produit, index) => {
      console.log(`\n${index + 1}. ID: ${produit.id} - Nom: "${produit.nom}"`);
      if (produit.meeting) {
        console.log('   ✅ A des données de meeting:');
        Object.entries(produit.meeting).forEach(([eventName, events]) => {
          console.log(`      📅 ${eventName}:`);
          events.forEach((event, eventIndex) => {
            console.log(`         ${eventIndex + 1}. ${event.date} - ${event.time || 'Pas d\'heure'} (${event.type})`);
            if (event.lien) {
              console.log(`            🔗 Lien: ${event.lien}`);
            } else {
              console.log(`            ❌ Pas de lien`);
            }
          });
        });
      } else {
        console.log('   ❌ Pas de données de meeting');
      }
    });

    // Vérifier les factures de l'utilisateur de test
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (testUser) {
      console.log('\n📄 Factures de l\'utilisateur test@example.com:');
      const factures = await prisma.facture.findMany({
        where: { userId: testUser.id },
        select: {
          id: true,
          numeroFacture: true,
          statut: true,
          produits: true
        }
      });

      factures.forEach((facture, index) => {
        console.log(`\n   ${index + 1}. ${facture.numeroFacture} - ${facture.statut}`);
        if (facture.produits && Array.isArray(facture.produits)) {
          facture.produits.forEach(produit => {
            console.log(`      Produit: "${produit.nomProduit}"`);
          });
        }
      });
    }

    console.log('\n💡 Pour résoudre le problème:');
    console.log('1. Identifiez le produit pour lequel l\'utilisateur a payé');
    console.log('2. Ajoutez des données de meeting avec liens à ce produit');
    console.log('3. Ou modifiez les données de meeting existantes pour inclure des liens');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
checkMeetingData(); 