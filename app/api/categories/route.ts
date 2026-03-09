import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      questionsCount: cat._count.questions,
    }));

    return NextResponse.json(categoriesWithCount, { status: 200 });
  } catch {
    console.error('[categories] Error: Failed to fetch categories');
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
