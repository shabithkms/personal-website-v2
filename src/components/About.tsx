import React from "react";
import { motion, type Variants } from "framer-motion";
import { Code2, Briefcase, GraduationCap, Server, Database, ShieldCheck, Zap } from "lucide-react";
import aboutData from "../data/about.json";

export const About: React.FC = () => {
  if (!aboutData || (!aboutData.paragraphs?.length && !aboutData.highlights?.length)) {
    return null;
  }

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
    Briefcase: <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 20 },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          className="text-center space-y-3 mb-16"
        >
          <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            // Who I Am
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            About <span className="text-gradient">My Journey</span>
          </h3>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full origin-center"
          />
        </motion.div>

        {/* Content Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Narrative Box */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-xl shadow-xl relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Engineered for High Reliability
              </h4>

              {aboutData.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 last:mb-0 text-base">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800/80 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Architecture</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Microservices & REST</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Databases</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">SQL & NoSQL Systems</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-5">
            {aboutData.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring" as const, stiffness: 350, damping: 25 }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md shadow-md hover:shadow-2xl hover:shadow-cyan-950/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500/30 transition-colors shrink-0">
                    {iconMap[item.icon] || <ShieldCheck className="w-6 h-6 text-cyan-500" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
