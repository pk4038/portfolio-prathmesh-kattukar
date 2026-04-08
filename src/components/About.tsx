import profilePhoto from "@/assets/profile-photo.png";

const About = () => {
  return (
    <section id="about" className="py-16 px-6">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 fade-up">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left – photo */}
          <div className="flex justify-center fade-up">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-[40px]" />
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border border-border shadow-lg">
                <img
                  src={profilePhoto}
                  alt="Prathmesh Kattukar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right – bio */}
          <div className="fade-up">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/15 text-green-400 border border-green-500/30 mb-6">
              🟢 Currently open to work
            </span>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              I started in game development, shipping commercial titles and learning to build performant, user-facing software. That experience shaped how I think about code — fast iteration, clean architecture, and always keeping the end user in mind.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today I build full-stack web apps with React, Next.js, Node.js, and MongoDB. I care about clean, maintainable code and interfaces that feel intuitive and snappy. Currently looking for a team building meaningful, production-grade software.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
