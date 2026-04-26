import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import TiltCard from "./TiltCard";
import chattrImg from "@/assets/chattr-preview.png";
import notionaryImg from "@/assets/notionary-preview.png";
import vanlifeImg from "@/assets/vanlife-preview.png";
import assemblyImg from "@/assets/assembly-preview.png";
import indiastackImg from "@/assets/indiastacks.png";

const projects = [
  {
    slug: "chattr",
    image: chattrImg,
    name: "Chattr",
    description: "Real-time 1:1 chat application with instant messaging.",
    stack: ["Next.js", "TypeScript", "Convex", "Clerk"],
    live: "https://chat-app-alpha-seven-86.vercel.app/",
    github: "https://github.com/pk4038/chattr-chatapp",
  },
  {
    slug: "indiastacks-api",
    image: indiastackImg,
    name: "IndiaStack API",
    description: "REST API for Indian pincode lookup, IFSC bank validation, and public holiday data.",
    stack: ["Node.js", "Express", "Railway"],
    live: "https://indiastack.netlify.app/",
    github: "https://github.com/pk4038/india-api",
  },
  {
    slug: "notionary",
    image: notionaryImg,
    name: "Notionary",
    description: "Full-stack notes app with rich editing and organization.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    live: "https://mern-notionary.onrender.com/",
    github: "https://github.com/pk4038/mern-notionary",
  },
  {
    slug: "van-life",
    image: vanlifeImg,
    name: "Van Life",
    description: "Rental platform with dynamic routing and filtering.",
    stack: ["React", "React Router", "CSS"],
    live: "https://van-life-prathmesh.netlify.app/",
    github: "https://github.com/pk4038/van-life",
  },
  {
    slug: "assembly-endgame",
    image: assemblyImg,
    name: "Assembly Endgame",
    description: "Interactive word-guessing game built with assembly-style logic.",
    stack: ["React", "TypeScript", "CSS"],
    live: "https://assemblyendgameprathmesh.netlify.app/",
    github: "https://github.com/pk4038/assembly-endgame",
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 fade-up">Projects</h2>
        <p className="text-muted-foreground mb-10 fade-up">A few things I've built.</p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {projects.map((project) => (
            <TiltCard key={project.name} className="stagger-child fade-up">
              <Link
                to={`/project/${project.slug}`}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors flex flex-col h-full"
              >
                <div className="w-full h-40 rounded-md mb-5 overflow-hidden">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <span
                    onClick={(e) => { e.preventDefault(); window.open(project.live, '_blank'); }}
                    className="flex items-center gap-1.5 text-sm text-primary hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <ExternalLink size={14} /> Live
                  </span>
                  <span
                    onClick={(e) => { e.preventDefault(); window.open(project.github, '_blank'); }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Github size={14} /> Code
                  </span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
