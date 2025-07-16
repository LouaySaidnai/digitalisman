import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await prisma.produit.findUnique({
      where: { id: productId },
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
        dateModification: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Parser le champ prix pour le retourner dans un format utilisable
    let parsedPrix = product.prix;
    try {
      if (typeof product.prix === 'string') {
        const prixData = JSON.parse(product.prix);
        parsedPrix = prixData.prix || '';
      } else if (product.prix && typeof product.prix === 'object') {
        parsedPrix = product.prix.prix || '';
      }
    } catch (error) {
      console.error('Error parsing prix JSON:', error);
      parsedPrix = '';
    }

    const productWithParsedPrix = {
      ...product,
      prix: parsedPrix
    };

    return NextResponse.json(productWithParsedPrix);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { nom, sousTitre, prix, prixOriginal, format, statut, disponibilite, slug, meeting } = body;

    // Validate required fields
    if (!nom || !slug) {
      return NextResponse.json(
        { error: 'Product name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists for another product
    const existingProduct = await prisma.produit.findFirst({
      where: {
        slug,
        id: { not: productId }
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product slug already exists' },
        { status: 400 }
      );
    }

    // Update the product
    const updatedProduct = await prisma.produit.update({
      where: { id: productId },
      data: {
        nom: nom,
        sousTitre: sousTitre || null,
        slug: slug,
        prix: JSON.stringify({ prix: prix || '0' }),
        prixOriginal: prixOriginal || null,
        format: format || null,
        statut: statut || 'actif',
        disponibilite: disponibilite || 'disponible',
        meeting: meeting || null,
        dateModification: new Date(),
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
        dateModification: true,
      },
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.produit.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete the product
    await prisma.produit.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 