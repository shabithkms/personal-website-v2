import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Instagram,
  Phone,
  Sun,
  Moon,
  ArrowUp,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skills = [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "TailwindCSS", "Next.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    { category: "Tools", items: ["Git", "Docker", "AWS", "VS Code"] },
    {
      category: "Other",
      items: ["UI/UX Design", "Agile", "REST APIs", "GraphQL"],
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration and real-time inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates and team collaboration features.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
      link: "#",
    },
    {
      title: "AI Content Generator",
      description:
        "AI-powered content generation tool using modern LLM APIs for creative writing assistance.",
      tech: ["React", "Python", "OpenAI API", "FastAPI"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gradient">KMS</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                "home",
                "about",
                "experience",
                "skills",
                "projects",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* Dark Mode Toggle - Desktop */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-slate-600 dark:text-slate-300" />
                ) : (
                  <Moon size={20} className="text-slate-600 dark:text-slate-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Dark Mode Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-slate-600 dark:text-slate-300" />
                ) : (
                  <Moon size={20} className="text-slate-600 dark:text-slate-300" />
                )}
              </button>
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-slate-600 dark:text-slate-300" />
                ) : (
                  <Menu size={24} className="text-slate-600 dark:text-slate-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {[
                "home",
                "about",
                "experience",
                "skills",
                "projects",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left capitalize py-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-16"
      >
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6">
            <img
              src="/profile.jpeg"
              alt="Muhammed Shabith K"
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-2xl animate-float ring-4 ring-primary-500/20"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
            Muhammed Shabith K
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Passionate about building beautiful, functional web applications
            that make a difference. Specializing in modern web technologies and
            user-centric design.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              View Work
            </a>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+919876543210"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-slate-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-900/50"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                I'm a passionate full-stack developer with a keen eye for design
                and a love for creating seamless user experiences. With
                expertise in modern web technologies, I bring ideas to life
                through clean, efficient code.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <Code2 className="text-primary-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Development
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Building scalable web applications with modern frameworks
                    and best practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <Briefcase className="text-primary-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Experience
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Delivering high-quality solutions for clients across various
                    industries.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <GraduationCap className="text-primary-600 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Learning
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Continuously expanding my skillset and staying current with
                    industry trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-900/50"
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            Experience
          </h2>
          <div className="space-y-8">
            {/* Experience Item 1 - Current Company with Multiple Positions */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary-600">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>

              {/* Company Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Iotics
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  2020 - Present
                </p>
              </div>

              {/* Position 1 - Senior Software Developer */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Senior Software Developer
                  </h4>
                  <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                    2022 - Present
                  </span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Led development of scalable web applications serving 100K+
                      users
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Architected microservices infrastructure using Node.js and
                      Docker
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Mentored junior developers and conducted code reviews
                    </span>
                  </li>
                </ul>
              </div>

              {/* Position 2 - Software Developer */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Software Developer
                  </h4>
                  <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                    2020 - 2022
                  </span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Developed responsive web applications using React and
                      TypeScript
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Implemented RESTful APIs and integrated third-party
                      services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Collaborated with cross-functional teams on feature
                      development
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="relative pl-8 pb-8 border-l-2 border-primary-600">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Full Stack Developer
                  </h3>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    2020 - 2022
                  </span>
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-3">
                  Digital Solutions Ltd.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Developed responsive web applications using React and
                      TypeScript
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Implemented RESTful APIs and integrated third-party
                      services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Improved application performance by 40% through
                      optimization
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experience Item 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Junior Developer
                  </h3>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    2018 - 2020
                  </span>
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-3">
                  Startup Innovations
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Built and maintained client websites using modern web
                      technologies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Collaborated with design team to implement pixel-perfect
                      UIs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>
                      Participated in agile development processes and daily
                      standups
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, idx) => (
                    <li
                      key={idx}
                      className="text-slate-600 dark:text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-900/50"
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:gap-3 transition-all"
                >
                  View Project <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-2xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Let's Work Together
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="space-y-6">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              <Mail size={24} />
              Send me an email
            </a>
            <div className="flex justify-center gap-4 pt-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={28} />
              </a>
              <a
                href="tel:+919876543210"
                className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Phone"
              >
                <Phone size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 Muhammed Shabith K. All rights reserved.</p>
          <p className="mt-2 text-sm text-slate-400">
            Built with React, TypeScript & TailwindCSS
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110 z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
