import WebinarCalendar from '../../../components/WebinarCalendar';
import { filterEventsByType, convertMeetingDataToWebinars } from '../../../types/meeting';
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
      select: { 
        id: true,
        nom: true,
        slug: true,
        meeting: true 
      }
    });

    // Combiner toutes les données de meeting avec les slugs des produits
    const allMeetingData = produits.reduce((acc, produit) => {
      if (produit.meeting && typeof produit.meeting === 'object') {
        // Ajouter le slug du produit à chaque événement
        const eventsWithProductSlug = Object.entries(produit.meeting).reduce((eventAcc, [eventName, events]) => {
          eventAcc[eventName] = (events as any[]).map((event: any) => ({
            ...event,
            produitSlug: produit.slug
          }));
          return eventAcc;
        }, {} as any);
        
        return { ...acc, ...eventsWithProductSlug };
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
    currentParticipants: 23,
    produitSlug: 'tchiquetchiquetchique-ai-ai-ai'
  },
  {
    id: '2',
    title: 'Stratégies de marketing digital',
    date: new Date(2024, 11, 18), // 18 décembre 2024
    time: '10:00 - 12:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 30,
    currentParticipants: 15,
    produitSlug: 'tchiquetchiquetchique-ai-ai-ai'
  },
  {
    id: '4',
    title: 'Financement et levée de fonds',
    date: new Date(2024, 11, 22), // 22 décembre 2024
    time: '15:00 - 17:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 40,
    currentParticipants: 28,
    produitSlug: 'tchiquetchiquetchique-ai-ai-ai'
  },
  {
    id: '6',
    title: 'Gestion d\'équipe et leadership',
    date: new Date(2024, 11, 25), // 25 décembre 2024
    time: '11:00 - 13:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 35,
    currentParticipants: 12,
    produitSlug: 'tchiquetchiquetchique-ai-ai-ai'
  },
  {
    id: '8',
    title: 'Innovation et transformation digitale',
    date: new Date(2024, 11, 29), // 29 décembre 2024
    time: '13:00 - 15:00',
    type: 'collectif' as const,
    duration: '2 heures',
    maxParticipants: 45,
    currentParticipants: 31,
    produitSlug: 'tchiquetchiquetchique-ai-ai-ai'
  }
];

export default async function WebinairesPage() {
  // Récupérer les vraies données depuis la base
  const meetingData = await getMeetingData();
  
  // Convertir les données en format compatible avec WebinarCalendar
  const realWebinars = convertMeetingDataToWebinars(meetingData);
  
  // Filtrer pour ne garder que les webinaires collectifs
  const webinairesCollectifs = realWebinars.filter(webinar => webinar.type === 'collectif');
  
  // Utiliser les vraies données si disponibles, sinon les données d'exemple
  const webinarsToDisplay = webinairesCollectifs.length > 0 ? webinairesCollectifs : groupWebinars;

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

        <WebinarCalendar webinars={webinarsToDisplay} />

        {/* Section d'informations sur les webinaires collectifs */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Contenu Structuré</h3>
              <p className="text-[#5C3A00]">
                Des sessions organisées avec un programme clair et des objectifs définis pour maximiser votre apprentissage.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Échanges Interactifs</h3>
              <p className="text-[#5C3A00]">
                Posez vos questions en direct et partagez vos expériences avec d'autres entrepreneurs.
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Réseau Professionnel</h3>
              <p className="text-[#5C3A00]">
                Développez votre réseau en rencontrant d'autres entrepreneurs partageant vos ambitions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}