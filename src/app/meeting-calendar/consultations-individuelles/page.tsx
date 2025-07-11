import WebinarCalendar from '../../../components/WebinarCalendar';
import { filterEventsByType } from '../../../types/meeting';

// Données d'exemple pour les consultations individuelles (fallback)
const individualConsultations = [
  {
    id: '3',
    title: 'Consultation individuelle - Business Plan',
    date: new Date(2024, 11, 20), // 20 décembre 2024
    time: '09:00 - 10:30',
    type: 'individuel' as const,
    duration: '1h30'
  },
  {
    id: '5',
    title: 'Consultation individuelle - Analyse financière',
    date: new Date(2024, 11, 23), // 23 décembre 2024
    time: '14:00 - 15:30',
    type: 'individuel' as const,
    duration: '1h30'
  },
  {
    id: '7',
    title: 'Consultation individuelle - Stratégie de croissance',
    date: new Date(2024, 11, 27), // 27 décembre 2024
    time: '16:00 - 17:30',
    type: 'individuel' as const,
    duration: '1h30'
  },
  {
    id: '9',
    title: 'Consultation individuelle - Marketing et communication',
    date: new Date(2024, 11, 30), // 30 décembre 2024
    time: '10:00 - 11:30',
    type: 'individuel' as const,
    duration: '1h30'
  },
  {
    id: '10',
    title: 'Consultation individuelle - Gestion d\'équipe',
    date: new Date(2025, 0, 3), // 3 janvier 2025
    time: '13:00 - 14:30',
    type: 'individuel' as const,
    duration: '1h30'
  }
];

export default function ConsultationsIndividuellesPage() {
  // Utiliser les données d'exemple pour les consultations individuelles
  const consultationsToDisplay = individualConsultations;

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

        <WebinarCalendar webinars={individualConsultations} />

        {/* Section d'informations sur les consultations individuelles */}
        <div className="mt-12 bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold text-[#4B2E05] mb-6 text-center">
            Pourquoi choisir nos consultations individuelles ?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-[#4B2E05] mb-3">Avantages de l'accompagnement personnalisé</h4>
              <ul className="space-y-2 text-[#5C3A00]">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Analyse approfondie de votre projet spécifique
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Conseils adaptés à votre situation
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Plan d'action détaillé et concret
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#7A5230] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Suivi post-consultation inclus
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#4B2E05] mb-3">Comment se déroule une consultation</h4>
              <ul className="space-y-2 text-[#5C3A00]">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Prise de rendez-vous en ligne
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Questionnaire pré-consultation
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Session privée de 1h30
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#B9986F] mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Compte-rendu détaillé envoyé
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types de consultations disponibles */}
        <div className="mt-12 bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold text-[#4B2E05] mb-6 text-center">
            Types de consultations disponibles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-6 rounded-2xl shadow-lg border border-[#B9986F]/20">
              <div className="w-12 h-12 bg-[#B9986F] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-[#4B2E05] mb-2">Business Plan</h4>
              <p className="text-[#5C3A00] text-sm">Structuration et validation de votre projet d'entreprise</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-6 rounded-2xl shadow-lg border border-[#B9986F]/20">
              <div className="w-12 h-12 bg-[#B9986F] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-[#4B2E05] mb-2">Analyse Financière</h4>
              <p className="text-[#5C3A00] text-sm">Évaluation de la viabilité financière de votre projet</p>
            </div>
            <div className="bg-gradient-to-br from-[#f5ecd7] to-[#f3e6c4] p-6 rounded-2xl shadow-lg border border-[#B9986F]/20">
              <div className="w-12 h-12 bg-[#B9986F] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-[#4B2E05] mb-2">Stratégie de Croissance</h4>
              <p className="text-[#5C3A00] text-sm">Planification du développement de votre activité</p>
            </div>
          </div>
        </div>

        {/* Call-to-action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Besoin d'un accompagnement personnalisé ?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Réservez votre consultation individuelle et transformez votre projet en réalité
            </p>
            <button className="bg-white text-[#7A5230] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Réserver une consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
