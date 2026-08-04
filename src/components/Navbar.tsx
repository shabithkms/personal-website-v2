import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";
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
      name: "About",
      href: "#about",
      show: Boolean(
        aboutData &&
          ((aboutData.paragraphs && aboutData.paragraphs.length > 0) ||
            (aboutData.highlights && aboutData.highlights.length > 0))
      ),
    },
    {
      name: "Skills",
      href: "#skills",
      show: Boolean(skillsData && skillsData.length > 0),
    },
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
    { name: "API Console", href: "#playground", show: true },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 shadow-lg dark:shadow-2xl shadow-cyan-950/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-900 transition-colors">
              <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-wider text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            SHABITH<span className="text-cyan-600 dark:text-cyan-400">.DEV</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800/80 shadow-sm">
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
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-slate-100 dark:bg-slate-800/90 rounded-full -z-10 border border-cyan-500/30"
                    transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions (Theme & CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 shadow-sm"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-xl group-hover:opacity-90 transition-opacity" />
            <span className="relative block px-4 py-2 text-sm font-semibold bg-white dark:bg-slate-950 rounded-[11px] text-slate-900 dark:text-slate-100 group-hover:bg-transparent group-hover:text-white transition-all duration-300">
              Hire Me
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500"
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
            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white dark:text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
