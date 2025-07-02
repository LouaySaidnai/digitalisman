"use client";
import React, { useState } from 'react';
import { ChevronRight, CheckCircle, User, Target, Lightbulb, Zap, BarChart3, TrendingUp, Award, Rocket, Trophy } from 'lucide-react';

const EntrepreneurialTest = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [personalityType, setPersonalityType] = useState<string>('');

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
 
const handleAnswer = (value: 'vrai' | 'faux') => {
    const newAnswers: AnswersMap = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

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

  const getPersonalityType = () => {
    const personalityDescriptions: Record<string, PersonalityType> = {
      ISTJ: { 
    type: 'ISTJ', 
    description: 'Manques de compétences, temps, trésorerie, différenciation', 
    strengths: [], 
    recommendations: [] 
  },
  ISFP: { 
    type: 'ISFP', 
    description: 'Manques de confiance, soutien, réseau, sécurité, motivation', 
    strengths: [], 
    recommendations: [] 
  },
  ESFP: { 
    type: 'ESFP', 
    description: 'Manques de confiance, soutien, réseau, sécurité, visibilité', 
    strengths: [], 
    recommendations: [] 
  },
  INFJ: { 
    type: 'INFJ', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, compétences', 
    strengths: [], 
    recommendations: [] 
  },
  INFP: { 
    type: 'INFP', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, confiance', 
    strengths: [], 
    recommendations: [] 
  },
  ENFP: { 
    type: 'ENFP', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, notoriété', 
    strengths: [], 
    recommendations: [] 
  },
  ENFJ: { 
    type: 'ENFJ', 
    description: 'Manques de motivation, partenaires, valeur ajoutée, financement, visibilité', 
    strengths: [], 
    recommendations: [] 
  },
  ESTJ: { 
    type: 'ESTJ', 
    description: 'Manques de réglementation, compétences, temps, trésorerie, visibilité', 
    strengths: [], 
    recommendations: [] 
  },
  ESFJ: { 
    type: 'ESFJ', 
    description: 'Manques de soutien, réseau, visibilité, sécurité', 
    strengths: [], 
    recommendations: [] 
  },
  ISFJ: { 
    type: 'ISFJ', 
    description: 'Manques de soutien, réseau, visibilité, sécurité, confiance', 
    strengths: [], 
    recommendations: [] 
  },
  ISTP: { 
    type: 'ISTP', 
    description: 'Manques de temps, financement, compétences, visibilité', 
    strengths: [], 
    recommendations: [] 
  },
  ESTP: { 
    type: 'ESTP', 
    description: 'Manques de temps, financement, compétences, visibilité', 
    strengths: [], 
    recommendations: [] 
  },
  INTJ: { 
    type: 'INTJ', 
    description: "Manques d'innovation, d'adaptation, de notoriété, différenciation, trésorerie", 
    strengths: [], 
    recommendations: [] 
  },
  INTP: { 
    type: 'INTP', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, compétences", 
    strengths: [], 
    recommendations: [] 
  },
  ENTP: { 
    type: 'ENTP', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, financement", 
    strengths: [], 
    recommendations: [] 
  },
  ENTJ: { 
    type: 'ENTJ', 
    description: "Manques d'innovation, d'adaptation, notoriété, différenciation, trésorerie", 
    strengths: [], 
    recommendations: [] 
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
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-green-900" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Votre Profil Entrepreneurial</h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">{personality.type}</h2>
                <p className="text-xl text-green-100">{personality.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-yellow-400" />
                  Vos Forces Principales
                </h3>
                <ul className="space-y-2">
                  {personality.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
                  Recommandations
                </h3>
                <ul className="space-y-2">
                  {personality.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Zap className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep('intro');
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-green-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Refaire le Test
              </button>
            </div>
          </div>
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