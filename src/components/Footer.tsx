import React from "react";
import { ArrowUp, Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";
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
    <footer className="py-10 border-t-2 border-ink dark:border-paper bg-paper dark:bg-ink relative overflow-hidden text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <span className="font-mono font-bold text-sm tracking-tight text-ink dark:text-paper">
          {profileData.name}
        </span>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {socialData.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press-sm p-2 border-2 border-ink dark:border-paper text-ink dark:text-paper"
              title={social.name}
              aria-label={social.ariaLabel}
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>

        {/* Dynamic Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-ink/50 dark:text-paper/50 text-xs">
            © {new Date().getFullYear()} {profileData.name}
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="press-sm p-2.5 border-2 border-ink dark:border-paper text-ink dark:text-paper flex items-center gap-1.5 font-mono font-medium"
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
