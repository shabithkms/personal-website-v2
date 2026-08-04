import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Play, Copy, Check, Sparkles } from "lucide-react";
import profileData from "../data/profile.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";
import experienceData from "../data/experience.json";
import aboutData from "../data/about.json";

export const TerminalPlayground: React.FC = () => {
  const hasProfile = Boolean(profileData && (profileData.name || profileData.description));
  const hasSkills = Boolean(skillsData && skillsData.length > 0);
  const hasProjects = Boolean(projectsData && projectsData.length > 0);
  const hasExperience = Boolean(experienceData && experienceData.length > 0);

  const [inputCmd, setInputCmd] = useState<string>(
    hasProfile ? "curl /api/v1/profile" : "ping"
  );
  const [logs, setLogs] = useState<
    Array<{ type: "cmd" | "res" | "error" | "ai"; text: string }>
  >(
    hasProfile
      ? [
          { type: "cmd", text: "curl /api/v1/profile" },
          {
            type: "res",
            text: JSON.stringify(
              {
                status: 200,
                success: true,
                message: "API Architect metadata retrieved",
                data: profileData,
              },
              null,
              2
            ),
          },
        ]
      : [
          { type: "cmd", text: "ping" },
          {
            type: "res",
            text: `HTTP/1.1 200 OK\nContent-Type: application/json\nLatency: 8ms\nServer: Node.js/Express (v20.x)\nStatus: Healthy 🟢`,
          },
        ]
  );
  const [copied, setCopied] = useState(false);

  const answerAiQuestion = (query: string): string => {
    const q = query.toLowerCase();

    if (
      q.includes("shabithkms") ||
      q.includes("muhammed shabith") ||
      q.includes("who is") ||
      q.includes("shabith") ||
      q.includes("about")
    ) {
      return `🤖 AI Assistant: Muhammed Shabith K (known online as @shabithkms) is a Senior Backend Developer & API Architect with 4+ years of experience. He specializes in Node.js, TypeScript, PostgreSQL, MongoDB, Redis, Docker, and AWS cloud infrastructure. Currently leading backend development at Iotics. Email: ${profileData.email} | WhatsApp: +91 7025259794`;
    }
    if (q.includes("experience") || q.includes("work") || q.includes("year")) {
      return `🤖 AI Assistant: Muhammed Shabith K has 4+ years of experience in Backend Engineering. Currently a Senior Software Developer at Iotics (March 2024 - Present), previously Software Developer (March 2022 - March 2024), and Full Stack Intern at Brototype.`;
    }
    if (q.includes("database") || q.includes("sql") || q.includes("mongo") || q.includes("redis")) {
      return `🤖 AI Assistant: Shabith works with PostgreSQL, MongoDB, Redis, Prisma ORM, and Mongoose for high-performance data storage and caching.`;
    }
    if (q.includes("docker") || q.includes("aws") || q.includes("cloud") || q.includes("devops")) {
      return `🤖 AI Assistant: Shabith's cloud & DevOps arsenal includes AWS (EC2, S3, Route 53), Docker containerization, NGINX, GitHub Actions CI/CD pipelines, and PM2 process management.`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach")) {
      return `🤖 AI Assistant: You can reach Shabith directly via Email at ${profileData.email} or WhatsApp at +91 7025259794.`;
    }
    if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
      return `🤖 AI Assistant: Shabith specializes in Node.js, TypeScript, Express, Fastify, GraphQL, REST APIs, Microservices, PostgreSQL, Redis, Docker, and AWS.`;
    }

    return `🤖 AI Assistant: Muhammed Shabith K (@shabithkms) is a Senior Backend Developer & API Architect with 4+ years of experience building high-throughput microservices. Try asking "Who is shabithkms", "skills", "experience", "databases", or "contact".`;
  };

  const handleCommand = (cmdStr?: string) => {
    const raw = (cmdStr || inputCmd).trim();
    if (!raw) return;

    if (raw === "clear") {
      setLogs([]);
      setInputCmd("");
      return;
    }

    const newLogs = [...logs, { type: "cmd" as const, text: raw }];

    if (raw.toLowerCase().startsWith("ask ") || raw.toLowerCase().startsWith("ai ")) {
      const question = raw.replace(/^(ask|ai)\s+/i, "");
      const answer = answerAiQuestion(question);
      newLogs.push({ type: "ai", text: answer });
    } else if (raw === "help") {
      const endpoints: string[] = [];
      if (hasProfile) endpoints.push("  - curl /api/v1/profile    : View developer overview");
      if (hasSkills) endpoints.push("  - curl /api/v1/skills     : Fetch skill categories & stack");
      if (hasProjects) endpoints.push("  - curl /api/v1/projects   : Query featured architecture projects");
      if (hasExperience) endpoints.push("  - curl /api/v1/experience : View career timeline");
      endpoints.push("  - ask <question>          : Ask AI Assistant about Shabith's skills or experience");
      endpoints.push("  - ping                    : Test server latency");
      endpoints.push("  - whoami                  : Identify client session");
      endpoints.push("  - clear                   : Clear terminal output screen");

      newLogs.push({
        type: "res",
        text: `Available Endpoints & Commands:\n${endpoints.join("\n")}`,
      });
    } else if ((raw === "curl /api/v1/profile" || raw === "get /profile") && hasProfile) {
      newLogs.push({
        type: "res",
        text: JSON.stringify({ status: 200, success: true, data: profileData }, null, 2),
      });
    } else if ((raw === "curl /api/v1/skills" || raw === "get /skills") && hasSkills) {
      newLogs.push({
        type: "res",
        text: JSON.stringify({ status: 200, totalCategories: skillsData.length, data: skillsData }, null, 2),
      });
    } else if ((raw === "curl /api/v1/projects" || raw === "get /projects") && hasProjects) {
      newLogs.push({
        type: "res",
        text: JSON.stringify({ status: 200, totalProjects: projectsData.length, data: projectsData }, null, 2),
      });
    } else if ((raw === "curl /api/v1/experience" || raw === "get /experience") && hasExperience) {
      newLogs.push({
        type: "res",
        text: JSON.stringify({ status: 200, data: experienceData }, null, 2),
      });
    } else if (raw === "ping") {
      newLogs.push({
        type: "res",
        text: `HTTP/1.1 200 OK\nContent-Type: application/json\nLatency: 8ms\nServer: Node.js/Express (v20.x)\nStatus: Healthy 🟢`,
      });
    } else if (raw === "whoami") {
      newLogs.push({
        text: `User: Visiting Recruiter / Engineer\nIP: 127.0.0.1\nUser-Agent: Modern Portfolio Client`,
        type: "res",
      });
    } else {
      newLogs.push({
        type: "error",
        text: `404 Not Found: Command or endpoint '${raw}' not recognized. Type 'help' or 'ask <question>' to ask the AI assistant.`,
      });
    }

    setLogs(newLogs);
    setInputCmd("");
  };

  const copyResponse = () => {
    const textToCopy = logs.map((l) => l.text).join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 relative overflow-hidden">
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
            // Interactive Live Playground & AI Assistant
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Backend <span className="text-gradient">API & AI Console</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto pt-2">
            Test mock endpoints or type <span className="text-cyan-500 font-bold font-mono">ask &lt;question&gt;</span> to query the AI assistant.
          </p>
        </motion.div>

        {/* Console Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono">
          {/* Top Bar */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 pl-2 font-sans flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                api.shabith.dev (bash + AI agent)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyResponse}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors text-xs flex items-center gap-1 font-sans"
                title="Copy output"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={() => handleCommand("clear")}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors text-xs font-sans"
                title="Clear screen"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800 flex flex-wrap gap-2 text-xs font-sans">
            <span className="text-slate-500 flex items-center self-center pr-1">Presets:</span>
            {hasProfile && (
              <button
                onClick={() => handleCommand("curl /api/v1/profile")}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors"
              >
                GET /profile
              </button>
            )}
            {hasSkills && (
              <button
                onClick={() => handleCommand("curl /api/v1/skills")}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-400 hover:bg-slate-800 transition-colors"
              >
                GET /skills
              </button>
            )}
            {hasProjects && (
              <button
                onClick={() => handleCommand("curl /api/v1/projects")}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition-colors"
              >
                GET /projects
              </button>
            )}
            {hasExperience && (
              <button
                onClick={() => handleCommand("curl /api/v1/experience")}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400 hover:bg-slate-800 transition-colors"
              >
                GET /experience
              </button>
            )}
            <button
              onClick={() => handleCommand("ask Who is shabithkms?")}
              className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>ask Who is shabithkms?</span>
            </button>
            <button
              onClick={() => handleCommand("ping")}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-colors"
            >
              ping
            </button>
            <button
              onClick={() => handleCommand("help")}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-400 hover:bg-slate-800 transition-colors"
            >
              help
            </button>
          </div>

          {/* Output Logs */}
          <div className="p-5 min-h-[300px] max-h-[420px] overflow-y-auto space-y-4 text-xs sm:text-sm">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                {log.type === "cmd" ? (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="text-emerald-400">shabith@backend:~$</span>
                    <span className="font-semibold text-slate-100">{log.text}</span>
                  </div>
                ) : log.type === "ai" ? (
                  <div className="text-cyan-300 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/60 leading-relaxed font-sans text-xs sm:text-sm">
                    {log.text}
                  </div>
                ) : log.type === "error" ? (
                  <div className="text-rose-400 bg-rose-950/30 p-3 rounded-lg border border-rose-900/40">
                    {log.text}
                  </div>
                ) : (
                  <pre className="text-emerald-300/90 whitespace-pre-wrap bg-slate-900/40 p-3 rounded-lg border border-slate-800 leading-relaxed overflow-x-auto">
                    {log.text}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand();
            }}
            className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-emerald-400 text-xs sm:text-sm">shabith@backend:~$</span>
            <input
              type="text"
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              placeholder="Type 'help' or 'ask <question>'..."
              className="flex-1 bg-transparent text-slate-100 focus:outline-none text-xs sm:text-sm font-mono placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors font-bold text-xs flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Run</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
