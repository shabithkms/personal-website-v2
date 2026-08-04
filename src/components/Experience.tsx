import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import experienceData from "../data/experience.json";

export const Experience: React.FC = () => {
  if (!experienceData || experienceData.length === 0) {
    return null;
  }
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center space-y-3 mb-16"
        >
          <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            // Career Milestones
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent -translate-x-1/2 opacity-40 origin-top"
          />

          <div className="space-y-12">
            {experienceData.map((exp, expIdx) => (
              <motion.div
                key={expIdx}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 110, damping: 22, delay: expIdx * 0.15 }}
                className="relative flex flex-col md:flex-row items-start"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-20">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-7 h-7 rounded-full bg-white dark:bg-slate-950 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  </motion.div>
                </div>

                {/* Left/Right Container */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${expIdx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="p-7 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-1 mb-4">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full w-fit md:group-hover:scale-105 transition-transform">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {exp.company}
                      </h4>
                    </div>

                    {/* Positions */}
                    <div className="space-y-6 text-left">
                      {exp.positions.map((pos, posIdx) => (
                        <div key={posIdx} className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800/60 first:border-none first:pt-0">
                          <div className="flex items-center justify-between">
                            <h5 className="text-base font-bold text-indigo-600 dark:text-indigo-300">
                              {pos.title}
                            </h5>
                            <span className="text-xs text-slate-500">{pos.period}</span>
                          </div>

                          <ul className="space-y-2">
                            {pos.responsibilities.map((resp, respIdx) => (
                              <li key={respIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
