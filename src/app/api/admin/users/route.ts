import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        createdAt: true,
        updatedAt: true,
        // Count related data for admin insights
        _count: {
          select: {
            factures: true,
            utilisationsCoupon: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to match the admin table format
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: `${user.prenom || ''} ${user.nom || ''}`.trim() || 'N/A',
      email: user.email,
      role: 'User', // You can add a role field to your User model if needed
      status: 'Active', // You can add a status field to your User model if needed
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      facturesCount: user._count.factures,
      couponsCount: user._count.utilisationsCoupon,
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, nom, prenom } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom: nom || null,
        prenom: prenom || null,
      },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 