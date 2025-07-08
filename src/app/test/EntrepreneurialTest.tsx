"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, User, Target, Lightbulb, Zap, BarChart3, TrendingUp, Award, Rocket, Trophy } from 'lucide-react';

const EntrepreneurialTest = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [personalityType, setPersonalityType] = useState<string>('');
  const [showPause, setShowPause] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(5);
  const [pauseIndex, setPauseIndex] = useState(0);

  // Questions basées sur votre QCM
  const questions = [
  "Je préfère travailler seul qu'en équipe.",
  "Je suis souvent distrait par ce qui se passe autour de moi.",
  "Je prends mes décisions en fonction de mes valeurs personnelles.",
  "Je planifie mes actions à l'avance et je respecte les délais.",
  "Je suis curieux de tout et j'aime apprendre de nouvelles choses.",
  "Je suis plus à l'aise avec les faits concrets qu'avec les idées abstraites.",
  "Je me fie davantage à la logique qu'à mon intuition.",
  "Je m'adapte facilement aux changements et aux imprévus.",
  "Je suis sociable et j'aime rencontrer de nouvelles personnes.",
  "Je suis attentif aux sentiments et aux besoins des autres.",
  "Je suis créatif et j'aime innover.",
  "Je suis organisé et j'aime avoir le contrôle.",
  "Je suis énergique et j'aime relever des défis.",
  "Je suis plus intéressé par le pourquoi que par le comment.",
  "Je suis pragmatique et j'aime résoudre des problèmes.",
  "Je suis flexible et j'aime explorer les différentes options.",
  "Je préfère me concentrer sur un sujet à la fois.",
  "Je suis sensible à la critique et au conflit.",
  "Je prends mes décisions en fonction de mon analyse objective.",
  "Je respecte les règles et les procédures.",
  "Je suis ouvert d'esprit et j'aime essayer de nouvelles choses.",
  "Je suis plus à l'aise avec les théories qu'avec les données.",
  "Je me fie davantage à mon instinct qu'à la raison.",
  "Je suis spontané et j'aime improviser.",
  "Je préfère travailler en équipe qu'en solo.",
  "Je suis souvent absorbé par mes pensées.",
  "Je prends mes décisions en fonction de mes émotions.",
  "Je reporte souvent les choses au lendemain.",
  "Je suis avide de connaissances et de savoir.",
  "Je suis plus à l'aise avec les réalités qu'avec les possibilités.",
  "Je suis rationnel et j'aime argumenter.",
  "Je suis structuré et j'aime planifier.",
  "Je suis extraverti et j'aime partager mes idées.",
  "Je suis plus intéressé par le comment que par le pourquoi.",
  "Je suis empathique et j'aime aider les autres.",
  "Je suis indépendant et j'aime prendre des initiatives.",
  "Je préfère me focaliser sur l'essentiel.",
  "Je suis résistant au stress et à la pression.",
  "Je prends mes décisions en fonction de mes critères personnels.",
  "Je suis rigoureux et j'aime respecter les normes.",
  "Je suis curieux et j'aime découvrir de nouvelles choses.",
  "Je suis plus à l'aise avec les concepts qu'avec les faits.",
  "Je me fie davantage à mon imagination qu'à ma mémoire.",
  "Je suis souple et j'aime m'adapter aux situations.",
  "Je préfère travailler sur plusieurs projets à la fois.",
  "Je suis affectueux et j'aime exprimer mes sentiments.",
  "Je suis original et j'aime inventer.",
  "Je suis ordonné et j'aime anticiper.",
  "Je suis dynamique et j'aime entreprendre.",
  "Je suis plus intéressé par le sens que par le détail.",
  "Je suis pratique et j'aime réaliser.",
  "Je suis ouvert et j'aime considérer les différentes perspectives.",
  "Je préfère approfondir un sujet plutôt que d'en survoler plusieurs.",
  "Je suis diplomate et j'aime harmoniser les relations.",
  "Je prends mes décisions en fonction de mon évaluation logique.",
  "Je suis méthodique et j'aime suivre les étapes.",
  "Je suis introverti et j'aime garder mes idées pour moi.",
  "Je suis plus intéressé par le détail que par le sens.",
  "Je suis assertif et j'aime convaincre.",
  "Je suis déterminé et j'aime persévérer."
  ];

