import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Terminal,
} from "lucide-react";
import profileData from "../data/profile.json";
import socialData from "../data/social.json";
import skillsData from "../data/skills.json";
import { WhatsAppIcon } from "./WhatsAppButton";

const tickerItems = Array.from(new Set(skillsData.flatMap((group) => group.items))).slice(0, 14);

export const Hero: React.FC = () => {
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-5 h-5" />;
      case "Linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "Instagram":
        return <Instagram className="w-5 h-5" />;
      case "Mail":
        return <Mail className="w-5 h-5" />;
      case "Phone":
        return <Phone className="w-5 h-5" />;
      case "MessageCircle":
        return <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 pb-16 flex flex-col overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start pt-8">
          {/* Left Column: Headline & Intro */}
          <motion.div
            className="lg:col-span-7 text-left space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-ink dark:border-paper text-xs font-mono font-semibold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-dim dark:bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-dim dark:bg-accent"></span>
              </span>
              <span>Available for freelance & senior roles</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h2 className="text-ink/60 dark:text-paper/60 font-mono font-medium text-sm sm:text-base tracking-wide uppercase">
                Hello, I&apos;m {profileData.name} —
              </h2>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink dark:text-paper tracking-tight leading-[0.98]">
                Building scalable
                <br />
                <span className="text-highlight">backend systems</span>
                <br />
                &amp; APIs
              </h1>
            </div>

            {/* Bio Paragraph */}
            <p className="text-ink/70 dark:text-paper/70 text-base sm:text-lg max-w-2xl leading-relaxed border-l-2 border-ink/20 dark:border-paper/20 pl-4">
              {profileData.description}
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
              <div className="p-3 border-2 border-ink dark:border-paper text-center">
                <div className="text-xl font-bold text-ink dark:text-paper">4+ Years</div>
                <div className="text-xs text-ink/60 dark:text-paper/60 font-mono uppercase">
                  Backend Experience
                </div>
              </div>
              <div className="p-3 border-2 border-ink dark:border-paper text-center">
                <div className="text-xl font-bold text-ink dark:text-paper">Senior Dev</div>
                <div className="text-xs text-ink/60 dark:text-paper/60 font-mono uppercase">
                  API &amp; Microservices
                </div>
              </div>
            </div>

            {/* Action Buttons & All Social Links */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#experience"
                  className="press group inline-flex items-center gap-2 px-6 py-3.5 bg-ink dark:bg-paper text-paper dark:text-ink font-mono font-bold uppercase text-sm border-2 border-ink dark:border-paper"
                >
                  <span>View Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={profileData.resumeUrl || "/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume"
                  className="press inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-ink font-mono font-bold uppercase text-sm border-2 border-ink dark:border-paper"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>

                <a
                  href="#contact"
                  className="press inline-flex items-center gap-2 px-6 py-3.5 bg-paper dark:bg-ink text-ink dark:text-paper font-mono font-bold uppercase text-sm border-2 border-ink dark:border-paper"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </div>

              {/* All Social Media Badges */}
              <div className="flex items-center flex-wrap gap-2 pt-2">
                <span className="text-xs font-mono font-semibold text-ink/50 dark:text-paper/50 uppercase tracking-wider pr-2">
                  Connect:
                </span>
                {socialData.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="press-sm p-3 bg-paper dark:bg-ink border-2 border-ink dark:border-paper text-ink dark:text-paper"
                    title={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Code Window */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="border-2 border-ink dark:border-paper shadow-brutal-lg overflow-hidden font-mono text-sm bg-ink text-paper">
              {/* Window Bar */}
              <div className="px-4 py-3 border-b-2 border-paper flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-signal" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-paper" />
                </div>
                <div className="text-xs text-paper/70 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  <span>server.ts</span>
                </div>
                <div className="text-xs text-accent">v2.4.0</div>
              </div>

              {/* Code Content */}
              <div className="p-5 space-y-3 overflow-x-auto text-xs sm:text-sm leading-relaxed text-paper/80">
                <div>
                  <span className="text-accent">import</span>{" "}
                  <span className="text-paper">{`{ Express, Router }`}</span>{" "}
                  <span className="text-accent">from</span>{" "}
                  <span className="text-paper/60">'express'</span>;
                </div>

                <div className="pt-2 text-paper/40">
                  // Initialize high-performance API router
                </div>
                <div>
                  <span className="text-accent">const</span>{" "}
                  <span className="text-paper">architect</span> ={" "}
                  <span className="text-accent">new</span>{" "}
                  <span className="text-paper">Developer</span>({`{`}
                </div>
                <div className="pl-4">
                  <span className="text-paper/60">name:</span>{" "}
                  <span className="text-paper">"{profileData.name}"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-paper/60">socials:</span> [
                  <span className="text-paper">'GitHub'</span>,{" "}
                  <span className="text-paper">'LinkedIn'</span>,{" "}
                  <span className="text-paper">'Instagram'</span>],
                </div>
                <div className="pl-4">
                  <span className="text-paper/60">status:</span>{" "}
                  <span className="text-accent">'Building Scalable Systems'</span>
                </div>
                <div>{`});`}</div>

                <div className="pt-2">
                  <span className="text-accent">await</span> architect.
                  <span className="text-paper">deployScalableServer</span>();
                  <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-blink" />
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t-2 border-paper flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="w-1.5 h-1.5 bg-accent" /> Server active
                </span>
                <span className="text-paper/40">UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-16 border-y-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="mx-4 flex items-center gap-4 font-mono text-sm uppercase tracking-wide"
            >
              {item}
              <span className="text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
