const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing products
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.exportCountry.deleteMany();

  // Create Food Products
  const foodProducts = [
    {
      name: 'Raw Premium Makhana (6 Suta Jumbo)',
      slug: 'raw-premium-makhana-6-suta',
      category: 'food',
      subcategory: 'Raw Makhana',
      description: 'Hand-picked and traditionally popped 6 Suta grade Mithila Makhana (Euryale Ferox). Grown in natural wetland ecosystems of Bihar, laboratory tested for purity, low moisture content, zero chemical additives.',
      shortDesc: 'Jumbo 6 Suta grade raw fox nuts, hand-sorted for maximum pop size and crispness.',
      gradeInfo: '6 Suta (20mm+)',
      moq: '500 KG',
      packaging: '10 kg moisture-sealed vacuum bags in 5-ply corrugated export boxes',
      hsCode: '0813.40.90',
      specifications: JSON.stringify({
        "Grade Size": "6 Suta (Jumbo)",
        "Moisture": "< 8%",
        "Broken Count": "< 2%",
        "Color": "Natural White / Cream",
        "Shelf Life": "12 Months",
        "Certifications": "FSSAI, APEDA"
      }),
      isFeatured: true,
      sortOrder: 1,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Raw Premium Makhana 6 Suta' }
        ]
      }
    },
    {
      name: 'Himalayan Pink Salt Roasted Makhana',
      slug: 'himalayan-pink-salt-roasted-makhana',
      category: 'food',
      subcategory: 'Roasted Makhana',
      description: 'Slow-roasted fox nuts seasoned with natural Himalayan pink salt and cold-pressed olive oil. Gluten-free, zero trans-fat, high-protein superfood snack packed for retail and private-label distribution.',
      shortDesc: 'Gourmet slow-roasted fox nuts tossed with pure Himalayan salt.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: '50g/100g nitrogen-flushed pouch packs or 5kg master packs',
      hsCode: '2008.19.90',
      specifications: JSON.stringify({
        "Flavor": "Himalayan Pink Salt",
        "Roast Method": "Artisanal Slow Roast (Oil-light)",
        "Dietary": "Gluten-Free, Vegan, Non-GMO",
        "Protein": "9.7g per 100g",
        "Shelf Life": "9 Months"
      }),
      isFeatured: true,
      sortOrder: 2,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Roasted Salted Makhana' }
        ]
      }
    },
    {
      name: 'Peri Peri Spiced Fox Nuts',
      slug: 'peri-peri-spiced-fox-nuts',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Zesty African Peri Peri spiced roasted makhana for modern health-snack retail markets across Europe and North America.',
      shortDesc: 'Bold & spicy roasted lotus seeds coated in authentic Peri Peri seasoning.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: 'Nitrogen-flushed foil pouch (70g) or master export box',
      hsCode: '2008.19.90',
      specifications: JSON.stringify({
        "Flavor": "Fiery Peri Peri",
        "Spiciness": "Medium Hot",
        "Shelf Life": "9 Months"
      }),
      isFeatured: false,
      sortOrder: 3,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Peri Peri Makhana' }
        ]
      }
    },
    {
      name: 'Export Grade Commercial Makhana (4 Suta)',
      slug: 'export-grade-commercial-makhana-4-suta',
      category: 'food',
      subcategory: 'Raw Makhana',
      description: 'Standard 4 Suta commercial grade fox nuts ideal for processing, cereal manufacturing, and spice blending.',
      shortDesc: 'Cost-effective commercial grade fox nuts for industrial food manufacturing.',
      gradeInfo: '4 Suta (12-14mm)',
      moq: '1000 KG',
      packaging: '25kg HDPE woven sacks with inner liner',
      hsCode: '0813.40.90',
      specifications: JSON.stringify({
        "Grade": "4 Suta",
        "Application": "Snack processing, Cereal blending, Flour milling",
        "Moisture": "< 9%"
      }),
      isFeatured: false,
      sortOrder: 4,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Commercial 4 Suta Makhana' }
        ]
      }
    }
  ];

  for (const prod of foodProducts) {
    await prisma.product.create({ data: prod });
  }

  // Create Textile Products
  const textileProducts = [
    {
      name: 'Luxury 600 TC Egyptian Cotton Bedsheet Set',
      slug: 'luxury-600-tc-egyptian-cotton-bedsheet-set',
      category: 'textile',
      subcategory: 'Bedsheets',
      description: 'Ultra-soft 600 thread count long-staple combed cotton bedsheets, satin weave finish. Designed for 5-star hotel chains and luxury home furnishing retailers in US & Europe.',
      shortDesc: '600 TC long-staple cotton luxury bedding set with silky satin sheen finish.',
      gradeInfo: '600 Thread Count',
      moq: '100 Sets per color',
      packaging: 'Eco-friendly embroidered cotton tote bag or retail PVC zip box',
      hsCode: '6302.21.00',
      specifications: JSON.stringify({
        "Material": "100% Long-Staple Combed Cotton",
        "Thread Count": "600 TC",
        "Weave": "Sateen",
        "Sizes": "King, Queen, Double, Single",
        "Shrinkage": "< 3%",
        "Certification": "OEKO-TEX Standard 100 Class 1"
      }),
      isFeatured: true,
      sortOrder: 1,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: '600 TC Bedsheet Set' }
        ]
      }
    },
    {
      name: 'Hospitality Plush Percale Hotel Linen Collection',
      slug: 'hospitality-plush-percale-hotel-linen-collection',
      category: 'textile',
      subcategory: 'Hotel Linen',
      description: 'Crisp, durable 300 TC percale hotel bed linen engineered for commercial laundering, institutional bleach resistance, and long service life in resort hospitality.',
      shortDesc: 'Commercial hotel linen collection crafted for heavy laundry cycles.',
      gradeInfo: '300 TC Percale',
      moq: '200 Sets',
      packaging: 'Compressed bales with sea-freight waterproofing',
      hsCode: '6302.31.00',
      specifications: JSON.stringify({
        "Material": "80% Cotton / 20% Polyester blend",
        "Thread Count": "300 TC Crisp Percale",
        "Commercial Laundering": "Tested for 150+ wash cycles",
        "Color": "Optical Bright White"
      }),
      isFeatured: true,
      sortOrder: 2,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Hotel Linen Collection' }
        ]
      }
    },
    {
      name: 'Handcrafted Jacquard Duvet & Pillow Sets',
      slug: 'handcrafted-jacquard-duvet-pillow-sets',
      category: 'textile',
      subcategory: 'Pillow Covers',
      description: 'Intricately woven jacquard patterned duvet covers with coordinating oxford pillow shams. Tailored piping edges and hidden button closures.',
      shortDesc: 'Bespoke jacquard woven duvet cover sets with regal decorative motifs.',
      gradeInfo: '400 TC Jacquard',
      moq: '150 Sets',
      packaging: 'Rigid presentation gift box or retail hanger bag',
      hsCode: '6302.21.00',
      specifications: JSON.stringify({
        "Technique": "Damask Jacquard Weave",
        "Composition": "Pure Bio-Washed Cotton",
        "Closure": "Concealed YKK Zipper / Button"
      }),
      isFeatured: false,
      sortOrder: 3,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80', isPrimary: true, alt: 'Jacquard Duvet Set' }
        ]
      }
    }
  ];

  for (const prod of textileProducts) {
    await prisma.product.create({ data: prod });
  }

  // Create Testimonials
  const testimonials = [
    {
      quote: "Grading is the most consistent we've worked with across three suppliers in the region.",
      attribution: "— Import Manager, Specialty Foods, Germany",
      category: "food",
      sortOrder: 1
    },
    {
      quote: "Documentation and lead times have never once slipped a shipment.",
      attribution: "— Procurement Lead, Distribution Group, UAE",
      category: "food",
      sortOrder: 2
    },
    {
      quote: "The finishing quality matches suppliers we previously paid twice as much for.",
      attribution: "— Procurement Director, Hotel Group, UK",
      category: "textile",
      sortOrder: 3
    },
    {
      quote: "Custom thread counts delivered exactly as specified, every order.",
      attribution: "— Buyer, Home Retail Chain, Australia",
      category: "textile",
      sortOrder: 4
    }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
