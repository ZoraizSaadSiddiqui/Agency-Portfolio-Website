// ─── Company & Footer Helpers ──────────────────────────────
export const companyInfo = {
  name: "Agency",
  email: "info@agency.com",
  phone: "+92 313 2471870",
  formattedPhone: "+92 313 2471870",
  whatsappUrl: "https://wa.me/923132471870",
  websiteUrl: "https://agency.com",
} as const;

export const footerQuickLinks = [
  { label: "Web Application", href: "#services" },
  { label: "App Development", href: "#services" },
  { label: "Desktop Application", href: "#services" },
  { label: "Game Development", href: "#services" },
  { label: "Branding", href: "#services" },
  { label: "Application Security", href: "#services" },
  { label: "Social Media Marketing", href: "#services" },
] as const;

export const footerCompanyLinks = [
  { label: "Company", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Products", href: "#projects" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Hire An Expert", href: "/contact" },
] as const;

// ─── Navigation ───────────────────────────────────────────
export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "/contact" },
] as const;

export const mobilePrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Process", href: "/#process" },
] as const;

export const megaMenu = [
  {
    title: "Solutions",
    items: [
      {
        label: "Web Development",
        description: "Fast, focused websites built to support growth.",
        href: "#services",
        icon: "code" as const,
      },
      {
        label: "Business Automation",
        description: "Reliable workflows that remove repetitive work.",
        href: "#services",
        icon: "automation" as const,
      },
    ],
  },
  {
    title: "Selected work",
    items: [
      {
        label: "COD Order Automation",
        description: "Order validation, tracking, and team updates.",
        href: "#projects",
        icon: "orders" as const,
      },
      {
        label: "View all projects",
        description: "See the systems and websites we have shaped.",
        href: "#projects",
        icon: "projects" as const,
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        label: "Our process",
        description: "From first audit to handoff and support.",
        href: "#process",
        icon: "process" as const,
      },
      {
        label: "About the founders",
        description: "Meet the people behind the work.",
        href: "#about",
        icon: "people" as const,
      },
    ],
  },
] as const;

// ─── Hero ─────────────────────────────────────────────────
export const hero = {
  eyebrow: "Automation + web development",
  heading:
    "We automate manual businesses and build the websites that run them",
  subheading:
    "We help growing teams replace repetitive work with reliable systems, then build clear, high-performing websites that support the way they operate.",
  cta: {
    label: "Book a free automation audit",
    href: "/contact",
  },
} as const;

// ─── Services ─────────────────────────────────────────────
export const services = [
  {
    icon: "automation",
    title: "Business Automation",
    description:
      "Reliable workflows and operational systems that eliminate repetitive manual tasks.",
    items: [
      "Workflow Automation",
      "Invoice Automation",
      "CRM Automation",
      "WhatsApp Automation",
    ],
  },
  {
    icon: "cod",
    title: "COD Automation",
    description:
      "Automated cash-on-delivery order verification, fraud prevention, and logistics dispatch.",
    items: [
      "COD Order Verification",
      "Order Confirmation Bots",
      "Fraud/Fake Order Detection",
      "Courier Integration",
    ],
  },
  {
    icon: "web",
    title: "Web Development",
    description:
      "High-performing, responsive websites and digital platforms built for measurable growth.",
    items: [
      "Landing Pages",
      "Business Websites",
      "Responsive Websites",
      "Portfolio Sites",
    ],
  },
  {
    icon: "app",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps engineered for speed, utility, and user experience.",
    items: [
      "Mobile Apps (iOS/Android)",
      "Cross-platform (Flutter/React Native)",
      "Progressive Web Apps",
    ],
  },
  {
    icon: "ai",
    title: "AI / LLM Solutions",
    description:
      "Custom artificial intelligence tools, intelligent agents, and automated LLM workflows.",
    items: [
      "Custom Chatbots",
      "LLM Integrations",
      "AI Agents",
      "Prompt Engineering Pipelines",
    ],
  },
  {
    icon: "rag",
    title: "RAG Systems",
    description:
      "Enterprise retrieval systems connecting AI models with internal company databases.",
    items: [
      "Document Q&A Systems",
      "Knowledge Base Search",
      "Enterprise RAG Pipelines",
    ],
  },
  {
    icon: "vision",
    title: "Computer Vision",
    description:
      "Visual intelligence applications for image analysis, automated scanning, and document extraction.",
    items: [
      "Image Recognition",
      "OCR Automation",
      "Visual Quality Inspection",
    ],
  },
  {
    icon: "data",
    title: "Data Engineering & Science",
    description:
      "Scalable data pipelines, predictive intelligence, and executive analytics dashboards.",
    items: [
      "ETL Pipelines",
      "Data Dashboards",
      "Predictive Analytics",
      "Data Warehousing",
    ],
  },
] as const;

