import { useState, useEffect } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { TerminalPlayground } from "./components/TerminalPlayground";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";

function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  // Observer for active section scrolling highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "playground", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-black font-sans transition-colors duration-300">
      {/* Top Fluid Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Particle Network Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TerminalPlayground />
        <Contact />
      </main>

      {/* Floating WhatsApp Action Button (Bottom Left) */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
