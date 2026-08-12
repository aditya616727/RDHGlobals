import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ success: false, error: 'Error fetching product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      isActive,
      images,
    } = body;

    // Delete existing images if new images array provided
    if (images && Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
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
        specifications: typeof specifications === 'object' ? JSON.stringify(specifications) : specifications,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
        images: images && Array.isArray(images)
          ? {
              create: images.map((img: any, idx: number) => ({
                url: img.url,
                alt: img.alt || name,
                isPrimary: idx === 0,
                sortOrder: idx,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true, message: 'Product archived' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ success: false, error: 'Error deleting product' }, { status: 500 });
  }
}
