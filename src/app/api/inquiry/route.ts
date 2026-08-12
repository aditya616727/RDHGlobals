import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ success: true, inquiries: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      country,
      productInterest,
      volume,
      timeline,
      message,
    } = body;

    if (!companyName || !email || !country) {
      return NextResponse.json(
        { success: false, error: 'Company name, email, and country are required' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        companyName,
        contactName: contactName || 'Buyer',
        email,
        phone: phone || '',
        country,
        productInterest: productInterest || 'General Inquiry',
        volume: volume || '',
        timeline: timeline || '',
        message: message || 'Inquiry submitted from RDH Globals export website.',
        status: 'NEW',
      },
    });

    console.log(`[INQUIRY RECEIVED] New inquiry from ${companyName} (${country}) for ${productInterest}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been logged successfully. Our export desk will contact you within 24 hours.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to record inquiry' }, { status: 500 });
  }
}
