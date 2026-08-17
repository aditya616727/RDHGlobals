import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PRODUCTS, ProductItem } from '@/lib/default-products';

export const dynamic = 'force-dynamic';

function filterFallbackProducts(params: {
  category: string | null;
  subcategory: string | null;
  query: string | null;
  featured: string | null;
}): ProductItem[] {
  let list = [...DEFAULT_PRODUCTS];

  if (params.category && params.category !== 'all') {
    list = list.filter((p) => p.category === params.category);
  }

  if (params.subcategory && params.subcategory !== 'all') {
    list = list.filter(
      (p) => p.subcategory.toLowerCase() === params.subcategory!.toLowerCase()
    );
  }

  if (params.featured === 'true') {
    list = list.filter((p) => p.isFeatured);
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.gradeInfo && p.gradeInfo.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

  try {
    const where: any = {
      isActive: true,
    };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (subcategory && subcategory !== 'all') {
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

    if (products && products.length > 0) {
      return NextResponse.json({ success: true, products });
    }

    // Fallback if DB is empty (e.g. on fresh Vercel serverless instances)
    const fallback = filterFallbackProducts({ category, subcategory, query, featured });
    return NextResponse.json({ success: true, products: fallback });
  } catch (error) {
    console.error('Database query fallback invoked:', error);
    const fallback = filterFallbackProducts({ category, subcategory, query, featured });
    return NextResponse.json({ success: true, products: fallback });
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
        images: images && images.length > 0 ? {
          create: images.map((img: { url: string; alt?: string; isPrimary?: boolean }, index: number) => ({
            url: img.url,
            alt: img.alt || name,
            isPrimary: img.isPrimary || index === 0,
            sortOrder: index,
          })),
        } : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
