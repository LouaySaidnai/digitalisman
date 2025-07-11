import WebinarCalendar from '../../../components/WebinarCalendar';
import { filterEventsByType } from '../../../types/meeting';
import { prisma } from '../../../lib/prisma';

// Fonction pour récupérer les données de meeting depuis la base de données
async function getMeetingData() {
  try {
    // Récupérer tous les produits qui ont des données de meeting
    const produits = await prisma.produit.findMany({
      where: {
        meeting: {
          not: undefined
        }
      },
      select: { meeting: true }
    });

    // Combiner toutes les données de meeting
    const allMeetingData = produits.reduce((acc, produit) => {
      if (produit.meeting && typeof produit.meeting === 'object') {
        return { ...acc, ...produit.meeting };
      }
      return acc;
    }, {});

    return allMeetingData;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de meeting:', error);
    return {};
  }
}

// Données d'exemple pour les webinaires collectifs (fallback)
const groupWebinars = [
  {
    id: '1',
    title: 'Introduction à l\'entrepreneuriat',
    date: new Date(2024, 11, 15), // 15 décembre 2024
    time: '14:00 - 16:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 50,
    currentParticipants: 23
  },
  {
    id: '2',
    title: 'Stratégies de marketing digital',
    date: new Date(2024, 11, 18), // 18 décembre 2024
    time: '10:00 - 12:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 30,
    currentParticipants: 15
  },
  {
    id: '4',
    title: 'Financement et levée de fonds',
    date: new Date(2024, 11, 22), // 22 décembre 2024
    time: '15:00 - 17:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 40,
    currentParticipants: 28
  },
  {
    id: '6',
    title: 'Gestion d\'équipe et leadership',
    date: new Date(2024, 11, 25), // 25 décembre 2024
    time: '11:00 - 13:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 35,
    currentParticipants: 12
  },
  {
    id: '8',
    title: 'Innovation et transformation digitale',
    date: new Date(2024, 11, 29), // 29 décembre 2024
    time: '13:00 - 15:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 45,
    currentParticipants: 31
  }
];

export default async function WebinairesPage() {
  // Récupérer les données de meeting depuis la base de données
  const meetingData = await getMeetingData();
  
  // Filtrer pour n'avoir que les webinaires
  const webinairesFromDB = filterEventsByType(meetingData, 'webinaire');
  
  // Utiliser les données de la DB ou les données d'exemple en fallback
  const webinarsToDisplay = webinairesFromDB.length > 0 ? webinairesFromDB : groupWebinars;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0e6d0] via-[#e8dcc0] to-[#f5ecd7]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4B2E05] mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#7A5230] mr-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Webinaires Collectifs
            <svg className="w-12 h-12 text-[#7A5230] ml-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </h1>
          <p className="text-lg text-[#5C3A00] max-w-2xl mx-auto">
            Rejoignez nos sessions interactives en groupe et échangez avec d'autres entrepreneurs. 
            Apprenez ensemble et développez votre réseau professionnel.
          </p>
        </div>

        <WebinarCalendar webinars={groupWebinars} />

        {/* Section d'informations sur les webinaires collectifs */}
        <div className="mt-12 bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold text-[#4B2E05] mb-6 text-center">
            Pourquoi choisir nos webinaires collectifs ?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#4B2E05] mb-3">Avantages des sessions en groupe</h4>
              <ul className="space-y-2 text-[#5C3A00]">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Échanges enrichissants avec d'autres entrepreneurs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Questions-réponses en direct avec l'expert
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Contenu structuré et progressif
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Accès aux enregistrements après la session
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#4B2E05] mb-3">Comment ça fonctionne</h4>
              <ul className="space-y-2 text-[#5C3A00]">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Inscription gratuite en ligne
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Lien de connexion envoyé par email
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Session interactive en ligne
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Support et ressources post-session
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call-to-action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à rejoindre nos webinaires ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Inscrivez-vous gratuitement et développez vos compétences entrepreneuriales
            </p>
            <button className="bg-white text-[#7A5230] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              S'inscrire maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
