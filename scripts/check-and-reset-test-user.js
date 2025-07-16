const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAndResetTestUser() {
  try {
    // Vérifier si l'utilisateur de test existe
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (!existingUser) {
      console.log('❌ Utilisateur test@example.com n\'existe pas');
      console.log('💡 Exécutez d\'abord: node scripts/create-test-user-with-payment.js');
      return;
    }

    console.log('✅ Utilisateur test@example.com trouvé:');
    console.log('   ID:', existingUser.id);
    console.log('   Nom:', existingUser.nom);
    console.log('   Prénom:', existingUser.prenom);
    console.log('   Date de création:', existingUser.createdAt);

    // Réinitialiser le mot de passe
    const newPassword = 'test123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { email: 'test@example.com' },
      data: { password: hashedPassword }
    });

    console.log('\n✅ Mot de passe réinitialisé avec succès!');
    console.log('📋 Nouvelles informations de connexion:');
    console.log('   Email: test@example.com');
    console.log('   Mot de passe: test123');

    // Vérifier les factures de cet utilisateur
    const factures = await prisma.facture.findMany({
      where: { userId: existingUser.id },
      select: {
        id: true,
        numeroFacture: true,
        statut: true,
        total: true,
        produits: true
      }
    });

    console.log('\n📄 Factures de l\'utilisateur:');
    if (factures.length === 0) {
      console.log('   Aucune facture trouvée');
      console.log('💡 Exécutez: node scripts/create-test-user-with-payment.js pour créer une facture payée');
    } else {
      factures.forEach((facture, index) => {
        console.log(`   ${index + 1}. ${facture.numeroFacture} - ${facture.statut} - ${facture.total}€`);
        if (facture.produits && Array.isArray(facture.produits)) {
          facture.produits.forEach(produit => {
            console.log(`      Produit: ${produit.nomProduit}`);
          });
        }
      });
    }

    console.log('\n🎯 Maintenant vous pouvez:');
    console.log('1. Vous connecter avec test@example.com / test123');
    console.log('2. Tester les liens de réunion dans le calendrier');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
checkAndResetTestUser(); 