interface AnswersMap {
    [key: number]: 'vrai' | 'faux';
}
  type MBTILetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

  const letterMapping: Record<MBTILetter, number[]> = {
    E: [9, 13, 25, 33, 45, 49],
    I: [1, 17, 26, 37, 53, 57],
    S: [6, 14, 22, 30, 34, 50],
    N: [5, 11, 21, 29, 41, 47],
    T: [7, 15, 19, 31, 39, 55],
    F: [3, 10, 18, 27, 35, 54],
    J: [4, 12, 20, 28, 40, 56],
    P: [8, 16, 24, 32, 36, 44]
  };
 
const funFacts = [
  "It's about the person that pushes the product, not the product.",
  "Fun Fact: 90% of startups fail, but learning from failure is a key to success!",
  "The best way to predict the future is to create it.",
  "Entrepreneurs are lifelong learners. Keep growing!",
  "Every big business started as someone's small idea."
];

const handleAnswer = (value: 'vrai' | 'faux') => {
    const newAnswers: AnswersMap = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    const nextQuestion = currentQuestion + 1;
    // Show pause/fact after every 10 questions, but not after the last question
    if (nextQuestion < questions.length && nextQuestion % 10 === 0) {
      setShowPause(true);
      setPauseTimer(5);
      setPauseIndex(Math.floor(nextQuestion / 10) - 1);
    } else if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      calculateResults(newAnswers);
    }
  };

  useEffect(() => {
    if (showPause && pauseTimer > 0) {
      const timer = setTimeout(() => setPauseTimer(pauseTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showPause, pauseTimer]);

  const calculateResults = (finalAnswers: AnswersMap) => {
    const scores: Record<MBTILetter, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    };

    for (const [letter, questions] of Object.entries(letterMapping) as [MBTILetter, number[]][]) {
      for (const q of questions) {
        if (finalAnswers[q] === 'vrai') scores[letter]++;
      }
    }

    const resultType = (
      scores.E >= scores.I ? 'E' : 'I'
    ) + (
      scores.S >= scores.N ? 'S' : 'N'
    ) + (
      scores.T >= scores.F ? 'T' : 'F'
    ) + (
      scores.J >= scores.P ? 'J' : 'P'
    );

    setShowResults(true);
    setPersonalityType(resultType);
  };
const handleSubmit = async () => {
  const userId = 123; // tu peux générer un ID unique ou lier à l'utilisateur connecté
  const response = await fetch('/api/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      answers,
      personality: personalityType,
    }),
  });

  const data = await response.json();
  console.log(data);
};


  const getPersonalityType = () => {
    const personalityDescriptions: Record<string, PersonalityType> = {
      ISTJ: { 
    type: 'ISTJ', 
    description: 'Manques de compétences, temps, trésorerie, différenciation', 
    strengths: [
      'Méthodique et organisé - vous excellez dans la planification et l\'exécution',
      'Fiable et responsable - vos clients peuvent compter sur vous',
      'Pragmatique - vous préférez les solutions concrètes et testées',
      'Analytique - vous prenez des décisions basées sur les faits',
      'Persévérant - vous terminez ce que vous commencez',
      'Détail-orienté - vous ne laissez rien au hasard'
    ], 
    recommendations: [
      '**1 heure de ping-pong** - Coaching express pour identifier vos blocages et obtenir un plan d\'action concret (gain de temps et clarté)',
      '**Kit IA gratuit** - Automatisez vos tâches répétitives pour gagner du temps sans investissement',
      '**Audit 720°** - Analyse complète pour identifier vos forces et faiblesses (vision claire de vos atouts)',
      '**Le Produit, C\'est Vous** - Structuration méthodique de votre expertise en business model stable'
    ]
  },
  ISFP: { 
    type: 'ISFP', 
    description: 'Manques de confiance, soutien, réseau, sécurité, motivation', 
    strengths: [
      'Créatif et artistique - vous avez un sens esthétique unique',
      'Sensible aux besoins des autres - vous comprenez intuitivement vos clients',
      'Flexible et adaptable - vous vous ajustez facilement aux changements',
      'Pratique et concret - vous préférez l\'action à la théorie',
      'Loyal et dévoué - vous vous engagez profondément dans vos projets',
      'Observateur - vous remarquez les détails que d\'autres manquent'
    ], 
    recommendations: [
      '**Le Produit, C\'est Vous** - Transformez votre créativité en services vendables avec votre sens esthétique unique',
      '**Devenir Mentor en Afrique** - Développez votre réseau et partagez votre expertise créative',
      '**1 heure de ping-pong** - Clarifiez votre vision et identifiez vos blocages créatifs',
      '**Audit 720°** - Découvrez comment monétiser vos talents artistiques et créatifs'
    ]
  },
  ESFP: { 
    type: 'ESFP', 
    description: 'Manques de confiance, soutien, réseau, sécurité, visibilité', 
    strengths: [
      'Sociable et charismatique - vous créez facilement des connexions',
      'Optimiste et énergique - vous motivez naturellement les autres',
      'Pragmatique et adaptable - vous trouvez des solutions créatives',
      'Sensible aux autres - vous comprenez les besoins de vos clients',
      'Spontané et flexible - vous vous adaptez rapidement aux situations',
      'Créatif et artistique - vous apportez une touche unique à vos projets'
    ], 
    recommendations: [
      '**Devenir Mentor en Afrique** - Exploitez votre charisme naturel pour développer votre réseau et votre visibilité',
      '**1 heure de ping-pong** - Clarifiez votre vision et identifiez vos blocages avec votre énergie positive',
      '**Audit 720°** - Découvrez comment maximiser votre impact social et créatif',
      '**Kit IA gratuit** - Automatisez vos tâches pour vous concentrer sur vos relations clients'
    ]
  },
  INFJ: { 
    type: 'INFJ', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, compétences', 
    strengths: [
      'Visionnaire et intuitif - vous voyez les possibilités cachées',
      'Empathique et compréhensif - vous connectez profondément avec les autres',
      'Idealiste et inspirant - vous motivez les autres par votre vision',
      'Analytique et perspicace - vous comprenez les dynamiques complexes',
      'Créatif et innovant - vous trouvez des solutions uniques',
      'Déterminé et persévérant - vous poursuivez vos idéaux avec passion'
    ], 
    recommendations: [
      '**Devenir Mentor en Afrique** - Partagez votre vision et inspirez les autres avec votre empathie naturelle',
      '**Le Produit, C\'est Vous** - Transformez votre vision en business model qui impacte positivement',
      '**1 heure de ping-pong** - Clarifiez votre mission et identifiez vos blocages avec votre intuition',
      '**Audit 720°** - Découvrez comment aligner votre business avec vos valeurs profondes'
    ]
  },
  INFP: { 
    type: 'INFP', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, confiance', 
    strengths: [
      'Créatif et imaginatif - vous avez une vision artistique unique',
      'Idealiste et authentique - vous restez fidèle à vos valeurs',
      'Empathique et compréhensif - vous connectez profondément avec les autres',
      'Flexible et adaptable - vous vous ajustez aux changements avec grâce',
      'Passionné et dévoué - vous vous engagez pleinement dans ce qui vous inspire',
      'Intuitif et perspicace - vous comprenez les motivations profondes'
    ], 
    recommendations: [
      '**Le Produit, C\'est Vous** - Transformez votre créativité et vos valeurs en business authentique',
      '**Devenir Mentor en Afrique** - Partagez votre passion et inspirez les autres avec votre authenticité',
      '**1 heure de ping-pong** - Clarifiez votre mission et renforcez votre confiance en vous',
      '**Audit 720°** - Découvrez comment aligner votre business avec vos valeurs profondes'
    ]
  },
  ENFP: { 
    type: 'ENFP', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, notoriété', 
    strengths: [
      'Enthousiaste et inspirant - vous motivez naturellement les autres',
      'Créatif et innovant - vous voyez des possibilités partout',
      'Sociable et charismatique - vous créez facilement des connexions',
      'Adaptable et flexible - vous vous ajustez rapidement aux changements',
      'Passionné et authentique - vous inspirez par votre enthousiasme',
      'Intuitif et perspicace - vous comprenez les motivations des autres'
    ], 
    recommendations: [
      '**Devenir Mentor en Afrique** - Exploitez votre charisme naturel pour développer votre notoriété et votre réseau',
      '**Le Produit, C\'est Vous** - Transformez votre créativité et votre enthousiasme en business innovant',
      '**1 heure de ping-pong** - Clarifiez votre vision et canalisez votre énergie créative',
      '**Audit 720°** - Découvrez comment maximiser votre impact et votre visibilité'
    ]
  },
  ENFJ: { 
    type: 'ENFJ', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, visibilité', 
    strengths: [
      'Leadership naturel et inspirant - vous motivez les autres à exceller',
      'Empathique et compréhensif - vous connectez profondément avec les autres',
      'Organisé et responsable - vous créez des structures qui fonctionnent',
      'Charismatique et persuasif - vous influencez positivement les autres',
      'Altruiste et dévoué - vous vous engagez pour le bien-être des autres',
      'Visionnaire et stratégique - vous voyez le potentiel chez les autres'
    ], 
    recommendations: [
      '**Devenir Mentor en Afrique** - Exploitez votre leadership naturel pour développer votre visibilité et votre réseau',
      '**Le Produit, C\'est Vous** - Transformez votre capacité à inspirer en business model impactant',
      '**1 heure de ping-pong** - Clarifiez votre mission et identifiez vos blocages de leadership',
      '**Audit 720°** - Découvrez comment maximiser votre impact et votre influence'
    ]
  },
  ESTJ: { 
    type: 'ESTJ', 
    description: 'Manques de réglementation, compétences, temps, trésorerie, visibilité', 
    strengths: [
      "Leadership naturel",
      "Efficacité organisationnelle",
      "Pragmatisme et réalisme"
    ], 
    recommendations: [
      "Se former sur les réglementations spécifiques à votre secteur",
      "Déléguer certaines tâches pour gagner du temps",
      "Investir dans la visibilité de votre entreprise"
    ] 
  },
  ESFJ: { 
    type: 'ESFJ', 
    description: 'Manques de soutien, réseau, visibilité, sécurité', 
    strengths: [
      'Sociable et coopératif - vous créez facilement des relations harmonieuses',
      'Responsable et fiable - vous tenez vos engagements',
      'Organisé et pratique - vous créez des structures qui fonctionnent',
      'Empathique et attentionné - vous prenez soin des besoins des autres',
      'Loyal et dévoué - vous vous engagez pleinement dans vos relations',
      'Traditionnel et stable - vous apportez de la sécurité aux autres'
    ], 
    recommendations: [
      '**Devenir Mentor en Afrique** - Développez votre réseau et partagez votre expertise avec votre approche coopérative',
      '**Audit 720°** - Analysez votre situation pour créer un business model stable et sécurisé',
      '**1 heure de ping-pong** - Clarifiez votre vision et identifiez vos besoins de soutien',
      '**Le Produit, C\'est Vous** - Structurez votre expertise en services fiables et durables'
    ]
  },
  ISFJ: { 
    type: 'ISFJ', 
    description: 'Manques de soutien, réseau, visibilité, sécurité, confiance', 
    strengths: [
      'Fiable et dévoué - vous tenez vos engagements avec loyauté',
      'Pratique et organisé - vous créez des systèmes qui fonctionnent',
      'Empathique et attentionné - vous comprenez les besoins des autres',
      'Patient et persévérant - vous travaillez dur pour atteindre vos objectifs',
      'Observateur et détail-orienté - vous ne manquez rien d\'important',
      'Stable et traditionnel - vous apportez de la sécurité et de la cohérence'
    ], 
    recommendations: [
      '**Audit 720°** - Analysez votre situation pour renforcer votre confiance et créer un business stable',
      '**1 heure de ping-pong** - Clarifiez votre vision et identifiez vos blocages de confiance',
      '**Le Produit, C\'est Vous** - Structurez votre expertise en services fiables et durables',
      '**Devenir Mentor en Afrique** - Développez votre réseau progressivement avec votre approche patiente'
    ]
  },
  ISTP: { 
    type: 'ISTP', 
    description: 'Manques de temps, financement, compétences, visibilité', 
    strengths: [
      'Pragmatique et logique - vous trouvez des solutions pratiques',
      'Flexible et adaptable - vous vous ajustez rapidement aux changements',
      'Observateur et analytique - vous analysez les situations avec précision',
      'Indépendant et autonome - vous travaillez efficacement seul',
      'Calme et rationnel - vous gardez votre sang-froid sous pression',
      'Technique et compétent - vous maîtrisez rapidement les outils'
    ], 
    recommendations: [
      '**Kit IA gratuit** - Automatisez vos tâches pour gagner du temps et vous concentrer sur vos compétences techniques',
      '**1 heure de ping-pong** - Identifiez rapidement vos blocages et obtenez un plan d\'action concret',
      '**Audit 720°** - Analysez votre situation pour optimiser votre efficacité et votre visibilité',
      '**Le Produit, C\'est Vous** - Structurez vos compétences techniques en services vendables'
    ]
  },
  ESTP: { 
    type: 'ESTP', 
    description: 'Manques de temps, financement, compétences, visibilité', 
    strengths: [
      'Energique et dynamique - vous agissez rapidement et efficacement',
      'Pragmatique et réaliste - vous trouvez des solutions concrètes',
      'Sociable et charismatique - vous créez facilement des connexions',
      'Flexible et adaptable - vous vous ajustez rapidement aux situations',
      'Observateur et perspicace - vous lisez rapidement les situations',
      'Spontané et audacieux - vous prenez des risques calculés'
    ], 
    recommendations: [
      '**1 heure de ping-pong** - Identifiez rapidement vos blocages et obtenez un plan d\'action immédiat',
      '**Kit IA gratuit** - Automatisez vos tâches pour maximiser votre efficacité et votre dynamisme',
      '**Audit 720°** - Analysez votre situation pour optimiser votre visibilité et votre impact',
      '**Le Produit, C\'est Vous** - Structurez votre dynamisme en business model performant'
    ]
  },
  INTJ: { 
    type: 'INTJ', 
    description: "Manques d'innovation, d'adaptation, de notoriété, différenciation, trésorerie", 
    strengths: [
      'Stratégique et visionnaire - vous planifiez à long terme avec précision',
      'Analytique et logique - vous analysez les situations avec rigueur',
      'Indépendant et autonome - vous travaillez efficacement seul',
      'Innovateur et créatif - vous trouvez des solutions uniques',
      'Déterminé et persévérant - vous poursuivez vos objectifs avec ténacité',
      'Intellectuel et curieux - vous cherchez constamment à apprendre'
    ], 
    recommendations: [
      '**Audit 720°** - Analysez votre situation stratégique pour identifier vos opportunités d\'innovation',
      '**Le Produit, C\'est Vous** - Structurez votre expertise intellectuelle en business model innovant',
      '**1 heure de ping-pong** - Clarifiez votre vision stratégique et identifiez vos blocages d\'adaptation',
      '**Devenir Mentor en Afrique** - Développez votre notoriété en partageant votre expertise stratégique'
    ]
  },
  INTP: { 
    type: 'INTP', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, compétences", 
    strengths: [
      'Analytique et logique - vous analysez les problèmes avec précision',
      'Innovateur et créatif - vous trouvez des solutions uniques',
      'Intellectuel et curieux - vous cherchez constamment à comprendre',
      'Indépendant et autonome - vous travaillez efficacement seul',
      'Flexible et adaptable - vous vous ajustez aux nouvelles idées',
      'Objectif et impartial - vous évaluez les situations sans préjugés'
    ], 
    recommendations: [
      '**Audit 720°** - Analysez votre situation pour identifier vos opportunités d\'innovation et de différenciation',
      '**Le Produit, C\'est Vous** - Structurez votre expertise intellectuelle en business model innovant',
      '**1 heure de ping-pong** - Clarifiez votre vision et identifiez vos blocages d\'adaptation',
      '**Devenir Mentor en Afrique** - Développez votre notoriété en partageant votre expertise analytique'
    ]
  },
  ENTP: { 
    type: 'ENTP', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, financement", 
    strengths: [
      'Innovateur et créatif - vous voyez des possibilités partout',
      'Analytique et logique - vous analysez les situations avec rigueur',
      'Sociable et charismatique - vous créez facilement des connexions',
      'Flexible et adaptable - vous vous ajustez rapidement aux changements',
      'Energique et dynamique - vous inspirez les autres par votre enthousiasme',
      'Stratégique et visionnaire - vous planifiez à long terme'
    ], 
    recommendations: [
      '**Audit 720°** - Analysez votre situation pour identifier vos opportunités d\'innovation et de différenciation',
      '**Le Produit, C\'est Vous** - Structurez votre créativité en business model innovant',
      '**Devenir Mentor en Afrique** - Développez votre notoriété en partageant votre expertise innovante',
      '**1 heure de ping-pong** - Clarifiez votre vision et canalisez votre énergie créative'
    ]
  },
  ENTJ: { 
    type: 'ENTJ', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, trésorerie", 
    strengths: [
      'Leadership naturel et charismatique - vous inspirez et motivez les autres',
      'Stratégique et visionnaire - vous planifiez à long terme avec précision',
      'Analytique et logique - vous prenez des décisions basées sur les faits',
      'Déterminé et persévérant - vous poursuivez vos objectifs avec ténacité',
      'Organisé et efficace - vous créez des systèmes qui fonctionnent',
      'Confiant et direct - vous communiquez clairement vos attentes'
    ], 
    recommendations: [
      '**Audit 720°** - Analysez votre situation stratégique pour identifier vos opportunités d\'innovation',
      '**Le Produit, C\'est Vous** - Structurez votre leadership en business model performant',
      '**Devenir Mentor en Afrique** - Développez votre notoriété en partageant votre expertise de leadership',
      '**1 heure de ping-pong** - Clarifiez votre vision stratégique et identifiez vos blocages d\'adaptation'
    ]
  }
    };
    
    return personalityDescriptions[personalityType] || {
      type: personalityType,
      description: 'Type non reconnu, veuillez réessayer.',
      strengths: [],
      recommendations: []
    };
  };
