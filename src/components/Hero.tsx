import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  ArrowRight,
  Server,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import profileData from "../data/profile.json";
import socialData from "../data/social.json";
import { WhatsAppIcon } from "./WhatsAppButton";

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
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient Glow Orbs */}
      <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Intro */}
          <motion.div
            className="lg:col-span-7 text-left space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-cyan-500/30 shadow-md text-xs font-medium text-cyan-700 dark:text-cyan-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Freelance Projects & Roles</span>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-600 dark:text-slate-400 font-semibold text-lg tracking-wide uppercase"
              >
                Hello, I'm {profileData.name}
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-none"
              >
                Building Scalable <br />
                <span className="text-gradient">Backend Systems</span> & APIs
              </motion.h1>
            </div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-normal"
            >
              {profileData.description}
            </motion.p>

            {/* Quick Metrics Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3 pt-2 max-w-md"
            >
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  4+ Years
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Backend Experience
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center shadow-sm">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  Senior Dev
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  API & Microservices
                </div>
              </div>
            </motion.div>

            {/* Action Buttons & All Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 pt-4"
            >
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#experience"
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-white dark:text-slate-950 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <span>View Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </div>

              {/* All Social Media Badges */}
              <div className="flex items-center flex-wrap gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pr-2">
                  Connect:
                </span>
                {socialData.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 shadow-sm hover:scale-105 transition-all"
                    title={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Code Window */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span>server.ts — API Architect</span>
                </div>
                <div className="text-xs text-emerald-400 font-sans flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>v2.4.0</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-5 space-y-3 overflow-x-auto text-xs sm:text-sm leading-relaxed text-slate-300">
                <div>
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-cyan-300">{`{ Express, Router }`}</span>{" "}
                  <span className="text-purple-400">from</span>{" "}
                  <span className="text-emerald-300">'express'</span>;
                </div>

                <div className="pt-2 text-slate-500">
                  // Initialize High-Performance API Router
                </div>
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-cyan-300">architect</span> ={" "}
                  <span className="text-purple-400">new</span>{" "}
                  <span className="text-amber-300">Developer</span>({`{`}
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{" "}
                  <span className="text-emerald-300">"{profileData.name}"</span>
                  ,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">socials:</span> [
                  <span className="text-amber-300">'GitHub'</span>,{" "}
                  <span className="text-amber-300">'LinkedIn'</span>,{" "}
                  <span className="text-amber-300">'Instagram'</span>],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">status:</span>{" "}
                  <span className="text-emerald-400">
                    'Building Scalable Systems'
                  </span>
                </div>
                <div>{`});`}</div>

                <div className="pt-2">
                  <span className="text-purple-400">await</span> architect.
                  <span className="text-sky-300">deployScalableServer</span>();
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-sans">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Server active
                </span>
                <span className="text-slate-500">UTF-8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
