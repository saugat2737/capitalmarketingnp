const siteConfig = {
  company: "Capital Marketing & Trading Pvt. Ltd.",
  domain: "capitalmarketingnp.com",
  email: "capmar06@gmail.com",
  phone: "+977 9851001281",
  phoneHref: "tel:+9779851001281",
  whatsapp: "https://wa.me/9779851001281?text=Hello%20Capital%20Marketing%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20corporate%20gifting%20solutions.",
  mapEmbed: "https://www.google.com/maps?q=Capital%20Marketing%20%26%20Trading%20Pvt.%20Ltd.%20Nepal&output=embed"
};

const categories = [
  { slug: "pens", name: "Pens", intro: "Executive pens, promotional pens, metal pens, roller pens, and elegant writing instruments for high-volume branding." },
  { slug: "diaries", name: "Diaries", intro: "Corporate diaries and premium Notebooks crafted for institutions, banks, offices, and annual brand campaigns." },
  { slug: "notebooks", name: "Wallets and Cardholders", intro: "Stylish wallets and cardholders for professionals and corporate clients." },
  { slug: "corporate-gift-sets", name: "Corporate Gift Sets", intro: "Curated gift combinations for clients, staff, partners, and formal events." },
  { slug: "mugs-cups", name: "Medals", intro: "Recognition medals for outstanding performance and achievements." },
  { slug: "water-bottles", name: "Acrylic Trophies", intro: "Elegant acrylic trophies for recognizing outstanding achievements and milestones." },
  { slug: "bags", name: "Desktop and Table Top", intro: "Elegant desktop and table top solutions for corporate environments." },
  { slug: "trophies-awards", name: "Trophies & Awards", intro: "Recognition pieces for academic, corporate, institutional, and event ceremonies." },
  { slug: "calendars", name: "Star Trophies", intro: "  Very unique recognition pieces ." },
  { slug: "keychains", name: "Keychains", intro: "Metal, acrylic, leather, and custom keychains for campaigns and corporate distribution." },
  { slug: "office-accessories", name: "Executive Gifts Sets", intro: "Thoughtfully curated gift sets for executives and high-level professionals." },
  // { slug: "promotional-merchandise", name: "Promotional Merchandise", intro: "High-impact merchandise for launches, activations, campaigns, and public outreach." },
  // { slug: "customized-products", name: "Customized Products", intro: "Tailor-made gift items aligned with your organization, audience, and budget." },
  { slug: "employee-welcome-kits", name: "Glass Trophies", intro: "Elegant glass trophies for recognizing outstanding achievements and milestones." },
  { slug: "school-college-supplies", name: "Mementos and Plaques", intro: "Memorable mementos and plaques for educational institutions and events." },
  { slug: "event-branding-materials", name: "T-Shirts", intro: "Premium custom T-shirts designed for corporate branding, promotional events, employee uniforms, conferences, and large-scale marketing campaigns." }
];

const sampleNames = [
  "Signature Edition",
  "Executive Series",
  "Classic Corporate",
  "Premium Matte",
  "Heritage Line",
  "Modern Utility"
];

function categoryImage(slug, index = 1) {
  return `assets/images/products/${slug}-${index}.jpg`;
}

function getCategory(slug) {
  return categories.find((item) => item.slug === slug) || categories[0];
}
