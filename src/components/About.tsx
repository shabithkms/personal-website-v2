import React from "react";
import { motion, type Variants } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Server, Database, ShieldCheck, Zap } from "lucide-react";
import aboutData from "../data/about.json";
import { SectionLabel } from "./SectionLabel";

export const About: React.FC = () => {
  if (!aboutData || (!aboutData.paragraphs?.length && !aboutData.highlights?.length)) {
    return null;
  }

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
    GraduationCap: <GraduationCap className="w-6 h-6" />,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel index="05" title="About Me" subtitle="Who I Am" />

        {/* Content Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12"
        >
          {/* Left Narrative Box */}
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <div className="p-8 border-2 border-ink dark:border-paper shadow-brutal bg-paper dark:bg-ink relative">
              <h4 className="text-xl font-bold text-ink dark:text-paper mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-dim dark:text-accent" />
                Engineered for High Reliability
              </h4>

              {aboutData.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-ink/70 dark:text-paper/70 leading-relaxed mb-4 last:mb-0 text-base"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-4 border-t-2 border-ink/10 dark:border-paper/10 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-ink dark:border-paper text-ink dark:text-paper">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-ink/50 dark:text-paper/50 font-mono uppercase">
                      Architecture
                    </div>
                    <div className="text-sm font-semibold text-ink dark:text-paper">
                      Microservices &amp; REST
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 border-2 border-ink dark:border-paper text-ink dark:text-paper">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-ink/50 dark:text-paper/50 font-mono uppercase">
                      Databases
                    </div>
                    <div className="text-sm font-semibold text-ink dark:text-paper">
                      SQL &amp; NoSQL Systems
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-5">
            {aboutData.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group p-6 border-2 border-ink dark:border-paper hover:shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 bg-paper dark:bg-ink"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0 group-hover:bg-accent group-hover:text-ink transition-colors">
                    {iconMap[item.icon] || <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-ink dark:text-paper">{item.title}</h4>
                    <p className="text-sm text-ink/70 dark:text-paper/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
