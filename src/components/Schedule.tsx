
import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Event = {
  id: number;
  title: string;
  speaker: string;
  time: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
};

type Day = {
  date: string;
  name: string;
  events: Event[];
};

const Schedule = () => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', 'translate-x-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const eventElements = scheduleRef.current?.querySelectorAll('.event-card');
    eventElements?.forEach((el, i) => {
      // Set delay based on index
      (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(el);
    });
    
    return () => {
      eventElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="schedule" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid-bg opacity-10 -z-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyberPurple/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyberBlue/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
          <span className="text-cyberOrange">Event</span> Schedule
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
          Plan your Devcation experience with our comprehensive event schedule
        </p>
        
        <Tabs defaultValue="day1" className="w-full max-w-4xl mx-auto">
          <TabsList className="w-full flex mb-12 overflow-x-auto glass-panel p-1">
            {days.map((day) => (
              <TabsTrigger
                key={day.name}
                value={day.name.toLowerCase()}
                className="flex-1 py-3 data-[state=active]:bg-cyberPurple/20 data-[state=active]:text-white"
              >
                <div>
                  <div className="font-bold">{day.name}</div>
                  <div className="text-xs opacity-70">{day.date}</div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {days.map((day) => (
            <TabsContent
              key={day.name}
              value={day.name.toLowerCase()}
              ref={day.name === 'Day 1' ? scheduleRef : undefined}
              className="focus:outline-none"
            >
              <div className="space-y-6">
                {day.events.map((event, index) => (
                  <div
                    key={event.id}
                    className="event-card opacity-0 translate-x-10 transition-all duration-700"
                    onClick={() => setActiveEvent(event)}
                  >
                    <div 
                      className={`cyber-box cursor-pointer hover:border-cyberPurple/50 transition-all relative overflow-hidden ${
                        event.type === 'keynote' ? 'border-l-4 border-l-cyberOrange' : 
                        event.type === 'workshop' ? 'border-l-4 border-l-cyberBlue' : 
                        'border-l-4 border-l-cyberPurple'
                      }`}
                    >
                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-cyberPurple/10 -z-0"></div>
                      
                      <div className="relative z-10">
                        <div className="md:flex items-start justify-between">
                          <div className="md:w-3/4">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyberPurple">
                              {event.title}
                            </h3>
                            <p className="text-gray-300 mt-1">{event.speaker}</p>
                          </div>
                          <div className="md:w-1/4 md:text-right mt-3 md:mt-0">
                            <p className="text-cyberOrange font-mono">{event.time}</p>
                            <p className="text-gray-400 text-sm">{event.location}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span 
                            className={`inline-block text-xs px-2 py-1 rounded capitalize font-medium ${
                              event.type === 'keynote' ? 'bg-cyberOrange/20 text-cyberOrange' : 
                              event.type === 'workshop' ? 'bg-cyberBlue/20 text-cyberBlue' : 
                              'bg-cyberPurple/20 text-cyberPurple'
                            }`}
                          >
                            {event.type}
                          </span>
                          
                          {event.tags.slice(0, 2).map((tag, i) => (
                            <span 
                              key={i}
                              className="inline-block bg-cyberDark/70 border border-white/10 text-gray-300 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          
                          {event.tags.length > 2 && (
                            <span className="inline-block text-xs text-gray-400">
                              +{event.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Modal for event details */}
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveEvent(null)}
            ></div>
            
            <div className="relative cyber-box max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setActiveEvent(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span 
                    className={`inline-block text-xs px-2 py-1 rounded capitalize font-medium ${
                      activeEvent.type === 'keynote' ? 'bg-cyberOrange/20 text-cyberOrange' : 
                      activeEvent.type === 'workshop' ? 'bg-cyberBlue/20 text-cyberBlue' : 
                      'bg-cyberPurple/20 text-cyberPurple'
                    }`}
                  >
                    {activeEvent.type}
                  </span>
                  <div className="text-right">
                    <p className="text-cyberOrange font-mono">{activeEvent.time}</p>
                    <p className="text-gray-400 text-sm">{activeEvent.location}</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{activeEvent.title}</h3>
                <p className="text-gray-300 mb-6">{activeEvent.speaker}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {activeEvent.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="inline-block bg-cyberDark/70 border border-white/10 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300">{activeEvent.description}</p>
                
                <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between">
                  <button className="text-cyberBlue hover:text-cyberBlue-light">
                    Add to My Schedule
                  </button>
                  <button className="text-cyberOrange hover:text-cyberOrange-light">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Dummy schedule data
const days: Day[] = [
  {
    name: "Day 1",
    date: "May 15, 2025",
    events: [
      {
        id: 101,
        title: "Welcome to Devcation 2025: The Future is Now",
        speaker: "Alex Morgan, CTO of NeoCore Systems",
        time: "09:00 - 10:00",
        location: "Main Hall",
        type: "keynote",
        description: "Join us for the opening keynote as Alex Morgan outlines the vision for Devcation 2025 and explores emerging trends that will shape the next decade of technology development. This session will set the tone for the entire conference and provide context for the deep dives to follow.",
        tags: ["Future Tech", "Trends", "Vision"]
      },
      {
        id: 102,
        title: "Building Neural-Responsive Interfaces",
        speaker: "Sarah Chen, AI Research Director",
        time: "10:30 - 12:00",
        location: "Workshop Room A",
        type: "workshop",
        description: "This hands-on workshop will introduce participants to the basics of neural-responsive interface design. Learn how to create UIs that adapt to user cognitive patterns and emotional states using the latest AI frameworks. Bring your laptop with the pre-installed development environment for a full interactive experience.",
        tags: ["AI", "UX", "Neural Interfaces", "Hands-on"]
      },
      {
        id: 103,
        title: "Quantum Computing for Web Developers",
        speaker: "Dr. Leila Patel, Quantum Systems",
        time: "13:00 - 14:30",
        location: "Tech Theater",
        type: "panel",
        description: "What does quantum computing mean for the everyday web developer? This accessible panel discussion breaks down complex quantum concepts into practical takeaways. Learn which problems are best suited for quantum approaches and how to prepare your skills for the quantum revolution.",
        tags: ["Quantum Computing", "Web Development", "Future Skills"]
      },
      {
        id: 104,
        title: "Decentralized Identity: Beyond Blockchain",
        speaker: "Marcus Rivera, Blockchain Architect",
        time: "15:00 - 16:30",
        location: "Innovation Lab",
        type: "talk",
        description: "Marcus Rivera explores how decentralized identity systems are evolving beyond traditional blockchain implementations. This talk covers emerging standards, privacy considerations, and practical implementation strategies for organizations of all sizes.",
        tags: ["Blockchain", "Identity", "Security"]
      },
      {
        id: 105,
        title: "Night Coding: Collaborative Hackathon Kickoff",
        speaker: "Devcation Team",
        time: "19:00 - 22:00",
        location: "Cyber Lounge",
        type: "special",
        description: "The Night Coding session kicks off our conference-long hackathon. Form teams, select challenges, and start building innovative solutions using the technologies showcased throughout the conference. Mentors will be available to provide guidance, and refreshments will be served.",
        tags: ["Hackathon", "Networking", "Collaboration"]
      }
    ]
  },
  {
    name: "Day 2",
    date: "May 16, 2025",
    events: [
      {
        id: 201,
        title: "The Evolution of Extended Reality",
        speaker: "Zoe Nakamura, XR Experience Designer",
        time: "09:00 - 10:00",
        location: "Main Hall",
        type: "keynote",
        description: "Zoe Nakamura presents a compelling vision of how extended reality will transform how we work, learn, and connect. This keynote will showcase cutting-edge XR implementations across industries and preview emerging standards that will shape the next generation of immersive experiences.",
        tags: ["XR", "AR", "VR", "Future Tech"]
      },
      {
        id: 202,
        title: "Advanced Cloud Security Patterns",
        speaker: "Jamal Washington, Security Researcher",
        time: "10:30 - 12:00",
        location: "Workshop Room B",
        type: "workshop",
        description: "This technical workshop explores advanced security patterns for modern cloud architectures. Participants will learn how to implement zero-trust principles, secure microservices, and develop effective threat modeling strategies for distributed systems.",
        tags: ["Security", "Cloud", "Zero Trust", "Hands-on"]
      }
    ]
  },
  {
    name: "Day 3",
    date: "May 17, 2025",
    events: [
      {
        id: 301,
        title: "Web Performance: From Milliseconds to Microseconds",
        speaker: "Elena Rodriguez, Engineering Director",
        time: "09:00 - 10:00",
        location: "Main Hall",
        type: "keynote",
        description: "Elena Rodriguez presents groundbreaking approaches to web performance optimization that push beyond traditional techniques. This keynote will explore how compiler technology, edge computing, and new browser capabilities are enabling microsecond-level performance for complex web applications.",
        tags: ["Performance", "Web Development", "Optimization"]
      }
    ]
  },
  {
    name: "Day 4",
    date: "May 18, 2025",
    events: [
      {
        id: 401,
        title: "Human-Centered Robotics",
        speaker: "Amara Okafor, Robotics Engineer",
        time: "09:00 - 10:00",
        location: "Main Hall",
        type: "keynote",
        description: "Amara Okafor shares her vision for the future of robotics with a focus on enhancing human capabilities rather than replacing them. This inspiring keynote will showcase advances in collaborative robotics, adaptive systems, and interfaces that create seamless human-machine partnerships.",
        tags: ["Robotics", "Human-Centered Design", "Automation"]
      }
    ]
  }
];

export default Schedule;
