import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Server, Database, Cloud, Code, Wrench, Layers } from "lucide-react";
import skillsData from "../data/skills.json";
import { SectionLabel } from "./SectionLabel";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!skillsData || skillsData.length === 0) {
    return null;
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    "Backend Frameworks & Technologies": <Server className="w-5 h-5" />,
    "Databases & ORMs": <Database className="w-5 h-5" />,
    "Cloud & DevOps": <Cloud className="w-5 h-5" />,
    "Frontend Frameworks & Libraries": <Code className="w-5 h-5" />,
    "Tools & Utilities": <Wrench className="w-5 h-5" />,
    "Programming Languages": <Cpu className="w-5 h-5" />,
  };

  const categories = ["All", ...skillsData.map((s) => s.category)];

  const filteredSkills =
    activeCategory === "All" ? skillsData : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden border-y-2 border-ink dark:border-paper bg-ink/[0.02] dark:bg-paper/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel index="04" title="Architectural Arsenal" subtitle="Tech Stack & Tooling" />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-10 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`press-sm px-4 py-2 font-mono text-xs sm:text-sm font-semibold uppercase border-2 border-ink dark:border-paper transition-colors duration-150 ${
                activeCategory === cat
                  ? "bg-accent text-ink"
                  : "bg-paper dark:bg-ink text-ink dark:text-paper"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                className="group border-2 border-ink dark:border-paper bg-paper dark:bg-ink hover:shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink">
                  {categoryIcons[group.category] || <Layers className="w-5 h-5" />}
                  <h4 className="text-sm font-bold uppercase tracking-wide">{group.category}</h4>
                </div>

                <div className="flex flex-wrap gap-2 p-5">
                  {group.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-ink/30 dark:border-paper/30 text-xs font-mono font-medium text-ink/80 dark:text-paper/80"
                    >
                      <span className="w-1.5 h-1.5 bg-accent-dim dark:bg-accent" />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
