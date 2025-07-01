"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  FaBolt,
  FaPaintBrush,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaPaperPlane,
  FaCrown,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "@/app/globals.css";
import { FaSun, FaBoxes, FaUserCheck } from "react-icons/fa";

const produits = [
  {
    icon: <FaSun className="text-white text-6xl" />,
    title: "1,2,3 Soleil !",
    color: "from-[#B9986F] to-[#7A5230]",
    desc: "Validez votre idée de projet en 2h avec des scénarios concrets et un accompagnement stratégique express.",
    link: "#"
  },
  {
    icon: <FaBoxes className="text-white text-6xl" />,
    title: "Premiers clients, 3+3+3",
    color: "from-[#A8875E] to-[#C8B48E]",
    desc: "Testez 3 offres sur 3 canaux pour décrocher vos premiers clients en moins d’un mois.",
    link: "#"
  },
  {
    icon: <FaUserCheck className="text-white text-6xl" />,
    title: "Le Produit, c’est Vous",
    color: "from-[#7A5230] to-[#B8A96E]",
    desc: "Transformez votre parcours en catalogue de prestations rentables et faciles à vendre.",
    link: "#"
  }
];
export default function Home() {
  useEffect(() => {
    const floatAnimation = document.querySelector(".floating");
    if (floatAnimation) {
      floatAnimation.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-10px)" },
          { transform: "translateY(0)" },
        ],
        {
          duration: 6000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    }
    const starsContainer = document.getElementById("stars");

    if (!starsContainer) return;

    // Clear previous stars if any
    starsContainer.innerHTML = "";

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#b8a96e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
           <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#4B2E05]">
Donnez une nouvelle direction à votre parcours
 <br />
  <span className="gradient-text bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-transparent bg-clip-text">
    vers de nouveaux horizons
  </span>
</h1>
<p className="text-xl mb-8 max-w-lg text-[#5C3A00]">
Clarification stratégique, validation de votre idée, offres sur-mesure : tout ce qu’il faut pour bâtir une activité cohérente, rentable et fidèle à votre identité!
</p>
<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
 <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
  {/* Bouton 1 – plus foncé */}
  <button className="bg-gradient-to-r from-[#5A3A1C] to-[#7A5230] text-[#F5E9D1] px-8 py-4 rounded-xl font-bold hover:from-[#6C4622] hover:to-[#8B603A] transition-all transform hover:scale-105 shadow-lg">
    S'inscrire
  </button>

  {/* Bouton 2 – ton moyen */}
  <button className="bg-gradient-to-r from-[#7A5230] to-[#A8875E] text-[#F3E4C0] px-8 py-4 rounded-xl font-bold hover:from-[#8B603A] hover:to-[#B9986F] transition-all transform hover:scale-105 shadow-lg">
    Connexion
  </button>

  {/* Bouton 3 – plus clair */}
  <button className="bg-gradient-to-r from-[#A8875E] to-[#C8B48E] text-[#3B2F1B] px-8 py-4 rounded-xl font-bold hover:from-[#B9986F] hover:to-[#D6C4A2] transition-all transform hover:scale-105 shadow-lg">
    En savoir plus
  </button>
</div>
</div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md flex justify-center items-center">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl opacity-30" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-30" />
                <img
                  src="/images/houta.png"
                  alt="Laurent Hanout"
                  width={612}
                  height={612}
                  className="relative z-10 w-72 h-72 md:w-96 md:h-96 object-cover rounded-full floating border-4 border-white shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
            </section>
          <section className="py-20 bg-gray-50 relative">
            <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#7A5230]">
            Aperçu des produits phares
          </span>
          <h2 className="text-4xl font-bold text-[#4B2E05] mt-2 leading-tight">
            Lancer votre projet, c’est simple quand on a les bons outils
          </h2>
          <p className="text-[#5C3A00] mt-4 text-lg">
            Découvrez nos programmes conçus spécialement pour les entrepreneurs expérimentés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {produits.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-r ${p.color} flex items-center justify-center`}>
          {p.icon}
              </div>
              <div className="p-8">
          <h3 className="text-2xl font-bold text-[#4B2E05] mb-3">{p.title}</h3>
          <p className="text-[#5C3A00] mb-4">{p.desc}</p>
          <a href={p.link} className="text-[#7A5230] font-semibold inline-flex items-center hover:underline">
            En savoir plus <FaArrowRight className="ml-2" />
          </a>
              </div>
            </div>
          ))}
        </div>
        {/* Voir tous les produits button */}
        <div className="flex justify-end mt-10">
          <a
            href="/produits"
            className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all flex items-center"
          >
            Voir tous les produits <FaArrowRight className="ml-3" />
          </a>
        </div>
            </div>
          </section>
{/* Stats Section */}
<section className="py-20 bg-gradient-to-br from-[#7A5230] to-[#B9986F] text-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div className="p-6">
        <div className="text-5xl font-extrabold mb-2">10K+</div>
        <div className="text-[#D6C4A2] font-semibold">Clients satisfaits</div>
      </div>
      <div className="p-6">
        <div className="text-5xl font-extrabold mb-2">99.9%</div>
        <div className="text-[#D6C4A2] font-semibold">Disponibilité</div>
      </div>
      <div className="p-6">
        <div className="text-5xl font-extrabold mb-2">5M+</div>
        <div className="text-[#D6C4A2] font-semibold">Requêtes quotidiennes</div>
      </div>
      <div className="p-6">
        <div className="text-5xl font-extrabold mb-2">24/7</div>
        <div className="text-[#D6C4A2] font-semibold">Support continu</div>
      </div>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <span className="text-sm font-semibold tracking-wider uppercase text-[#7A5230]">Témoignages</span>
      <h2 className="text-4xl font-bold text-[#4B2E05] mt-2 leading-tight">Ce que nos clients disent de nous</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Testimonial 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#7A5230] transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center mb-5">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="w-14 h-14 rounded-full mr-4" />
          <div>
            <h4 className="font-bold text-[#4B2E05]">Sarah Johnson</h4>
            <p className="text-[#B9986F] font-semibold">Fondatrice, Atelier Équilibre</p>
          </div>
        </div>
        <p className="text-[#5C3A00] italic leading-relaxed">
          « Grâce à la plateforme, j'ai pu valider mon idée et lancer mon projet en moins d'un mois. L'accompagnement est humain et efficace. »
        </p>
        <div className="mt-5 text-yellow-400 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" /></svg>
          ))}
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#A8875E] transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center mb-5">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" className="w-14 h-14 rounded-full mr-4" />
          <div>
            <h4 className="font-bold text-[#4B2E05]">Michel Lefèvre</h4>
            <p className="text-[#B9986F] font-semibold">Ex-dirigeant devenu auto-entrepreneur</p>
          </div>
        </div>
        <p className="text-[#5C3A00] italic leading-relaxed">
          « Après avoir quitté mon poste, j'ai trouvé ici les clés pour relancer ma carrière en indépendant. Je recommande à 100%. »
        </p>
        <div className="mt-5 text-yellow-400 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" /></svg>
          ))}
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#C8B48E] transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center mb-5">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emma Rodriguez" className="w-14 h-14 rounded-full mr-4" />
          <div>
            <h4 className="font-bold text-[#4B2E05]">Emma Rodrigo</h4>
            <p className="text-[#B9986F] font-semibold">Créatrice de Zen & Serein</p>
          </div>
        </div>
        <p className="text-[#5C3A00] italic leading-relaxed">
          « Les formations m'ont donné confiance. J'ai désormais une boutique en ligne fonctionnelle et rentable. »
        </p>
        <div className="mt-5 text-yellow-400 flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" /></svg>
          ))}
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.561-.955L10 1l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
          </svg>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center mt-16">
      <div className="flex justify-end">
        <a
          href="/temoignages"
          className="inline-block bg-[#7A5230] hover:bg-[#5C3A00] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
        >
          Afficher plus de témoignages
        </a>
      </div>
    </div>
  </div>
</section>

{/* CTA / Introduction Chef de Projet Section */}
<section className="py-20 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Rencontrez notre chef de projet</h2>
      <p className="text-xl text-[#F3E8D0] max-w-3xl mx-auto">Un expert du digital et de l'e-commerce à votre service</p>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-start gap-12 max-w-6xl mx-auto">
      {/* Photo - moved more to the left */}
      <div className="md:w-1/3 flex justify-center md:justify-start">
        <img
          src="images/Laurent.jpg.jpeg"
          alt="Laurent Hanout"
          className="w-80 h-80 rounded-full object-cover border-4 border-white shadow-xl transform transition duration-500 hover:scale-105"
        />
      </div>

      {/* Texte */}
      <div className="md:w-2/3 text-left">
        <h3 className="text-2xl font-bold mb-3">
          UNE EXPÉRIENCE INTERNATIONALE RÉELLE DU E-COMMERCE A GRANDE ÉCHELLE <br />
          <span className="text-[#4B2E05]">Laurent Hanout</span>
        </h3>
        <p className="mb-4 text-[#FDEBD0]">
 De formation EM Lyon, homme de marketing et de stratégie, Laurent 
Hanout a mis en place et piloté les sites marchands de grandes 
sociétés spécialisées de la distribution : JPG Groupe Staples, BHV 
Galeries Lafayette, pépinières Delbard, en alternance avec des 
expériences entrepreneuriales. <br /> 
Consultant en stratégie et opérations e-commerce depuis plus de 10 
ans, Laurent Hanout a réalisé de nombreuses missions en Europe 
(notamment avec Javelin Accenture) et accompagné plusieurs PME 
tunisiennes et marocaines dans leur transformation vers le canal de 
vente digital (Groupe Maille Club, Meubles Intérieurs, Lamacom). <br/>
Avec la BERD, il a accompagné un collectif d'artisans.
Également conférencier et enseignant en master2 (Univ. Assas 
Panthéon, IHEC Tunis, ISAMM, Master ISG, ESPRIT School of 
Business), il a co-fondé la SEVAD, chambre syndicale du E-commerce 
au sein de l'UTICA
        </p>
        <p className="mb-8 text-[#FDEBD0]">
          Aujourd'hui, il aide les cadres de plus de 50 ans à rebondir et entreprendre avec succès en quelques semaines!
        </p>

        {/* Icônes de contact - styled like the reference */}
        <div className="flex flex-wrap justify-center md:justify-start gap-8">
          <div className="transform transition duration-500 hover:scale-110 text-center">
            <a href="tel:+33 6 95 17 94 06" className="block">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#C2B280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-white font-medium">Téléphone</span>
            </a>
          </div>

          <div className="transform transition duration-500 hover:scale-110 text-center">
            <a href="mailto:laurent.hanout@neststep.io" className="block">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#C2B280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-medium">Email</span>
            </a>
          </div>

          <div className="transform transition duration-500 hover:scale-110 text-center">
            <a href="https://www.linkedin.com/in/laurentanout/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#C2B280]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span className="text-white font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Footer Section */}
<footer className="bg-gray-900 text-gray-400 py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Column 1 */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
        </ul>
      </div>
      {/* Column 2 */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
        </ul>
      </div>
      {/* Column 3 */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
        </ul>
      </div>
      {/* Column 4 */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <p className="text-sm">Subscribe to our newsletter for the latest updates</p>
        <div className="mt-3 flex">
          <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <a href="#" className="text-white text-2xl font-bold flex items-center">
          <i className="fas fa-crown text-yellow-500 mr-2"></i> BrandName
        </a>
      </div>
      <div className="text-sm">&copy; 2023 BrandName. All rights reserved.</div>
    </div>
  </div>
</footer>
    </main>
  );
}
