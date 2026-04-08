import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { useState } from "react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:prathmeshkattukar@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/pk4038" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/prathmesh-kattukar-1670b21b3/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/prathmesh4038" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-16 px-6">
      <div className="container max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 fade-up">Get In Touch</h2>
        <p className="text-muted-foreground mb-10 fade-up">
          Have a project in mind? Let's talk.
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4 mb-10 fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            <Send size={16} /> Send Message
          </button>
          {submitted && (
            <p className="text-center text-sm text-green-400">Thanks! I'll get back to you soon.</p>
          )}
        </form>

        <div className="flex items-center justify-center gap-6 fade-up">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon size={20} />
              <span className="text-sm hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
