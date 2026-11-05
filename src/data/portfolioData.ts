export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full Stack / ERP' | 'AI / Computer Vision' | 'Mobile & AI Security' | string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: string;
  location: string;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  description: string;
  icon: string;
  category: string;
  linkedInUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: number; description?: string }[];
  color: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Yuvaakash K",
    title: "2nd Year CSE Student • Python Full Stack & AI/ML Developer",
    heroMessage: "Building intelligent AI systems and scalable full-stack web applications.",
    shortBio: "2nd Year Computer Science & Engineering Student at Panimalar Engineering College specializing in Python Full Stack Development and AI/ML Engineering, crafting real-world web apps and computer vision models.",
    education: {
      institution: "Panimalar Engineering College",
      degree: "B.E. Computer Science & Engineering (CSE)",
      field: "Computer Science & Engineering",
      year: "2023 - 2027 | 2nd Year Undergraduate",
      location: "Chennai, India"
    },
    contact: {
      email: "yuvaakash16@gmail.com",
      github: "https://github.com/yuvaakash1610",
      linkedin: "https://www.linkedin.com/in/yuvaakash-kannan-450751360/",
      college: "Panimalar Engineering College, Chennai",
      formspreeEndpoint: "https://formspree.io/f/xyeyewnl"
    }
  },

  projects: [
    {
      id: "shri-amman-agro",
      title: "Shri Amman Agro Traders",
      subtitle: "Full-Stack POS & ERP System",
      category: "Full Stack / ERP",
      description: "Comprehensive agricultural trade management platform featuring inventory, stock control, GST billing, automated PDF invoices, and WhatsApp delivery.",
      longDescription: "Full-stack POS/ERP system for agricultural trading business featuring inventory management, customer management, vendor management, product stock, pricing, purchasing, sales/POS, GST billing, PDF invoice generation, WhatsApp invoice delivery, JWT authentication, role-based access control, PostgreSQL database, REST APIs, and dashboard analytics.",
      highlights: [
        "Inventory, Vendor & Customer Management",
        "GST Billing & PDF Invoice Generation",
        "Direct WhatsApp Invoice Delivery Integration",
        "Role-Based Access Control (RBAC) & Secure JWT Auth",
        "High-Performance REST APIs backed by PostgreSQL",
        "Real-Time Sales & Purchase Analytics Dashboard"
      ],
      techStack: ["PostgreSQL", "REST APIs", "JWT Auth", "RBAC", "PDF Billing", "WhatsApp API", "React", "Node.js"],
      githubUrl: "https://github.com/yuvaakash1610/shri-amman-agro",
      featured: true,
      color: "#7C3AED"
    },
    {
      id: "oil-spill-monitoring",
      title: "National Marine Oil Spill Monitoring",
      subtitle: "AI & Computer Vision Environmental Surveillance",
      category: "AI / Computer Vision",
      description: "An AI/computer-vision environmental monitoring system focused on marine oil spill detection from satellite and aerial imagery.",
      longDescription: "An AI/computer-vision environmental monitoring system focused on marine oil spill detection. Features satellite and aerial image processing, computer vision machine learning models for automated spill identification, and real-time spatial monitoring to protect marine ecosystems.",
      highlights: [
        "Satellite & Aerial Multispectral Image Processing",
        "Automated Marine Oil Slick Segmentation & Detection",
        "Computer Vision & Deep Learning Feature Extraction",
        "Spatial Monitoring to Protect Ocean Ecosystems"
      ],
      techStack: ["Computer Vision", "Image Processing", "Machine Learning", "Satellite Imagery", "Python", "Environmental AI"],
      githubUrl: "https://github.com/vishalvignesh12/OIL_SPILL_PROJECT_SIH_2026-PRODUCT-NAME-SHOULD-BE-SELECTED-",
      featured: true,
      color: "#06B6D4"
    },
    {
      id: "linksentry",
      title: "LinkSentry",
      subtitle: "Privacy-First Scam SMS & Phishing URL Detection",
      category: "Mobile & AI Security",
      description: "Privacy-aware Android cybersecurity application and dual ML classification system that detects scam SMS and phishing URLs, explaining why they look risky before you tap.",
      longDescription: "A privacy-aware Android application and intelligent backend that analyzes suspicious messages and links to protect users against scams, fake KYC, OTP theft, and phishing. Combines dual scikit-learn ML models with an explainable rules engine to provide transparent, plain-language risk assessments and safe verification guidance.",
      highlights: [
        "Dual ML Pipeline: TF-IDF + Logistic Regression for SMS, Lexical Random Forest for URLs",
        "Explainable Rules Engine: Transparent additive scoring with multi-signal calibrated risk fusion",
        "Mobile Android Client: Flutter-based UI with QR code scanning & local deletable scan history",
        "Privacy-Preserving Design: Offline-first analysis without raw message storage or link navigation"
      ],
      techStack: ["Flutter", "FastAPI", "Python", "scikit-learn", "Logistic Regression", "Random Forest", "Pydantic", "Android / Kotlin"],
      githubUrl: "https://github.com/yuvaakash1610/LinkSentry",
      featured: true,
      color: "#009688"
    }
  ] as Project[],

  experience: [
    {
      id: "approtech-internship",
      role: "Python Full Stack Intern",
      company: "Approtech Info Tech",
      duration: "1 Month Duration",
      type: "Internship",
      location: "Chennai, India",
      description: "Completed an intensive 1-month internship in Python Full Stack Development at Approtech Info Tech. Gained hands-on experience building web applications, backend RESTful APIs, database integrations, and frontend interfaces using Python, Django/Flask, and modern web engineering workflows.",
      keyContributions: [
        "Architected RESTful API endpoints using Python, Django & Flask",
        "Integrated dynamic database layers and query optimization",
        "Built responsive frontend interfaces using HTML5, CSS3, and JavaScript",
        "Containerized application environments for deployment pipelines"
      ],
      technologies: ["Python Full Stack", "Django / Flask", "REST APIs", "PostgreSQL", "HTML5", "CSS3", "JavaScript"]
    }
  ] as Experience[],

  achievements: [
    {
      id: "approtech-internship-achievement",
      title: "Python Full Stack Internship",
      issuer: "Approtech Info Tech",
      description: "Completed 1-month intensive industrial internship building full-stack web applications, RESTful APIs, and database integrations with Python.",
      icon: "Briefcase",
      category: "Internship"
    },
    {
      id: "healthcare-ideathon",
      title: "Healthcare Tech Ideathon Innovation",
      issuer: "Healthcare Innovation Challenge",
      description: "Presented innovative healthcare technology solutions at the Ideathon event, demonstrating technical prototyping and system architecture.",
      icon: "Lightbulb",
      category: "Ideathon",
      linkedInUrl: "https://www.linkedin.com/posts/yuvaakash-kannan-450751360_ideathon-innovation-healthcaretech-activity-7426942680129236992-ZsaM"
    },
    {
      id: "techfiesta-uiux",
      title: "TechFiesta 26 UI/UX Design Showcase",
      issuer: "TechFiesta 2026 Event",
      description: "Showcased high-fidelity user interface prototypes and user experience designs at TechFiesta 26, crafting modern, intuitive web interface concepts.",
      icon: "Palette",
      category: "Design Showcase",
      linkedInUrl: "https://www.linkedin.com/posts/yuvaakash-kannan-450751360_techfiesta26-uiux-uidesign-activity-7492988093390729216-DfRn"
    },
    {
      id: "ieee-cp-challenge",
      title: "IEEE Competitive Programming Challenge",
      issuer: "IEEE Student Branch",
      description: "Competed in the IEEE competitive programming challenge, tackling complex algorithmic problem-solving and data structure optimizations.",
      icon: "Code2",
      category: "Coding Competition",
      linkedInUrl: "https://www.linkedin.com/posts/yuvaakash-kannan-450751360_competitiveprogramming-ieee-coding-activity-7448721799003021312-h373"
    }
  ] as Achievement[],

  skillCategories: [
    {
      title: "Frontend Development",
      color: "#7C3AED",
      skills: [
        { name: "HTML5", level: 95, description: "Semantic markup, accessibility, modern standards" },
        { name: "CSS3", level: 90, description: "Modern layouts, animations, responsive design" },
        { name: "JavaScript", level: 92, description: "ES6+ features and modern practices" },
        { name: "React", level: 88, description: "Building dynamic user interfaces with hooks" },
        { name: "Vue.js", level: 78, description: "Progressive framework for web interfaces" },
        { name: "Tailwind CSS", level: 86, description: "Utility-first CSS framework" }
      ]
    },
    {
      title: "Backend Engineering",
      color: "#3B82F6",
      skills: [
        { name: "Python Full Stack", level: 92, description: "Backend web development, scripting, APIs" },
        { name: "Node.js", level: 88, description: "Building scalable server-side applications" },
        { name: "Express.js", level: 86, description: "Minimalist web framework for Node.js" },
        { name: "Django / Flask", level: 84, description: "Python web frameworks & REST backends" },
        { name: "RESTful APIs", level: 92, description: "Designing and implementing scalable APIs" },
        { name: "PostgreSQL / SQL", level: 88, description: "Relational database architecture & optimization" }
      ]
    },
    {
      title: "AI/ML & Computer Vision",
      color: "#06B6D4",
      skills: [
        { name: "Machine Learning", level: 84, description: "Supervised and unsupervised learning techniques" },
        { name: "Neural Networks", level: 82, description: "Deep learning architectures & implementations" },
        { name: "Computer Vision", level: 86, description: "Image processing, oil spill & object detection" },
        { name: "Natural Language Processing", level: 80, description: "Text analysis, embeddings & language models" },
        { name: "TensorFlow", level: 82, description: "End-to-end open source ML platform" },
        { name: "PyTorch", level: 84, description: "Flexible deep learning framework" }
      ]
    },
    {
      title: "Tools & DevOps",
      color: "#F59E0B",
      skills: [
        { name: "Git & GitHub", level: 92, description: "Version control and collaborative development" },
        { name: "Docker", level: 80, description: "Containerization for consistent deployments" },
        { name: "AWS & Cloud", level: 78, description: "Cloud services and infrastructure" },
        { name: "Linux Shell", level: 82, description: "Command line scripting and administration" },
        { name: "CI/CD Pipelines", level: 80, description: "Automated testing and deployment workflows" },
        { name: "Figma", level: 84, description: "UI/UX design and modern prototyping" }
      ]
    }
  ] as SkillCategory[]
};
