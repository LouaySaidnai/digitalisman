const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('test123', 12);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        nom: 'Test',
        prenom: 'User'
      }
    });
    
    console.log('✅ Utilisateur de test créé avec succès:');
    console.log('Email: test@example.com');
    console.log('Mot de passe: test123');
    console.log('ID:', user.id);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 