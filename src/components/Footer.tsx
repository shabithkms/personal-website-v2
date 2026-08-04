import React from "react";
import { ArrowUp, Terminal, Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import profileData from "../data/profile.json";
import socialData from "../data/social.json";
import { WhatsAppIcon } from "./WhatsAppButton";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-4 h-4" />;
      case "Linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "Instagram":
        return <Instagram className="w-4 h-4" />;
      case "Mail":
        return <Mail className="w-4 h-4" />;
      case "Phone":
        return <Phone className="w-4 h-4" />;
      case "MessageCircle":
        return <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 relative overflow-hidden text-xs text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-wider text-slate-900 dark:text-slate-200">
            {profileData.name}
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socialData.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              title={social.name}
              aria-label={social.ariaLabel}
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>

        {/* Dynamic Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Muhammed Shabith K.
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all flex items-center gap-1.5 font-medium"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
