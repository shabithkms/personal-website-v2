import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Instagram, Phone, Send, Copy, Check } from "lucide-react";
import profileData from "../data/profile.json";
import socialData from "../data/social.json";
import { WhatsAppIcon } from "./WhatsAppButton";
import { SectionLabel } from "./SectionLabel";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const whatsappNumber = "+91 7025259794";
  const whatsappUrl = `https://wa.me/917025259794?text=${encodeURIComponent(
    "Hi Muhammed Shabith, I saw your portfolio website and would like to connect!"
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappNumber);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-4 h-4" />;
      case "Linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "Instagram":
        return <Instagram className="w-4 h-4" />;
      case "Mail":
        return <Mail className="w-4 h-4" />;
      case "Phone":
        return <Phone className="w-4 h-4" />;
      case "MessageCircle":
        return <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Muhammed Shabith,\n\n${formData.message}\n\n---\nName: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionLabel index="06" title="Get In Touch" subtitle="Let's Connect" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mt-12">
          {/* Left Column: Direct Links & Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 border-2 border-ink dark:border-paper shadow-brutal bg-paper dark:bg-ink space-y-6">
              <h4 className="text-xl font-bold text-ink dark:text-paper mb-2">
                Have a project or opportunity?
              </h4>
              <p className="text-ink/70 dark:text-paper/70 text-sm leading-relaxed">
                I am available for freelance projects, technical consulting, and senior backend
                development roles. Feel free to drop a message or reach out directly!
              </p>

              {/* Email Pill with Copy */}
              <div className="p-4 border-2 border-ink dark:border-paper flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-mono text-ink/50 dark:text-paper/50 uppercase">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-sm font-semibold text-ink dark:text-paper hover:text-accent-dim dark:hover:text-accent transition-colors truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="press-sm p-2 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Pill with Copy & Chat */}
              <div className="p-4 border-2 border-ink dark:border-paper flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-mono text-ink/50 dark:text-paper/50 uppercase">
                      WhatsApp
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink dark:text-paper hover:text-accent-dim dark:hover:text-accent transition-colors truncate block"
                    >
                      {whatsappNumber}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyWhatsApp}
                  className="press-sm p-2 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0"
                  title="Copy WhatsApp Number"
                >
                  {copiedWhatsApp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Badge */}
              <div className="p-4 border-2 border-ink dark:border-paper flex items-center gap-3">
                <div className="p-2.5 border-2 border-ink dark:border-paper text-ink dark:text-paper shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-ink/50 dark:text-paper/50 uppercase">
                    Location
                  </div>
                  <div className="text-sm font-semibold text-ink dark:text-paper">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* All Social Buttons Grid */}
              <div className="pt-2">
                <div className="text-xs font-mono font-semibold text-ink/50 dark:text-paper/50 uppercase tracking-wider mb-3">
                  All Channels:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {socialData.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press-sm py-2.5 px-3 border-2 border-ink dark:border-paper text-ink dark:text-paper flex items-center gap-2 text-xs font-mono font-semibold"
                    >
                      {getSocialIcon(social.icon)}
                      <span className="truncate">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-8 border-2 border-ink dark:border-paper shadow-brutal bg-paper dark:bg-ink">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 border-2 border-ink dark:border-paper bg-accent text-ink flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-ink dark:text-paper">Message Received!</h4>
                  <p className="text-ink/70 dark:text-paper/70 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. I&apos;ll review your inquiry and get back to you
                    shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h4 className="text-xl font-bold text-ink dark:text-paper mb-6">Send a Message</h4>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-ink/60 dark:text-paper/60 mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-ink dark:border-paper bg-paper dark:bg-ink text-ink dark:text-paper placeholder:text-ink/30 dark:placeholder:text-paper/30 focus:outline-none focus:bg-accent/10 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-ink/60 dark:text-paper/60 mb-2 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-ink dark:border-paper bg-paper dark:bg-ink text-ink dark:text-paper placeholder:text-ink/30 dark:placeholder:text-paper/30 focus:outline-none focus:bg-accent/10 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-ink/60 dark:text-paper/60 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, team, or opportunity..."
                      className="w-full px-4 py-3 border-2 border-ink dark:border-paper bg-paper dark:bg-ink text-ink dark:text-paper placeholder:text-ink/30 dark:placeholder:text-paper/30 focus:outline-none focus:bg-accent/10 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="press w-full py-4 bg-accent text-ink border-2 border-ink dark:border-paper font-mono font-bold uppercase flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
