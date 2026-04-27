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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
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

          {/* Desktop Navigation */}
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

            {/* Accent color picker */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />  {/* always Menu icon, never X */}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-lg font-bold">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 px-6 py-8">
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-3 px-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile Theme Controls */}
              <div className="p-6 border-t border-border space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                {/* Accent Color Picker */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Accent Color</p>
                  <div className="flex flex-wrap gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => selectAccent(color.hsl)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 ${
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;