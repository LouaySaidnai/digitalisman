import { PrismaClient } from './src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.produit.createMany({
    data: [
      {
        nom: "Tchiquetchiquetchique AI AI AI !",
        description: "Kit de survie IA offert : 1 Webinaire + outils pour utiliser l'IA dans son business sans tech.",
        livrable: "Support webinar . liste de mes 12 favoris · 10 prompts . 5 Loom . Communauté WhatsApp",
        prix: "495-€",
      },
      {
        nom: "1 heure de ping-pong, sans les mains !",
        description: "1 heure de coaching live",
        livrable: "Transcription de l'entretien",
        prix: "Gratuit",
      },
      {
        nom: "Le Produit, C'est Vous",
        description: "Transformer un parcours professionnel en catalogue de prestations vendables",
        livrable: 'Atelier "Cartographie d\'Expertise" Programme "Catalogue Clé-en-Main" "Usine à Produits Premium" 2h live . 2 scénarios sur tableur . Fiche décision',
        prix: "149 €",
      },
      {
        nom: "1,2,3, soleil !",
        description: "Validation express de projet avec scénarios financiers.",
        livrable: "Fiches processus . Scripts . Plan d'action",
        prix: "495 €",
      },
      {
        nom: "Premiers clients, la preuve par 3+3+3",
        description: "Programme 3 semaines : 3 offres structurées, 3 canaux testés, 3 clients.",
        livrable: "Étude concurrence . Argumentaire . Checklist export",
        prix: "1 990 €",
      },
      {
        nom: "La mue est enfant de Bohême",
        description: "6 semaines d'accompagnement : Stratégie premium originale. 1 séance initiale de 2h, 4 sessions hebdo de 30 mn, 1 session de restitution finale",
        livrable: "Quick wins . Roadmap . Recommandations sectorielles",
        prix: "4 900 €",
      },
      {
        nom: "895 €",
        description: "Audit stratégique en 2 x 2 demi-journées espacées d'une semaine à 10 jours clé-en-mains.",
        livrable: "Synthèse 2-3 pages . Fichier tableur de simulations . pitch-deck clients . pitch-deck investisseur . Stratégie financement",
        prix: "895 €",
      },
      {
        nom: "Audit 720°",
        description: "Stratégie de projet, Business plan avec tableaux de simulation, pitch-decks clients & investisseur en 10 jours clé-en-mains.",
        livrable: "À définir",
        prix: "495-€",
      },
      {
        nom: "Station-service BP",
        description: "Accompagnement 6 mois : Transformation globale.",
        livrable: "Serie de 4 webinaires de 90 mn",
        prix: "3 900 €",
      },
      {
        nom: "Caméléon Marchand",
        description: "Programme pour accompagner des startups africaines.",
        livrable: "Séances de coaching & webinaires . Matching projet . Pack installation . Contrats types",
        prix: "495-€",
      },
      {
        nom: "Devenir Mentor en Afrique",
        description: "Intégration comme co-fondateur dans une startup africaine.",
        livrable: "À définir",
        prix: "495-€",
      },
      {
        nom: "African Start-Up Co-Founder",
        description: "Intégration comme co-fondateur dans une startup africaine.",
        livrable: "À définir",
        prix: "295 €",
      },
    ],
  })

  console.log("Produits insérés avec succès !")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
