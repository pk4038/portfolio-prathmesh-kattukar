import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import chattrImg from "@/assets/chattr-preview.png";
import notionaryImg from "@/assets/notionary-preview.png";
import vanlifeImg from "@/assets/vanlife-preview.png";
import assemblyImg from "@/assets/assembly-preview.png";
import indiastackImg from "@/assets/indiastacks.png";

interface ProjectData {
  name: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  image: string;
  overview: string[];
  tools: string[];
}

const projects: Record<string, ProjectData> = {
  chattr: {
    name: "Chattr",
    description: "Real-time 1:1 chat application with instant messaging.",
    stack: ["Next.js", "TypeScript", "Convex", "Clerk"],
    live: "https://chat-app-alpha-seven-86.vercel.app/",
    github: "https://github.com/pk4038/chattr-chatapp",
    image: chattrImg,
    overview: [
      "Chattr is a real-time one-on-one messaging web application built with Next.js (App Router), TypeScript, Convex, and Clerk. The app enables users to sign up, discover other users, and start conversations with instant message delivery powered by Convex's realtime data subscriptions. It includes features such as typing indicators, message editing and soft deletion, read receipts, and timestamp formatting. The interface was designed with Tailwind CSS to provide a responsive sidebar–chat layout across devices, and the application is deployed on Vercel with a Convex backend for scalable realtime messaging.",
      "Chattr focuses on real-time user interaction and efficient data flow by leveraging Convex queries and mutations to synchronize messages instantly between users. The project involved structuring conversation and message schemas, handling user presence indicators, and managing client-side state for features like typing status and unread messages. Building this application strengthened my understanding of realtime application architecture, full-stack data flow, and integrating third-party services such as authentication and cloud deployment.",
    ],
    tools: ["Next.js", "TypeScript", "Convex", "Clerk", "Tailwind CSS", "Vercel", "React"],
  },
  "indiastacks-api": {
  name: "IndiaStack API",
  description:
    "REST API for Indian pincode lookup, IFSC bank validation, and public holiday data.",
  stack: ["Node.js", "Express", "Railway", "HTML", "CSS"],
  live: "https://indiastack.netlify.app/",
  github: "https://github.com/pk4038/india-api",
  image: indiastackImg,
  overview: [
    "IndiaStack API provides structured, developer-ready access to essential Indian data across three categories: pincode lookup, IFSC bank code validation, and public holiday data.",
    "Pincode Lookup — Query any of 19,097 Indian pincodes and get back the city, district, state, and timezone in clean JSON. Perfect for auto-filling address forms, validating delivery zones, or enriching user data in any Indian-market application.",
    "IFSC Bank Code Lookup — Validate and decode any of 164,836 IFSC codes across all Indian banks and branches. Returns bank name, branch, city, state, full address, and payment method support flags including IMPS, RTGS, NEFT, UPI, and SWIFT. Essential for any fintech, payments, or invoicing application operating in India.",
    "Public Holiday Data — Get the full list of Indian public holidays for a given year, filterable by compulsory or restricted holiday type. Returns date, day of week, holiday name, and type. Useful for scheduling tools, payroll systems, HR platforms, delivery ETAs, and any application that needs to account for Indian working calendars.",
    "All endpoints return consistent, clean JSON with proper error messages and HTTP status codes. Authentication is handled via an API key passed in the request header. The API is hosted on Railway with low-latency responses under 50ms.",
    "Built for developers building products for the Indian market who want reliable, structured data without scraping government websites or maintaining their own datasets."
  ],
  tools: ["Node.js", "Express", "Railway", "HTML", "CSS"]
},
  notionary: {
    name: "Notionary",
    description: "Full-stack notes app with rich editing and organization.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    live: "https://mern-notionary.onrender.com/",
    github: "https://github.com/pk4038/mern-notionary",
    image: notionaryImg,
    overview: [
      "Notionary is a full-stack notes management application built using the MERN stack (MongoDB, Express, React, and Node.js). The platform allows users to create, view, and delete notes through a clean and responsive interface. The frontend is built with React and uses hooks such as useState and useEffect to manage state, handle form inputs, and fetch data dynamically from the backend API.",
      "The backend is structured using Express and MongoDB, with Mongoose schemas and models to manage note data. The application implements RESTful API routes for creating and retrieving notes, along with rate limiting to handle excessive requests gracefully. Loading states, toast notifications, and conditional rendering are used to enhance user experience. This project demonstrates practical knowledge of full-stack architecture, API integration, state management, and real-world application structure.",
    ],
    tools: ["MongoDB", "Express", "React", "Node.js", "Mongoose", "REST API", "CSS"],
  },
  "van-life": {
    name: "Van Life",
    description: "Rental platform with dynamic routing and filtering.",
    stack: ["React", "React Router", "CSS"],
    live: "https://van-life-prathmesh.netlify.app/",
    github: "https://github.com/pk4038/van-life",
    image: vanlifeImg,
    overview: [
      "VanLife is a fully interactive React web application built to simulate a modern camper-van rental platform. The app allows users to explore a catalog of vans, apply dynamic filters, and view detailed van information with preserved search parameters for a smooth browsing experience. It features real-time data fetching from a mock API, clean UI layouts, and reusable components structured around React Router's nested routes, loaders, and layout patterns. Users can view van types, pricing, descriptions, and photos through an intuitive interface designed to mimic a real rental service.",
      "The application also includes a dedicated host dashboard where authenticated hosts can manage their van listings. This section showcases advanced routing techniques such as nested routes, outlet context, protected routes, and persistent layout components. Hosts can switch between van details, pricing, and photo management seamlessly. Together, these features demonstrate strong competency in React fundamentals, state management, data handling, and building scalable front-end architecture suitable for real-world applications.",
    ],
    tools: ["React", "React Router", "JavaScript", "CSS", "Netlify", "Mock API"],
  },
  "assembly-endgame": {
    name: "Assembly Endgame",
    description: "Interactive word-guessing game built with assembly-style logic.",
    stack: ["React", "TypeScript", "CSS"],
    live: "https://assemblyendgameprathmesh.netlify.app/",
    github: "https://github.com/pk4038/assembly-endgame",
    image: assemblyImg,
    overview: [
      "Assembly Endgame is a fully interactive word-guessing game inspired by Hangman, built using React's state management, derived values, and dynamic rendering. Players must guess a hidden programming-related word while avoiding incorrect guesses that \"erase\" languages one by one.",
      "The game includes real-time visual feedback, a dynamic keyboard, correct/wrong guess highlighting, farewell messages when a language is lost, and conditional UI states for winning or losing the game. Additional features include random word generation, disabled input when the game ends, and clean component-based architecture with utilities for game logic.",
    ],
    tools: ["React", "TypeScript", "CSS", "JavaScript", "Netlify"],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projects[slug] : null;

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:opacity-80 transition-opacity">← Back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container px-6 py-5 flex items-center justify-between">
          <Link to="/#projects" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github size={14} /> Code
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:opacity-80 transition-opacity">
              <ExternalLink size={14} /> Live Site
            </a>
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="container px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{project.name}</h1>
        <p className="text-muted-foreground mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <img src={project.image} alt={project.name} className="w-full max-w-3xl rounded-lg border border-border mb-10" />

        {/* Project Overview */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Project Overview</h2>
          {project.overview.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tools Used */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 border border-border rounded-md text-sm font-mono text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded live site */}
      <div className="container px-6 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Live Preview</h2>
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-muted-foreground font-mono truncate ml-2">{project.live}</span>
          </div>
          <iframe
            src={project.live}
            title={project.name}
            className="w-full h-[70vh] border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;