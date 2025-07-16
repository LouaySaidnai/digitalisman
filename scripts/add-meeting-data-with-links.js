const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addMeetingDataWithLinks() {
  try {
    // Données de meeting d'exemple avec liens
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
      ],
      "Consultation Finance": [
        {
          "date": "2025-01-03",
          "type": "individuel",
          "time": "13:00 - 14:30",
          "duration": "1h30",
          "lien": "https://teams.microsoft.com/l/meetup-join/19:meeting_abcdef@thread.v2/0?context={\"Tid\":\"12345678-1234-1234-1234-123456789012\"}"
        }
      ]
    };

    // Mettre à jour le premier produit avec les données de meeting
    const updatedProduit = await prisma.produit.update({
      where: { id: 1 }, // Assurez-vous que ce produit existe
      data: {
        meeting: meetingData
      }
    });

    console.log('✅ Données de meeting avec liens ajoutées avec succès au produit:', updatedProduit.nom);
    
    // Afficher les données ajoutées
    console.log('📅 Données de meeting ajoutées:');
    console.log(JSON.stringify(meetingData, null, 2));

    // Afficher un exemple de structure pour les développeurs
    console.log('\n📋 Structure des données:');
    console.log('- Chaque événement peut avoir un champ "lien" optionnel');
    console.log('- Les liens peuvent être Google Meet, Zoom, Teams, etc.');
    console.log('- Seuls les utilisateurs ayant payé pour le produit verront les liens');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des données de meeting:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
addMeetingDataWithLinks(); 