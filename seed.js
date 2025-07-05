"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();
const produits = [
    {
        nom: "Devenir Mentor en Afrique",
        slug: "devenir-mentor-afrique",
        sousTitre: "Programme pour accompagner des startups africaines",
        description: "Programme pour experts retraités/consultants seniors souhaitant monétiser leur réseau et savoir-faire en Afrique",
        conceptFondateur: "Problème : Comment monétiser mon réseau et savoir-faire en Afrique ? Solution : Programme de formation pour devenir mentor en Afrique",
        cible: "Experts retraités/consultants seniors",
        problemeResolu: "Comment monétiser mon réseau et savoir-faire en Afrique ?",
        niveauPriorite: 3,
        contenu: "Webinaire 1 : Écosystèmes startups Dakar/Casablanca, Webinaire 2 : Cultural intelligence (négociation Afrique), Webinaire 3 : Cas pratiques sectoriels, Webinaire 4 : Modèles de rémunération (€500-2k/mois)",
        processus: "Webinaire 1 : Écosystèmes startups, Webinaire 2 : Cultural intelligence, Webinaire 3 : Cas pratiques, Webinaire 4 : Modèles de rémunération",
        duree: "4 webinaires de 90 min",
        prix: "495 €",
        prixOriginal: null,
        garantie: "Satisfait ou remboursé 30 jours",
        conditionsPaiement: "Paiement unique",
        preuves: "Mentors ayant obtenu des contrats en Afrique",
        temoignages: "Experts ayant monétisé leur savoir-faire en Afrique",
        resultatsAttendus: "Certification 'Mentor Afrique 2024', Annuaire partenaires locaux, Template de contrat de mentorat",
        differenciation: "Spécialisation Afrique vs mentorat générique, Cultural intelligence vs approche occidentale",
        avantagesCompetitifs: "Spécialisé Afrique, Cultural intelligence, Réseau local",
        integrationEcosysteme: "Complémentaire aux autres programmes, Spécialisation Afrique",
        entonnoirNaturel: "Programme spécialisé pour mentorat Afrique",
        argumentsCommerciaux: "Monétisez votre savoir-faire en Afrique avec des rémunérations de €500-2k/mois",
        urgence: "Programme limité à 30 participants par session",
        exemplesConcrets: "Experts ayant obtenu des contrats de mentorat en Afrique",
        casPratiques: "Écosystèmes startups Dakar/Casablanca, Cultural intelligence, Modèles de rémunération",
        livrable: "Série de 4 webinaires de 90 min",
        livrablesDetailles: "Certification 'Mentor Afrique 2024', Annuaire partenaires locaux, Template de contrat de mentorat",
        supportsInclus: "Templates de contrat, Annuaire partenaires, Certification",
        faq: "Q: Dois-je avoir de l'expérience en Afrique ? R: Non, nous vous formons à la cultural intelligence. Q: Les rémunérations sont-elles garanties ? R: Nous vous donnons les outils, c'est à vous de prospecter.",
        objectionsAnticipees: "Objection : 'Je ne connais pas l'Afrique' → Réponse : 'Nous vous formons à la cultural intelligence'. Objection : 'Les rémunérations sont faibles' → Réponse : '€500-2k/mois pour un travail à distance'.",
        statut: "actif"
    },
    {
        nom: "African Start-Up Co-Founder",
        slug: "african-startup-cofounder",
        sousTitre: "Intégration comme co-fondateur dans une startup africaine",
        description: "Programme pour entrepreneurs en reconversion totale, prêts à s'impliquer comme co-fondateur actif",
        conceptFondateur: "Problème : Je veux une aventure entrepreneuriale clé-en-main. Solution : Intégration comme co-fondateur dans une startup africaine",
        cible: "Entrepreneurs en reconversion totale, prêts à s'impliquer comme co-fondateur actif",
        problemeResolu: "Je veux une aventure entrepreneuriale clé-en-main",
        niveauPriorite: 3,
        contenu: "Phase 1 : Immersion Écosystème - Session 1 : Panorama startups africaines, Session 2 : Atelier 'Où se situer ?'. Phase 2 : Scouting Stratégique - Session 3 : Veille sectorielle, Session 4 : Identification de 5 startups 'fit'. Phase 3 : Matching & Rôle - Session 5 : Rencontres startups, Session 6 : Pacte fondateurs. Phase 4 : Implémentation - Sessions 7-8 : Coaching opérationnel.",
        processus: "Phase 1 : Immersion, Phase 2 : Scouting, Phase 3 : Matching, Phase 4 : Implémentation",
        duree: "8 sessions sur 3 mois",
        prix: "2 495 €",
        prixOriginal: null,
        garantie: "Satisfait ou remboursé 30 jours",
        conditionsPaiement: "Paiement unique ou 3x",
        preuves: "Pierre, ex-DG : 'J'ai investi 20k€ pour 40% d'une startup logistique à Dakar. CA prévu : 500k€ en 2024'",
        temoignages: "Entrepreneurs ayant intégré des startups africaines comme co-fondateurs",
        resultatsAttendus: "Intégration comme co-fondateur, Coaching opérationnel mensuel",
        differenciation: "Intégration startup vs simple investissement, Coaching vs conseil ponctuel",
        avantagesCompetitifs: "Intégration startup, Coaching opérationnel, Réseau africain",
        integrationEcosysteme: "Complémentaire aux autres programmes, Spécialisation Afrique",
        entonnoirNaturel: "Programme spécialisé pour co-fondation Afrique",
        argumentsCommerciaux: "Devenez co-fondateur d'une startup africaine en 3 mois",
        urgence: "Programme limité à 10 participants par session",
        exemplesConcrets: "Marc, 57 ans (ex-directeur logistique) : matching avec AgriConnect comme COO",
        casPratiques: "Cartographie des hubs tech, Grille de compatibilité, Journal de bord 30/60/90j",
        livrable: "Séances de coaching & webinaires, Matching projet, Pack installation",
        livrablesDetailles: "Carte interactive, Template Airtable/Notion, Questionnaire algorithmique",
        supportsInclus: "Templates de contrats, Base de données startups, Outils de suivi",
        faq: "Q: Dois-je investir de l'argent ? R: Cela dépend du projet, nous vous aidons à négocier. Q: Les startups sont-elles fiables ? R: Nous les sélectionnons selon des critères rigoureux.",
        objectionsAnticipees: "Objection : 'Je ne connais pas l'Afrique' → Réponse : 'Nous vous accompagnons culturellement'. Objection : 'C'est risqué' → Réponse : 'Sélection rigoureuse des startups'.",
        statut: "actif"
    },
    {
        nom: "Caméléon Marchand",
        slug: "cameleon-marchand",
        sousTitre: "Accompagnement 6 mois : Transformation globale",
        description: "Accompagnement complet de 6 mois pour transformation globale de l'entreprise",
        conceptFondateur: "Problème : Besoin d'une transformation globale. Solution : Accompagnement stratégique sur 6 mois",
        cible: "Dirigeants en phase de repositionnement stratégique",
        problemeResolu: "Besoin de transformation business à 360°",
        niveauPriorite: 1,
        contenu: "Modules mensuels : Audit, Stratégie, Branding, Digitalisation, RH, Commercial",
        processus: "Audit initial → Plan d'action → Implémentation accompagnée → Évaluation finale",
        duree: "6 mois",
        prix: "7 495 €",
        prixOriginal: null,
        garantie: "Satisfait ou remboursé 30 jours",
        conditionsPaiement: "Paiement unique ou 3x",
        preuves: "Clients ayant doublé leur CA en 6 mois",
        temoignages: "Témoignages en cours de collecte",
        resultatsAttendus: "Plan stratégique personnalisé, Outils digitaux, Équipe alignée",
        differenciation: "Accompagnement global + sur-mesure",
        avantagesCompetitifs: "Approche intégrée, Expertises croisées, Suivi mensuel",
        integrationEcosysteme: "Peut précéder ou suivre d'autres programmes ciblés",
        entonnoirNaturel: "Idéal pour profils en pivot stratégique",
        argumentsCommerciaux: "Transformez votre entreprise en 6 mois avec un accompagnement stratégique complet",
        urgence: "Places limitées à 5 entreprises par session",
        exemplesConcrets: "Transformation digitale d'une PME familiale en 6 mois",
        casPratiques: "Audit initial, Diagnostic RH, Refonte stratégie commerciale",
        livrable: "Feuille de route stratégique, Outils et templates",
        livrablesDetailles: "Audit PDF, Tableaux de bord Notion, Kit RH & Commercial",
        supportsInclus: "Accès à une plateforme de suivi, Templates, Webinaires live",
        faq: "Q: Est-ce adapté aux petites structures ? R: Oui, le programme s'adapte à toutes tailles. Q: Puis-je payer en plusieurs fois ? R: Oui, en 3 fois.",
        objectionsAnticipees: "Objection : 'Je n'ai pas le temps' → Réponse : 'Seulement 1 session/2 semaines'. Objection : 'C'est cher' → Réponse : 'ROI mesurable dès 3e mois'.",
        statut: "actif"
    },
];
async function main() {
    console.log('Début du seeding...');
    for (const produit of produits) {
        await prisma.produit.upsert({
            where: { slug: produit.slug },
            update: produit,
            create: produit,
        });
        console.log(`Produit "${produit.nom}" traité`);
    }
    console.log('Seeding terminé !');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