// ─── Projects ─────────────────────────────────────────────
export const projects = [
  {
    name: "Handyman App",
    problem:
      "A home-services provider in Saudi Arabia needed a way for customers to find and book verified plumbers, electricians, and AC technicians without relying on phone calls or word of mouth.",
    result:
      "A cross-platform customer app that matches users with nearby professionals by location, handles secure in-app communication, and manages bookings and payments end to end.",
    detailsHref:
      "https://play.google.com/store/apps/details?id=com.hadyman.customer_app",
    link: "https://play.google.com/store/apps/details?id=com.hadyman.customer_app",
  },
  {
    name: "Meharstar Enterprises",
    problem:
      "A Sialkot-based sportswear exporter needed a professional B2B storefront to showcase its catalog and handle quote requests from international buyers.",
    result:
      "A full export-ready website with category-driven product browsing, request-quote flows, and account/cart functionality, now serving buyers across the Middle East, Europe, and the USA.",
    detailsHref: "https://meharstarenterprises.com",
    link: "https://meharstarenterprises.com",
  },
  {
    name: "Red Hex Industries",
    problem:
      "A Lahore-based custom garment manufacturer needed an e-commerce storefront to sell across multiple product lines and take direct wholesale and retail orders.",
    result:
      "A multi-category online store covering sportswear, gymwear, safety wear, and jackets, with live cart functionality, a contact/quote workflow, and a brand story section.",
    detailsHref: "https://red-hex-storefront.vercel.app/",
    link: "https://red-hex-storefront.vercel.app/",
  },
] as const;

// ─── Process ──────────────────────────────────────────────
export const processSteps = [
  {
    title: "Discovery Call",
    description:
      "We learn how your business works, where it slows down, and what a useful outcome looks like.",
  },
  {
    title: "Audit",
    description:
      "We map the current workflow, identify the highest-impact opportunities, and define the scope.",
  },
  {
    title: "Build",
    description:
      "We design, develop, and test the agreed website or automation in clear delivery stages.",
  },
  {
    title: "Handoff & Support",
    description:
      "You receive documentation, training, and a support plan so the system stays useful after launch.",
  },
] as const;

export const stats = [
  { label: "Years of Experience", targetValue: 5, suffix: "+" },
  { label: "Projects Delivered", targetValue: 120, suffix: "+" },
  { label: "Happy Clients", targetValue: 99, suffix: "%" },
] as const;

export const teamMembers = [
  { name: "Alex Rivers", initials: "AR", bg: "bg-indigo-600" },
  { name: "Sarah Chen", initials: "SC", bg: "bg-indigo-500" },
  { name: "Marcus Vance", initials: "MV", bg: "bg-indigo-700" },
  { name: "Elena Rostova", initials: "ER", bg: "bg-indigo-400" },
  { name: "David Kim", initials: "DK", bg: "bg-indigo-800" },
] as const;

// ─── About / Founders ─────────────────────────────────────
export const founders = [
  {
    name: "Founder Name",
    role: "Co-founder · Automation",
    bio: "Add a short bio covering relevant operations experience, automation expertise, and the kinds of business problems this founder enjoys solving.",
  },
  {
    name: "Founder Name",
    role: "Co-founder · Web Development",
    bio: "Add a short bio covering development experience, product thinking, and the approach this founder brings to building useful websites.",
  },
] as const;

// ─── Contact ──────────────────────────────────────────────
export const contact = {
  heading: "Tell us what is slowing your business down",
  description:
    "Share a little about your business and the process or website you want to improve. We will reply with a practical next step.",
  formEndpoint: "",
  email: "info@agency.com",
  phone: "+92 313 2471870",
} as const;

export const contactFaqLinks = [
  { title: "Job Seekers", href: "#" },
  { title: "Talent Consulting", href: "#" },
  { title: "Project Management", href: "#" },
] as const;