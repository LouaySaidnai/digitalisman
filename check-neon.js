const { Client } = require('pg')

// Configuration de connexion Neon
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function checkNeonDatabase() {
  try {
    console.log('🔌 Connexion à Neon...')
    await client.connect()
    console.log('✅ Connecté à Neon !\n')
    
    // Compter les produits
    const countResult = await client.query('SELECT COUNT(*) FROM "Produit"')
    console.log(`📊 Nombre total de produits : ${countResult.rows[0].count}\n`)
    
    // Lister tous les produits
    const result = await client.query(`
      SELECT id, nom, slug, statut, "dateCreation" 
      FROM "Produit" 
      ORDER BY id ASC
    `)
    
    console.log('📋 Liste des produits :')
    console.log('ID | Nom | Slug | Statut | Date création')
    console.log('---|-----|-----|--------|-------------')
    
    result.rows.forEach(row => {
      console.log(`${row.id} | ${row.nom} | ${row.slug} | ${row.statut || 'N/A'} | ${row.datecreation || 'N/A'}`)
    })
    
    console.log('\n✅ Consultation terminée !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la consultation :', error)
  } finally {
    await client.end()
  }
}

checkNeonDatabase() 