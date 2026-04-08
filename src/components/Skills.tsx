const skills = [
  { name: "HTML", icon: "html5/html5-original" },
  { name: "CSS", icon: "css3/css3-original" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Express", icon: "express/express-original" },
  { name: "MongoDB", icon: "mongodb/mongodb-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Figma", icon: "figma/figma-original" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 px-6">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 fade-up">Skills</h2>
        <p className="text-muted-foreground mb-12 fade-up">Technologies I work with.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 fade-up">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="stagger-child fade-up group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-card/50 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.25)]"
            >
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`}
                alt={skill.name}
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 dark:invert-0"
                loading="lazy"
              />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
