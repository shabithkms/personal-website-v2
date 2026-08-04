import { useState, useEffect, lazy, Suspense } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ComponentSkeleton } from "./components/SkeletonLoader";

// Lazy load heavy below-the-fold components to reduce initial JS payload
const ParticleBackground = lazy(() =>
  import("./components/ParticleBackground").then((m) => ({ default: m.ParticleBackground }))
);
const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills").then((m) => ({ default: m.Skills })));
const Experience = lazy(() =>
  import("./components/Experience").then((m) => ({ default: m.Experience }))
);
const Projects = lazy(() => import("./components/Projects").then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

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
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
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

      {/* Lazy Loaded Interactive Canvas Background */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Navigation - Synchronous Critical Shell */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Critical Above-the-fold Hero Renders Instantly */}
      <main className="relative z-10 space-y-4">
        <Hero />

        {/* Deferred Below-the-fold Sections */}
        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <About />
        </Suspense>

        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
