"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const formateurs = [
  {
    nom: 'Laurent Hanout',
    specialite: 'Entrepreneuriat & Stratégie',
    description: "Expert en accompagnement d'entrepreneurs, Laurent a aidé plus de 1000 porteurs de projet à structurer et lancer leur activité.",
    photo: '/images/Laurent.jpg.jpeg',
  },
  {
    nom: 'Sonia Ben Youssef',
    specialite: 'Coaching & Développement personnel',
    description: "Sonia accompagne les entrepreneurs dans leur développement personnel et la gestion du stress pour une réussite durable.",
    photo: '/images/houta.png',
  },
  // Ajoute d'autres formateurs ici si besoin
];

export default function FormateursPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen py-16 px-4 overflow-hidden">
      {/* Dégradé radial */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#fff8ec] via-[#f7e6c4] to-[#e7d3b0] opacity-90"></div>
        {/* Motif grainy */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#B9986F] rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#7A5230] rounded-full filter blur-2xl opacity-10"></div>
      </div>
      <section className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#7A5230] mb-4 drop-shadow-lg">
          Nos Formateurs
        </h1>
        <p className="text-center text-[#7A5230] text-lg mb-12 max-w-2xl mx-auto">
          Découvrez l’équipe d’experts qui vous accompagne dans votre parcours entrepreneurial.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {formateurs.map((f, idx) => (
            <div
              key={idx}
              className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-[#e7d3b0] hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative mb-4">
                <img
                  src={f.photo}
                  alt={f.nom}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#B9986F] shadow-lg group-hover:ring-4 group-hover:ring-[#7A5230] transition-all duration-300"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  {f.specialite}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#4B2E05] mb-2 text-center">{f.nom}</h2>
              <p className="text-[#7A5230] text-center mb-2">{f.description}</p>
              {/* Bouton profil ou contact si besoin */}
              {/* <button
                className="mt-4 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white font-bold px-6 py-2 rounded-xl shadow hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all"
                onClick={() => router.push(`/formateurs/${idx}`)}
              >
                Voir le profil
              </button> */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 