import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Star } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import { useState, useEffect } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Handle scroll event to update animations based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['hero', 'projects', 'skills', 'contact'];
      const currentSection = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        return scrollY >= top - 200 && scrollY < top + height - 200;
      }) || 'hero';
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);
  
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a[href^="#"]');
      if (!target) return;
      e.preventDefault();
      const targetId = target.getAttribute('href')?.substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  // Animated gradient background style
  const gradientStyle = {
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
  };
  
  return (
    <>
      <CustomCursor />
      <InteractiveBackground />
      <div className="min-h-screen bg-gradient-to-b from-gray-900/90 via-purple-900/30 to-black/90 text-white relative" style={gradientStyle}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-600 text-transparent bg-clip-text">
              Debasmita 
            </div>
            <ul className="hidden md:flex space-x-8">
              {['Home', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()}`} 
                    className={`hover:text-purple-400 transition-colors ${
                      activeSection === (item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()) ? 'text-purple-400 border-b-2 border-purple-400' : ''
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <a href="https://github.com/debasmitaas" className="hover:text-purple-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:debasmitac2004@gmail.com" className="hover:text-purple-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-6 overflow-hidden">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 text-transparent bg-clip-text animate-text-gradient">
                Hi, I'm Debasmita!
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-white-300 mb-8 animate-slide-up">
                My work with React Native (Expo), Python,
                and Augmented Reality focuses on clarity and impact, while I continuously
                explore ML and agentic AI.
              </p>
            </div>
            <div className="flex gap-6 justify-center mb-12 animate-fade-in-delay-2">
              <a href="https://github.com/debasmitaas" className="social-icon group">
                <div className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110">
                  <Github size={24} />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/debasmita-chakraborty070804/" className="social-icon group">
                <div className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110">
                  <Linkedin size={24} />
                </div>
              </a>
              <a href="mailto:debasmitac2004@gmail.com" className="social-icon group">
                <div className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110">
                  <Mail size={24} />
                </div>
              </a>
            </div>
            <a href="#projects">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                View My Work
              </button>
            </a>
          </div>
          <a href="#projects" className="absolute bottom-8 animate-bounce cursor-pointer">
            <div className="p-2 rounded-full bg-gray-800/50 hover:bg-purple-600 transition-colors">
              <ChevronDown size={24} />
            </div>
          </a>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-purple-900/30 rounded-full text-purple-400 text-sm font-medium mb-4">
                PORTFOLIO
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`group relative overflow-hidden rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300 transform hover:scale-[1.02] ${
                    projects.length % 2 !== 0 && index === projects.length - 1 ? "md:col-span-2 md:max-w-xl md:mx-auto" : ""
                  }`}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <div className="flex space-x-2">
                        {project.tech && project.tech.map((icon, i) => (
                          <span key={i} className="text-gray-400">{icon}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    <a
                      href={project.link}
                      className="inline-flex items-center px-4 py-2 bg-purple-800/50 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      View Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 bg-gradient-to-b from-black/70 to-purple-900/20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-purple-900/30 rounded-full text-purple-400 text-sm font-medium mb-4">
              EXPERTISE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-16"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {skillsWithProgress.map((skill, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-700/50 hover:border-purple-500/50">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold text-lg">{skill.name}</p>
                        <span className="text-purple-400 font-mono">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2 bg-gray-700" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-gray-800/90 backdrop-blur-md border-gray-700">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-purple-400">{skill.name}</h4>
                      <p className="text-sm text-gray-300">
                        {skill.description}
                      </p>
                      {skill.projects && (
                        <div className="pt-2">
                          <h5 className="text-sm font-semibold mb-1">Projects:</h5>
                          <ul className="text-sm text-gray-400">
                            {skill.projects.map((project, idx) => (
                              <li key={idx} className="flex items-center">
                                <Star size={12} className="mr-2 text-yellow-500" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-purple-900/30 rounded-full text-purple-400 text-sm font-medium mb-4">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mb-12"></div>
            
            <p className="text-xl text-gray-300 mb-12">
              I'm always open to discussing new projects and opportunities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <a 
                href="https://github.com/debasmitaas" 
                className="flex flex-col items-center group"
              >
                <div className="p-5 rounded-full bg-gray-800/50 mb-3 group-hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <Github size={28} />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/debasmita-chakraborty070804/" 
                className="flex flex-col items-center group"
              >
                <div className="p-5 rounded-full bg-gray-800/50 mb-3 group-hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <Linkedin size={28} />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
              </a>
              
              <a 
                href="mailto:debasmitac2004@gmail.com" 
                className="flex flex-col items-center group"
              >
                <div className="p-5 rounded-full bg-gray-800/50 mb-3 group-hover:bg-purple-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                  <Mail size={28} />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Email</span>
              </a>
            </div>
            
            <div className="max-w-md mx-auto bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
              <a
                href="mailto:debasmitac2004@gmail.com"
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 text-center mb-4 flex items-center justify-center"
              >
                Send Email
                <Mail size={20} className="ml-2" />
              </a>
              <p className="text-gray-400 text-center">or find me at</p>
              <p className="text-gray-200 text-center mt-2 font-mono">debasmitac2004@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-gray-400 relative z-10 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-pink-600 text-transparent bg-clip-text">
                  Debasmita Chakraborty | 2025
                </p>
              </div>
              <div className="text-sm">
                <p>© 2025 Debasmita. All rights reserved.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a href="#hero" className="text-gray-500 hover:text-purple-400 transition-colors">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* CSS animations */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        html {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes text-gradient {
          0% { background-size: 200% 200%; background-position: 0% 50%; }
          50% { background-size: 200% 200%; background-position: 100% 50%; }
          100% { background-size: 200% 200%; background-position: 0% 50%; }
        }
        
        .animate-text-gradient {
          animation: text-gradient 6s ease-in-out infinite;
          background-size: 300% 300%;
        }
        
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.4s forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

const projects = [
  {
    title: "EducAR",
    description: "An Augmented Reality based educational app that transforms learning through interactive 3D visualizations.",
    image: "assets/Educar.jpg",
    link: "https://github.com/debasmitaas/EducAR",
    tech: ["Unity", "AR", "Education"]
  },
  {
    title: "Suraksha",
    description: "A women safety app that helps users navigate through the safest areas using AI-powered risk assessment.",
    image: "assets/suraksha.jpg",
    link: "https://github.com/suto6/DoubleSlashPro",
    tech: ["React Native", "Maps API", "Safety"]
  },
  {
    title: "Face Recognition Project",
    description: "Advanced face recognition system using OpenCV and deep learning for secure authentication applications.",
    image: "assets/face_recognition.png",
    link: "https://github.com/debasmitaas/Face-Recognition-Project",
    tech: ["Python", "OpenCV", "ML"]
  },
  // {
  //   title: "Weather Dashboard",
  //   description: "Real-time weather tracking with interactive visualizations and forecast predictions.",
  //   image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80",
  //   link: "#",
  //   tech: ["React", "API", "Weather"]
  // }
];

const skillsWithProgress = [
  {
    name: "React Native (Expo)",
    progress: 75,
    description: "Expert in React Native with Expo for cross-platform mobile app development. Proficient in building complex, scalable applications with smooth animations and native functionality.",
    projects: ["Suraksha", "Mobile Portfolio"]
  },
  {
    name: "React.js",
    progress: 60,
    description: "Strong frontend development skills with React.js, including hooks, context API, and state management with Redux. Experience building responsive web applications.",
    projects: ["My Portfolio", "Web Dashboard"]
  },
  {
    name: "Unity",
    progress: 85,
    description: "Skilled in Unity for AR/VR development, with extensive experience in 3D modeling, animation, and interactive experiences for educational purposes.",
    projects: ["EducAR", "3D Visualization Tool"]
  },
  {
    name: "Python",
    progress: 60,
    description: "Proficient in Python programming with expertise in data analysis libraries like Pandas, NumPy, and machine learning frameworks like TensorFlow and OpenCV.",
    projects: ["Face Recognition Project", "Data Analysis Tools"]
  },
  {
    name: "Flutter",
    progress: 55,
    description: "Learning Flutter for cross-platform app development with Dart programming language. Experience with widget-based UI development and state management.",
    projects: ["Learning Project"]
  },
  {
    name: "AI/ML",
    progress: 50,
    description: "Growing expertise in artificial intelligence and machine learning, including neural networks, computer vision, and natural language processing applications.",
    projects: ["Face Detection Algorithm"]
  },
];

export default App;