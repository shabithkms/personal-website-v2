import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Activity, ArrowUpRight } from "lucide-react";
import projectsData from "../data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
  metrics?: string;
  category: string;
}

const typedProjectsData = projectsData as Project[];

export const Projects: React.FC = () => {
  if (!typedProjectsData || typedProjectsData.length === 0) {
    return null;
  }

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Backend System", "Architecture", "Data Engineering", "Full Stack"];

  const filteredProjects =
    selectedCategory === "All"
      ? typedProjectsData
      : typedProjectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-100/60 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-12"
        >
          <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            // Featured Implementations
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            System & <span className="text-gradient">API Architecture</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full" />
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white dark:text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

              <div>
                {/* Header Metrics Pill & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    {project.category}
                  </span>

                  {project.metrics && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      <Activity className="w-3.5 h-3.5" />
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-3 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h4>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs font-medium text-cyan-700 dark:text-cyan-300/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
