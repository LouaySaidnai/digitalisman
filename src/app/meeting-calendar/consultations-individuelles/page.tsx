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

// Données d'exemple pour les consultations individuelles (fallback)
const individualConsultations = [
  {
    id: '3',
    title: 'Consultation individuelle - Business Plan',
    date: new Date(2024, 11, 20), // 20 décembre 2024
    time: '09:00 - 10:30',
    type: 'individuel' as const,
    duration: '1h30',
    produitId: 1
  },
  {
    id: '5',
    title: 'Consultation individuelle - Analyse financière',
    date: new Date(2024, 11, 23), // 23 décembre 2024
    time: '14:00 - 15:30',
    type: 'individuel' as const,
    duration: '1h30',
    produitId: 1
  },
  {
    id: '7',
    title: 'Consultation individuelle - Stratégie de croissance',
    date: new Date(2024, 11, 27), // 27 décembre 2024
    time: '16:00 - 17:30',
    type: 'individuel' as const,
    duration: '1h30',
    produitId: 1
  },
  {
    id: '9',
    title: 'Consultation individuelle - Marketing et communication',
    date: new Date(2024, 11, 30), // 30 décembre 2024
    time: '10:00 - 11:30',
    type: 'individuel' as const,
    duration: '1h30',
    produitId: 1
  },
  {
    id: '10',
    title: 'Consultation individuelle - Gestion d\'équipe',
    date: new Date(2025, 0, 3), // 3 janvier 2025
    time: '13:00 - 14:30',
    type: 'individuel' as const,
    duration: '1h30',
    produitId: 1
  }
];

export default async function ConsultationsIndividuellesPage() {
  // Récupérer les vraies données depuis la base
  const meetingData = await getMeetingData();
  
  // Convertir les données en format compatible avec WebinarCalendar
  const realConsultations = convertMeetingDataToWebinars(meetingData);
  
  // Filtrer pour ne garder que les consultations individuelles
  const consultationsIndividuelles = realConsultations.filter(consultation => consultation.type === 'individuel');
  
  // Utiliser les vraies données si disponibles, sinon les données d'exemple
  const consultationsToDisplay = consultationsIndividuelles.length > 0 ? consultationsIndividuelles : individualConsultations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0e6d0] via-[#e8dcc0] to-[#f5ecd7]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#4B2E05] mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#7A5230] mr-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Consultations Individuelles
            <svg className="w-12 h-12 text-[#7A5230] ml-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </h1>
          <p className="text-lg text-[#5C3A00] max-w-2xl mx-auto">
            Bénéficiez d'un accompagnement personnalisé et sur-mesure pour votre projet. 
            Nos experts analysent votre situation et vous proposent des solutions adaptées.
          </p>
        </div>

        <WebinarCalendar webinars={consultationsToDisplay} />

        {/* Section d'informations sur les consultations individuelles */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7A5230] to-[#B9986F] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Accompagnement Personnalisé</h3>
              <p className="text-[#5C3A00]">
                Un suivi sur-mesure adapté à votre situation spécifique et à vos objectifs.
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
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Expertise Spécialisée</h3>
              <p className="text-[#5C3A00]">
                Bénéficiez de l'expertise d'experts reconnus dans leur domaine d'activité.
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
              <h3 className="text-xl font-bold text-[#4B2E05] mb-2">Plan d'Action Concret</h3>
              <p className="text-[#5C3A00]">
                Repartez avec un plan d'action détaillé et des étapes concrètes à suivre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
