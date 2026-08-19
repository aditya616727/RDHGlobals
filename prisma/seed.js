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
      name: 'Raw Premium Makhana (5 and 6 Suta Jumbo)',
      slug: 'raw-premium-makhana-6-suta',
      category: 'food',
      subcategory: 'Raw Makhana',
      description: 'Hand-picked and traditionally popped 5 and 6 Suta jumbo grade Mithila Makhana (Euryale Ferox). Grown in natural wetland ecosystems of Bihar, laboratory tested for purity, low moisture content, zero chemical additives.',
      shortDesc: 'Jumbo 5 & 6 Suta grade raw fox nuts, hand-sorted for maximum pop size and crispness.',
      gradeInfo: '5 & 6 Suta (18-22mm+)',
      moq: '500 KG',
      packaging: '10 kg moisture-sealed vacuum bags in 5-ply corrugated export boxes',
      hsCode: '0813.40.90',
      seoTitle: 'Raw Premium Makhana (5 & 6 Suta Jumbo) Exporter | RDH Globals',
      seoDescription: 'Direct Indian exporter of 5 & 6 Suta jumbo raw Makhana (fox nuts). APEDA & FSSAI certified, laboratory tested for B2B global importers and snack manufacturers.',
      specifications: JSON.stringify({
        "Grade Size": "5 & 6 Suta (Jumbo)",
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
          { url: '/images/premium_makhana.png', isPrimary: true, alt: 'Raw Premium Makhana (5 and 6 Suta Jumbo)' }
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
      seoTitle: 'Himalayan Pink Salt Roasted Makhana Wholesale Exporter | RDH Globals',
      seoDescription: 'Wholesale exporter of Himalayan pink salt roasted makhana snacks. Gluten-free, non-GMO, protein-rich superfood ready for retail packaging and international export.',
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
          { url: '/images/rosted_makhana.png', isPrimary: true, alt: 'Roasted Salted Makhana' }
        ]
      }
    },
    {
      name: 'Peri Peri Spiced Fox Nuts',
      slug: 'peri-peri-spiced-fox-nuts',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Zesty African Peri Peri spiced roasted makhana for modern health-snack retail markets across Europe and North America. Coated with authentic Peri Peri seasoning and slow-roasted for a bold, fiery crunch.',
      shortDesc: 'Bold & spicy roasted lotus seeds coated in authentic Peri Peri seasoning.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: 'Nitrogen-flushed foil pouch (70g) or master export box',
      hsCode: '2008.19.90',
      seoTitle: 'Peri Peri Flavoured Makhana B2B Exporter | RDH Globals India',
      seoDescription: 'Indian manufacturer & exporter of Peri Peri spiced roasted fox nuts. High margin superfood snack with private label packaging & full customs clearance.',
      specifications: JSON.stringify({
        "Flavor": "Fiery Peri Peri",
        "Spiciness": "Medium Hot",
        "Dietary": "Gluten-Free, Vegan",
        "Shelf Life": "9 Months"
      }),
      isFeatured: true,
      sortOrder: 3,
      images: {
        create: [
          { url: '/images/peri_peri.png', isPrimary: true, alt: 'Peri Peri Spiced Makhana' }
        ]
      }
    },
    {
      name: 'Chocolate Coated Premium Makhana',
      slug: 'chocolate-coated-premium-makhana',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Crunchy roasted fox nuts dipped in rich dark chocolate coating. A guilt-free superfood dessert snack combining the nutritional benefits of makhana with premium cocoa — perfect for health-conscious confectionery retail.',
      shortDesc: 'Premium fox nuts coated in rich dark chocolate — a healthy dessert snack.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '200 KG',
      packaging: 'Nitrogen-flushed foil pouch (50g/100g) or retail gift box',
      hsCode: '1806.90.90',
      seoTitle: 'Chocolate Coated Makhana Exporter & Manufacturer | RDH Globals',
      seoDescription: 'Gourmet dark chocolate coated roasted makhana superfood snack. Direct export supply for confectionery distributors, supermarkets, and private labels.',
      specifications: JSON.stringify({
        "Flavor": "Dark Chocolate",
        "Cocoa Content": "55% Premium Cocoa",
        "Dietary": "Gluten-Free, Vegetarian",
        "Protein": "7.2g per 100g",
        "Shelf Life": "6 Months"
      }),
      isFeatured: true,
      sortOrder: 5,
      images: {
        create: [
          { url: '/images/chocolate.png', isPrimary: true, alt: 'Chocolate Coated Makhana' }
        ]
      }
    },
    {
      name: 'Cheese & Herbs Roasted Makhana',
      slug: 'cheese-herbs-roasted-makhana',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Roasted fox nuts seasoned with tangy cheese powder and aromatic Italian herbs blend. A savory, protein-rich snack crafted for western retail palates and private-label health food distribution.',
      shortDesc: 'Tangy cheese and herb seasoned roasted fox nuts — savory superfood snacking.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: 'Nitrogen-flushed foil pouch (70g) or master export box',
      hsCode: '2008.19.90',
      seoTitle: 'Cheese & Herbs Roasted Makhana Wholesale Exporter | RDH Globals',
      seoDescription: 'Export supplier of Cheese & Italian Herbs roasted makhana snacks. Clean ingredients, long shelf-life, and FSSAI/APEDA compliant container shipping.',
      specifications: JSON.stringify({
        "Flavor": "Cheese & Mixed Herbs",
        "Spiciness": "Mild",
        "Dietary": "Gluten-Free, Vegetarian",
        "Shelf Life": "9 Months"
      }),
      isFeatured: false,
      sortOrder: 6,
      images: {
        create: [
          { url: '/images/cheese.png', isPrimary: true, alt: 'Cheese & Herbs Makhana' }
        ]
      }
    },
    {
      name: 'Cream & Onion Roasted Makhana',
      slug: 'cream-onion-roasted-makhana',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Slow-roasted fox nuts tossed with creamy onion seasoning and spring onion flakes. A light, addictive snack with a familiar savory profile loved across global snack markets.',
      shortDesc: 'Creamy onion seasoned roasted fox nuts — a crowd-favourite savory snack.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: 'Nitrogen-flushed foil pouch (70g) or master export box',
      hsCode: '2008.19.90',
      seoTitle: 'Cream & Onion Roasted Makhana Export Supplier | RDH Globals',
      seoDescription: 'B2B export of Cream & Onion flavoured roasted makhana (fox nuts). Popular savory snack for global retail chains, distributors, and private brands.',
      specifications: JSON.stringify({
        "Flavor": "Cream & Onion",
        "Spiciness": "Mild",
        "Dietary": "Gluten-Free, Vegetarian",
        "Shelf Life": "9 Months"
      }),
      isFeatured: false,
      sortOrder: 7,
      images: {
        create: [
          { url: '/images/onion_cream.png', isPrimary: true, alt: 'Cream & Onion Makhana' }
        ]
      }
    },
    {
      name: 'Pudina Mint Roasted Makhana',
      slug: 'pudina-mint-roasted-makhana',
      category: 'food',
      subcategory: 'Flavoured Makhana',
      description: 'Freshly roasted fox nuts dusted with cooling pudina (mint) seasoning and a hint of lime. A refreshing, low-calorie superfood snack popular in South Asian and Middle Eastern markets.',
      shortDesc: 'Cool mint seasoned roasted fox nuts — refreshing and light superfood snack.',
      gradeInfo: '5 Suta (16-18mm)',
      moq: '250 KG',
      packaging: 'Nitrogen-flushed foil pouch (70g) or master export box',
      hsCode: '2008.19.90',
      seoTitle: 'Pudina Mint Roasted Makhana Exporter | RDH Globals India',
      seoDescription: 'Authentic Indian Pudina (Mint) & Lime roasted makhana exporter. Low-calorie healthy snack with container-ready packaging and export documentation.',
      specifications: JSON.stringify({
        "Flavor": "Pudina (Mint) & Lime",
        "Spiciness": "Mild-Medium",
        "Dietary": "Gluten-Free, Vegan",
        "Shelf Life": "9 Months"
      }),
      isFeatured: false,
      sortOrder: 8,
      images: {
        create: [
          { url: '/images/pudina.png', isPrimary: true, alt: 'Pudina Mint Makhana' }
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
      seoTitle: '4 Suta Commercial Grade Raw Makhana B2B Supplier | RDH Globals',
      seoDescription: 'Industrial bulk supplier of 4 Suta commercial raw Makhana for food processing, flour milling, and breakfast cereals. Consistent grading & wholesale pricing.',
      specifications: JSON.stringify({
        "Grade": "4 Suta",
        "Application": "Snack processing, Cereal blending, Flour milling",
        "Moisture": "< 9%"
      }),
      isFeatured: false,
      sortOrder: 9,
      images: {
        create: [
          { url: '/images/makhana.png', isPrimary: true, alt: 'Commercial 4 Suta Makhana' }
        ]
      }
    },
    {
      name: 'Fresh Organic Indian Amla (Gooseberry)',
      slug: 'fresh-organic-indian-amla-gooseberry',
      category: 'food',
      subcategory: 'Fresh Amla',
      description: 'Direct farm-sourced fresh Indian Gooseberry (Phyllanthus Emblica) harvested from organic orchards in Gujarat and Uttar Pradesh. Hand-graded for uniform large diameter, rich emerald color, exceptional juiciness, and unmatched Vitamin C concentration. Cold-chain packed for international air and reefer ocean freight.',
      shortDesc: 'Farm-fresh, hand-graded organic Indian Gooseberry packed for cold-chain global export.',
      gradeInfo: 'Grade A (35-45mm+)',
      moq: '1000 KG',
      packaging: '5kg / 10kg ventilated corrugated export cartons with protective trays; reefer container ready',
      hsCode: '0810.90.90',
      seoTitle: 'Fresh Organic Amla (Indian Gooseberry) Exporter | RDH Globals India',
      seoDescription: 'Direct exporter of fresh Grade A Indian Amla (Gooseberry). Farm-sourced, APEDA & FSSAI certified with refrigerated cold-chain export to USA, UAE, Europe, and Asia.',
      specifications: JSON.stringify({
        "Fruit Diameter": "35mm - 45mm+ (Grade A Large)",
        "Appearance": "Lustrous Emerald Green, Firm Texture",
        "Vitamin C Content": "600 - 800 mg / 100g",
        "Harvest Season": "October - March (Fresh), Year-round Reefer",
        "Storage Temp": "4°C - 7°C (Cold Chain)",
        "Certifications": "APEDA, FSSAI, Global G.A.P. Compliant"
      }),
      isFeatured: true,
      sortOrder: 10,
      images: {
        create: [
          { url: '/images/fresh_amla.jpg', isPrimary: true, alt: 'Fresh Organic Indian Amla Gooseberry' }
        ]
      }
    },
    {
      name: 'Sweet & Tangy Sun-Dried Amla Candy',
      slug: 'sweet-tangy-sun-dried-amla-candy',
      category: 'food',
      subcategory: 'Amla Candy',
      description: 'Artisanal sun-dried Indian Gooseberry candied segments crafted using traditional slow-osmosis sweetening or digestive spice infusions (Chatpata). High in natural antioxidants, dietary fiber, and Vitamin C. Free from artificial colors, synthetic flavors, or chemical preservatives — perfect for modern healthy confectionery and retail snack packs.',
      shortDesc: 'Chewy, antioxidant-rich candied amla bites — available in Sweet and Chatpata spiced blends.',
      gradeInfo: 'Premium Dried Segments',
      moq: '250 KG',
      packaging: '100g / 250g / 500g nitrogen-flushed stand-up pouches or 10kg bulk food-grade cartons',
      hsCode: '2008.99.99',
      seoTitle: 'Sweet & Chatpata Amla Candy Bulk Exporter & Manufacturer | RDH Globals',
      seoDescription: 'Wholesale manufacturer & exporter of natural dried Amla Candy. Gluten-free, preservative-free superfood confectionery for private label and supermarket distribution.',
      specifications: JSON.stringify({
        "Available Variants": "Sweet Candied / Chatpata Masala",
        "Moisture": "< 12%",
        "Texture": "Chewy, Soft-Dried Segments",
        "Preservatives": "Zero Artificial Preservatives / Colors",
        "Dietary": "Gluten-Free, 100% Vegetarian",
        "Shelf Life": "12 Months"
      }),
      isFeatured: true,
      sortOrder: 11,
      images: {
        create: [
          { url: '/images/amla_candy.jpg', isPrimary: true, alt: 'Sweet and Tangy Sun-Dried Amla Candy' }
        ]
      }
    },
    {
      name: 'Pure Organic Herbal Amla Powder',
      slug: 'pure-organic-herbal-amla-powder',
      category: 'food',
      subcategory: 'Amla Powder',
      description: 'Micro-pulverized organic Indian Gooseberry powder produced from shade-dried, de-seeded wild amla fruits. Retains peak tannin, polyphenol, and ascorbic acid potency. Ideal for nutraceutical formulations, herbal teas, dietary superfood blends, cosmetic hair care, and pharmaceutical extraction.',
      shortDesc: '100% pure shade-dried organic amla powder for nutraceutical, food & wellness manufacturing.',
      gradeInfo: '80 - 100 Mesh Ultra-Fine',
      moq: '200 KG',
      packaging: '25kg multi-wall paper drums with inner food-grade poly liner or custom retail foil pouches',
      hsCode: '1106.30.90',
      seoTitle: 'Organic Amla Powder Bulk Manufacturer & Exporter | RDH Globals India',
      seoDescription: 'Direct B2B exporter of 100% pure organic Amla (Emblica Officinalis) powder. Heavy-metal tested, microbial-screened for nutraceutical and cosmetic industries.',
      specifications: JSON.stringify({
        "Purity": "100% Pure Emblica Officinalis (No fillers)",
        "Mesh Size": "80 - 100 Mesh Fine Powder",
        "Color": "Natural Light Greenish Brown",
        "Moisture": "< 6.5%",
        "Total Ash": "< 7%",
        "Certifications": "FSSAI, Organic Certified, NABL Lab Tested",
        "Shelf Life": "24 Months"
      }),
      isFeatured: true,
      sortOrder: 12,
      images: {
        create: [
          { url: '/images/amla_powder.jpg', isPrimary: true, alt: 'Pure Organic Herbal Amla Powder' }
        ]
      }
    },
    {
      name: '100% Pure Cold-Pressed Amla Juice',
      slug: 'pure-cold-pressed-amla-juice',
      category: 'food',
      subcategory: 'Amla Juice',
      description: 'Cold-pressed virgin juice extracted from freshly harvested whole organic Indian Gooseberries. Unpasteurized or flash-pasteurized options with zero added sugar, synthetic colors, or water dilution. Rich in bioactive bioflavonoids and immune-boosting Vitamin C, packaged for bulk beverage bottling and wellness distribution.',
      shortDesc: '100% virgin cold-pressed Indian Gooseberry juice — unfiltered, pure, and additive-free.',
      gradeInfo: 'Pure Virgin Cold-Pressed',
      moq: '500 Litres',
      packaging: '500ml / 1000ml UV-protected glass/PET bottles or 200L food-grade aseptic bulk drums',
      hsCode: '2009.89.90',
      seoTitle: 'Cold-Pressed Pure Amla Juice Wholesale Exporter | RDH Globals India',
      seoDescription: 'B2B bulk supplier & exporter of 100% pure cold-pressed Amla Juice. Zero added sugar, private label bottling, and container-ready export shipping.',
      specifications: JSON.stringify({
        "Extraction Method": "Single Cold Press (Hydraulic)",
        "Brix": "8° - 11° Brix",
        "Added Sugar / Water": "0% (Undiluted)",
        "Acidity (as Citric)": "2.0% - 3.2%",
        "Packaging Options": "Retail Bottling / 200L Aseptic Bulk Drums",
        "Shelf Life": "12 Months"
      }),
      isFeatured: false,
      sortOrder: 13,
      images: {
        create: [
          { url: '/images/amla_juice.jpg', isPrimary: true, alt: '100% Pure Cold-Pressed Amla Juice' }
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
      seoTitle: '600 TC Egyptian Cotton Bedsheets Exporter & Manufacturer | RDH Globals',
      seoDescription: 'Manufacturer & exporter of 600 Thread Count Egyptian cotton bedsheet sets for 5-star hotels and luxury home retailers. OEKO-TEX certified, bespoke sizing.',
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
          { url: '/images/bedsheet.png', isPrimary: true, alt: '600 TC Bedsheet Set' }
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
      seoTitle: '300 TC Percale Hotel Bed Linen Wholesale Exporter | RDH Globals',
      seoDescription: 'Commercial hotel bed linen collection engineered for 150+ wash cycles. Crisp 300 TC percale weave for global resort chains and institutional hospitality buyers.',
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
          { url: '/images/hotel_linen.png', isPrimary: true, alt: 'Hotel Linen Collection' }
        ]
      }
    },
    {
      name: 'Handcrafted Jacquard Luxury Linen Collection',
      slug: 'handcrafted-jacquard-luxury-linen-collection',
      category: 'textile',
      subcategory: 'Hotel Linen',
      description: 'Intricately woven jacquard patterned luxury linens engineered for high-end hospitality and resort suites. Tailored piping edges and concealed closures.',
      shortDesc: 'Bespoke jacquard woven luxury linens with regal decorative motifs.',
      gradeInfo: '400 TC Jacquard',
      moq: '150 Sets',
      packaging: 'Rigid presentation gift box or retail hanger bag',
      hsCode: '6302.21.00',
      seoTitle: '400 TC Jacquard Luxury Hotel Linen Exporter | RDH Globals',
      seoDescription: 'Bespoke 400 TC jacquard woven luxury hotel linen collection. Custom motifs, bio-washed cotton, and institutional export packaging for international hotels.',
      specifications: JSON.stringify({
        "Technique": "Damask Jacquard Weave",
        "Composition": "Pure Bio-Washed Cotton",
        "Closure": "Concealed YKK Zipper / Button"
      }),
      isFeatured: false,
      sortOrder: 3,
      images: {
        create: [
          { url: '/images/bedsheet.png', isPrimary: true, alt: 'Jacquard Luxury Linen Collection' }
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

  console.log('Database seeded successfully with rich SEO metadata!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
