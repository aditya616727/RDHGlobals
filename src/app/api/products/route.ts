import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const query = searchParams.get('q');
    const featured = searchParams.get('featured');

    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (subcategory) {
      where.subcategory = subcategory;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
        { subcategory: { contains: query } },
        { gradeInfo: { contains: query } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      category,
      subcategory,
      description,
      shortDesc,
      gradeInfo,
      moq,
      packaging,
      hsCode,
      specifications,
      isFeatured,
      images,
    } = body;

    if (!name || !category || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, category, and description are required' },
        { status: 400 }
      );
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        category,
        subcategory,
        description,
        shortDesc,
        gradeInfo,
        moq,
        packaging,
        hsCode,
        specifications: typeof specifications === 'object' ? JSON.stringify(specifications) : specifications,
        isFeatured: Boolean(isFeatured),
        images: {
          create: (images || []).map((img: any, idx: number) => ({
            url: img.url,
            alt: img.alt || name,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