interface PersonalityType {
    type: string;
    description: string;
    strengths: string[];
    recommendations: string[];
}



  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-800 via-amber-900 to-yellow-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Découvrez Votre Profil Entrepreneurial
              </h1>
              <p className="text-xl text-amber-100 mb-8">
                Un test innovant pour révéler votre potentiel d'entrepreneur et identifier vos forces uniques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Target className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analyse Personnalisée</h3>
                <p className="text-amber-100">Découvrez vos traits entrepreneuriaux dominants</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <BarChart3 className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Résultats Détaillés</h3>
                <p className="text-amber-100">Obtenez un profil complet avec recommandations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Award className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Plan d'Action</h3>
                <p className="text-blue-100">Recevez des conseils pour développer vos compétences</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold mb-4">Comment ça fonctionne ?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 via-amber-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  <span>60 questions ciblées</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 via-amber-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  <span>Analyse automatique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 via-amber-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  <span>Profil personnalisé</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('test')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Commencer le Test <ChevronRight className="inline ml-2" />
            </button>
            
            <p className="text-sm text-blue-200 mt-4">
              ⏱️ Durée estimée : 5-7 minutes • 100% gratuit et anonyme
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (showResults) {
    const personality = getPersonalityType();
    return (
      <div className="min-h-screen bg-[#f5f5dc] text-gray-800"> {/* Changement de couleur en beige */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">Votre Profil Entrepreneurial</h1>
              <div className="bg-white rounded-xl p-8 border border-amber-200 shadow-md">
                <h2 className="text-3xl font-bold text-amber-600 mb-4">{personality.type}</h2>
                <p className="text-xl text-gray-700">{personality.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <TrendingUp className="w-6 h-6 mr-2 text-amber-600" />
                  Vos Forces Principales
                </h3>
                <ul className="space-y-2">
                  {personality.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-amber-600 mr-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-amber-200 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
                  <Lightbulb className="w-6 h-6 mr-2 text-amber-600" />
                  Recommandations
                </h3>
                <ul className="space-y-2">
                  {personality.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <Zap className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-amber-600 text-white px-6 py-3 rounded font-bold mb-4 hover:bg-amber-700 transition-colors"
              >
                Enregistrer mes réponses
              </button>

              <button
                onClick={() => {
                  setCurrentStep('intro');
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Refaire le Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPause) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-800 via-amber-900 to-yellow-900 text-white">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Pause</h2>
          <p className="mb-6 text-lg">{funFacts[pauseIndex % funFacts.length]}</p>
          <div className="mb-6">
            <div className="text-amber-200 text-xl mb-2">Take a breath, next part coming up…</div>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${((5-pauseTimer)/5)*100}%` }}></div>
            </div>
            <div className="text-sm">{pauseTimer > 0 ? `${pauseTimer} seconds` : 'Ready!'}</div>
          </div>
          <button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50"
            onClick={() => { setShowPause(false); setCurrentQuestion(currentQuestion + 1); }}
            disabled={pauseTimer > 0}
          >
            Start Next Section
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-800 via-amber-900 to-yellow-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} sur {questions.length}</span>
              <span className="text-sm font-medium">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
            <div className="flex items-center mb-6">
              <User className="w-8 h-8 text-yellow-400 mr-3" />
              <span className="text-lg font-medium">Évaluez cette affirmation :</span>
            </div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              "{questions[currentQuestion]}"
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer('vrai')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                ✓ Vrai / Je suis d'accord
              </button>
              <button
                onClick={() => handleAnswer('faux')}
                className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-xl font-semibold text-lg hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                ✗ Faux / Je ne suis pas d'accord
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white/20 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
            >
              ← Précédent
            </button>
            
            <div className="text-sm text-blue-200">
              Répondez instinctivement à chaque question
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurialTest;