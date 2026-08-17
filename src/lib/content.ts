// Content data for both themes — used across the site
// This mirrors the mockup's content object but structured for React components

export const themeContent = {
  food: {
    heroTitle: "Premium Makhana, grown honestly, shipped worldwide.",
    heroSub: "Farm-sourced fox nuts, graded and packed to international food-export standards, delivered to buyers across four continents.",
    heroCta1: "Explore Makhana",
    aboutTag: "🌾 Field to Container",
    aboutTitle: "A trusted Indian exporter, built on traceability.",
    aboutP1: "RDH Globals Every batch is sourced directly from partner farms, graded in-house, and packed to the specification of the buyer — no intermediaries, no inconsistency.",
    aboutP2: "We handle documentation, customs, and logistics end-to-end, so partners abroad receive a single point of contact from purchase order to port.",
    why: [
      { icon: "✓", title: "Consistent Grading", desc: "Every lot tested and graded before it leaves the facility." },
      { icon: "◆", title: "Custom Packaging", desc: "Private label and custom formats built to your market's spec." },
      { icon: "→", title: "Reliable Logistics", desc: "On-time shipping with full documentation handled for you." },
    ],
    prodTitle: "Product Range",
    prodSub: "Graded, packed, and ready for export.",
    defaultProducts: [
      { name: "Raw Makhana", img: "/images/makhana.png" },
      { name: "Roasted Makhana", img: "/images/rosted_makhana.png" },
      { name: "Premium Grade", img: "/images/premium_makhana.png" },
      { name: "Peri Peri", img: "/images/peri_peri.png" },
      { name: "Chocolate Coated", img: "/images/chocolate.png" },
      { name: "Cheese & Herbs", img: "/images/cheese.png" },
      { name: "Cream & Onion", img: "/images/onion_cream.png" },
      { name: "Pudina Mint", img: "/images/pudina.png" },
    ],

    processTitle: "How We Get It Right",
    steps: [
      { title: "Sourcing", desc: "Direct partnerships with regional farms." },
      { title: "Grading", desc: "Manual and mechanical sorting by size and quality." },
      { title: "Processing", desc: "Roasting and flavouring to buyer specification." },
      { title: "Export Packing", desc: "Moisture-sealed, container-ready packaging." },
    ],
    testimonials: [
      {
        quote: "\u201CGrading is the most consistent we\u2019ve worked with across three suppliers in the region.\u201D",
        who: "\u2014 Import Manager, Specialty Foods, Germany",
      },
      {
        quote: "\u201CDocumentation and lead times have never once slipped a shipment.\u201D",
        who: "\u2014 Procurement Lead, Distribution Group, UAE",
      },
    ],
  },
  textile: {
    heroTitle: "Luxury home textiles, woven for the world's finest hotels.",
    heroSub: "High-thread-count bedsheets and linens, manufactured to hospitality-grade standards and finished for retail-ready presentation.",
    heroCta1: "Explore Textiles",
    aboutTag: "🧵 Fibre to Finish",
    aboutTitle: "A trusted Indian exporter, built on craftsmanship.",
    aboutP1: "Every collection is woven from certified cotton, finished in-house, and tailored to the specification of hotel groups and retail partners alike.",
    aboutP2: "We manage compliance, customs, and freight end-to-end, so partners abroad receive a single point of contact from order to delivery.",
    why: [
      { icon: "✓", title: "Certified Cotton", desc: "Every collection sourced from verified, quality-certified mills." },
      { icon: "◆", title: "Bespoke Finishing", desc: "Custom thread counts, weaves, and trims for your brand." },
      { icon: "→", title: "On-Time Freight", desc: "Dependable shipping with full compliance documentation." },
    ],
    prodTitle: "Collection",
    prodSub: "Woven, finished, and ready for export.",
    defaultProducts: [
      { name: "Bedsheets", img: "/images/bedsheet.png" },
      { name: "Hotel Linen", img: "/images/hotel_linen.png" },
    ],
    processTitle: "How We Get It Right",
    steps: [
      { title: "Sourcing", desc: "Certified cotton from verified textile mills." },
      { title: "Weaving", desc: "Precision looms tuned to thread-count specification." },
      { title: "Finishing", desc: "Dyeing, stitching, and quality inspection." },
      { title: "Export Packing", desc: "Retail-ready folding and container-safe packing." },
    ],
    testimonials: [
      {
        quote: "\u201CThe finishing quality matches suppliers we previously paid twice as much for.\u201D",
        who: "\u2014 Procurement Director, Hotel Group, UK",
      },
      {
        quote: "\u201CCustom thread counts delivered exactly as specified, every order.\u201D",
        who: "\u2014 Buyer, Home Retail Chain, Australia",
      },
    ],
  },
} as const;

export type ThemeContent = typeof themeContent.food;
