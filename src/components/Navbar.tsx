import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Palette, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const accentColors = [
  { name: "Blue", hsl: "217 91% 60%" },
  { name: "Orange", hsl: "25 95% 53%" },
  { name: "Green", hsl: "142 71% 45%" },
  { name: "Purple", hsl: "263 70% 58%" },
  { name: "Pink", hsl: "330 81% 60%" },
  { name: "Red", hsl: "0 84% 60%" },
];

const applyAccent = (hsl: string) => {
  const root = document.documentElement;
  root.style.setProperty("--primary", hsl);
  root.style.setProperty("--accent", hsl);
  root.style.setProperty("--ring", hsl);
  root.style.setProperty("--glow", hsl);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return !document.documentElement.classList.contains("light");
    }
    return true;
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAccent, setActiveAccent] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accent-color") || accentColors[0].hsl;
    }
    return accentColors[0].hsl;
  });
  const paletteRef = useRef<HTMLDivElement>(null);

  // Apply saved accent on mount
  useEffect(() => {
    const saved = localStorage.getItem("accent-color");
    if (saved) applyAccent(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close palette on outside click
  useEffect(() => {
    if (!paletteOpen) return;
    const handler = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [paletteOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
  };

  const selectAccent = (hsl: string) => {
    setActiveAccent(hsl);
    applyAccent(hsl);
    localStorage.setItem("accent-color", hsl);
    setPaletteOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-6">
        <a
          href="#hero"
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          PK<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
            >
              {link.label}
            </a>
          ))}

          <div className="relative ml-2" ref={paletteRef}>
            <button
              onClick={() => setPaletteOpen((o) => !o)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Change accent color"
            >
              <Palette size={18} />
            </button>

            {paletteOpen && (
              <div className="absolute right-0 top-full mt-2 p-3 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl animate-scale-in">
                <p className="text-xs font-medium text-muted-foreground mb-2">Accent</p>
                <div className="flex gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => selectAccent(color.hsl)}
                      title={color.name}
                      className={`w-7 h-7 rounded-full transition-transform duration-200 hover:scale-110 ${
                        activeAccent === color.hsl
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-card scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: `hsl(${color.hsl})` }}
                      aria-label={`Set accent to ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="ml-1 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation"
            className="fixed inset-y-0 right-0 z-50 w-72 overflow-y-auto bg-card/95 p-6 shadow-2xl border-l border-border backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <a
                href="#hero"
                className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                PK<span className="text-primary">.</span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 border-t border-border pt-4">
              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-md border border-border bg-transparent px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Toggle theme"
              >
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="mt-3" ref={paletteRef}>
              <button
                onClick={() => setPaletteOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-md border border-border bg-transparent px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                aria-label="Change accent color"
              >
                <span>Accent</span>
                <Palette size={18} />
              </button>

              {paletteOpen && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => selectAccent(color.hsl)}
                      title={color.name}
                      className={`h-10 w-full rounded-xl transition-transform duration-200 hover:scale-105 ${
                        activeAccent === color.hsl ? "ring-2 ring-foreground ring-offset-2 ring-offset-card" : ""
                      }`}
                      style={{ backgroundColor: `hsl(${color.hsl})` }}
                      aria-label={`Set accent to ${color.name}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
