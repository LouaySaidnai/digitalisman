"use client";

import React, { useEffect, useState } from "react";
import { 
  FaSun, 
  FaBoxOpen, 
  FaUserAlt, 
  FaTableTennis, 
  FaRocket, 
  FaChartLine, 
  FaGlobe, 
  FaUsers,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaRobot,
  FaBrain,
  FaLightbulb,
  FaBullseye,
  FaCrown,
  FaGraduationCap,
  FaHandshake,
  FaCompass,
  FaChartBar,
  FaCogs,
  FaSeedling
} from "react-icons/fa";
import Link from "next/link";
import "../../app/globals.css";

// Fonction pour choisir une icône selon le nom du produit
function getIcon(name: string) {
  const lower = name.toLowerCase();
  
  // AI/Technology products
  if (lower.includes("ai") || lower.includes("tchiquet")) return <FaRobot className="text-white text-6xl" />;
  
  // Coaching/Personal development
  if (lower.includes("ping-pong") || lower.includes("coaching")) return <FaTableTennis className="text-white text-6xl" />;
  if (lower.includes("produit") && lower.includes("vous")) return <FaUserAlt className="text-white text-6xl" />;
  
  // Strategy/Planning
  if (lower.includes("soleil") || lower.includes("validation")) return <FaBullseye className="text-white text-6xl" />;
  if (lower.includes("premiers clients") || lower.includes("3+3+3")) return <FaUsers className="text-white text-6xl" />;
  
  // Premium/Transformation
  if (lower.includes("mue") || lower.includes("bohême")) return <FaCrown className="text-white text-6xl" />;
  
  // Audit/Financial
  if (lower.includes("audit") || lower.includes("895") || lower.includes("720")) return <FaChartBar className="text-white text-6xl" />;
  
  // Business transformation
  if (lower.includes("station-service") || lower.includes("transformation")) return <FaCogs className="text-white text-6xl" />;
  
  // Africa/Startup programs
  if (lower.includes("caméléon") || lower.includes("marchand")) return <FaCompass className="text-white text-6xl" />;
  if (lower.includes("mentor") && lower.includes("afrique")) return <FaGraduationCap className="text-white text-6xl" />;
  if (lower.includes("african") && lower.includes("co-founder")) return <FaHandshake className="text-white text-6xl" />;
  
  // Innovation/Creation
  if (lower.includes("innovation") || lower.includes("création")) return <FaLightbulb className="text-white text-6xl" />;
  
  // Growth/Development
  if (lower.includes("croissance") || lower.includes("développement")) return <FaSeedling className="text-white text-6xl" />;
  
  // Default for strategy/consulting
  return <FaChartLine className="text-white text-6xl" />;
}

// Fonction pour choisir un gradient selon le nom du produit
function getGradient(name: string) {
  const gradients = [
    "from-[#B9986F] to-[#7A5230]",
    "from-[#A8875E] to-[#C8B48E]",
    "from-[#7A5230] to-[#B8A96E]",
    "from-[#8B603A] to-[#D6C4A2]",
    "from-[#6C4622] to-[#B9986F]",
    "from-[#5A3A1C] to-[#A8875E]"
  ];
  
  // Utilise un hash simple pour associer un gradient au nom
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

type Produit = {
  id: number;
  nom: string;
  slug: string;
  description: string;
  livrable: string;
  prix: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/produits');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorMsg("Impossible de récupérer les produits. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7A5230] mx-auto"></div>
          <p className="mt-4 text-[#5C3A00] text-xl">Chargement des produits...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5ecd7] via-[#f3e6c4] to-[#e9dbc0]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
        
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              Catalogue complet
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Découvrez tous nos
              <span className="block bg-gradient-to-r from-[#F5E9D1] to-[#D6C4A2] text-transparent bg-clip-text">
                produits
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-[#F5E9D1]">
              Parcourez l'ensemble de notre offre pour trouver le programme qui vous correspond parfaitement.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <FaCheckCircle className="text-[#F5E9D1] mr-2" />
                <span className="text-[#F5E9D1]">{products.length} produits disponibles</span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-[#F5E9D1] mr-2" />
                <span className="text-[#F5E9D1]">Accompagnement personnalisé</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Products Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {errorMsg ? (
            <div className="text-center text-red-700 text-xl font-semibold py-20">
              {errorMsg}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-[#7A5230] text-xl font-semibold py-20">
              Aucun produit à afficher pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 hover:shadow-3xl border border-gray-100"
                >
                  {/* Header with darker brown gradient */}
                  <div className={`h-20 bg-gradient-to-br from-[#4B2E05] to-[#7A5230] flex items-center justify-end relative overflow-hidden`}> 
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-sm">{p.prix}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#4B2E05] mb-4 group-hover:text-[#7A5230] transition-colors duration-300">
                      {p.nom}
                    </h3>
                    
                    <p className="text-[#5C3A00] mb-6 leading-relaxed text-gray-700">
                      {p.description}
                    </p>
                    
                    {/* Livrable section */}
                    <div className="mb-6">
                      <h4 className="text-[#7A5230] font-semibold mb-2">
                        Ce qui est inclus :
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {p.livrable}
                      </p>
                    </div>
                    
                    {/* CTA Button */}
                    <Link
                      href={`/products/${p.slug}`}
                      className="group/btn w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white font-semibold py-3 px-6 rounded-xl text-center hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                    >
                      En savoir plus
                      <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-[#4B2E05] mb-4">
                Besoin d'aide pour choisir ?
              </h3>
              <p className="text-[#5C3A00] mb-6">
                Nos experts sont là pour vous accompagner dans le choix du programme le plus adapté à vos besoins.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all transform hover:scale-105"
              >
                Contactez-nous
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}