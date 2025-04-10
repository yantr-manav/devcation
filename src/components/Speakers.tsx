
import { useState, useRef, useEffect } from 'react';

type Speaker = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  topics: string[];
};

const Speakers = () => {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const speakersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const speakerElements = speakersRef.current?.querySelectorAll('.speaker-card');
    speakerElements?.forEach((el, i) => {
      // Set delay based on index
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      speakerElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="speakers" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 -z-10"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyberBlue/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyberOrange/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
          <span className="text-cyberBlue">Featured</span> Speakers
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
          Learn from the brightest minds and most innovative thinkers in the digital realm
        </p>
        
        <div 
          ref={speakersRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {speakers.map((speaker) => (
            <div 
              key={speaker.id}
              className="speaker-card opacity-0 transition-all duration-500"
              onClick={() => setActiveSpeaker(speaker)}
            >
              <div className="cyber-box h-full hover:border-cyberPurple/50 cursor-pointer group relative overflow-hidden transition-all">
                {/* Speaker Image with glitch effect on hover */}
                <div className="relative h-64 mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyberDark-darker to-transparent z-10 opacity-60"></div>
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 group-hover:animate-glitch opacity-0 group-hover:opacity-100 bg-cyberPurple/20 z-20 transition-opacity"></div>
                </div>
                
                {/* Speaker Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyberPurple transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-cyberBlue font-mono">{speaker.role}</p>
                  <p className="text-gray-400 text-sm">{speaker.company}</p>
                  
                  {/* Topics */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {speaker.topics.slice(0, 2).map((topic, i) => (
                      <span 
                        key={i}
                        className="inline-block bg-cyberDark/70 border border-cyberBlue/30 text-cyberBlue text-xs px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {speaker.topics.length > 2 && (
                      <span className="inline-block text-xs text-gray-400">+{speaker.topics.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                {/* Hover indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-cyberPurple opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal for speaker details */}
        {activeSpeaker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveSpeaker(null)}
            ></div>
            
            <div className="relative cyber-box max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setActiveSpeaker(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full overflow-hidden rounded-lg">
                    <img 
                      src={activeSpeaker.image} 
                      alt={activeSpeaker.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyberDark-darker to-transparent opacity-60"></div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-white">{activeSpeaker.name}</h3>
                  <p className="text-cyberBlue font-mono">{activeSpeaker.role}</p>
                  <p className="text-gray-400">{activeSpeaker.company}</p>
                  
                  <div className="mt-4 mb-6 flex flex-wrap gap-2">
                    {activeSpeaker.topics.map((topic, i) => (
                      <span 
                        key={i}
                        className="inline-block bg-cyberDark/70 border border-cyberBlue/30 text-cyberBlue text-xs px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-300">{activeSpeaker.bio}</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-cyberOrange font-mono">Speaking at:</p>
                    <p className="text-gray-300">Keynote: The Future of Web Development</p>
                    <p className="text-gray-400 text-sm">May 16, 2025 • 10:00 AM • Main Hall</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Dummy speaker data
const speakers: Speaker[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Chief Technology Officer",
    company: "NeoCore Systems",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Alex is a pioneer in quantum computing and distributed systems with over 15 years of experience building cutting-edge technology. At NeoCore Systems, he leads a team developing next-generation network infrastructure.",
    topics: ["Quantum Computing", "Distributed Systems", "Network Security"]
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "AI Research Director",
    company: "Synthwave Labs",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Sarah's groundbreaking work in neural interfaces has revolutionized how we think about human-computer interaction. She previously led development at Cerebral Dynamics before joining Synthwave to pursue new frontiers in AI research.",
    topics: ["Neural Interfaces", "Machine Learning", "Human-Computer Interaction"]
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "Blockchain Architect",
    company: "Nexus Chain",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Marcus is reshaping financial technology through his work in decentralized systems and smart contract infrastructure. He's the author of 'Blockchain Evolution' and has contributed to multiple open-source projects.",
    topics: ["Blockchain", "Smart Contracts", "Decentralized Finance"]
  },
  {
    id: 4,
    name: "Zoe Nakamura",
    role: "XR Experience Designer",
    company: "Hologram Innovations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Zoe combines artistic vision with technical expertise to create immersive extended reality experiences. Her work spans entertainment, education, and enterprise applications, pushing the boundaries of spatial computing.",
    topics: ["Extended Reality", "Digital Twins", "Spatial Computing"]
  },
  {
    id: 5,
    name: "Jamal Washington",
    role: "Security Researcher",
    company: "Cipher Defense",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Jamal has identified critical vulnerabilities in major systems and advocates for ethical security practices. His research focuses on emerging threats in connected environments and quantum-resistant cryptography.",
    topics: ["Cybersecurity", "Ethical Hacking", "Zero Trust Architecture"]
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Engineering Director",
    company: "Pulse Framework",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Elena leads development of the Pulse Framework, which powers millions of applications worldwide. She specializes in performance optimization and creating developer-friendly tools that scale effortlessly.",
    topics: ["Web Performance", "Developer Experience", "Scalable Architecture"]
  },
  {
    id: 7,
    name: "David Kim",
    role: "Cloud Infrastructure Lead",
    company: "Stratosphere Tech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "David has transformed how enterprises approach cloud deployment, creating systems that balance flexibility, security, and cost-efficiency. His team's edge computing solutions are helping define the next generation of infrastructure.",
    topics: ["Cloud Architecture", "Edge Computing", "Infrastructure as Code"]
  },
  {
    id: 8,
    name: "Amara Okafor",
    role: "Robotics Engineer",
    company: "Autonomous Systems Inc",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    bio: "Amara's innovations in computer vision and sensor fusion have made autonomous systems safer and more reliable. She holds multiple patents and is passionate about creating robotics that enhance human capabilities.",
    topics: ["Robotics", "Computer Vision", "Sensor Fusion"]
  }
];

export default Speakers;
