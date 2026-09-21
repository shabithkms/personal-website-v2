import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import experienceData from "../data/experience.json";
import { SectionLabel } from "./SectionLabel";

export const Experience: React.FC = () => {
  if (!experienceData || experienceData.length === 0) {
    return null;
  }
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel index="02" title="Work Experience" subtitle="Career Milestones" />

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative mt-14">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ink dark:bg-paper -translate-x-1/2 origin-top"
          />

          <div className="space-y-10">
            {experienceData.map((exp, expIdx) => (
              <motion.div
                key={expIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: expIdx * 0.1 }}
                className="relative flex flex-col md:flex-row items-start"
              >
                {/* Timeline Marker */}
                <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-20">
                  <div className="w-4 h-4 bg-accent border-2 border-ink dark:border-paper" />
                </div>

                {/* Left/Right Container */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    expIdx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                  }`}
                >
                  <div className="p-7 border-2 border-ink dark:border-paper hover:shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 bg-paper dark:bg-ink group">
                    {/* Header */}
                    <div className="flex flex-col gap-2 mb-4">
                      <div
                        className={`inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase bg-ink dark:bg-paper text-paper dark:text-ink px-3 py-1 w-fit ${
                          expIdx % 2 === 0 ? "md:ml-auto" : ""
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-ink dark:text-paper">{exp.company}</h4>
                    </div>

                    {/* Positions */}
                    <div className="space-y-6 text-left">
                      {exp.positions.map((pos, posIdx) => (
                        <div
                          key={posIdx}
                          className="space-y-3 pt-4 border-t-2 border-ink/10 dark:border-paper/10 first:border-none first:pt-0"
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h5 className="text-base font-bold text-ink dark:text-paper">
                              {pos.title}
                            </h5>
                            <span className="text-xs font-mono text-ink/50 dark:text-paper/50">
                              {pos.period}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {pos.responsibilities.map((resp, respIdx) => (
                              <li
                                key={respIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/70 dark:text-paper/70 leading-relaxed"
                              >
                                <CheckCircle className="w-4 h-4 text-accent-dim dark:text-accent shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
