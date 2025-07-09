const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addMeetingData() {
  try {
    // Données de meeting d'exemple
    const meetingData = {
      "Webinaire Business Plan": [
        {
          "date": "2024-12-20",
          "type": "webinaire",
          "time": "09:00 - 10:30",
          "duration": "1h30"
        },
        {
          "date": "2024-12-23",
          "type": "webinaire",
          "time": "14:00 - 15:30",
          "duration": "1h30"
        }
      ],
      "Consultation Stratégie": [
        {
          "date": "2024-12-25",
          "type": "individuel",
          "time": "16:00 - 17:30",
          "duration": "1h30"
        },
        {
          "date": "2024-12-27",
          "type": "individuel",
          "time": "10:00 - 11:30",
          "duration": "1h30"
        }
      ],
      "Webinaire Marketing Digital": [
        {
          "date": "2024-12-30",
          "type": "webinaire",
          "time": "15:00 - 16:30",
          "duration": "1h30"
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

    console.log('✅ Données de meeting ajoutées avec succès au produit:', updatedProduit.nom);
    
    // Afficher les données ajoutées
    console.log('📅 Données de meeting ajoutées:');
    console.log(JSON.stringify(meetingData, null, 2));

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des données de meeting:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
addMeetingData(); 