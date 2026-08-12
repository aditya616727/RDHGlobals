import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, weightKg, port, incoterm } = body;

    const baseWeight = Number(weightKg) || 500;
    let basePricePerKg = category === 'textile' ? 18.5 : 12.0; // USD per kg base estimate
    
    // Volume discount
    if (baseWeight >= 2000) basePricePerKg *= 0.88;
    else if (baseWeight >= 1000) basePricePerKg *= 0.92;

    const cargoTotalUSD = baseWeight * basePricePerKg;

    // Freight estimates based on destination port region
    let freightUSD = 450;
    if (port?.includes('US') || port?.includes('CA')) freightUSD = 1850;
    else if (port?.includes('AE') || port?.includes('SA')) freightUSD = 850;
    else if (port?.includes('DE') || port?.includes('UK') || port?.includes('EU')) freightUSD = 1450;
    else if (port?.includes('AU')) freightUSD = 1600;

    const insuranceUSD = Math.round(cargoTotalUSD * 0.008);
    const documentationUSD = 220; // Phytosanitary, Certificate of Origin, Customs filing

    const fobTotalUSD = Math.round(cargoTotalUSD + documentationUSD);
    const cifTotalUSD = Math.round(fobTotalUSD + freightUSD + insuranceUSD);

    return NextResponse.json({
      success: true,
      estimate: {
        category,
        weightKg: baseWeight,
        pricePerKgUSD: basePricePerKg.toFixed(2),
        cargoTotalUSD: Math.round(cargoTotalUSD),
        freightUSD,
        insuranceUSD,
        documentationUSD,
        fobTotalUSD,
        cifTotalUSD,
        currency: 'USD',
        quoteValidDays: 14,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Calculation failed' }, { status: 400 });
  }
}
