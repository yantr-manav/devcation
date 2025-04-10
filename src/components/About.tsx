
import { useRef, useEffect } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 -z-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyberPurple/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyberBlue/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div ref={containerRef} className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <span className="text-cyberPurple">About</span> Devcation 2025
          </h2>
          
          <div className="cyber-box my-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <p className="text-lg text-gray-300 mb-6">
              Devcation 2025 is not just a conference—it's an immersive journey into the future of technology. Set in the heart of Neo Tokyo, this gathering brings together the brightest minds in development, design, and digital innovation.
            </p>
            
            <p className="text-lg text-gray-300">
              Over four days, attendees will dive into cutting-edge workshops, thought-provoking talks, and networking opportunities that transcend the conventional conference experience. Whether you're a seasoned developer or just beginning your tech journey, Devcation 2025 offers a glimpse into tomorrow's digital landscape.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="cyber-box h-full animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="mb-4">
                  <feature.icon className="w-10 h-10 text-cyberOrange" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 glass-panel p-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-700">
            <h3 className="text-xl font-mono text-cyberBlue mb-4">What to expect:</h3>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-cyberOrange mr-2">◆</span>
                <span>4 days of keynotes, workshops, and panel discussions</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyberOrange mr-2">◆</span>
                <span>50+ industry-leading speakers from across the tech world</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyberOrange mr-2">◆</span>
                <span>Hands-on labs with cutting-edge technologies</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyberOrange mr-2">◆</span>
                <span>Networking events with fellow developers and tech leaders</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyberOrange mr-2">◆</span>
                <span>Evening entertainment showcasing digital art and performances</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icons component
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const NetworkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const LearnIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const features = [
  {
    title: "Cutting-edge Tech",
    description: "Explore the latest in web development, AI, blockchain, and more with hands-on labs and demonstrations.",
    icon: CodeIcon,
  },
  {
    title: "Networking",
    description: "Connect with industry leaders, innovative startups, and fellow developers from around the world.",
    icon: NetworkIcon,
  },
  {
    title: "Learn & Grow",
    description: "Develop new skills, discover emerging trends, and gain insights to advance your career in tech.",
    icon: LearnIcon,
  },
];

export default About;
