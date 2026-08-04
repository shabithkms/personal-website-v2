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
      d="M18.403 5.638A8.955 8.955 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.2 4.488L3 21l4.704-1.233a8.941 8.941 0 004.348 1.127h.004c4.947 0 8.975-4.027 8.977-8.977a8.923 8.923 0 00-2.63-6.279zM12.056 19.38v-.001a7.442 7.442 0 01-3.791-1.042l-.272-.162-2.816.738.751-2.744-.177-.282a7.447 7.447 0 01-1.144-3.955c.002-4.114 3.35-7.461 7.464-7.461a7.42 7.42 0 015.277 2.188 7.42 7.42 0 012.185 5.278c-.002 4.114-3.35 7.462-7.477 7.462zm4.097-5.592c-.225-.113-1.332-.657-1.538-.732-.206-.075-.356-.113-.506.113-.15.225-.58.732-.711.882-.132.15-.263.169-.488.056-.225-.113-.951-.35-1.812-1.118-.67-.597-1.122-1.334-1.254-1.559-.131-.225-.014-.347.098-.459.101-.101.225-.263.338-.394.113-.131.15-.225.225-.375.075-.15.038-.282-.019-.394-.056-.113-.506-1.219-.694-1.669-.183-.438-.369-.378-.506-.385-.131-.007-.281-.009-.431-.009s-.394.056-.6.282c-.206.225-.788.769-.788 1.875 0 1.106.806 2.175.919 2.325.113.15 1.587 2.424 3.846 3.4 1.895.82 2.28.657 2.693.619.413-.038 1.332-.544 1.52-.1.069 1.88-.525.263-.788.075-.263.075-.375.113-.488z"
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
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-300/40 cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </div>

        <span className="hidden sm:inline-block font-bold text-xs sm:text-sm tracking-wide text-white pr-1">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
