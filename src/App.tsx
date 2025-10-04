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

// Import data from JSON files
import profileData from "./data/profile.json";
import aboutData from "./data/about.json";
import experienceData from "./data/experience.json";
import skillsData from "./data/skills.json";
import projectsData from "./data/projects.json";
import socialData from "./data/social.json";

// Skill Card Component with mouse tracking
function SkillCard({
  skillGroup,
}: {
  skillGroup: { category: string; items: string[] };
}) {
  const [cardMouse, setCardMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group p-6 rounded-xl bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-transparent hover:border-primary-500/20"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCardMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse spotlight effect */}
      {isHovered && (
        <div
          className="absolute rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            width: "300px",
            height: "300px",
            left: `${cardMouse.x}px`,
            top: `${cardMouse.y}px`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform duration-300">
          {skillGroup.category}
        </h3>
        <ul className="space-y-2">
          {skillGroup.items.map((skill, idx) => (
            <li
              key={idx}
              className="text-slate-600 dark:text-slate-300 flex items-center gap-2 group-hover:translate-x-1 transition-all duration-300"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="w-2 h-2 bg-primary-600 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference to localStorage
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gradient">KMS</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "experience", "skills", "projects", "contact"]
                .filter((item) => {
                  switch (item) {
                    case "home":
                      return true; // Always show home
                    case "about":
                      return aboutData.paragraphs.length > 0;
                    case "experience":
                      return experienceData.length > 0;
                    case "skills":
                      return skillsData.length > 0;
                    case "projects":
                      return projectsData.length > 0;
                    case "contact":
                      return socialData.length > 0;
                    default:
                      return false;
                  }
                })
                .map((item) => (
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
                  <Sun
                    size={20}
                    className="text-slate-600 dark:text-slate-300"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-slate-600 dark:text-slate-300"
                  />
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
                  <Sun
                    size={20}
                    className="text-slate-600 dark:text-slate-300"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-slate-600 dark:text-slate-300"
                  />
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
                  <Menu
                    size={24}
                    className="text-slate-600 dark:text-slate-300"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {["home", "about", "experience", "skills", "projects", "contact"]
                .filter((item) => {
                  switch (item) {
                    case "home":
                      return true; // Always show home
                    case "about":
                      return aboutData.paragraphs.length > 0;
                    case "experience":
                      return experienceData.length > 0;
                    case "skills":
                      return skillsData.length > 0;
                    case "projects":
                      return projectsData.length > 0;
                    case "contact":
                      return socialData.length > 0;
                    default:
                      return false;
                  }
                })
                .map((item) => (
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
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden"
      >
        {/* Mouse Follower Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-400/20 to-blue-400/20 dark:from-primary-600/10 dark:to-blue-600/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        ></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float"
            style={{
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * -0.015}px, ${
                mousePosition.y * -0.015
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Profile Image with Scale Animation */}
          <div className="mb-6 animate-scale-in">
            <img
              src={profileData.profileImage}
              alt={profileData.name}
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover shadow-2xl animate-float ring-4 ring-primary-500/20 hover:ring-8 hover:ring-primary-500/30 transition-all duration-300"
            />
          </div>

          {/* Name with Fade In Down */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white animate-fade-in-down"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            {profileData.name}
          </h1>

          {/* Title with Fade In Up */}
          <p
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            {profileData.title}
          </p>

          {/* Description with Fade In Up */}
          <p
            className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            {profileData.description}
          </p>

          {/* Buttons with Slide Animations */}
          <div className="flex justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 animate-slide-in-left"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all hover:scale-105 animate-slide-in-right"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            >
              View Work
            </a>
          </div>

          {/* Social Icons with Fade In */}
          <div
            className="flex justify-center gap-6 animate-fade-in"
            style={{ animationDelay: "1s", animationFillMode: "both" }}
          >
            {socialData.map((social: any, index: number) => {
              const IconComponent =
                social.icon === "Github"
                  ? Github
                  : social.icon === "Linkedin"
                  ? Linkedin
                  : social.icon === "Instagram"
                  ? Instagram
                  : social.icon === "Mail"
                  ? Mail
                  : Phone;
              return (
                <a
                  key={index}
                  href={social.url}
                  target={
                    social.icon !== "Mail" && social.icon !== "Phone"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    social.icon !== "Mail" && social.icon !== "Phone"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={social.ariaLabel}
                >
                  <IconComponent size={24} />
                </a>
              );
            })}
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-slate-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      {aboutData.paragraphs.length > 0 && (
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
                {aboutData.paragraphs.map(
                  (paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-lg text-slate-600 dark:text-slate-300"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
              <div className="space-y-4">
                {aboutData.highlights.map((highlight: any, index: number) => {
                  const IconComponent =
                    highlight.icon === "Code2"
                      ? Code2
                      : highlight.icon === "Briefcase"
                      ? Briefcase
                      : GraduationCap;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <IconComponent
                        className="text-primary-600 mt-1"
                        size={24}
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experienceData.length > 0 && (
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-900/50"
        >
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
              Experience
            </h2>
            <div className="space-y-8">
              {experienceData.map((company: any, companyIndex: number) => (
                <div
                  key={companyIndex}
                  className={`relative pl-8 ${
                    companyIndex < experienceData.length - 1 ? "pb-8" : ""
                  } border-l-2 border-primary-600`}
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>

                  {/* Company Header - Only show if multiple positions */}
                  {company.positions.length > 1 && (
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {company.company}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {company.duration}
                      </p>
                    </div>
                  )}

                  {/* Positions */}
                  {company.positions.map((position: any, posIndex: number) => (
                    <div
                      key={posIndex}
                      className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                        posIndex < company.positions.length - 1 ? "mb-4" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h4
                          className={`${
                            company.positions.length > 1
                              ? "text-xl"
                              : "text-2xl"
                          } font-semibold text-slate-900 dark:text-white`}
                        >
                          {position.title}
                        </h4>
                        <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                          {position.period}
                        </span>
                      </div>
                      {company.positions?.length === 1 && (
                        <p className="text-lg text-slate-700 dark:text-slate-300 mb-3">
                          {company.company}
                        </p>
                      )}
                      <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                        {position?.responsibilities?.map(
                          (responsibility: string, respIndex: number) => (
                            <li
                              key={respIndex}
                              className="flex items-start gap-2"
                            >
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{responsibility}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skillsData.length > 0 && (
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsData.map((skillGroup: any, index: number) => (
                <SkillCard key={index} skillGroup={skillGroup} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projectsData.length > 0 && (
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center px-4 py-20 bg-white dark:bg-slate-900/50"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project: any, index: number) => (
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
                    {project.tech.map((tech: string, idx: number) => (
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
      )}

      {/* Contact Section */}
      {socialData.length > 0 && (
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
              {socialData
                .filter((s: any) => s.icon === "Mail")
                .map((social: any, index: number) => (
                  <a
                    key={index}
                    href={social.url}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-lg"
                  >
                    <Mail size={24} />
                    Send me an email
                  </a>
                ))}
              <div className="flex justify-center gap-4 pt-8">
                {socialData
                  .filter((s: any) => s.icon !== "Mail")
                  .map((social: any, index: number) => {
                    const IconComponent =
                      social.icon === "Github"
                        ? Github
                        : social.icon === "Linkedin"
                        ? Linkedin
                        : social.icon === "Instagram"
                        ? Instagram
                        : Phone;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target={social.icon !== "Phone" ? "_blank" : undefined}
                        rel={
                          social.icon !== "Phone"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        aria-label={social.ariaLabel}
                      >
                        <IconComponent size={28} />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}

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
