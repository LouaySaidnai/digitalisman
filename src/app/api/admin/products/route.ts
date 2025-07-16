import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.produit.findMany({
      select: {
        id: true,
        nom: true,
        sousTitre: true,
        slug: true,
        prix: true,
        prixOriginal: true,
        format: true,
        statut: true,
        disponibilite: true,
        dateCreation: true,
        dateModification: true,
        _count: {
          select: {
            testResults: true,
          },
        },
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });

    // Transform the data to match the admin table format
    const formattedProducts = products.map(product => {
      // Parse prix JSON to get the price value
      let price = 'N/A';
      let originalPrice = product.prixOriginal || 'N/A';
      
      try {
        if (typeof product.prix === 'string') {
          const prixData = JSON.parse(product.prix);
          // Gérer différents formats de prix
          if (prixData.prix) {
            price = prixData.prix;
          } else if (prixData.promo) {
            price = prixData.promo;
          } else if (prixData.original) {
            price = prixData.original;
          } else {
            price = 'N/A'; // Fallback sécurisé
          }
        } else if (product.prix && typeof product.prix === 'object') {
          // Gérer directement les objets
          if (product.prix.prix) {
            price = product.prix.prix;
          } else if (product.prix.promo) {
            price = product.prix.promo;
          } else if (product.prix.original) {
            price = product.prix.original;
          } else {
            price = 'N/A'; // Fallback sécurisé
          }
        }
      } catch (error) {
        console.error('Error parsing prix JSON:', error);
        price = 'N/A';
      }

      return {
        id: product.id,
        name: product.nom,
        subtitle: product.sousTitre || 'N/A',
        price: String(price), // S'assurer que c'est une chaîne
        originalPrice: String(originalPrice), // S'assurer que c'est une chaîne
        category: product.format || 'N/A',
        status: product.statut,
        availability: product.disponibilite || 'inconnu',
        createdAt: product.dateCreation,
        updatedAt: product.dateModification,
        testResultsCount: product._count.testResults,
      };
    });

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, subtitle, price, originalPrice, category, status, availability, slug, meeting } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Product name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProduct = await prisma.produit.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product slug already exists' },
        { status: 400 }
      );
    }

    // Create the product
    const newProduct = await prisma.produit.create({
      data: {
        nom: name,
        sousTitre: subtitle || null,
        slug: slug,
        prix: JSON.stringify({ prix: price || '0' }),
        prixOriginal: originalPrice || null,
        format: category || null,
        statut: status || 'actif',
        disponibilite: availability || 'disponible',
        meeting: meeting || null,
      },
      select: {
        id: true,
        nom: true,
        sousTitre: true,
        slug: true,
        prix: true,
        prixOriginal: true,
        format: true,
        statut: true,
        disponibilite: true,
        meeting: true,
        dateCreation: true,
      },
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 