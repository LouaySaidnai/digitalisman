const { PrismaClient } = require('./src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  // Supprimer toutes les données existantes
  await prisma.produit.deleteMany({})
  await prisma.testResult.deleteMany({})
  
  await prisma.produit.createMany({
    data: [
      {
        nom: "African Start-Up Co-Founder",
        slug: "african-startup-co-founder",
        sousTitre: "Intégration comme co-fondateur dans une startup africaine",
        prix: JSON.stringify({
          montant: 2495,
          devise: "EUR",
          format: "2 495 €"
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 3,
        cible: "Entrepreneurs en reconversion totale, prêts à s'impliquer comme co-fondateur actif",
        conceptFondateur: "Problème : Je veux une aventure entrepreneuriale clé-en-main. Solution : Intégration comme co-fondateur dans une startup africaine avec accompagnement complet",
        
        // Contenu et processus
        contenu: "Séances de coaching & webinaires • Matching projet • Pack installation • Contrats types",
        processus: JSON.stringify({
          phases: [
            {
              nom: "Immersion",
              contenu: "Cartographie des hubs tech (Dakar, Abidjan, Casablanca)",
              outils: "Carte interactive + PDF dynamique"
            },
            {
              nom: "Scouting",
              contenu: "Base de 15 startups 'fit' avec critères : Stade, Secteur, Besoin expertise",
              outils: "Template Airtable"
            },
            {
              nom: "Matching",
              contenu: "Grille de compatibilité valeurs/compétences",
              outils: "Questionnaire algorithmique"
            },
            {
              nom: "Implémentation",
              contenu: "Journal de bord personnalisé (objectifs 30/60/90j)",
              outils: "Template Notion"
            }
          ]
        }),
        duree: "4 phases sur 3 mois",
        
        // Livrables et supports
        livrablesDetailles: "Carte interactive des hubs tech africains, Base de 15 startups qualifiées, Grille de compatibilité personnalisée, Journal de bord Notion, Contrats types, Pack installation complet",
        supportsInclus: "Template Airtable pour le scouting, Questionnaire algorithmique, Template Notion pour le suivi, Modèles de contrats types",
        
        // Preuves sociales
        temoignages: "Témoignages d'entrepreneurs ayant intégré des startups africaines avec succès",
        argumentsCommerciaux: "Vivez une aventure entrepreneuriale clé-en-main en Afrique avec un accompagnement sur-mesure",
        
        // Médias
        imageHero: "/images/african-startup.jpg",
        videoUrl: "/videos/african-startup-cofounder.mp4",
        gifSolution: "/images/animation-african-startup.gif",
        
        // Écosystème et entonnoir
        entonnoirNaturel: "Test de profil → African Start-Up Co-Founder",
        
        // Urgence et conditions
        urgence: "Offre limitée : 5 places par trimestre",
        
        // Nouveaux champs
        scriptType: "Voulez-vous vivre une aventure entrepreneuriale clé-en-main en Afrique ?",
        format: "Coaching & Webinaires + Matching + Pack Installation",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Dois-je avoir de l'expérience en startup ?",
              reponse: "Non, nous vous accompagnons à chaque étape de votre intégration"
            },
            {
              question: "Combien de temps dure l'accompagnement ?",
              reponse: "4 phases sur 3 mois avec suivi post-intégration"
            },
            {
              question: "Les contrats sont-ils inclus ?",
              reponse: "Oui, nous fournissons des modèles de contrats types adaptés"
            }
          ]
        }),
        conditionsPaiement: "Paiement en 3x sans frais",
        garantie: "Satisfait ou remboursé 30 jours",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Êtes-vous prêt à vous expatrier en Afrique ?",
            "Avez-vous une expérience entrepreneuriale ?",
            "Quel secteur vous intéresse le plus ?"
          ]
        }),
        testPersonalityMatch: "Aventurier, Entrepreneur, Ouvert d'esprit",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Devenir Mentor en Afrique",
        slug: "devenir-mentor-afrique",
        sousTitre: "Programme pour accompagner des startups africaines",
        prix: JSON.stringify({
          montant: 495,
          devise: "EUR",
          format: "495 €"
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 3,
        cible: "Experts retraités/consultants seniors",
        conceptFondateur: "Problème : Comment monétiser mon réseau et savoir-faire en Afrique ? Solution : Programme de formation pour devenir mentor de startups africaines",
        
        // Contenu et processus
        contenu: "Série de 4 webinaires de 90 mn pour devenir mentor de startups africaines",
        processus: JSON.stringify({
          webinaires: [
            {
              numero: 1,
              titre: "Écosystèmes startups Dakar/Casablanca",
              duree: "90 minutes",
              contenu: "Découverte des écosystèmes startup africains"
            },
            {
              numero: 2,
              titre: "Cultural intelligence (négociation Afrique)",
              duree: "90 minutes",
              contenu: "Maîtriser les codes culturels pour négocier en Afrique"
            },
            {
              numero: 3,
              titre: "Cas pratiques sectoriels",
              duree: "90 minutes",
              contenu: "Études de cas concrets par secteur d'activité"
            },
            {
              numero: 4,
              titre: "Modèles de rémunération (€500-2k/mois)",
              duree: "90 minutes",
              contenu: "Comment structurer sa rémunération de mentor"
            }
          ]
        }),
        duree: "4 webinaires de 90 minutes",
        
        // Livrables et supports
        livrablesDetailles: "Certification 'Mentor Afrique 2024', Annuaire partenaires locaux, Template de contrat de mentorat, Supports de cours, Enregistrements des webinaires",
        supportsInclus: "Template de contrat de mentorat, Annuaire partenaires locaux, Supports de cours, Enregistrements des webinaires",
        
        // Preuves sociales
        temoignages: "Témoignages de mentors ayant généré €500-2k/mois en accompagnant des startups africaines",
        argumentsCommerciaux: "Monétisez votre expertise en accompagnant des startups africaines avec des revenus de €500 à 2k/mois",
        
        // Médias
        imageHero: "/images/mentor-afrique.jpg",
        videoUrl: "/videos/devenir-mentor-afrique.mp4",
        gifSolution: "/images/animation-mentor-afrique.gif",
        
        // Écosystème et entonnoir
        entonnoirNaturel: "Test de profil → Devenir Mentor en Afrique",
        
        // Urgence et conditions
        urgence: "Offre limitée : 20 places par session",
        
        // Nouveaux champs
        scriptType: "Comment monétiser votre expertise en accompagnant des startups africaines ?",
        format: "Webinaires + Certification + Outils",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Dois-je avoir de l'expérience en Afrique ?",
              reponse: "Non, le programme vous forme aux spécificités culturelles et business"
            },
            {
              question: "Quels sont les revenus possibles ?",
              reponse: "Entre €500 et 2k/mois selon votre expertise et implication"
            },
            {
              question: "La certification est-elle reconnue ?",
              reponse: "Oui, certification 'Mentor Afrique 2024' reconnue par l'écosystème"
            }
          ]
        }),
        conditionsPaiement: "Paiement unique",
        garantie: "Satisfait ou remboursé 30 jours",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous une expertise professionnelle à partager ?",
            "Êtes-vous à l'aise avec les nouvelles technologies ?",
            "Avez-vous déjà accompagné des entrepreneurs ?"
          ]
        }),
        testPersonalityMatch: "Expert, Mentor, Ouvert d'esprit, Patient",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Station-service BP",
        slug: "station-service-bp",
        sousTitre: "Stratégie de projet, Business plan avec tableaux de simulation, pitch-decks clients & investisseur en 10 jours clé-en-mains",
        prix: JSON.stringify({
          montant: 3900,
          devise: "EUR",
          format: "3 900 €"
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 1,
        cible: "Bâtisseurs Visionnaires cherchent financement",
        conceptFondateur: "Problème : Mon business plan ne convainc pas les investisseurs. Solution : Business plan et pitch-decks professionnels en 10 jours clé-en-mains",
        
        // Contenu et processus
        contenu: "Synthèse 2-3 pages • Fichier tableur de simulations • pitch-deck clients • pitch-deck investisseur • Stratégie financement",
        processus: JSON.stringify({
          phases: [
            {
              jour: "J1-2",
              activite: "Modèle financier 3 ans (scénarios + sensibilité)",
              livrable: "Fichier Excel avec KPI dynamiques"
            },
            {
              jour: "J3-5",
              activite: "Pitch deck clients ('problème/solution')",
              livrable: "Pitch deck clients prêt à présenter"
            },
            {
              jour: "J6-8",
              activite: "Pitch deck investisseurs (ROI + exit strategy)",
              livrable: "Pitch deck investisseurs prêt à présenter"
            },
            {
              jour: "J9-10",
              activite: "Stratégie financement (subventions → VC)",
              livrable: "Liste ciblée de 50 investisseurs sectoriels"
            }
          ]
        }),
        duree: "10 jours",
        
        // Livrables et supports
        livrablesDetailles: "2 pitch decks 'prêts à présenter', Fichier Excel avec KPI dynamiques, Liste ciblée de 50 investisseurs sectoriels, Synthèse 2-3 pages, Stratégie financement complète",
        supportsInclus: "Modèles de pitch decks, Template Excel avec formules, Base de données investisseurs, Guide de présentation",
        
        // Preuves sociales
        temoignages: "Témoignages d'entrepreneurs ayant obtenu des financements grâce à nos business plans",
        argumentsCommerciaux: "Transformez votre idée en business plan qui convainc les investisseurs en 10 jours",
        
        // Médias
        imageHero: "/images/station-service-bp.jpg",
        videoUrl: "/videos/station-service-bp.mp4",
        gifSolution: "/images/animation-station-service-bp.gif",
        
        // Écosystème et entonnoir
        entonnoirNaturel: "Test de profil → Station-service BP",
        
        // Urgence et conditions
        urgence: "Offre limitée : 5 projets par mois",
        
        // Nouveaux champs
        scriptType: "Votre business plan ne convainc pas les investisseurs ?",
        format: "Business Plan + Pitch Decks + Stratégie Financement",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Avez-vous besoin de mes données financières ?",
              reponse: "Nous travaillons avec vos estimations et créons des scénarios réalistes"
            },
            {
              question: "Les pitch decks sont-ils personnalisés ?",
              reponse: "Oui, entièrement adaptés à votre projet et secteur d'activité"
            },
            {
              question: "Puis-je modifier les documents après livraison ?",
              reponse: "Oui, vous recevez les fichiers sources modifiables"
            }
          ]
        }),
        conditionsPaiement: "Paiement en 3x sans frais",
        garantie: "Satisfait ou remboursé 30 jours",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous déjà présenté votre projet à des investisseurs ?",
            "Avez-vous des données financières préliminaires ?",
            "Quel type de financement recherchez-vous ?"
          ]
        }),
        testPersonalityMatch: "Bâtisseur, Visionnaire, Structuré, Ambitieux",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Audit 720°",
        slug: "audit-720",
        sousTitre: "Audit stratégique en 2 x 2 demi-journées espacées d'une semaine à 10 jours",
        prix: JSON.stringify({
          montant: 2495,
          devise: "EUR",
          format: "2 495 €",
          options: {
            individuel: {
              prix: 2495,
              nom: "Audit 720° Individuel",
              duree: "2 demi-journées"
            },
            webinar: {
              prix: 1295,
              nom: "Audit 720° Webinar",
              duree: "4-6 personnes"
            }
          }
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 1,
        cible: "Entrepreneurs déterminés (CA > 50k€)",
        conceptFondateur: "Problème : J'ai un projet et des idées, mais pas de vision claire. Solution : Audit stratégique approfondi avec focus sur l'actionnable immédiat",
        
        // Contenu et processus
        contenu: "Quick wins • Roadmap • Recommandations sectorielles",
        processus: JSON.stringify({
          phases: [
            {
              jour: "Jour 1",
              activite: "Diagnostic stratégique",
              duree: "2 demi-journées",
              livrable: "Verbatim détaillé des 4 séances"
            },
            {
              jour: "Pause 7j",
              activite: "Tests terrain",
              duree: "7 jours",
              livrable: "Validation des hypothèses"
            },
            {
              jour: "Jour 8",
              activite: "Plan de bataille 90j",
              duree: "2 demi-journées",
              livrable: "Roadmap des priorités"
            }
          ]
        }),
        duree: "2 x 2 demi-journées espacées d'une semaine",
        
        // Livrables et supports
        livrablesDetailles: "Verbatim détaillé des 4 séances, Roadmap des priorités, Recommandations sectorielles, Plan d'action 90 jours, Quick wins identifiés",
        supportsInclus: "Template de diagnostic stratégique, Modèles de roadmap, Guide des quick wins, Supports de présentation",
        
        // Preuves sociales
        temoignages: "Entrepreneurs ayant obtenu une vision claire et un plan d'action concret",
        argumentsCommerciaux: "70% de notre temps sur l'actionnable immédiat vs audits théoriques",
        
        // Médias
        imageHero: "/images/audit-720.jpg",
        videoUrl: "/videos/audit-720.mp4",
        gifSolution: "/images/animation-audit-720.gif",
        
        // Écosystème et entonnoir
        entonnoirNaturel: "Test de profil → Audit 720°",
        
        // Urgence et conditions
        urgence: "Offre limitée : 10 audits/mois max",
        
        // Nouveaux champs
        scriptType: "Vous avez un projet mais pas de vision claire ?",
        format: "Audit Stratégique + Plan d'Action",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Avez-vous besoin de mes données financières ?",
              reponse: "Non, nous nous concentrons sur la stratégie et l'actionnable"
            },
            {
              question: "La pause de 7 jours est-elle obligatoire ?",
              reponse: "Oui, elle permet de tester les hypothèses sur le terrain"
            },
            {
              question: "Puis-je choisir l'option webinar ?",
              reponse: "Oui, pour 1 295 € avec 4-6 personnes, analyses moins individualisées mais dynamique collaborative"
            }
          ]
        }),
        conditionsPaiement: "Paiement unique ou 2x",
        garantie: "Satisfait ou remboursé 30 jours",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Votre CA dépasse-t-il 50k€ ?",
            "Avez-vous une vision claire de votre stratégie ?",
            "Êtes-vous prêt à tester des hypothèses sur le terrain ?"
          ]
        }),
        testPersonalityMatch: "Déterminé, Structuré, Orienté résultats, Ouvert au changement",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "La mue est enfant de Bohême",
        slug: "la-mue-est-enfant-de-boheme",
        sousTitre: "6 semaines d'accompagnement : Stratégie premium originale",
        prix: JSON.stringify({
          montant: 1495,
          devise: "EUR",
          format: "1 495 €"
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 3,
        cible: "Entrepreneurs en réinvention radicale (passion/opportunité)",
        conceptFondateur: "Problème : Je veux lancer un projet aligné avec mes valeurs, pas juste mon CV. Solution : Parcours de transformation de la passion au projet",
        
        // Contenu et processus
        contenu: "Étude concurrence • Argumentaire • Checklist export",
        processus: JSON.stringify({
          phases: [
            {
              nom: "Séance 1 : 'Éveil' (2h)",
              contenu: "Cartographie des passions/convictions, Identification des opportunités",
              duree: "2 heures",
              livrable: "Carte des passions et opportunités identifiées"
            },
            {
              nom: "Semaines 1-4 : 'Exploration' (4x30min/sem)",
              sessions: [
                {
                  numero: 1,
                  contenu: "Business model alternatif",
                  duree: "30 minutes"
                },
                {
                  numero: 2,
                  contenu: "Étude concurrence éthique",
                  duree: "30 minutes"
                },
                {
                  numero: 3,
                  contenu: "Prototype rapide",
                  duree: "30 minutes"
                },
                {
                  numero: 4,
                  contenu: "Test marché minimal",
                  duree: "30 minutes"
                }
              ]
            },
            {
              nom: "Séance 6 : 'Révélation' (1h)",
              contenu: "Plan de transition sur 90j, Checklist export (si applicable)",
              duree: "1 heure",
              livrable: "Plan de transition et checklist export"
            }
          ]
        }),
        duree: "6 semaines",
        
        // Livrables et supports
        livrablesDetailles: "Étude concurrence : Analyse des acteurs 'à mission' (ESG, B Corp), Argumentaire : Narratif 'Pourquoi ce projet a du sens' (liant parcours/passion), Checklist export pour projets internationaux : régulations + réseaux militants",
        supportsInclus: "Template d'étude concurrence éthique, Modèle d'argumentaire valeurs, Checklist export international, Supports de cartographie des passions",
        
        // Preuves sociales
        temoignages: "Entrepreneurs ayant trouvé leur nouvelle voie alignée avec leurs valeurs",
        argumentsCommerciaux: "Transformez votre passion en projet aligné avec vos valeurs",
        
        // Médias
        imageHero: "/images/la-mue-boheme.jpg",
        videoUrl: "/videos/la-mue-boheme.mp4",
        gifSolution: "/images/animation-la-mue-boheme.gif",
        
        // Écosystème et entonnoir
        entonnoirNaturel: "Test de profil → La mue est enfant de Bohême",
        
        // Urgence et conditions
        urgence: "Offre limitée : 8 places par session",
        
        // Nouveaux champs
        scriptType: "Voulez-vous lancer un projet aligné avec vos valeurs ?",
        format: "Accompagnement + Stratégie Premium",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Dois-je avoir une idée précise de projet ?",
              reponse: "Non, nous partons de vos passions et convictions pour identifier les opportunités"
            },
            {
              question: "Le programme est-il adapté aux projets internationaux ?",
              reponse: "Oui, nous incluons une checklist export pour les projets internationaux"
            },
            {
              question: "Puis-je adapter le rythme des sessions ?",
              reponse: "Les sessions hebdomadaires sont flexibles selon vos disponibilités"
            }
          ]
        }),
        conditionsPaiement: "Paiement unique ou 2x",
        garantie: "Satisfait ou remboursé 30 jours",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Êtes-vous en phase de réinvention professionnelle ?",
            "Avez-vous des valeurs fortes à défendre ?",
            "Êtes-vous prêt à explorer des modèles business alternatifs ?"
          ]
        }),
        testPersonalityMatch: "Idealiste, Créatif, Orienté valeurs, Ouvert au changement",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Tchiquetchiquetchique AI AI AI !",
        slug: "tchiquetchiquetchique-ai-ai-ai",
        sousTitre: "Kit de survie IA offert : 1 Webinaire + outils pour utiliser l'IA dans son business sans tech.",
        prix: JSON.stringify({
          original: "495€",
          promo: "Gratuit",
          condition: "Offert"
        }),
        prixOriginal: "495€",
        
        // Ciblage et positionnement
        niveauPriorite: 3,
        cible: "Tous les entrepreneurs 50+ (surtout Digital Novice)",
        conceptFondateur: "Problème → Solution : 'Je ne maîtrise pas l'IA et ça me paralyse' (p.2 coaching digital négligé)",
        
        // Contenu et processus
        contenu: `Webinaire découverte (60 min) :
"10 prompts magiques pour :
✓ Rédiger des emails clients
✓ Analyser la concurrence
✓ Générer des idées de produits"

Kit survie :
- Liste des 12 outils IA gratuits
- 5 vidéos Loom "Pas-à-pas"
- Template : "Prompt parfait pour votre secteur"`,
        processus: JSON.stringify({
          type: "webinaire",
          duree: "60 minutes",
          etapes: [
            "Webinaire découverte",
            "Accès au kit survie",
            "Accès à la communauté WhatsApp"
          ]
        }),
        duree: "60 minutes",
        
        // Livrables et supports
        livrablesDetailles: "PDF téléchargeable + accès 90j à la communauté WhatsApp",
        supportsInclus: "Support webinar • liste de mes 12 favoris • 10 prompts • 5 Loom • Communauté WhatsApp",
        
        // Preuves sociales
        temoignages: "De Jean-Marc, ex-commercial : « J'ai amélioré de 80% ma prospection en 1 mois ! »",
        argumentsCommerciaux: "Kit de survie IA offert pour démarrer sans tech",
        
        // Médias
        imageHero: null,
        videoUrl: null,
        gifSolution: null,
        
        // Écosystème et entonnoir
        entonnoirNaturel: null,
        
        // Urgence et conditions
        urgence: null,
        
        // Nouveaux champs
        scriptType: "10 prompts magiques pour transformer son business avec l'IA",
        format: "Webinaire + Kit survie",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Dois-je avoir des connaissances techniques ?",
              reponse: "Non, ce kit est conçu pour les débutants en IA."
            },
            {
              question: "Combien de temps ai-je accès au contenu ?",
              reponse: "Accès 90 jours à la communauté WhatsApp + PDF téléchargeable."
            },
            {
              question: "Quels outils IA sont inclus ?",
              reponse: "Liste des 12 meilleurs outils IA gratuits pour entrepreneurs."
            }
          ]
        }),
        conditionsPaiement: "Gratuit",
        garantie: "Offert sans engagement",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Utilisez-vous déjà l'IA dans votre business ?",
            "Êtes-vous à l'aise avec les nouvelles technologies ?",
            "Avez-vous besoin d'aide pour automatiser vos tâches ?"
          ]
        }),
        testPersonalityMatch: "Digital Novice, Curieux, Pragmatique",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "1 heure de ping-pong, sans les mains !",
        slug: "1h-ping-pong-sans-les-mains",
        sousTitre: "1 heure de coaching live + transcription de l'entretien",
        prix: JSON.stringify({
          original: "149€",
          promo: null,
          condition: null
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 1,
        cible: "Opportunistes Agile en phase de test",
        conceptFondateur: "Problème → Solution : 'J'ai besoin d'un avis expert rapide, pas d'un coaching long' (p.1 'durée insuffisante')",
        
        // Contenu et processus
        contenu: `Déroulé :
Audit express de votre projet via questionnaire préalable
60 min de coaching ciblé :
✓ Percer 1 blocage stratégique
✓ Valider 1 hypothèse marché
✓ Obtenir 1 prochaine action claire`,
        processus: JSON.stringify({
          type: "coaching",
          duree: "60 minutes",
          etapes: [
            "Questionnaire préalable",
            "Coaching live 1h",
            "Débrief et plan d'action"
          ]
        }),
        duree: "60 minutes",
        
        // Livrables et supports
        livrablesDetailles: "Transcription + enregistrement + fiche 'Next Step'",
        supportsInclus: "Transcription de l'entretien",
        
        // Preuves sociales
        temoignages: null,
        argumentsCommerciaux: "Coaching express pour débloquer rapidement",
        
        // Médias
        imageHero: null,
        videoUrl: null,
        gifSolution: null,
        
        // Écosystème et entonnoir
        entonnoirNaturel: null,
        
        // Urgence et conditions
        urgence: null,
        
        // Nouveaux champs
        scriptType: "Si vous étiez sûr de ne pas vous planter, quelle serait votre prochaine action dans les 72h ?",
        format: "Coaching live",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Est-ce vraiment utile en 1h ?",
              reponse: "Oui, l'objectif est d'obtenir un déclic ou une action concrète immédiate."
            },
            {
              question: "Puis-je enregistrer la session ?",
              reponse: "Oui, l'enregistrement et la transcription sont fournis."
            }
          ]
        }),
        conditionsPaiement: "Paiement unique",
        garantie: "Satisfait ou remboursé",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous un blocage spécifique à résoudre ?",
            "Êtes-vous prêt à agir rapidement ?",
            "Préférez-vous des sessions courtes et intenses ?"
          ]
        }),
        testPersonalityMatch: "Agile, Opportuniste, Orienté action",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Le Produit, C'est Vous (Pack Premium)",
        slug: "le-produit-cest-vous-pack-premium",
        sousTitre: "Transformer un parcours professionnel en catalogue de prestations vendables",
        prix: JSON.stringify({
          original: "4 900€",
          promo: null,
          condition: null
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 1,
        cible: "Bâtisseurs Visionnaires (expertise sectorielle forte)",
        conceptFondateur: "Problème → Solution : 'Mon savoir-faire ne se transforme pas en revenus récurrents' (p.6 niveau 3 fondamental)",
        
        // Contenu et processus
        contenu: `Parcours de transformation "Savoir → Produit"

Mois 1 : Fondations
- Structurer l'offre phare : 3 sessions
- Définir le pricing premium

Mois 2 : Écosystème
- Site web vitrine + automatisation
- Tournage témoignages clients

Mois 3 : Lancement
- Sequence email "Early Birds"
- Packaging 3 produits dérivés`,
        processus: JSON.stringify({
          type: "programme",
          duree: "3 mois",
          etapes: [
            "Mois 1 : Fondations",
            "Mois 2 : Écosystème",
            "Mois 3 : Lancement"
          ]
        }),
        duree: "3 mois",
        
        // Livrables et supports
        livrablesDetailles: "Catalogue des fiches produits + Indications pour mettre en place son tunnel de vente automatisé (type Systeme.io) + Bibliothèque de scripts 'Objection Busters'",
        supportsInclus: "Atelier 'Cartographie d'Expertise' + Programme 'Catalogue Clé-en-Main' + 'Usine à Produits Premium'",
        
        // Preuves sociales
        temoignages: "Ex-consultant RH devenu auteur, conférencier et coach' : CA passé de 3k à 10k€/mois en 4 mois",
        argumentsCommerciaux: "Transformer son expertise en revenus récurrents",
        
        // Médias
        imageHero: null,
        videoUrl: null,
        gifSolution: null,
        
        // Écosystème et entonnoir
        entonnoirNaturel: null,
        
        // Urgence et conditions
        urgence: null,
        
        // Nouveaux champs
        scriptType: "Transformer son savoir-faire en produits vendables",
        format: "Programme Premium",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Combien de temps pour voir des résultats ?",
              reponse: "CA passé de 3k à 10k€/mois en 4 mois pour un ex-consultant RH."
            },
            {
              question: "Quels sont les livrables inclus ?",
              reponse: "Catalogue des fiches produits, tunnel de vente automatisé, scripts 'Objection Busters'."
            }
          ]
        }),
        conditionsPaiement: "Paiement unique",
        garantie: "Satisfait ou remboursé",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous une expertise sectorielle forte ?",
            "Voulez-vous créer des revenus récurrents ?",
            "Êtes-vous prêt à investir dans votre transformation ?"
          ]
        }),
        testPersonalityMatch: "Bâtisseur, Visionnaire, Expert, Ambitieux",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "1,2,3, soleil !",
        slug: "1-2-3-soleil",
        sousTitre: "Validation express de projet avec scénarios financiers.",
        prix: JSON.stringify({
          original: "495€",
          promo: "295€",
          condition: "sur rendez-vous"
        }),
        prixOriginal: "495€",
        
        // Ciblage et positionnement
        niveauPriorite: 2,
        cible: "Stratèges Réticents en phase de validation",
        conceptFondateur: "Problème → Solution : 'Je ne sais pas si mon idée tient financièrement' (p.5 'manque d'information')",
        
        // Contenu et processus
        contenu: `Déroulé :
Pré-travail : Questionnaire commercial et financier (20 min)
Session Live (2h) :
✓ Estimation du panier moyen et des croissances possibles de clients, des coûts et de la marge
✓ Scénario optimiste/pessimiste
✓ Calcul seuil rentabilité
✓ Identification des 2 risques mortels`,
        processus: JSON.stringify({
          type: "validation",
          duree: "2h live",
          etapes: [
            "Questionnaire préalable (20 min)",
            "Session Live (2h)",
            "Analyse et recommandations"
          ]
        }),
        duree: "2h live",
        
        // Livrables et supports
        livrablesDetailles: "Fiche 'Go/No-Go' avec indicateurs clés + Modèle Excel modifiable + Enregistrement personnalisé",
        supportsInclus: "2h live • 2 scénarios sur tableur • Fiche décision",
        
        // Preuves sociales
        temoignages: null,
        argumentsCommerciaux: "Validation express de projet avec scénarios financiers",
        
        // Médias
        imageHero: null,
        videoUrl: null,
        gifSolution: null,
        
        // Écosystème et entonnoir
        entonnoirNaturel: null,
        
        // Urgence et conditions
        urgence: "Offre limitée : 10 sessions/mois max",
        
        // Nouveaux champs
        scriptType: "Validation express de projet avec scénarios financiers",
        format: "Session Live",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Combien de temps dure la session ?",
              reponse: "2h live + 20 min de pré-travail."
            },
            {
              question: "Quels sont les livrables inclus ?",
              reponse: "Fiche 'Go/No-Go', modèle Excel modifiable, enregistrement personnalisé."
            }
          ]
        }),
        conditionsPaiement: "Paiement unique",
        garantie: "Satisfait ou remboursé",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous une idée de projet à valider ?",
            "Êtes-vous prêt à analyser la viabilité financière ?",
            "Préférez-vous une validation rapide ?"
          ]
        }),
        testPersonalityMatch: "Stratège, Analytique, Prudent",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      },
      {
        nom: "Premiers clients, la preuve par 3+3+3",
        slug: "premiers-clients-preuve-3-3-3",
        sousTitre: "Programme 3 semaines : 3 offres structurées, 3 canaux testés, 3 clients.",
        prix: JSON.stringify({
          original: "895€",
          promo: null,
          condition: null
        }),
        prixOriginal: null,
        
        // Ciblage et positionnement
        niveauPriorite: 2,
        cible: "Tous profils - phase de commercialisation",
        conceptFondateur: "Problème → Solution : 'J'ai structuré mon offre mais aucun client' (p.6 'comment avoir des clients ?')",
        
        // Contenu et processus
        contenu: `Calendrier :
Semaine 1 - Défi : Packager 3 offres - Outils : Template "Argumentaire Choc"
Semaine 2 - Défi : Tester 3 canaux - Outils : Scripts phoning/messaging sectoriels
Semaine 3 - Défi : Signer 3 clients - Outils : Checklist closing`,
        processus: JSON.stringify({
          type: "programme",
          duree: "3 semaines",
          etapes: [
            "Semaine 1 : Packager 3 offres",
            "Semaine 2 : Tester 3 canaux",
            "Semaine 3 : Signer 3 clients"
          ]
        }),
        duree: "3 semaines",
        
        // Livrables et supports
        livrablesDetailles: "Templates & scripts",
        supportsInclus: "Fiches processus • Scripts • Plan d'action",
        
        // Preuves sociales
        temoignages: null,
        argumentsCommerciaux: "Programme 3 semaines pour obtenir ses premiers clients",
        
        // Médias
        imageHero: null,
        videoUrl: null,
        gifSolution: null,
        
        // Écosystème et entonnoir
        entonnoirNaturel: null,
        
        // Urgence et conditions
        urgence: null,
        
        // Nouveaux champs
        scriptType: "3 offres structurées, 3 canaux testés, 3 clients",
        format: "Programme 3 semaines",
        QuestionReponse: JSON.stringify({
          faq: [
            {
              question: "Combien de temps dure le programme ?",
              reponse: "3 semaines avec un défi par semaine."
            },
            {
              question: "Quels sont les livrables inclus ?",
              reponse: "Templates & scripts pour chaque étape."
            }
          ]
        }),
        conditionsPaiement: "Paiement unique",
        garantie: "Remboursé si 0 client après application stricte des méthodes",
        
        // Test et personnalisation
        testQuestions: JSON.stringify({
          questions: [
            "Avez-vous déjà structuré votre offre ?",
            "Êtes-vous prêt à prospecter activement ?",
            "Voulez-vous des résultats rapides ?"
          ]
        }),
        testPersonalityMatch: "Commercial, Orienté résultats, Persévérant",
        testResultsAggregated: JSON.stringify({
          totalTests: 0,
          averageScore: 0,
          personalityDistribution: {}
        }),
        
        // Métadonnées
        statut: "actif"
      }
    ]
  })

  console.log('🌱 Début du seeding...')
  console.log('✅ Base de données seedée avec succès !')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 