/* ------------------------------------------------------------------
   All portfolio content lives here. Edit text, swap image URLs, done.
   Images are free-to-use Unsplash photos (served by their CDN). Every
   image has a gradient fallback, so the layout never breaks if one
   fails to load. Replace with screenshots of your own projects anytime.
------------------------------------------------------------------- */

const u = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const profile = {
  name: "Burhan Bhat",
  firstName: "Burhan",
  lastName: "Bhat",
  title: "Project Manager",
  subtitle: "IT, Web & Digital Operations",
  email: "burhanbhatcuk@gmail.com",
  phone: "+91 7889977565",
  phoneHref: "+917889977565",
  location: "Bemina, Srinagar, Jammu & Kashmir",
  resume: "./Burhan_Bhat_Resume.pdf",
  summary:
    "Project Manager with 10 years in IT, leading cross-functional engineering, design and AI teams through end-to-end product lifecycles using Agile/Scrum.",
};

export const roles = [
  "Agile product delivery",
  "ERP implementations",
  "Azure CI/CD pipelines",
  "React web applications",
  "QA test automation",
  "SEO & Meta Ads growth",
];

export const marqueeA = [
  "Agile / Scrum",
  "ERP Implementation",
  "React.js",
  "Microsoft Azure",
  "CI/CD & Automation",
  "QA Automation",
];

export const marqueeB = [
  "Networking & Security",
  "SEO Optimization",
  "Meta Ads",
  "UI/UX in Figma",
  "Brand Design",
  "SDLC",
];

export const stats = [
  { value: "10+", label: "Years in IT" },
  { value: "40%", label: "Less deployment friction through CI/CD" },
  { value: "3", label: "Disciplines: engineering, design, growth" },
];

export const heroImages = [
  { src: u("photo-1461749280684-dccba630e2f6", 900), alt: "Code on a monitor", tone: "b", depth: 0.09 },
  { src: u("photo-1551288049-bebda4e38f71", 900), alt: "Analytics dashboard", tone: "a", depth: 0.17 },
  { src: u("photo-1522071820081-009f0129c71c", 900), alt: "Team collaborating", tone: "c", depth: 0.05 },
];

export const aboutText =
  "Ten years in IT, leading cross-functional engineering, design and AI teams through Agile product delivery. I connect technical execution with digital growth, so what ships is reliable, secure and tied to real business goals.";

export const aboutImages = [
  { src: u("photo-1519389950473-47ba0277781c", 1000), alt: "People working at laptops", tone: "b" },
  { src: u("photo-1531297484001-80022131f5a1", 800), alt: "Laptop and technology workspace", tone: "e" },
  { src: u("photo-1550751827-4bd374c3f58b", 800), alt: "Security and networking", tone: "c" },
];

export const facts = [
  { k: "Based in", v: "Srinagar, Jammu & Kashmir" },
  { k: "Focus", v: "IT, web & digital operations" },
  { k: "Method", v: "Agile / Scrum, end-to-end lifecycles" },
  { k: "Education", v: "M.Sc. IT · B.Tech CS" },
];

export const work = [
  {
    id: "01",
    year: "2020 — Now",
    title: "ERP Implementation",
    tags: ["ERP", "Resource planning", "Workflows"],
    description:
      "End-to-end ERP rollouts across departments, covering resource planning, tracking and workflows so teams run on one system of record.",
    result: "Cross-department rollouts",
    image: u("photo-1551288049-bebda4e38f71"),
    alt: "Business analytics dashboard",
    tone: "a",
  },
  {
    id: "02",
    year: "2020 — Now",
    title: "Azure CI/CD Pipelines",
    tags: ["Azure", "DevOps", "Automation"],
    description:
      "CI/CD automation built into delivery pipelines, with applications and environments deployed and managed on Microsoft Azure for reliability and cost.",
    result: "40%+ less deployment friction",
    image: u("photo-1558494949-ef010cbdcc31"),
    alt: "Data center racks",
    tone: "b",
  },
  {
    id: "03",
    year: "2020 — Now",
    title: "React Web Applications",
    tags: ["React.js", "Responsive", "Frontend"],
    description:
      "Responsive web applications planned, built and shipped with React, working closely with design and backend teams.",
    result: "Shipped with design + backend",
    image: u("photo-1461749280684-dccba630e2f6"),
    alt: "Code on a monitor",
    tone: "c",
  },
  {
    id: "04",
    year: "2016 — 2020",
    title: "QA & Test Automation",
    tags: ["Python", "Selenium", "API tests"],
    description:
      "Automation frameworks and system health checks built with Python, Selenium and CI/CD tools, plus automated UI and API test suites.",
    result: "Less bug leakage, fewer manual hours",
    image: u("photo-1555066931-4365d14bab8c"),
    alt: "Code on a laptop",
    tone: "d",
  },
  {
    id: "05",
    year: "2020 — Now",
    title: "SEO & Meta Ads Growth",
    tags: ["Technical SEO", "Facebook", "Instagram"],
    description:
      "Technical and on-page SEO, meta tags and site speed to grow organic traffic, plus Meta Ads campaigns from creative and targeting to performance tracking.",
    result: "Organic + paid growth",
    image: u("photo-1460925895917-afdab827c52f"),
    alt: "Analytics on a laptop",
    tone: "e",
  },
  {
    id: "06",
    year: "2014 — 2016",
    title: "UI/UX & Brand Design",
    tags: ["Figma", "Prototyping", "Branding"],
    description:
      "Requirements turned into wireframes and high-fidelity Figma prototypes, usability feedback fed into sprints, and brand creatives kept consistent across touchpoints.",
    result: "Consistent visual identity",
    image: u("photo-1561070791-2526d30994b8"),
    alt: "Colorful design workspace",
    tone: "f",
  },
];

