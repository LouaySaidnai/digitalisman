"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("./src/generated/prisma");
var prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.produit.createMany({
                        data: [
                            {
                                nom: "Le Produit, C'est Vous",
                                slug: "produit-cest-vous",
                                sousTitre: "Transformer un parcours professionnel en catalogue de prestations vendables",
                                description: "Un parcours en 3 étapes pour 'produitiser' l'expertise des entrepreneurs 50+",
                                conceptFondateur: "Problème Central : Les entrepreneurs 50+ peinent à passer de 'vendre mes compétences' à 'commercialiser des produits structurés'. Solution : Un parcours en 3 étapes pour 'produitiser' l'expertise",
                                cible: "Entrepreneurs bloqués à 'Je ne sais pas quoi vendre' (Niveau 3), en ligne, par groupes de 8 pp. max",
                                problemeResolu: "Je suis coincé dans le piège du temps contre argent. Mes clients ne voient pas ma vraie valeur. Je ne sais pas comment standardiser mon expertise",
                                niveauPriorite: 1,
                                contenu: "1. Atelier 'Cartographie d'Expertise' (495 €) - Diagnostic : Bilan de compétences, Identification des 'dégoûts/attirances'. Livrables : Carte mentale des savoir-faire exploitables, Grille de priorisation 'Passion vs. Rentabilité vs. Demande', 3 idées de produits pré-packagés. 2. Programme 'Catalogue Clé-en-Main' (1 990 €) - Design produit : Packaging, Argumentaire client, Supports visuels, Relecture par panel de 5 prospects cibles, Modèles de contrats sectoriels. 3. Offre 'Usine à Produits Premium' (4 900 €) - Positionnement : Stratégie de pricing premium (x3 vs. marché), Narrative 'Votre parcours = garantie de résultats', Écosystème complet, Automation",
                                processus: "Étape 1 : Cartographie d'Expertise (Jour 1-7) - Audit des compétences exploitables, Session 2 : Packaging 3 offres clés (Jour 7-14), Session 3 : Scripts de vente sectoriels (Jour 14-21), Livraison : Page web vitrine + PDF commercial (Jour 21)",
                                duree: "3 mois",
                                prix: "495 € / 1 990 € / 4 900 €",
                                prixOriginal: null,
                                optionsTarification: JSON.stringify({
                                    cartographie: { prix: 495, nom: "Cartographie d'Expertise", duree: "1 jour" },
                                    catalogue: { prix: 1990, nom: "Catalogue Clé-en-Main", duree: "3 semaines" },
                                    usine: { prix: 4900, nom: "Usine à Produits Premium", duree: "3 mois" }
                                }),
                                garantie: "Satisfait ou remboursé 30 jours",
                                conditionsPaiement: "3x sans frais pour les programmes > 1000€",
                                preuves: "Étude interne : 82% des clients augmentent leur CA de +40% en 6 mois",
                                temoignages: "Mon catalogue logistique me génère maintenant €15k/mois récurrents",
                                resultatsAttendus: "Vendez votre expérience 3x plus cher sans travailler plus, grâce à des offres standardisées et récurrentes",
                                differenciation: "Approche : Sur-mesure basé sur votre parcours vs Générique. Livrable : Catalogue opérationnel vs Conseils théoriques. Monétisation : Produits à marge élevée vs Heure facturée. Sectorisation : Intégration métier (logistique, santé, etc.) vs Absente",
                                avantagesCompetitifs: "Packaging de l'expertise pour mentorat/co-fondation, Automatisation de la vente des nouveaux produits",
                                integrationEcosysteme: "Avec l'Afrique : Packaging de l'expertise pour mentorat/co-fondation. Avec le digital : Automatisation de la vente des nouveaux produits",
                                entonnoirNaturel: "Test de profil → '1,2,3 soleil!' → 'Le Produit, C'est Vous'",
                                argumentsCommerciaux: "Vendez votre expérience 3x plus cher sans travailler plus, grâce à des offres standardisées et récurrentes",
                                urgence: "Offre limitée : 10 sessions/mois max",
                                exemplesConcrets: "Ex. pour un ex-directeur logistique : Produit 1 : Audit 'Réduction des coûts stockage', Produit 2 : Formation 'Transition énergétique flotte', Produit 3 : Conseil 'Optimisation douanière Afrique'",
                                casPratiques: "ancien pharmacien → 'Directeur Scientifique Indépendant' : Offre signature : 'Validation réglementaire cosmétiques (30j • €15k)', Produit d'appel : 'Quick Scan Formulation' (€990), Prestige : 'Accès annuel à [Sa Marque] Think Tank' (€7k/an)",
                                livrable: "Carte mentale des savoir-faire exploitables, Grille de priorisation, 3 idées de produits pré-packagés, Fiches produits, Présentation PDF, Page web dédiée, Modèles de contrats sectoriels, Site web vitrine, Page LinkedIn premium, Témoignages vidéo, Système de booking/paiement intégré, Sequences email pour relance prospects",
                                livrablesDetailles: "Carte mentale des savoir-faire exploitables, Grille de priorisation 'Passion vs. Rentabilité vs. Demande', 3 idées de produits pré-packagés, Fiches produits, Présentation PDF, Page web dédiée, Relecture par un panel de 5 prospects cibles, Modèles de contrats sectoriels, Site web vitrine, Page LinkedIn premium, Témoignages vidéo, Système de booking/paiement intégré, Sequences email pour relance prospects",
                                supportsInclus: "Templates de contrats sectoriels, Scripts de vente alignés sur les 'pain points' sectoriels, Système de booking/paiement intégré, Sequences email pour relance prospects",
                                faq: "Q: Je n'ai pas d'expertise spécifique, ça marche quand même ? R: Oui! 92% de nos clients découvrent 3 compétences monétisables lors de l'audit. Q: Puis-je payer en plusieurs fois ? R: Oui : 3x sans frais pour les programmes > 1000€",
                                objectionsAnticipees: "Objection : 'Je n'ai pas assez d'expérience' → Réponse : 'Votre parcours unique est votre plus grande force, pas un handicap'. Objection : 'C'est trop cher' → Réponse : 'Le ROI moyen est de 300% en 6 mois'",
                                statut: "actif"
                            },
                            {
                                nom: "Tchiquetchiquetchique AI AI AI !",
                                slug: "tchiquetchiquetchique-ai",
                                sousTitre: "Kit de survie IA offert pour entrepreneurs 50+",
                                description: "Webinaire découverte + outils pour utiliser l'IA dans son business sans tech",
                                conceptFondateur: "Problème : Les entrepreneurs 50+ ne maîtrisent pas l'IA et ça les paralyse. Solution : Kit de survie avec prompts magiques et outils gratuits",
                                cible: "Tous les entrepreneurs 50+ (surtout Digital Novice)",
                                problemeResolu: "Je ne maîtrise pas l'IA et ça me paralyse",
                                niveauPriorite: 3,
                                contenu: "Webinaire découverte (60 min) : '10 prompts magiques pour : ✓ Rédiger des emails clients, ✓ Analyser la concurrence, ✓ Générer des idées de produits'. Kit survie : Liste des 12 outils IA gratuits, 5 vidéos Loom 'Pas-à-pas', Template : 'Prompt parfait pour votre secteur'",
                                processus: "1. Inscription au webinaire gratuit, 2. Participation au webinaire live (60 min), 3. Accès au kit survie complet, 4. Intégration dans la communauté WhatsApp",
                                duree: "60 min + accès 90j",
                                prix: "Gratuit",
                                prixOriginal: null,
                                optionsTarification: null,
                                garantie: "100% gratuit, sans engagement",
                                conditionsPaiement: "Aucun paiement requis",
                                preuves: "De Jean-Marc, ex-commercial : 'J'ai amélioré de 80% ma prospection en 1 mois !'",
                                temoignages: "De Jean-Marc, ex-commercial : 'J'ai amélioré de 80% ma prospection en 1 mois !'",
                                resultatsAttendus: "Maîtrise des outils IA gratuits, Amélioration de 80% de la prospection, Automatisation des tâches répétitives",
                                differenciation: "Gratuit vs formations payantes, Focus entrepreneurs 50+ vs formations génériques, Outils gratuits vs solutions payantes",
                                avantagesCompetitifs: "100% gratuit, Spécialement conçu pour les 50+, Outils immédiatement utilisables",
                                integrationEcosysteme: "Entrée dans l'entonnoir de vente, Préparation pour les formations payantes",
                                entonnoirNaturel: "Première étape de l'entonnoir",
                                argumentsCommerciaux: "Découvrez gratuitement comment l'IA peut transformer votre business en 60 minutes",
                                urgence: "Webinaires limités à 50 participants",
                                exemplesConcrets: "Jean-Marc, ex-commercial : amélioration de 80% de sa prospection en 1 mois grâce aux prompts IA",
                                casPratiques: "Utilisation des prompts pour : Rédiger des emails clients, Analyser la concurrence, Générer des idées de produits",
                                livrable: "Support webinar, Liste de mes 12 favoris, 10 prompts, 5 Loom, Communauté WhatsApp",
                                livrablesDetailles: "Support webinar (60 min), Liste des 12 outils IA gratuits, 5 vidéos Loom 'Pas-à-pas', Template 'Prompt parfait pour votre secteur', PDF téléchargeable, Accès 90j à la communauté WhatsApp",
                                supportsInclus: "Liste des 12 outils IA gratuits, 5 vidéos Loom 'Pas-à-pas', Template 'Prompt parfait pour votre secteur'",
                                faq: "Q: Dois-je avoir des connaissances techniques ? R: Non, tout est expliqué pas-à-pas. Q: Les outils sont-ils vraiment gratuits ? R: Oui, nous ne recommandons que des outils 100% gratuits",
                                objectionsAnticipees: "Objection : 'L'IA va me remplacer' → Réponse : 'L'IA est un outil pour vous faire gagner du temps, pas vous remplacer'. Objection : 'C'est trop compliqué' → Réponse : 'Nous commençons par les bases les plus simples'",
                                statut: "actif"
                            },
                            {
                                nom: "1 heure de ping-pong, sans les mains !",
                                slug: "1-heure-ping-pong",
                                sousTitre: "Audit express de votre projet via questionnaire préalable",
                                description: "1 heure de coaching ciblé pour percer 1 blocage stratégique",
                                conceptFondateur: "Problème : Besoin d'un avis expert rapide, pas d'un coaching long. Solution : Session express ciblée sur un objectif précis",
                                cible: "Opportunistes Agile en phase de test",
                                problemeResolu: "J'ai besoin d'un avis expert rapide, pas d'un coaching long",
                                niveauPriorite: 1,
                                contenu: "Audit express de votre projet via questionnaire préalable, 60 min de coaching ciblé : ✓ Percer 1 blocage stratégique, ✓ Valider 1 hypothèse marché, ✓ Obtenir 1 prochaine action claire",
                                processus: "1. Questionnaire préalable (15 min), 2. Session de coaching live (60 min), 3. Livraison des supports",
                                duree: "60 min",
                                prix: "149 €",
                                prixOriginal: null,
                                optionsTarification: null,
                                garantie: "Satisfait ou remboursé",
                                conditionsPaiement: "Paiement unique",
                                preuves: "Résultats immédiats sur un blocage spécifique",
                                temoignages: "Clients satisfaits de la rapidité et de l'efficacité",
                                resultatsAttendus: "1 blocage stratégique percé, 1 hypothèse marché validée, 1 prochaine action claire définie",
                                differenciation: "Session unique ciblée vs programmes longs, Focus sur l'action immédiate vs théorie",
                                avantagesCompetitifs: "Rapide, Efficace, Ciblé, Prix accessible",
                                integrationEcosysteme: "Première étape avant programmes plus longs",
                                entonnoirNaturel: "Test de l'accompagnement",
                                argumentsCommerciaux: "Si vous étiez sûr de ne pas vous planter, quelle serait votre prochaine action dans les 72h ?",
                                urgence: "Sessions limitées par semaine",
                                exemplesConcrets: "Validation d'une hypothèse marché en 60 min, Déblocage d'une situation stratégique",
                                casPratiques: "Script Type : 'Si vous étiez sûr de ne pas vous planter, quelle serait votre prochaine action dans les 72h ?'",
                                livrable: "Transcription de l'entretien, Enregistrement, Fiche 'Next Step'",
                                livrablesDetailles: "Transcription + enregistrement + fiche 'Next Step'",
                                supportsInclus: "Questionnaire préalable, Fiche 'Next Step'",
                                faq: "Q: Puis-je poser plusieurs questions ? R: Nous nous concentrons sur un objectif principal pour maximiser l'efficacité. Q: La session est-elle enregistrée ? R: Oui, vous recevez l'enregistrement et la transcription",
                                objectionsAnticipees: "Objection : 'C'est trop court' → Réponse : '60 minutes ciblées valent mieux que 4h de théorie'. Objection : 'Je préfère un programme complet' → Réponse : 'Cette session peut être le point de départ vers un accompagnement plus long'",
                                statut: "actif"
                            },
                            {
                                nom: "1,2,3, soleil !",
                                slug: "123-soleil",
                                sousTitre: "Validation express de projet avec scénarios financiers",
                                description: "Validation express de projet avec scénarios financiers optimiste/pessimiste",
                                conceptFondateur: "Problème : Je ne sais pas si mon idée tient financièrement. Solution : Validation rapide avec scénarios financiers",
                                cible: "Stratèges Réticents en phase de validation",
                                problemeResolu: "Je ne sais pas si mon idée tient financièrement",
                                niveauPriorite: 2,
                                contenu: "Pré-travail : Questionnaire commercial et financier (20 min), Session Live (2h) : ✓ Estimation du panier moyen et des croissances possibles de clients, des coûts et de la marge, ✓ Scénario optimiste/pessimiste, ✓ Calcul seuil rentabilité, ✓ Identification des 2 risques mortels",
                                processus: "1. Questionnaire préalable (20 min), 2. Session live (2h), 3. Livraison des supports",
                                duree: "2h",
                                prix: "295 €",
                                prixOriginal: "495 €",
                                optionsTarification: null,
                                garantie: "Satisfait ou remboursé",
                                conditionsPaiement: "Paiement unique",
                                preuves: "Validation rapide de la viabilité financière",
                                temoignages: "Clients ayant évité des projets non viables",
                                resultatsAttendus: "Fiche 'Go/No-Go' avec indicateurs clés, Modèle Excel modifiable, Enregistrement personnalisé",
                                differenciation: "Validation rapide vs études longues, Focus financier vs conseils généraux",
                                avantagesCompetitifs: "Rapide, Financier, Pragmatique",
                                integrationEcosysteme: "Étape de validation avant investissement",
                                entonnoirNaturel: "Test de profil → 1,2,3 soleil! → Le Produit, C'est Vous",
                                argumentsCommerciaux: "Voulez-vous savoir en 2h si votre projet tient financièrement ?",
                                urgence: "Offre limitée : 10 sessions/mois max",
                                exemplesConcrets: "Validation de projets entrepreneuriaux, Identification de risques financiers",
                                casPratiques: "Calcul de seuil de rentabilité, Identification des 2 risques mortels",
                                livrable: "2h live, 2 scénarios sur tableur, Fiche décision",
                                livrablesDetailles: "Fiche 'Go/No-Go' avec indicateurs clés, Modèle Excel modifiable, Enregistrement personnalisé",
                                supportsInclus: "Questionnaire commercial et financier, Modèle Excel modifiable",
                                faq: "Q: Avez-vous besoin de mes données financières ? R: Non, nous travaillons avec des estimations basées sur votre secteur. Q: Le modèle Excel est-il personnalisé ? R: Oui, il est adapté à votre projet spécifique",
                                objectionsAnticipees: "Objection : 'Je n'ai pas de données financières' → Réponse : 'Nous travaillons avec des estimations sectorielles'. Objection : 'C'est cher pour 2h' → Réponse : 'Cela peut vous éviter des mois de travail sur un projet non viable'",
                                statut: "actif"
                            },
                            {
                                nom: "Premiers clients, la preuve par 3+3+3",
                                slug: "premiers-clients-3-3-3",
                                sousTitre: "Programme 3 semaines : 3 offres structurées, 3 canaux testés, 3 clients",
                                description: "Programme 3 semaines pour obtenir ses premiers clients",
                                conceptFondateur: "Problème : J'ai structuré mon offre mais aucun client. Solution : Programme structuré pour obtenir 3 premiers clients",
                                cible: "Tous profils - phase de commercialisation",
                                problemeResolu: "J'ai structuré mon offre mais aucun client",
                                niveauPriorite: 2,
                                contenu: "Semaine 1 : Packager 3 offres avec Template 'Argumentaire Choc', Semaine 2 : Tester 3 canaux avec Scripts phoning/messaging sectoriels, Semaine 3 : Signer 3 clients avec Checklist closing",
                                processus: "Semaine 1 : Packager 3 offres, Semaine 2 : Tester 3 canaux, Semaine 3 : Signer 3 clients",
                                duree: "3 semaines",
                                prix: "895 €",
                                prixOriginal: null,
                                optionsTarification: null,
                                garantie: "Remboursé si 0 client après application stricte des méthodes",
                                conditionsPaiement: "Paiement unique ou 2x",
                                preuves: "Méthode éprouvée pour obtenir les premiers clients",
                                temoignages: "Clients ayant obtenu leurs 3 premiers clients en 3 semaines",
                                resultatsAttendus: "3 premiers clients signés, Templates & scripts réutilisables",
                                differenciation: "Programme structuré vs conseils généraux, Garantie de résultats vs promesses vagues",
                                avantagesCompetitifs: "Structuré, Garanti, Pragmatique",
                                integrationEcosysteme: "Suite logique après structuration de l'offre",
                                entonnoirNaturel: "Après 'Le Produit, C'est Vous'",
                                argumentsCommerciaux: "Obtenez vos 3 premiers clients en 3 semaines ou remboursé",
                                urgence: "Programme limité à 20 participants par session",
                                exemplesConcrets: "Entrepreneurs ayant obtenu leurs 3 premiers clients en 3 semaines",
                                casPratiques: "Template 'Argumentaire Choc', Scripts phoning/messaging sectoriels, Checklist closing",
                                livrable: "Fiches processus, Scripts, Plan d'action",
                                livrablesDetailles: "Templates & scripts, Template 'Argumentaire Choc', Scripts phoning/messaging sectoriels, Checklist closing",
                                supportsInclus: "Templates & scripts, Template 'Argumentaire Choc', Scripts phoning/messaging sectoriels, Checklist closing",
                                faq: "Q: Que se passe-t-il si je n'obtiens pas 3 clients ? R: Vous êtes remboursé si vous avez appliqué strictement les méthodes. Q: Les templates sont-ils personnalisables ? R: Oui, ils sont adaptés à votre secteur",
                                objectionsAnticipees: "Objection : 'Je n'ai pas de réseau' → Réponse : 'Nous vous donnons les méthodes pour créer votre réseau'. Objection : 'C'est trop rapide' → Réponse : '3 semaines c'est le temps optimal pour créer l'urgence'",
                                statut: "actif"
                            },
                            {
                                nom: "La mue est enfant de Bohême",
                                slug: "la-mue-est-enfant-de-boheme",
                                description: "6 semaines d'accompagnement : Stratégie premium originale. 1 séance initiale de 2h, 4 sessions hebdo de 30 mn, 1 session de restitution finale",
                                livrable: "Étude concurrence · Argumentaire · Checklist export",
                                prix: "1 495 €",
                                statut: "actif"
                            },
                            {
                                nom: "Audit 720°",
                                slug: "audit-720",
                                description: "Audit stratégique en 2 x 2 demi-journées espacées d'une semaine à 10 jours.",
                                livrable: "Quick wins · Roadmap · Recommandations sectorielles",
                                prix: "2 495 €",
                                statut: "actif"
                            },
                            {
                                nom: "Station-service BP",
                                slug: "station-service-bp",
                                description: "Stratégie de projet, Business plan avec tableaux de simulation, pitch-decks clients & investisseur en 10 jours clé-en-mains.",
                                livrable: "Synthèse 2-3 pages · Fichier tableur de simulations · pitch-deck clients · pitch-deck investisseur · Stratégie financement",
                                prix: "3 900 €",
                                statut: "actif"
                            },
                            {
                                nom: "Caméléon Marchand",
                                slug: "cameleon-marchand",
                                description: "Accompagnement 6 mois : Transformation globale.",
                                livrable: "À définir",
                                prix: "7 495 €",
                                statut: "actif"
                            },
                            {
                                nom: "Devenir Mentor en Afrique",
                                slug: "devenir-mentor-afrique",
                                description: "Programme pour accompagner des startups africaines.",
                                livrable: "Série de 4 webinaires de 90 mn",
                                prix: "495 €",
                                statut: "actif"
                            },
                            {
                                nom: "African Start-Up Co-Founder",
                                slug: "african-startup-cofounder",
                                description: "Intégration comme co-fondateur dans une startup africaine.",
                                livrable: "Séances de coaching & webinaires · Matching projet · Pack installation · Contrats types",
                                prix: "2 495 €",
                                statut: "actif"
                            },
                        ],
                    })];
                case 1:
                    _a.sent();
                    console.log("Produits insérés avec succès !");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
