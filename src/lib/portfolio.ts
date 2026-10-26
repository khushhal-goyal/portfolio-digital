export const profile = {
  name: "Khushhal Goyal",
  tagline: "AI & Data Science Engineer | Full Stack Developer | ML Enthusiast",
  email: "khushhalgoyal9@gmail.com",
  phone: "+91 8437200247",
  location: "Jaipur, Rajasthan",
  permanent: "Ludhiana, Punjab - 141204",
  resume: "https://drive.google.com/file/d/khushhal-goyal-resume/view",
  site: "https://khushhalgoyal.vercel.app",
  about:
    "Undergraduate engineer pursuing a B.Tech in Computer Science & Engineering with a specialization in Artificial Intelligence and Data Science at JECRC University, Jaipur. Passionate about architecting scalable systems, machine learning pipelines, and immersive digital web experiences. Having studied foundational engineering coursework with an 8.0 CGPA at RIET Jaipur, I combine analytical rigor with creative frontend problem-solving. Always exploring the intersection of modern web technologies, AI integration, and high-performance interactive architectures.",
  quote:
    "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.",
  quoteBy: "Carl Sagan",
};

export const roles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

export const socials = {
  github: "https://github.com/khushhal-goyal",
  linkedin: "https://linkedin.com/in/khushhal-goyal",
  instagram: "https://instagram.com/khushhal.goyal",
  medium: "https://medium.com/@khushhalgoyal9",
  devto: "https://dev.to/khushhalgoyal",
};

export const stats = [
  { value: "8.0", label: "CGPA · Sem 1" },
  { value: "84.8%", label: "CBSE Class X" },
  { value: "77%", label: "PSEB Class XII" },
  { value: "16+", label: "Core skills" },
];

export const timeline = [
  {
    year: "2026 – 2029",
    title: "B.Tech CSE (AI & Data Science)",
    place: "JECRC University, Jaipur",
    note: "2nd-year lateral entry · course transferred",
  },
  {
    year: "2025 – 2026",
    title: "First-year Engineering",
    place: "RIET Jaipur",
    note: "8.0 CGPA in Semester 1",
  },
  { year: "Class XII", title: "Senior Secondary", place: "PSEB", note: "77.00%" },
  { year: "Class X", title: "Secondary", place: "CBSE", note: "84.8%" },
];

export const achievements = [
  "Achieved 8.0 CGPA in Semester 1 First Year Engineering at RIET Jaipur",
  "Competitive participant in Cricket & Esports tournaments at FALCON 2026 Annual Sports Summit (RIET Jaipur)",
  "Secured 84.8% in CBSE Class X Examinations",
];

export const planets = [
  {
    name: "AI / ML",
    size: 150,
    hue: 230,
    description: "Designing learning systems and data-driven models.",
    experience: "2025 – present",
    projects: "Neural Analytics Engine",
    stack: ["Artificial Intelligence", "Machine Learning", "DSA"],
  },
  {
    name: "Python & Data",
    size: 125,
    hue: 200,
    description: "Wrangling, analysing and visualising datasets.",
    experience: "2025 – present",
    projects: "Neural Analytics Engine",
    stack: ["Python", "NumPy", "Pandas"],
  },
  {
    name: "Frontend",
    size: 140,
    hue: 250,
    description: "Fast, accessible, beautiful interfaces.",
    experience: "2025 – present",
    projects: "Space OS · Web Architecture",
    stack: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5/CSS3", "Tailwind CSS"],
  },
  {
    name: "3D & Motion",
    size: 110,
    hue: 185,
    description: "Real-time WebGL worlds and fluid motion.",
    experience: "2025 – present",
    projects: "Cinematic Space OS",
    stack: ["Three.js", "React Three Fiber", "Framer Motion"],
  },
  {
    name: "CS Core",
    size: 115,
    hue: 270,
    description: "The fundamentals behind every system.",
    experience: "Coursework",
    projects: "Academic",
    stack: ["Operating Systems", "Computer Networks", "Git/GitHub"],
  },
];

export const projects = [
  {
    name: "Cinematic Space OS & Interactive Portfolio",
    description:
      "A luxury, futuristic AI operating system themed web experience featuring real-time Three.js space environments, fluid cursor physics, and seamless page transitions.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "Tailwind CSS",
    ],
  },
  {
    name: "AI Neural Analytics Engine",
    description:
      "An intelligent data dashboard leveraging machine learning algorithms to visualize complex datasets with real-time inference and responsive charting.",
    stack: ["Python", "Pandas", "NumPy", "Next.js", "Tailwind CSS", "FastAPI"],
  },
  {
    name: "Modern High-Performance Web Architecture",
    description:
      "A minimalist, high-converting digital platform built with dynamic theme transitions, smooth Lenis scrolling, and micro-interactions.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
].map((p) => ({
  ...p,
  github: "https://github.com/khushhal-goyal",
  live: "https://khushhalgoyal.vercel.app",
}));

export const experience = [
  {
    company: "Academic & Open Source Projects",
    role: "AI & Full Stack Developer",
    duration: "2025 – Present",
    description:
      "Engineering interactive full-stack applications, data-driven machine learning models, and modern responsive user interfaces with Next.js, TypeScript, and Three.js.",
  },
];

export const certifications = [
  "B.Tech in Computer Science & Engineering (Artificial Intelligence & Data Science) Candidate",
  "Advanced Web Development & Modern JavaScript / React Ecosystem",
  "Python for Data Science and Machine Learning Foundations",
];

/** Scroll-driven sky: White → Light Grey → Blue → Dark Blue → Deep Space → Galaxy Black */
export const skyStops = [0, 0.16, 0.32, 0.48, 0.66, 1];
export const skyColors = ["#ffffff", "#e6ebf1", "#5b8fd6", "#13306b", "#070b1f", "#020208"];
