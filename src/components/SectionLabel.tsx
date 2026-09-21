import React from "react";
import { motion } from "framer-motion";

interface SectionLabelProps {
  index: string;
  title: React.ReactNode;
  subtitle: string;
  align?: "left" | "center";
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  index,
  title,
  subtitle,
  align = "left",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-end gap-4 ${align === "center" ? "justify-center text-center flex-col" : ""}`}
    >
      <span className="font-mono text-5xl sm:text-6xl font-bold text-ink/10 dark:text-paper/10 leading-none select-none">
        {index}
      </span>
      <div className={align === "center" ? "" : "pb-1"}>
        <div className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-dim dark:text-accent mb-1">
          // {subtitle}
        </div>
        <h3 className="text-3xl sm:text-5xl font-bold text-ink dark:text-paper tracking-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};
