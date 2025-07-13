const { extractDaysFromDuree, isAccessExpired, calculateExpirationDate } = require('./src/lib/dureeUtils');

// Tests de la fonction extractDaysFromDuree
console.log('🧪 Tests de extractDaysFromDuree:');
console.log('"30 jours" →', extractDaysFromDuree('30 jours')); // 30
console.log('"6 mois" →', extractDaysFromDuree('6 mois')); // 180
console.log('"1 an" →', extractDaysFromDuree('1 an')); // 365
console.log('"Accès permanent" →', extractDaysFromDuree('Accès permanent')); // null
console.log('"2 semaines" →', extractDaysFromDuree('2 semaines')); // 14
console.log('null →', extractDaysFromDuree(null)); // null

console.log('\n🧪 Tests de isAccessExpired:');

// Test avec accès permanent
const dateAcces = new Date('2024-01-01');
const dureePermanente = 'Accès permanent';
console.log('Accès permanent (2024-01-01) →', isAccessExpired(dateAcces, dureePermanente)); // false

// Test avec accès de 30 jours (non expiré)
const duree30Jours = '30 jours';
const dateAcces30Jours = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000); // Il y a 15 jours
console.log('30 jours (il y a 15 jours) →', isAccessExpired(dateAcces30Jours, duree30Jours)); // false

// Test avec accès de 30 jours (expiré)
const dateAccesExpire = new Date(Date.now() - 35 * 24 * 60 * 60 * 1000); // Il y a 35 jours
console.log('30 jours (il y a 35 jours) →', isAccessExpired(dateAccesExpire, duree30Jours)); // true

console.log('\n🧪 Tests de calculateExpirationDate:');
const dateExpiration = calculateExpirationDate(dateAcces30Jours, duree30Jours);
console.log('Date d\'expiration pour 30 jours →', dateExpiration);

console.log('\n✅ Tests terminés !'); 