// Types pour la structure du champ meeting dans le modèle Produit

export interface MeetingEvent {
  date: string; // Format: "2024-12-20"
  type: 'webinaire' | 'individuel';
  time?: string; // Optionnel: "09:00 - 10:30"
  duration?: string; // Optionnel: "1h30"
  title?: string; // Optionnel: titre personnalisé
  lien?: string; // Optionnel: lien de réunion (Google Meet, Zoom, etc.)
}

export interface MeetingData {
  [eventName: string]: MeetingEvent[];
}

// Exemple de structure:
// {
//   "Webinaire Business Plan": [
//     { "date": "2024-12-20", "type": "webinaire", "time": "09:00 - 10:30", "duration": "1h30", "lien": "https://meet.google.com/..." },
//     { "date": "2024-12-23", "type": "webinaire", "time": "14:00 - 15:30", "duration": "1h30", "lien": "https://meet.google.com/..." }
//   ],
//   "Consultation Stratégie": [
//     { "date": "2024-12-25", "type": "individuel", "time": "16:00 - 17:30", "duration": "1h30", "lien": "https://zoom.us/..." }
//   ]
// }

// Fonction utilitaire pour convertir MeetingData en format compatible avec WebinarCalendar
export function convertMeetingDataToWebinars(meetingData: MeetingData | null) {
  if (!meetingData) return [];
  
  const webinars: any[] = [];
  let idCounter = 1;
  
  Object.entries(meetingData).forEach(([eventName, events]) => {
    events.forEach((event: any) => {
      webinars.push({
        id: idCounter.toString(),
        title: event.title || eventName,
        date: new Date(event.date),
        time: event.time || '',
        type: event.type === 'webinaire' ? 'collectif' : 'individuel',
        duration: event.duration || '',
        lien: event.lien || null,
        produitSlug: event.produitSlug || null // Préserver le slug du produit
      });
      idCounter++;
    });
  });
  
  return webinars;
}

// Fonction pour filtrer les événements par type
export function filterEventsByType(meetingData: MeetingData | null, type: 'webinaire' | 'individuel') {
  if (!meetingData) return [];
  
  const filteredEvents: any[] = [];
  let idCounter = 1;
  
  Object.entries(meetingData).forEach(([eventName, events]) => {
    const typeEvents = events.filter(event => event.type === type);
    typeEvents.forEach((event: any) => {
      filteredEvents.push({
        id: idCounter.toString(),
        title: event.title || eventName,
        date: new Date(event.date),
        time: event.time || '',
        type: type === 'webinaire' ? 'collectif' : 'individuel',
        duration: event.duration || '',
        lien: event.lien || null,
        produitSlug: event.produitSlug || null // Préserver le slug du produit
      });
      idCounter++;
    });
  });
  
  return filteredEvents;
} 