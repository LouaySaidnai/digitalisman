/**
 * Fonction pour extraire le nombre de jours depuis le champ duree
 * @param duree - La durée en format texte (ex: "30 jours", "6 mois", "Accès permanent")
 * @returns Le nombre de jours ou null si accès permanent
 */
export function extractDaysFromDuree(duree: string | null): number | null {
  if (!duree) return null;
  
  const dureeLower = duree.toLowerCase();
  
  // Accès permanent
  if (dureeLower.includes('permanent') || dureeLower.includes('illimité') || dureeLower.includes('à vie')) {
    return null;
  }
  
  // Extraction des jours
  const joursMatch = dureeLower.match(/(\d+)\s*jours?/);
  if (joursMatch) {
    return parseInt(joursMatch[1]);
  }
  
  // Extraction des semaines
  const semainesMatch = dureeLower.match(/(\d+)\s*semaines?/);
  if (semainesMatch) {
    return parseInt(semainesMatch[1]) * 7;
  }
  
  // Extraction des mois
  const moisMatch = dureeLower.match(/(\d+)\s*mois/);
  if (moisMatch) {
    return parseInt(moisMatch[1]) * 30;
  }
  
  // Extraction des années
  const anneesMatch = dureeLower.match(/(\d+)\s*années?/);
  if (anneesMatch) {
    return parseInt(anneesMatch[1]) * 365;
  }
  
  // Si aucun pattern reconnu, on essaie d'extraire un nombre
  const nombreMatch = dureeLower.match(/(\d+)/);
  if (nombreMatch) {
    return parseInt(nombreMatch[1]);
  }
  
  return null; // Accès permanent par défaut
}

/**
 * Fonction pour vérifier si un accès a expiré
 * @param dateAcces - Date d'activation de l'accès
 * @param duree - Durée du produit
 * @returns true si l'accès a expiré, false sinon
 */
export function isAccessExpired(dateAcces: Date | null, duree: string | null): boolean {
  if (!dateAcces || !duree) return false; // Pas d'expiration si pas de date ou pas de durée
  
  const joursAcces = extractDaysFromDuree(duree);
  if (joursAcces === null) return false; // Accès permanent
  
  const dateExpiration = new Date(dateAcces);
  dateExpiration.setDate(dateExpiration.getDate() + joursAcces);
  
  return new Date() > dateExpiration;
}

/**
 * Fonction pour calculer la date d'expiration
 * @param dateAcces - Date d'activation de l'accès
 * @param duree - Durée du produit
 * @returns Date d'expiration ou null si accès permanent
 */
export function calculateExpirationDate(dateAcces: Date | null, duree: string | null): Date | null {
  if (!dateAcces || !duree) return null;
  
  const joursAcces = extractDaysFromDuree(duree);
  if (joursAcces === null) return null; // Accès permanent
  
  const dateExpiration = new Date(dateAcces);
  dateExpiration.setDate(dateExpiration.getDate() + joursAcces);
  
  return dateExpiration;
} 