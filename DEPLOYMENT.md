# 🚀 Guide de Déploiement Vercel

## Variables d'Environnement Requises

Ajoutez ces variables dans les paramètres de votre projet Vercel :

```env
DATABASE_URL="mysql://username:password@host:port/database_name"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

## Étapes de Déploiement

### 1. Préparation

- Assurez-vous que votre base de données MySQL est accessible depuis Vercel
- Vérifiez que toutes les dépendances sont dans `package.json`

### 2. Déploiement

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement
5. Déployez !

### 3. Post-Déploiement

- Exécutez les migrations Prisma : `npx prisma db push`
- Seedez les données : `npm run seed`

## Configuration Recommandée

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
