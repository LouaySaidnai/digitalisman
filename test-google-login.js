// Script de test pour l'API Google Login
const testGoogleLogin = async () => {
  console.log('🧪 Test de l\'API Google Login...');
  
  try {
    // Simuler des données Google (pour test uniquement)
    const mockGoogleData = {
      credential: "mock_credential",
      userData: {
        email: "test@gmail.com",
        name: "John Doe",
        given_name: "John",
        family_name: "Doe",
        sub: "123456789"
      }
    };

    const response = await fetch('http://localhost:3000/api/auth/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockGoogleData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API Google Login fonctionne !');
      console.log('📊 Réponse:', data);
    } else {
      console.log('❌ Erreur API:', data);
    }
  } catch (error) {
    console.log('❌ Erreur de connexion:', error.message);
  }
};

// Exécuter le test si le script est appelé directement
if (typeof window === 'undefined') {
  testGoogleLogin();
}

module.exports = { testGoogleLogin }; 