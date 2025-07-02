"use client";

import React from "react";
import { PrismaClient } from "../../generated/prisma";
import { FaSun, FaBoxOpen, FaUserAlt, FaTableTennis } from "react-icons/fa";
import Link from "next/link";
import "../../app/globals.css";

const prisma = new PrismaClient();

// Fonction pour choisir une icône selon le nom du produit
function getIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("soleil")) return <FaSun className="text-white text-5xl" />;
  if (lower.includes("client")) return <FaBoxOpen className="text-white text-5xl" />;
  if (lower.includes("produit")) return <FaUserAlt className="text-white text-5xl" />;
  if (lower.includes("ping-pong")) return <FaTableTennis className="text-white text-5xl" />;
  return <FaBoxOpen className="text-white text-5xl" />; // icône par défaut
}

export default async function ProductsPage() {
  const products = await prisma.produit.findMany();

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#7A5230]">
              Catalogue complet
            </span>
            <h2 className="text-4xl font-bold text-[#4B2E05] mt-2 leading-tight">
              Découvrez tous nos produits
            </h2>
            <p className="text-[#5C3A00] mt-4 text-lg">
              Parcourez l'ensemble de notre offre pour trouver le programme qui vous correspond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #B9986F, #7A5230)",
                  }}
                >
                  {getIcon(p.nom)}
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-[#4B2E05] mb-3">{p.nom}</h3>
                  <p className="text-[#5C3A00] mb-4 flex-grow">{p.description}</p>
                  <p className="text-[#7A5230] font-semibold mb-1">Livrable : {p.livrable}</p>
                  <p className="text-[#7A5230] font-bold mb-6">Prix : {p.prix} €</p>

                  <Link
                    href={`/produits/${p.id}`}
                    className="mt-auto inline-block bg-gradient-to-r from-[#B9986F] to-[#7A5230] text-white font-semibold py-2 px-4 rounded-lg text-center hover:brightness-110 transition"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
