import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download, ArrowUpRight } from "lucide-react";
import profileData from "../data/profile.json";
import aboutData from "../data/about.json";
import skillsData from "../data/skills.json";
import experienceData from "../data/experience.json";
import projectsData from "../data/projects.json";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", show: true },
    {
      name: "Experience",
      href: "#experience",
      show: Boolean(experienceData && experienceData.length > 0),
    },
    {
      name: "Projects",
      href: "#projects",
      show: Boolean(projectsData && projectsData.length > 0),
    },
    {
      name: "Skills",
      href: "#skills",
      show: Boolean(skillsData && skillsData.length > 0),
    },
    {
      name: "About",
      href: "#about",
      show: Boolean(
        aboutData &&
          ((aboutData.paragraphs && aboutData.paragraphs.length > 0) ||
            (aboutData.highlights && aboutData.highlights.length > 0))
      ),
    },
    { name: "Contact", href: "#contact", show: true },
  ].filter((link) => link.show);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b-2 ${
        scrolled
          ? "bg-paper/95 dark:bg-ink/95 backdrop-blur-sm border-ink dark:border-paper"
          : "bg-paper dark:bg-ink border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="flex items-center gap-2 group cursor-pointer font-mono"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-ink dark:text-paper">
            {"shabith"}
            <span className="text-accent-dim dark:text-accent bg-ink dark:bg-paper px-0.5">
              .dev
            </span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="group relative py-2 font-mono text-sm uppercase tracking-wide text-ink dark:text-paper"
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[3px] bg-accent transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions (Theme & CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="press-sm p-2.5 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href={profileData.resumeUrl || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            className="press-sm hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-mono font-semibold uppercase bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper"
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            aria-label="Hire Me"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="press-sm inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-mono font-bold uppercase bg-accent text-ink border-2 border-ink dark:border-paper"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="p-2 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            title="Toggle navigation menu"
            className="p-2 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-paper dark:bg-ink border-t-2 border-b-2 border-ink dark:border-paper overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="block px-2 py-3 font-mono text-base uppercase tracking-wide text-ink dark:text-paper border-b border-ink/10 dark:border-paper/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex gap-3">
                <a
                  href={profileData.resumeUrl || "/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 font-mono font-semibold uppercase text-sm border-2 border-ink dark:border-paper text-ink dark:text-paper"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="flex-1 text-center py-3 font-mono font-bold uppercase text-sm bg-accent text-ink border-2 border-ink"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
