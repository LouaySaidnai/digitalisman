const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUserPurchases() {
  try {
    // Trouver l'utilisateur de test
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      console.log('❌ Utilisateur test@example.com non trouvé');
      return;
    }

    console.log('👤 Utilisateur:', testUser.email);
    console.log('📄 Factures:');

    // Récupérer toutes les factures de l'utilisateur
    const factures = await prisma.facture.findMany({
      where: { userId: testUser.id },
      select: {
        id: true,
        numeroFacture: true,
        statut: true,
        total: true,
        produits: true,
        dateFacture: true
      }
    });

    if (factures.length === 0) {
      console.log('   ❌ Aucune facture trouvée');
      return;
    }

    factures.forEach((facture, index) => {
      console.log(`\n   ${index + 1}. ${facture.numeroFacture}`);
      console.log(`      Statut: ${facture.statut}`);
      console.log(`      Total: ${facture.total}€`);
      console.log(`      Date: ${facture.dateFacture.toLocaleDateString()}`);
      
      if (facture.produits && Array.isArray(facture.produits)) {
        console.log(`      Produits achetés:`);
        facture.produits.forEach((produit, prodIndex) => {
          console.log(`         ${prodIndex + 1}. "${produit.nomProduit}" - ${produit.prixTotal}`);
        });
      }
    });

    // Vérifier si ces produits ont des données de meeting
    console.log('\n📅 Vérification des données de meeting:');
    
    for (const facture of factures) {
      if (facture.produits && Array.isArray(facture.produits)) {
        for (const produitFacture of facture.produits) {
          const produit = await prisma.produit.findFirst({
            where: { nom: produitFacture.nomProduit },
            select: { id: true, nom: true, meeting: true }
          });

          if (produit) {
            console.log(`\n   Produit: "${produit.nom}" (ID: ${produit.id})`);
            if (produit.meeting) {
              console.log('   ✅ A des données de meeting');
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
          } else {
            console.log(`\n   ❌ Produit "${produitFacture.nomProduit}" non trouvé dans la base`);
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
checkUserPurchases(); 