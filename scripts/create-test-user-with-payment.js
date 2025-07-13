const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUserWithPayment() {
  try {
    // Vérifier si l'utilisateur de test existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    let userId;
    
    if (existingUser) {
      console.log('✅ Utilisateur de test existant trouvé:', existingUser.email);
      userId = existingUser.id;
    } else {
      // Créer un nouvel utilisateur de test
      const hashedPassword = await bcrypt.hash('test123', 10);
      
      const newUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: hashedPassword,
          nom: 'Test',
          prenom: 'User'
        }
      });
      
      console.log('✅ Nouvel utilisateur de test créé:', newUser.email);
      userId = newUser.id;
    }

    // Récupérer le premier produit
    const produit = await prisma.produit.findFirst({
      where: { id: 1 }
    });

    if (!produit) {
      console.log('❌ Aucun produit trouvé. Créez d\'abord un produit.');
      return;
    }

    // Vérifier si une facture payée existe déjà pour cet utilisateur et ce produit
    const existingFacture = await prisma.facture.findFirst({
      where: {
        userId: userId,
        statut: 'payee',
        produits: {
          path: '$[*].nomProduit',
          array_contains: [produit.nom]
        }
      }
    });

    if (existingFacture) {
      console.log('✅ Facture payée existante trouvée pour le produit:', produit.nom);
      console.log('📋 Informations de connexion:');
      console.log('   Email: test@example.com');
      console.log('   Mot de passe: test123');
      return;
    }

    // Créer une facture payée pour le produit
    const facture = await prisma.facture.create({
      data: {
        userId: userId,
        numeroFacture: `FAC-TEST-${Date.now()}`,
        produits: [
          {
            nomProduit: produit.nom,
            quantiteProduit: 1,
            prixUnitaire: "497€",
            prixTotal: "497€"
          }
        ],
        sousTotal: 497,
        reduction: 0,
        total: 497,
        clientEmail: 'test@example.com',
        clientNom: 'Test',
        clientPrenom: 'User',
        statut: 'payee',
        datePaiement: new Date(),
        statutAcces: 'active',
        dateAcces: new Date(),
        referencePaiement: 'TEST_PAYMENT_123'
      }
    });

    console.log('✅ Facture payée créée pour le produit:', produit.nom);
    console.log('📋 Informations de connexion:');
    console.log('   Email: test@example.com');
    console.log('   Mot de passe: test123');
    console.log('📄 Numéro de facture:', facture.numeroFacture);

    // Afficher les événements disponibles
    if (produit.meeting) {
      console.log('\n📅 Événements disponibles avec liens:');
      Object.entries(produit.meeting).forEach(([eventName, events]) => {
        console.log(`\n   ${eventName}:`);
        events.forEach((event, index) => {
          console.log(`     ${index + 1}. ${event.date} - ${event.time} (${event.type})`);
          if (event.lien) {
            console.log(`        Lien: ${event.lien}`);
          }
        });
      });
    }

    console.log('\n🎯 Pour tester:');
    console.log('1. Connectez-vous avec test@example.com / test123');
    console.log('2. Allez sur /meeting-calendar/webinaires ou /meeting-calendar/consultations-individuelles');
    console.log('3. Cliquez sur un événement avec un lien');
    console.log('4. Vous devriez voir le bouton "Rejoindre"');

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur de test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
createTestUserWithPayment(); 