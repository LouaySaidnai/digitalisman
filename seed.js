"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    await prisma.produit.createMany({
        data: [
            {
                nom: "Tchiquetchiquetchique AI AI AI !",
                description: "Kit de survie IA offert : 1 Webinaire + outils pour utiliser l'IA dans son business sans tech.",
                livrable: "Support webinar · liste de mes 12 favoris · 10 prompts · 5 Loom · Communauté WhatsApp",
                prix: "Gratuit",
            },
            {
                nom: "1 heure de ping-pong, sans les mains !",
                description: "1 heure de coaching live",
                livrable: "Transcription de l'entretien",
                prix: "149 €",
            },
            {
                nom: "Le Produit, C'est Vous",
                description: "Transformer un parcours professionnel en catalogue de prestations vendables",
                livrable: "Atelier 'Cartographie d'Expertise' · Programme 'Catalogue Clé-en-Main' · 'Usine à Produits Premium'",
                prix: "495 € / 1 990 € / 4 900 €",
            },
            {
                nom: "1,2,3, soleil !",
                description: "Validation express de projet avec scénarios financiers.",
                livrable: "2h live · 2 scénarios sur tableur · Fiche décision",
                prix: "295 €",
            },
            {
                nom: "Premiers clients, la preuve par 3+3+3",
                description: "Programme 3 semaines : 3 offres structurées, 3 canaux testés, 3 clients.",
                livrable: "Fiches processus · Scripts · Plan d'action",
                prix: "895 €",
            },
            {
                nom: "La mue est enfant de Bohême",
                description: "6 semaines d'accompagnement : Stratégie premium originale. 1 séance initiale de 2h, 4 sessions hebdo de 30 mn, 1 session de restitution finale",
                livrable: "Étude concurrence · Argumentaire · Checklist export",
                prix: "1 495 €",
            },
            {
                nom: "Audit 720°",
                description: "Audit stratégique en 2 x 2 demi-journées espacées d'une semaine à 10 jours.",
                livrable: "Quick wins · Roadmap · Recommandations sectorielles",
                prix: "2 495 €",
            },
            {
                nom: "Station-service BP",
                description: "Stratégie de projet, Business plan avec tableaux de simulation, pitch-decks clients & investisseur en 10 jours clé-en-mains.",
                livrable: "Synthèse 2-3 pages · Fichier tableur de simulations · pitch-deck clients · pitch-deck investisseur · Stratégie financement",
                prix: "3 900 €",
            },
            {
                nom: "Caméléon Marchand",
                description: "Accompagnement 6 mois : Transformation globale.",
                livrable: "À définir",
                prix: "7 495 €",
            },
            {
                nom: "Devenir Mentor en Afrique",
                description: "Programme pour accompagner des startups africaines.",
                livrable: "Série de 4 webinaires de 90 mn",
                prix: "495 €",
            },
            {
                nom: "African Start-Up Co-Founder",
                description: "Intégration comme co-fondateur dans une startup africaine.",
                livrable: "Séances de coaching & webinaires · Matching projet · Pack installation · Contrats types",
                prix: "2 495 €",
            },
        ],
    });
    console.log("Produits insérés avec succès !");
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
