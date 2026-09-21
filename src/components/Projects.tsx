import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Activity, ArrowUpRight } from "lucide-react";
import projectsData from "../data/projects.json";
import { SectionLabel } from "./SectionLabel";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!typedProjectsData || typedProjectsData.length === 0) {
    return null;
  }

  const categories = ["All", ...Array.from(new Set(typedProjectsData.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? typedProjectsData
      : typedProjectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-y-2 border-ink dark:border-paper bg-ink/[0.02] dark:bg-paper/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel index="03" title="System & API Architecture" subtitle="Featured Implementations" />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-10 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`press-sm px-4 py-2 font-mono text-xs sm:text-sm font-semibold uppercase border-2 border-ink dark:border-paper transition-colors duration-150 ${
                selectedCategory === cat
                  ? "bg-accent text-ink"
                  : "bg-paper dark:bg-ink text-ink dark:text-paper"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group border-2 border-ink dark:border-paper bg-paper dark:bg-ink hover:shadow-brutal hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-7">
                {/* Header Metrics Pill & Category */}
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <span className="text-xs font-mono font-semibold px-3 py-1 border-2 border-ink dark:border-paper text-ink dark:text-paper uppercase">
                    {project.category}
                  </span>

                  {project.metrics && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink bg-accent px-3 py-1">
                      <Activity className="w-3.5 h-3.5" />
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold text-ink dark:text-paper mb-3 flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-ink/40 dark:text-paper/40 group-hover:text-accent-dim dark:group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </h4>

                {/* Description */}
                <p className="text-ink/70 dark:text-paper/70 text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 border border-ink/30 dark:border-paper/30 text-xs font-mono font-medium text-ink/80 dark:text-paper/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 px-7 py-4 border-t-2 border-ink dark:border-paper">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-ink dark:text-paper hover:text-accent-dim dark:hover:text-accent transition-colors"
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
