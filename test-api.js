const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Test de l\'API /api/produits...');
    
    const response = await fetch('http://localhost:3000/api/produits');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Nombre de produits:', data.length);
    
    if (data.length > 0) {
      console.log('\n=== PREMIER PRODUIT ===');
      console.log('Nom:', data[0].nom);
      console.log('Prix (type):', typeof data[0].prix);
      console.log('Prix (valeur):', JSON.stringify(data[0].prix, null, 2));
    }
    
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

testAPI(); 