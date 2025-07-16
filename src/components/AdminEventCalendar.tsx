'use client';

import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'webinaire' | 'individuel';
  duration: string;
  lien?: string;
}

interface AdminEventCalendarProps {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
}

const AdminEventCalendar: React.FC<AdminEventCalendarProps> = ({ events, onEventsChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    type: 'webinaire',
    duration: '',
    lien: ''
  });

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

  // Fonction pour obtenir les événements d'un jour spécifique
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
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

  // Gérer l'ajout d'un événement
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.duration) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent
    };

    onEventsChange([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'webinaire',
      duration: '',
      lien: ''
    });
    setShowAddForm(false);
  };

  // Gérer la modification d'un événement
  const handleEditEvent = () => {
    if (!editingEvent || !editingEvent.title || !editingEvent.date || !editingEvent.time || !editingEvent.duration) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedEvents = events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    );
    onEventsChange(updatedEvents);
    setEditingEvent(null);
  };

  // Gérer la suppression d'un événement
  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      console.log('Suppression de l\'événement avec ID:', eventId);
      console.log('Événements avant suppression:', events);
      
      const updatedEvents = events.filter(event => event.id !== eventId);
      console.log('Événements après suppression:', updatedEvents);
      
      onEventsChange(updatedEvents);
      // Fermer le formulaire de modification après suppression
      setEditingEvent(null);
      alert('Événement supprimé ! N\'oubliez pas de sauvegarder les modifications du produit.');
    }
  };

  // Gérer le clic sur un événement
  const handleEventClick = (event: Event) => {
    setEditingEvent({ ...event });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#FDF8F3] rounded-lg">
      {/* En-tête du calendrier */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-[#8B7355] text-white rounded hover:bg-[#A89078] transition-colors"
        >
          ← Précédent
        </button>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {getMonthName(selectedMonth)} {selectedMonth.getFullYear()}
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-[#8B7355] text-white rounded hover:bg-[#A89078] transition-colors"
          >
            + Ajouter Événement
          </button>
        </div>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-[#8B7355] text-white rounded hover:bg-[#A89078] transition-colors"
        >
          Suivant →
        </button>
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {/* En-têtes des jours */}
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="text-center font-semibold text-[#8B7355] py-2 bg-[#F5E6D3] rounded">
            {day}
          </div>
        ))}

        {/* Jours du mois */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-32"></div>;
          }

          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div
              key={day.toISOString()}
              className={`min-h-32 border rounded-lg p-2 ${
                isToday ? 'bg-[#F5E6D3] border-[#8B7355]' : 'bg-[#FDF8F3] border-[#D2B48C]'
              }`}
            >
              <div className="text-sm font-medium text-[#8B7355] mb-2">
                {day.getDate()}
              </div>
              
              {/* Événements du jour */}
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                      event.type === 'webinaire' 
                        ? 'bg-[#E6D7C3] text-[#5D4037] hover:bg-[#D4C4B0]' 
                        : 'bg-[#D2B48C] text-[#5D4037] hover:bg-[#C4A484]'
                    }`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-75">{event.time}</div>
                    <div className="text-xs opacity-75">
                      {event.type === 'webinaire' ? 'Webinaire' : 'Individuel'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulaire d'ajout d'événement */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Ajouter un Événement</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure *</label>
                <input
                  type="text"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  placeholder="e.g., 14:00 - 16:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée *</label>
                <input
                  type="text"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                  placeholder="e.g., 2h"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'webinaire' | 'individuel' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="webinaire">Webinaire</option>
                  <option value="individuel">Individuel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien de réunion</label>
                <input
                  type="url"
                  value={newEvent.lien}
                  onChange={(e) => setNewEvent({ ...newEvent, lien: e.target.value })}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

                             <div className="flex gap-3 pt-4">
                 <button
                   type="submit"
                   className="flex-1 bg-[#8B7355] text-white py-2 px-4 rounded hover:bg-[#A89078] transition-colors"
                 >
                   Ajouter
                 </button>
                 <button
                   type="button"
                   onClick={() => setShowAddForm(false)}
                   className="flex-1 bg-[#D2B48C] text-[#5D4037] py-2 px-4 rounded hover:bg-[#C4A484] transition-colors"
                 >
                   Annuler
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire de modification d'événement */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Modifier l'Événement</h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleEditEvent(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure *</label>
                <input
                  type="text"
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  placeholder="e.g., 14:00 - 16:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée *</label>
                <input
                  type="text"
                  value={editingEvent.duration}
                  onChange={(e) => setEditingEvent({ ...editingEvent, duration: e.target.value })}
                  placeholder="e.g., 2h"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={editingEvent.type}
                  onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value as 'webinaire' | 'individuel' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="webinaire">Webinaire</option>
                  <option value="individuel">Individuel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien de réunion</label>
                <input
                  type="url"
                  value={editingEvent.lien}
                  onChange={(e) => setEditingEvent({ ...editingEvent, lien: e.target.value })}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

                             <div className="flex gap-3 pt-4">
                 <button
                   type="submit"
                   className="flex-1 bg-[#8B7355] text-white py-2 px-4 rounded hover:bg-[#A89078] transition-colors"
                 >
                   Modifier
                 </button>
                 <button
                   type="button"
                   onClick={() => handleDeleteEvent(editingEvent.id)}
                   className="flex-1 bg-[#BC8A5F] text-white py-2 px-4 rounded hover:bg-[#A67B52] transition-colors"
                 >
                   Supprimer
                 </button>
                 <button
                   type="button"
                   onClick={() => setEditingEvent(null)}
                   className="flex-1 bg-[#D2B48C] text-[#5D4037] py-2 px-4 rounded hover:bg-[#C4A484] transition-colors"
                 >
                   Annuler
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventCalendar; 