import { Github, Linkedin, Twitter, Mail, Send } from "lucide-react";
import { useState } from "react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:prathmeshkattukar@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/pk4038" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/prathmesh-kattukar-1670b21b3/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/prathmesh4038" },
];

// TODO: Paste your Formspree endpoint here once you've created a form at https://formspree.io
// It looks like "https://formspree.io/f/xxxxxxxx"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target as HTMLFormElement),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send size={16} /> {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-center text-sm text-green-400">Thanks! I'll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-400">
              Something went wrong sending your message. Please try again or email me directly.
            </p>
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
