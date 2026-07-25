export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "/contact" },
];

export const megaMenu = [
  {
    title: "Solutions",
    items: [
      {
        label: "Web Development",
        description: "Fast, focused websites built to support growth.",
        href: "#services",
        icon: "code",
      },
      {
        label: "Business Automation",
        description: "Reliable workflows that remove repetitive work.",
        href: "#services",
        icon: "automation",
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
        icon: "orders",
      },
      {
        label: "View all projects",
        description: "See the systems and websites we have shaped.",
        href: "#projects",
        icon: "projects",
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
        icon: "process",
      },
      {
        label: "About the founders",
        description: "Meet the people behind the work.",
        href: "#about",
        icon: "people",
      },
    ],
  },
] as const;

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
};

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
];

export const projects = [
  {
    name: "COD Order Automation",
    problem:
      "A cash-on-delivery retailer was manually confirming and tracking every incoming order.",
    result:
      "A centralized workflow now validates orders, updates statuses, and keeps the team informed.",
    detailsHref: "#contact",
  },
  {
    name: "Service Business Lead Pipeline",
    problem:
      "New enquiries were scattered across forms, inboxes, and spreadsheets.",
    result:
      "Every lead now enters one pipeline with automatic routing and follow-up reminders.",
    detailsHref: "#contact",
  },
  {
    name: "Consultancy Website Rebuild",
    problem:
      "An outdated website made the offer difficult to understand and hard to update.",
    result:
      "A focused, responsive site now explains the service clearly and supports new campaigns.",
    detailsHref: "#contact",
  },
];

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
];

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
];

export const contact = {
  heading: "Tell us what is slowing your business down",
  description:
    "Share a little about your business and the process or website you want to improve. We will reply with a practical next step.",
  // Replace this value with your third-party form endpoint when it is ready.
  formEndpoint: "",
};
