const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTestMessages() {
  try {
    console.log('Ajout de messages de test...');

    const testMessages = [
      {
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        telephone: '06 12 34 56 78',
        objet: 'Question sur les formations',
        message: 'Bonjour,\n\nJe suis intéressé par vos formations en entrepreneuriat. Pouvez-vous me donner plus d\'informations sur les modalités d\'inscription et les tarifs ?\n\nMerci d\'avance.\n\nCordialement,\nJean Dupont'
      },
      {
        nom: 'Marie Martin',
        email: 'marie.martin@email.com',
        telephone: null,
        objet: 'Problème de paiement',
        message: 'Bonjour,\n\nJ\'ai essayé de payer pour la formation "Créer son entreprise" mais j\'ai rencontré un problème lors du paiement. Pouvez-vous m\'aider ?\n\nMerci.\n\nMarie'
      },
      {
        nom: 'Pierre Durand',
        email: 'pierre.durand@email.com',
        telephone: '01 23 45 67 89',
        objet: 'Demande de partenariat',
        message: 'Bonjour,\n\nJe dirige une école de commerce et je serais intéressé par un partenariat avec votre organisation pour proposer vos formations à nos étudiants.\n\nPouvez-vous me recontacter pour en discuter ?\n\nCordialement,\nPierre Durand\nDirecteur École de Commerce'
      },
      {
        nom: 'Sophie Bernard',
        email: 'sophie.bernard@email.com',
        telephone: '06 98 76 54 32',
        objet: 'Félicitations',
        message: 'Bonjour,\n\nJe viens de terminer votre formation sur l\'entrepreneuriat et je voulais vous remercier. Le contenu était excellent et m\'a vraiment aidé à lancer mon projet.\n\nJe recommande vivement vos formations !\n\nSophie'
      },
      {
        nom: 'Lucas Petit',
        email: 'lucas.petit@email.com',
        telephone: null,
        objet: 'Demande de remboursement',
        message: 'Bonjour,\n\nJ\'ai acheté une formation il y a quelques jours mais je ne peux plus y accéder. J\'aimerais demander un remboursement.\n\nPouvez-vous me recontacter ?\n\nMerci.\n\nLucas'
      }
    ];

    for (const messageData of testMessages) {
      await prisma.message.create({
        data: messageData
      });
      console.log(`Message ajouté: ${messageData.objet}`);
    }

    console.log('Tous les messages de test ont été ajoutés avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des messages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestMessages(); 