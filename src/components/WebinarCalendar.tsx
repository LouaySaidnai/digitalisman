'use client';

import React, { useState } from 'react';

interface Webinar {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'collectif' | 'individuel';
  duration: string;
  maxParticipants?: number;
  currentParticipants?: number;
}

interface WebinarCalendarProps {
  webinars?: Webinar[];
}

const WebinarCalendar: React.FC<WebinarCalendarProps> = ({ webinars = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

  // Fonction pour obtenir le nom du mois
  const getMonthName = (date: Date): string => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[date.getMonth()];
  };

  // Fonction pour obtenir le nom du jour
  const getDayName = (date: Date): string => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[date.getDay()];
  };

  // Fonction pour formater l'heure
  const formatTime = (time: string): string => {
    return time;
  };

  // Fonction pour obtenir les webinaires d'un jour spécifique
  const getWebinarsForDate = (date: Date): Webinar[] => {
    return webinars.filter(webinar => {
      const webinarDate = new Date(webinar.date);
      return webinarDate.toDateString() === date.toDateString();
    });
  };

  // Générer les jours du mois
  const generateDaysOfMonth = () => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Ajouter les jours vides du début
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Ajouter tous les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = generateDaysOfMonth();

  // Navigation des mois
  const goToPreviousMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* En-tête du calendrier */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-[#7A5230] text-white rounded hover:bg-[#B9986F] transition-colors"
        >
          ← Précédent
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {getMonthName(selectedMonth)} {selectedMonth.getFullYear()}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-[#7A5230] text-white rounded hover:bg-[#B9986F] transition-colors"
        >
          Suivant →
        </button>
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {/* En-têtes des jours */}
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Jours du mois */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-32"></div>;
          }

          const dayWebinars = getWebinarsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div
              key={day.toISOString()}
              className={`min-h-32 border rounded-lg p-2 ${
                isToday ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
              }`}
            >
              <div className="text-sm font-medium text-gray-700 mb-2">
                {day.getDate()}
              </div>
              
              {/* Webinaires du jour */}
              <div className="space-y-1">
                {dayWebinars.map(webinar => (
                  <div
                    key={webinar.id}
                    onClick={() => setSelectedWebinar(webinar)}
                    className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                      webinar.type === 'collectif' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    }`}
                  >
                    <div className="font-medium truncate">{webinar.title}</div>
                    <div className="text-xs opacity-75">{webinar.time}</div>
                    <div className="text-xs opacity-75">
                      {webinar.type === 'collectif' ? 'Collectif' : 'Individuel'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Détails du webinaire sélectionné */}
      {selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedWebinar.title}</h3>
              <button
                onClick={() => setSelectedWebinar(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Calendrier stylisé pour le webinaire */}
            <div className="min-w-32 bg-white min-h-48 p-3 mb-4 font-medium">
              <div className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg">
                <div className="block rounded-t overflow-hidden text-center">
                  <div className="bg-[#7A5230] text-white py-1">
                    {getMonthName(selectedWebinar.date)}
                  </div>
                  <div className="pt-1 border-l border-r border-white bg-white">
                    <span className="text-5xl font-bold leading-tight">
                      {selectedWebinar.date.getDate()}
                    </span>
                  </div>
                  <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                    <span className="text-sm">
                      {getDayName(selectedWebinar.date)}
                    </span>
                  </div>
                  <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
                    <span className="text-xs leading-normal">
                      {formatTime(selectedWebinar.time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations du webinaire */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Type:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  selectedWebinar.type === 'collectif' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {selectedWebinar.type === 'collectif' ? 'Webinaire Collectif' : 'Webinaire Individuel'}
                </span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Durée:</span>
                <span className="ml-2 text-gray-600">{selectedWebinar.duration}</span>
              </div>

              {selectedWebinar.type === 'collectif' && selectedWebinar.maxParticipants && (
                <div>
                  <span className="font-medium text-gray-700">Participants:</span>
                  <span className="ml-2 text-gray-600">
                    {selectedWebinar.currentParticipants || 0}/{selectedWebinar.maxParticipants}
                  </span>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-[#7A5230] text-white py-2 px-4 rounded hover:bg-[#B9986F] transition-colors">
                  S'inscrire
                </button>
                <button 
                  onClick={() => setSelectedWebinar(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default WebinarCalendar; 