export const experience = [
  {
    role: "Manager IT & Technical Projects",
    team: "Agile Product Delivery & Systems",
    period: "2020 — Present",
    points: [
      "Direct cross-functional engineering, design and AI teams through end-to-end product lifecycles using Agile methodologies.",
      "Lead end-to-end ERP implementation projects across departments, covering resource planning, tracking and workflows.",
      "Integrated CI/CD automation into delivery pipelines, reducing deployment friction by over 40%.",
      "Plan, build and ship responsive web applications with React, working closely with design and backend teams.",
      "Deploy and manage applications, pipelines and environments on Microsoft Azure, with a focus on reliability and cost.",
      "Drive SEO optimization (technical SEO, on-page, meta tags, site speed) to grow organic search traffic.",
      "Plan and run Meta Ads campaigns across Facebook and Instagram, from creative and targeting to performance tracking.",
      "Design brand creatives, social media graphics and marketing collateral to keep a consistent visual identity.",
      "Manage network infrastructure (LAN/WAN, VPN, firewalls) and resolve hardware, software and network issues to keep downtime low.",
      "Own IT operations, system security protocols and compliance audits.",
    ],
  },
  {
    role: "QA & Systems Automation Lead",
    team: "Core Engineering",
    period: "2016 — 2020",
    points: [
      "Built automation frameworks and system health checks using Python, Selenium and CI/CD tools.",
      "Cut bug leakage and manual testing hours with automated UI and API test suites.",
      "Worked with frontend and backend developers to improve reliability and speed up release cycles.",
    ],
  },
  {
    role: "UI/UX Designer & IT Consultant",
    team: "Product Design",
    period: "2014 — 2016",
    points: [
      "Translated technical requirements into wireframes and high-fidelity Figma prototypes.",
      "Ran usability testing and fed user feedback directly into development sprints.",
      "Kept visual and functional consistency across all digital touchpoints, backed by graphic design and branding work.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Delivery & Leadership",
    items: [
      "Project Planning & Delivery",
      "Agile / Scrum Leadership",
      "Sprint & Priority Management",
      "Cross-functional Team Coordination",
      "SDLC",
      "ERP Implementation",
    ],
  },
  {
    title: "Engineering & Cloud",
    items: [
      "Web Development (React.js)",
      "Microsoft Azure (Cloud & DevOps)",
      "CI/CD & Automation",
      "QA & Test Automation (Python, Selenium)",
    ],
  },
  {
    title: "Infrastructure & Security",
    items: [
      "Networking (LAN/WAN, TCP/IP, VPN, Firewalls)",
      "Hardware & Software Troubleshooting",
      "IT Infrastructure & Helpdesk Support",
      "System Security & Compliance",
    ],
  },
  {
    title: "Growth & Design",
    items: [
      "SEO Optimization",
      "Meta Ads (Facebook & Instagram)",
      "Graphic Design & Branding",
      "UI/UX Strategy (Figma)",
    ],
  },
];

export const services = [
  {
    title: "Project & Delivery Leadership",
    text: "Turn a roadmap into shipped product: Agile planning, sprint and priority management, and a team that stays aligned from discovery to release.",
    bullets: ["Agile / Scrum setup", "ERP rollouts", "Cross-team coordination"],
  },
  {
    title: "Web & Cloud Engineering",
    text: "Responsive React applications on reliable Azure infrastructure, with automated pipelines and test suites behind every release.",
    bullets: ["React web apps", "Azure CI/CD", "QA automation"],
  },
  {
    title: "Digital Growth & Brand",
    text: "Search, paid social and design working together so the product is found, understood and remembered.",
    bullets: ["Technical & on-page SEO", "Meta Ads campaigns", "Brand & UI/UX design"],
  },
];

export const education = [
  { degree: "M.Sc. Information Technology", school: "Central University of Kashmir" },
  { degree: "B.Tech in Computer Science", school: "Central University of Kashmir" },
];
