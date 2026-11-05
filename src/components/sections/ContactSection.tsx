import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Mail, Send, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';
import { IconGithub, IconLinkedin } from '../ui/SocialIcons';

export const ContactSection: React.FC = () => {
  const { contact } = PORTFOLIO_DATA.personalInfo;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xyeyewnl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          _replyto: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      index={7}
      title="Get In Touch"
      subtitle="Feel free to reach out for project collaborations, internships, or engineering discussions!"
    >
      <div className="space-y-8">
        {/* Quick Contact Links Row */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-sm font-semibold text-cyan-300 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{contact.email}</span>
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-sm font-semibold text-slate-200 hover:text-white transition-all"
          >
            <IconLinkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-sm font-semibold text-slate-200 hover:text-white transition-all"
          >
            <IconGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Full Width Contact Form */}
        {submitted ? (
          <div className="p-10 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-cyan-400 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for reaching out. Yuvaakash will get back to you at {contact.email} as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 pb-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Send Direct Message</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message here..."
                className="w-full px-5 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-600/30 hover:shadow-cyan-400/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Transmitting Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
};
