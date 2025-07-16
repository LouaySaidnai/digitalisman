const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('Création d\'un utilisateur admin...');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      // Mettre à jour le rôle si l'utilisateur existe
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'admin' }
      });
      console.log('Utilisateur existant mis à jour avec le rôle admin');
    } else {
      // Créer un nouvel utilisateur admin
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          nom: 'Admin',
          prenom: 'Super',
          role: 'admin'
        }
      });
      console.log('Nouvel utilisateur admin créé');
    }

    console.log('\n=== Informations de connexion admin ===');
    console.log('Email:', adminEmail);
    console.log('Mot de passe:', adminPassword);
    console.log('\nVous pouvez maintenant vous connecter à /admin/login');
    console.log('==========================================');

  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 