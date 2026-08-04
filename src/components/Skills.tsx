import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Server, Database, Cloud, Code, Wrench, Layers } from "lucide-react";
import skillsData from "../data/skills.json";

export const Skills: React.FC = () => {
  if (!skillsData || skillsData.length === 0) {
    return null;
  }

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    "Backend Frameworks & Technologies": <Server className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    "Databases & ORMs": <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    "Cloud & DevOps": <Cloud className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    "Frontend Frameworks & Libraries": <Code className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    "Tools & Utilities": <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    "Programming Languages": <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  };

  const categories = ["All", ...skillsData.map((s) => s.category)];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-100/60 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center space-y-3 mb-12"
        >
          <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            // Tech Stack & Tooling
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Skills & <span className="text-gradient">Architectural Arsenal</span>
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-cyan-500 text-white dark:text-slate-950 font-bold shadow-lg shadow-cyan-500/25"
                  : "bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 130, damping: 18, delay: groupIdx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl shadow-md hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                    {categoryIcons[group.category] || <Layers className="w-5 h-5 text-cyan-500" />}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {group.category}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIdx) => (
                    <motion.span
                      key={itemIdx}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-200 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {item}
                    </motion.span>
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
