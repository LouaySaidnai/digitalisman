"use client";
import React, { useState, useEffect } from "react";
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend } from "react-icons/lu";
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

interface ContactData {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  });

  const [contactData, setContactData] = useState<ContactData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupérer les données de contact depuis la base
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données de contact:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Envoyer l'email via l'API
      const response = await fetch('/api/contact/stock-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Succès
        alert("Votre message a été envoyé avec succès !");
        // Réinitialiser le formulaire
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          sujet: "",
          message: ""
        });
      } else {
        // Erreur
        alert(`Erreur: ${result.error || 'Erreur lors de l\'envoi du message'}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Données par défaut si la base n'est pas encore configurée
  const defaultData = {
    'contact-phone': '+216 28 00 82 52',
    'contact-email': 'laurent.hanout@neststep.io',
    'contact-address': 'Résidence Bel Azur App. 28, 1057 Gammarth, Tunisie',
    'contact-hours-weekdays': 'Lundi - Vendredi: 9h00 - 18h00',
    'contact-hours-saturday': 'Samedi: 9h00 - 13h00',
    'contact-hours-sunday': 'Dimanche: Fermé',
    'contact-linkedin': 'https://www.linkedin.com/in/laurentanout/',
    'contact-facebook': '#',
    'contact-twitter': '#',
    'contact-instagram': '#'
  };

  // Utiliser les données de la base ou les données par défaut
  const data = Object.keys(contactData).length > 0 ? contactData : defaultData;

  if (isLoading) {
    return (
      <main className="bg-gradient-to-br from-amber-50 to-yellow-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7A5230] mx-auto mb-4"></div>
          <p className="text-[#7A5230]">Chargement...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-amber-50 to-yellow-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-[#F3E4C0]">
              Prêt à transformer votre parcours professionnel ? Parlons de votre projet !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Formulaire de contact */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#4B2E05] mb-8">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-[#7A5230] mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#B9986F] focus:border-transparent transition-all duration-300 bg-amber-50"
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#7A5230] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#B9986F] focus:border-transparent transition-all duration-300 bg-amber-50"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-[#7A5230] mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#B9986F] focus:border-transparent transition-all duration-300 bg-amber-50"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-semibold text-[#7A5230] mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#B9986F] focus:border-transparent transition-all duration-300 bg-amber-50"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#7A5230] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-[#B9986F] focus:border-transparent transition-all duration-300 bg-amber-50 resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white font-bold py-4 px-8 rounded-xl hover:from-[#8B603A] hover:to-[#D6C4A2] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <LuSend className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Informations principales */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-8">
                  Nos coordonnées
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] p-3 rounded-xl">
                      <LuMapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4B2E05] mb-1">Adresse</h4>
                      <p className="text-[#7A5230] leading-relaxed">
                        {data['contact-address']}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] p-3 rounded-xl">
                      <LuPhone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4B2E05] mb-1">Téléphone</h4>
                      <p className="text-[#7A5230]">
                        <a href={`tel:${data['contact-phone']}`} className="hover:text-[#B9986F] transition-colors">
                          {data['contact-phone']}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] p-3 rounded-xl">
                      <LuMail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4B2E05] mb-1">Email</h4>
                      <p className="text-[#7A5230]">
                        <a href={`mailto:${data['contact-email']}`} className="hover:text-[#B9986F] transition-colors">
                          {data['contact-email']}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-[#7A5230] to-[#B9986F] p-3 rounded-xl">
                      <LuClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4B2E05] mb-1">Horaires</h4>
                      <p className="text-[#7A5230]">
                        {data['contact-hours-weekdays']}<br />
                        {data['contact-hours-saturday']}<br />
                        {data['contact-hours-sunday']}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-[#4B2E05] mb-8">
                  Suivez-nous
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={data['contact-facebook']}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaFacebookF className="w-5 h-5" />
                    <span className="font-semibold">Facebook</span>
                  </a>
                  
                  <a
                    href={data['contact-twitter']}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaTwitter className="w-5 h-5" />
                    <span className="font-semibold">Twitter</span>
                  </a>
                  
                  <a
                    href={data['contact-linkedin']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaLinkedin className="w-5 h-5" />
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                  
                  <a
                    href={data['contact-instagram']}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaInstagram className="w-5 h-5" />
                    <span className="font-semibold">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7A5230] to-[#B9986F] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer votre transformation ?
          </h2>
          <p className="text-xl text-[#F3E4C0] mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d'entrepreneurs qui ont déjà transformé leur parcours professionnel avec notre accompagnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Register"
              className="bg-white text-[#7A5230] font-bold px-8 py-4 rounded-xl hover:bg-[#F3E4C0] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Commencer maintenant
            </a>
            <a
              href="/products"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-[#7A5230] transition-all duration-300 transform hover:scale-105"
            >
              Découvrir nos programmes
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 