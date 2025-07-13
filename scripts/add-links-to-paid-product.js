const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addLinksToPaidProduct() {
  try {
    // Trouver l'utilisateur de test
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      console.log('❌ Utilisateur test@example.com non trouvé');
      return;
    }

    // Trouver la facture payée de l'utilisateur
    const facture = await prisma.facture.findFirst({
      where: {
        userId: testUser.id,
        statut: 'payee'
      }
    });

    if (!facture) {
      console.log('❌ Aucune facture payée trouvée pour l\'utilisateur de test');
      return;
    }

    // Récupérer le nom du produit payé
    const produitPaye = facture.produits[0]?.nomProduit;
    console.log('✅ Produit payé:', produitPaye);

    // Trouver ce produit dans la base
    const produit = await prisma.produit.findFirst({
      where: { nom: produitPaye }
    });

    if (!produit) {
      console.log('❌ Produit non trouvé dans la base:', produitPaye);
      return;
    }

    console.log('✅ Produit trouvé - ID:', produit.id);

    // Ajouter des données de meeting avec liens à ce produit
    const meetingData = {
      "Webinaire Business Plan": [
        {
          "date": "2024-12-20",
          "type": "webinaire",
          "time": "09:00 - 10:30",
          "duration": "1h30",
          "lien": "https://meet.google.com/abc-defg-hij"
        },
        {
          "date": "2024-12-23",
          "type": "webinaire",
          "time": "14:00 - 15:30",
          "duration": "1h30",
          "lien": "https://meet.google.com/xyz-uvwq-rst"
        }
      ],
      "Consultation Stratégie": [
        {
          "date": "2024-12-25",
          "type": "individuel",
          "time": "16:00 - 17:30",
          "duration": "1h30",
          "lien": "https://zoom.us/j/123456789?pwd=abcdefghijk"
        },
        {
          "date": "2024-12-27",
          "type": "individuel",
          "time": "10:00 - 11:30",
          "duration": "1h30",
          "lien": "https://zoom.us/j/987654321?pwd=zyxwvutsrqp"
        }
      ],
      "Webinaire Marketing Digital": [
        {
          "date": "2024-12-30",
          "type": "webinaire",
          "time": "15:00 - 16:30",
          "duration": "1h30",
          "lien": "https://meet.google.com/mno-pqrs-tuv"
        }
      ]
    };

    // Mettre à jour le produit avec les données de meeting
    await prisma.produit.update({
      where: { id: produit.id },
      data: { meeting: meetingData }
    });

    console.log('✅ Données de meeting avec liens ajoutées au produit:', produit.nom);
    console.log('\n📅 Événements ajoutés:');
    Object.entries(meetingData).forEach(([eventName, events]) => {
      console.log(`\n   ${eventName}:`);
      events.forEach((event, index) => {
        console.log(`     ${index + 1}. ${event.date} - ${event.time} (${event.type})`);
        console.log(`        🔗 Lien: ${event.lien}`);
      });
    });

    console.log('\n🎯 Maintenant testez:');
    console.log('1. Connectez-vous avec test@example.com / test123');
    console.log('2. Allez sur /meeting-calendar/webinaires ou /meeting-calendar/consultations-individuelles');
    console.log('3. Cliquez sur un événement');
    console.log('4. Vous devriez voir "Rejoindre" au lieu de "Achat requis"');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
addLinksToPaidProduct(); 