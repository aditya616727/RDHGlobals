import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PRODUCTS } from '@/lib/default-products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rdhglobals.com';

  const staticPages = [
    '',
    '/home',
    '/food',
    '/textiles',
    '/products',
    '/brochure',
    '/certifications',
    '/calculator',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/home' ? 1.0 : 0.8,
  }));

  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });

    const list = products.length > 0 ? products : DEFAULT_PRODUCTS.map(p => ({ slug: p.slug, updatedAt: new Date() }));

    const productPages = list.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...staticPages, ...productPages];
  } catch (e) {
    const productPages = DEFAULT_PRODUCTS.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
    return [...staticPages, ...productPages];
  }
}
