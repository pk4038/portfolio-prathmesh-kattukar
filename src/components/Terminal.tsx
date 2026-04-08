import { useEffect, useRef, useState } from "react";

const lines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Prathmesh Kattukar — Full-Stack Developer" },
  { prompt: true, text: "cat skills.txt" },
  { prompt: false, text: "React · TypeScript · Node.js · Next.js · MongoDB · Express" },
  { prompt: true, text: "cat about.txt" },
  { prompt: false, text: "I build polished web apps that solve real problems." },
  { prompt: true, text: "ls projects/" },
  { prompt: false, text: "chattr/  notionary/  van-life/  assembly-endgame/" },
  { prompt: true, text: "cat status.txt" },
  { prompt: false, text: "Open to full-time opportunities. Let's connect!" },
];

const CHAR_DELAY = 35;
const LINE_PAUSE = 600;

const Terminal = () => {
  const [displayedLines, setDisplayedLines] = useState<{ prompt: boolean; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setTyping(false);
      return;
    }

    const line = lines[lineIndex];

    if (charIndex <= line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, line.prompt ? CHAR_DELAY : 15);
      return () => clearTimeout(timeout);
    }

    // Line done
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, { prompt: line.prompt, text: line.text }]);
      setCurrentText("");
      setCharIndex(0);
      setLineIndex((i) => i + 1);
    }, LINE_PAUSE);
    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <section className="py-16 px-6">
      <div className="container max-w-2xl mx-auto fade-up">
        <div className="rounded-lg overflow-hidden border border-border shadow-lg">
          {/* Window header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">terminal</span>
          </div>
          {/* Terminal body */}
          <div
            ref={containerRef}
            className="bg-[#0d0d0d] p-4 font-mono text-sm leading-relaxed h-64 overflow-y-auto"
          >
            {displayedLines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line.prompt ? (
                  <>
                    <span className="text-[#28c840]">guest@portfolio</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-muted-foreground">$ </span>
                    <span className="text-foreground">{line.text}</span>
                  </>
                ) : (
                  <span className="text-[#28c840]/80">{line.text}</span>
                )}
              </div>
            ))}
            {lineIndex < lines.length && (
              <div className="whitespace-pre-wrap">
                {lines[lineIndex].prompt ? (
                  <>
                    <span className="text-[#28c840]">guest@portfolio</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-muted-foreground">$ </span>
                    <span className="text-foreground">{currentText}</span>
                  </>
                ) : (
                  <span className="text-[#28c840]/80">{currentText}</span>
                )}
                <span className="inline-block w-2 h-4 bg-[#28c840] ml-0.5 align-middle animate-pulse" />
              </div>
            )}
            {!typing && lineIndex >= lines.length && (
              <div className="whitespace-pre-wrap">
                <span className="text-[#28c840]">guest@portfolio</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-primary">~</span>
                <span className="text-muted-foreground">$ </span>
                <span className="inline-block w-2 h-4 bg-[#28c840] ml-0.5 align-middle animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
