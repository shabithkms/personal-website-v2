import React from "react";
import { motion } from "framer-motion";

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.403 5.633A8.919 8.919 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977a8.958 8.958 0 001.2 4.488L3 21l4.65-1.219a8.966 8.966 0 004.4 1.121h.005c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 00-2.63-6.292zM12.053 19.681h-.003a7.445 7.445 0 01-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 01-1.141-3.971c0-4.114 3.349-7.462 7.465-7.462 1.994 0 3.87.778 5.281 2.191a7.424 7.424 0 012.184 5.281c-.002 4.114-3.351 7.462-7.468 7.462zm4.096-5.591c-.225-.113-1.327-.655-1.533-.73-.206-.075-.356-.112-.505.112-.15.225-.579.729-.709.879-.13.149-.261.168-.486.056-.225-.112-.947-.348-1.804-1.113-.667-.595-1.117-1.329-1.248-1.554-.13-.224-.014-.345.098-.457.101-.1.224-.261.336-.392.112-.13.149-.224.224-.374.075-.15.037-.28-.019-.393-.056-.112-.505-1.217-.692-1.667-.181-.435-.366-.377-.505-.383a9.65 9.65 0 00-.43-.008.826.826 0 00-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.472.537.171 1.026.147 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263z"
    />
  </svg>
);

export const WhatsAppButton: React.FC = () => {
  const messageText = encodeURIComponent(
    "Hi Muhammed Shabith, I saw your portfolio website and would like to connect!"
  );
  const whatsappUrl = `https://wa.me/917025259794?text=${messageText}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="press group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 bg-[#d7ff3d] text-ink border-2 border-ink dark:border-paper cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink dark:bg-paper opacity-60"></span>
            <span className="relative inline-flex h-2.5 w-2.5 bg-ink dark:bg-paper border border-paper dark:border-ink"></span>
          </span>
        </div>

        <span className="hidden sm:inline-block font-mono font-semibold text-xs tracking-wide uppercase pr-1">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
