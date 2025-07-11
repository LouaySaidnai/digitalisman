// Test simple de l'envoi d'email
require('dotenv').config();

const sgMail = require('@sendgrid/mail');

// Configuration SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY non configurée dans le fichier .env');
  process.exit(1);
}
sgMail.setApiKey(SENDGRID_API_KEY);

// Données de test
const factureTest = {
  numeroFacture: "FAC-TEST-" + Date.now(),
  datePaiement: new Date(),
  referencePaiement: "pi_test_" + Date.now(),
  sousTotal: 497.00,
  reduction: 50.00,
  total: 447.00,
  clientEmail: "malek.azri@insat.ucar.tn", // Votre adresse email pour recevoir l'email de test
  clientNom: "Azri",
  clientPrenom: "Malek"
};

const produitsTest = [
  {
    nomProduit: "Formation Entrepreneuriat Avancé",
    quantiteProduit: 1,
    prixUnitaire: "497€",
    prixTotal: "497€"
  }
];

// Fonction d'envoi d'email (copiée de src/lib/email.ts)
async function sendPaymentConfirmationEmail(to, facture, produits) {
  const formatPrice = (price) => `${price.toFixed(2)}€`;
  
  const produitsHtml = produits.map((produit) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${produit.nomProduit}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${produit.quantiteProduit}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${produit.prixUnitaire}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${produit.prixTotal}</td>
    </tr>
  `).join('');

  const msg = {
    to,
    from: "testmalek2004@gmail.com",
    subject: `Confirmation de paiement - Facture ${facture.numeroFacture}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de paiement</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #7A5230 0%, #B9986F 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Paiement Confirmé</h1>
          <p style="color: #f5ecd7; margin: 10px 0 0 0; font-size: 16px;">Votre commande a été validée avec succès</p>
        </div>

        <!-- Content -->
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          
          <!-- Greeting -->
          <p style="font-size: 18px; margin-bottom: 20px;">
            Bonjour ${facture.clientPrenom || facture.clientNom || 'Cher(e) client(e)'},
          </p>
          
          <p style="font-size: 16px; margin-bottom: 30px;">
            Nous vous remercions pour votre achat ! Votre paiement a été traité avec succès et votre accès aux formations est maintenant actif.
          </p>

          <!-- Invoice Details -->
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #7A5230;">
            <h3 style="color: #7A5230; margin-top: 0; margin-bottom: 15px;">Détails de votre commande</h3>
            <p style="margin: 5px 0;"><strong>Numéro de facture :</strong> ${facture.numeroFacture}</p>
            <p style="margin: 5px 0;"><strong>Date de paiement :</strong> ${new Date(facture.datePaiement).toLocaleDateString('fr-FR')}</p>
            <p style="margin: 5px 0;"><strong>Référence de paiement :</strong> ${facture.referencePaiement}</p>
          </div>

          <!-- Products Table -->
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #7A5230; margin-top: 0; margin-bottom: 15px;">Produits commandés</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #7A5230;">Produit</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #7A5230;">Quantité</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #7A5230;">Prix unitaire</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #7A5230;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${produitsHtml}
              </tbody>
            </table>

            <!-- Totals -->
            <div style="border-top: 2px solid #e5e7eb; padding-top: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Sous-total :</span>
                <span>${formatPrice(facture.sousTotal)}</span>
              </div>
              ${facture.reduction > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #10b981;">
                  <span>Réduction :</span>
                  <span>-${formatPrice(facture.reduction)}</span>
                </div>
              ` : ''}
              <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #7A5230; border-top: 1px solid #e5e7eb; padding-top: 8px;">
                <span>Total :</span>
                <span>${formatPrice(facture.total)}</span>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #10b981;">
            <h3 style="color: #10b981; margin-top: 0; margin-bottom: 15px;">Prochaines étapes</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Votre accès aux formations est maintenant actif</li>
              <li style="margin-bottom: 8px;">Consultez votre espace client pour accéder à vos formations</li>
            </ul>
          </div>

          <!-- Support -->
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px;">Besoin d'aide ?</h3>
            <p style="margin: 0; color: #856404;">
              Si vous avez des questions concernant votre commande ou l'accès à vos formations, 
              n'hésitez pas à nous contacter à l'adresse suivante : 
              <a href="mailto:testmalek2004@gmail.com" style="color: #7A5230;">testmalek2004@gmail.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Merci de votre confiance !<br>
              L'équipe de votre plateforme
            </p>
          </div>

        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
}

async function testEmail() {
  try {
    console.log('🧪 Test d\'envoi d\'email de confirmation...');
    console.log('📧 Envoi vers:', factureTest.clientEmail);
    
    await sendPaymentConfirmationEmail(
      factureTest.clientEmail,
      factureTest,
      produitsTest
    );
    
    console.log('✅ Email de confirmation envoyé avec succès !');
    console.log('📬 Vérifiez votre boîte email (et les spams)');
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    console.log('💡 Assurez-vous que SENDGRID_API_KEY est configurée dans vos variables d\'environnement');
  }
}

// Exécuter le test
testEmail(); 