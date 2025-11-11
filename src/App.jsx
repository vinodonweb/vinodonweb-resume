import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { Code, Coffee, Zap, Brain, Rocket, Mail, Github, Linkedin, ExternalLink, Terminal, Server, Database, Cpu, Monitor, ChevronRight, FileText, Calendar } from 'lucide-react'
import ScrollObserver from './components/ScrollObserver'
import AnimatedSection, { AnimatedItem } from './components/AnimatedSection'
import { AnimatedTitle } from './components/AnimatedText'
import { motion } from 'framer-motion'
import RainbowButton from './components/RainbowButton'
import Marquee from './components/Marquee'
import LiveCodeDemo from './components/LiveCodeDemo'
import AchievementsSection from './components/AchievementsSection'
import ResumeDownload from './components/ResumeDownload'
import EasterEggs from './components/EasterEggs'
import HintSystem from './components/HintSystem'

function App() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Software Engineer');
  const [terminalText, setTerminalText] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update terminal text with typing effect
 useEffect(() => {
    const text = 'vinod@portfolio:~$ whoami';
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
}, []);

  // Developer quotes
  const devQuotes = [
    "// TODO: Fix this later (famous last words)",
    "/* It works on my machine */ 🤷‍♂️",
    "console.log('Why is this not working?');",
    "if (coffee.empty()) { programmer.sleep(); }",
    "// This code is self-documenting 😎"
  ];

  const skills = [
    "React.js", "Node.js", "TypeScript", "MongoDB", "Express.js", 
    "Swift", "Kotlin", "Python", "Docker", "AWS", "Git", "REST APIs",
    "GraphQL", "PostgreSQL", "Redis", "Kubernetes", "CI/CD"
  ];

  const roleContent = {
      title: 'Full-Stack Developer',
    subtitle: 'Building digital experiences one commit at a time',
    description: 'I transform ideas into scalable applications and turn coffee into clean, maintainable code ☕ → 💻',
      experiences: [
        {
          title: 'Graduate Assistant',
        company: 'DePaul University',
        period: 'Dec 2024 - Present',
        type: 'On-Campus',
          description: [
          `Developed centralized resource platform serving 200+ employees using React & Spring Boot`,
          `Architected microservices ecosystem achieving 99.9% uptime with 60% performance boost`,
          `Built real-time data visualization interfaces using modern React patterns`
        ],
        technologies: ['React.js', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
        icon: 'server'
      },
      {
        title: 'Software Engineer',
        company: 'DePaul University',
        period: 'June 2024 - Nov 2024',
        type: 'On-Campus',
          description: [
          `Redesigned department portal → 50% faster load times & 30% higher engagement`,
          `Implemented CI/CD pipeline reducing deployment time from 2h to 15min`,
          `Optimized infrastructure with Nginx load balancers → 40% throughput increase`
        ],
        technologies: ['React.js', 'GitHub Actions', 'Nginx', 'Linux', 'SSL'],
          icon: 'code'
        },
        {
        title: 'Full Stack Developer',
          company: 'Innomatic Research Lab',
        period: 'Feb 2023 - June 2023',
        type: 'Internship',
          description: [
          `Engineered full-stack applications using MERN stack architecture`,
          `Optimized codebase performance leading to efficient application processes`,
          `Collaborated on code reviews implementing industry best practices`
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
        icon: 'database'
        }
      ],
      projects: [
      {
        title: 'AI-Powered Code Analyzer',
        description: 'A web app that provides instant AI-driven code analysis, identifying security vulnerabilities, performance bottlenecks, and quality improvements. Built with Next.js, React, and TypeScript, and deployed on Vercel.',
        technologies: ['Next.js', 'React', 'TypeScript', 'OpenAI API', 'Vercel'],
        githubLink: '#',
        demoLink: 'https://code-analyzer-mu.vercel.app/',
        status: 'Published'
      },
        {
          title: 'Break Reminder Chrome Extension',
        description: 'A productivity extension that gamifies break reminders with jokes, quotes, and exercise tips. Built with React.js and Chrome APIs.',
        technologies: ['React.js', 'Chrome APIs', 'REST APIs'],
          githubLink: 'https://github.com/vinodonweb/break-reminder-extraction',
        demoLink: 'https://chromewebstore.google.com/detail/break-reminder/imkkaclpdmkjoebdceipiokgnehkollk',
        status: 'Published'
      },
      {
          title: 'Golden Year Website',
        description: 'A visually stunning and user-friendly website built for a small business that helps elderly people adopt technology. Designed to be accessible, modern, and responsive.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
          githubLink: '#',
        demoLink: 'https://golden-year.vercel.app/',
        status: 'Published'
      },
      {
        title: 'DePaul University IRL Website',
        description: 'Modern, responsive website redesign for the Ideal Realization Lab with dynamic content management.',
        technologies: ['React.js', 'MongoDB', 'Digital Ocean'],
          githubLink: '#',
        demoLink: 'https://irl.depaul.edu/',
        status: 'Live'
      },
      {
        title: 'Task Assignment Platform',
        description: 'Full-stack SaaS replacement for Basecamp with JWT auth, role-based access, and real-time updates.',
        technologies: ['React.js', 'Node.js', 'Docker', 'ShadCN'],
        githubLink: '#',
        demoLink: 'https://internal.irl.depaul.edu/',
        status: 'Production'
      }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] text-white min-h-screen font-['Inter'] overflow-x-hidden">
      {/* Scroll animation handler */}
      <ScrollObserver />

      {/* Header/Navigation with terminal style */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 terminal backdrop-blur-xl border-b-0 py-4 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
            className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="code-font text-[#f5c842] ml-4">
              {terminalText}<span className="animate-pulse">|</span>
            </span>
        </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'work', 'skills', 'contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item}`}
                className="text-[#f5c842] hover:text-[#ffd700] transition-all duration-300 font-medium code-font glitch-effect"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
            >
                ./{item}
            </motion.a>
          ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5c842] hover:text-[#ffd700] transition-all duration-300 font-medium code-font glitch-effect"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              whileHover={{ y: -2, scale: 1.05 }}
            >
              ./resume.pdf
            </motion.a>
        </nav>

          <div className="code-font text-xs text-gray-400">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </motion.header>

      {/* Hero Section with modern developer aesthetic */}
      <AnimatedSection
        id="home"
        className="min-h-screen flex items-center justify-center relative matrix-bg pt-20"
        noStagger={true}
      >
        <div className="absolute inset-0 hex-pattern opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column - Text content */}
              <div className="space-y-8">
                <motion.div
                  className="terminal p-6 scan-lines relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Terminal className="w-5 h-5 text-[#f5c842]" />
                    <span className="code-font text-sm text-gray-400">terminal</span>
                  </div>
                  <div className="code-font text-sm space-y-2">
                    <div className="text-[#f5c842]">$ npm install vinod-sharma</div>
                    <div className="text-gray-400">Installing dependencies...</div>
                    <div className="text-green-400">✓ skills: react, node, mongodb</div>
                    <div className="text-green-400">✓ experience: 3+ years</div>
                    <div className="text-green-400">✓ coffee-addiction: latest</div>
                    <div className="text-[#f5c842]">$ vinod.init()</div>
                  </div>
                </motion.div>

            <motion.h1
                  className="text-5xl md:text-7xl font-bold glitch-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
            >
                  <span className="gradient-text">Vinod</span>
                  <br />
                  <span className="text-white">Sharma</span>
            </motion.h1>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="code-font text-lg text-[#f5c842]">
                    const developer = {"{"}
                  </div>
                  <div className="ml-6 space-y-2 code-font">
                    <div>role: "<span className="text-white">Full-Stack Developer</span>",</div>
                    <div>location: "<span className="text-white">Chicago, IL</span>",</div>
                    <div>passion: "<span className="text-white">Clean Code & Coffee</span>",</div>
                    <div>currentFocus: "<span className="text-white">React & Node.js</span>",</div>
                    <div>status: "<span className="text-green-400">Open to Opportunities</span>"</div>
                  </div>
                  <div className="code-font text-lg text-[#f5c842]">{"}"}</div>
                </motion.div>

                {/* Open to Opportunities Section */}
                <motion.div
                  className="terminal p-6 neon-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2 code-font">
                        <span className="text-green-400">// </span>Currently Seeking Opportunities
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        I'm actively looking for full-time Software Engineering roles where I can contribute to 
                        impactful projects, work with talented teams, and continue growing as a developer.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-green-400/10 text-green-400 rounded text-xs code-font border border-green-400/30">
                          Full-Time
                        </span>
                        <span className="px-3 py-1 bg-[#f5c842]/10 text-[#f5c842] rounded text-xs code-font border border-[#f5c842]/30">
                          Remote/Hybrid
                        </span>
                        <span className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded text-xs code-font border border-blue-400/30">
                          Available Immediately
                        </span>
                      </div>
                      <button
                        onClick={() => navigate('/30call')}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 code-font text-sm shadow-lg hover:shadow-green-500/50"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule a Call - Let's Talk!</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

            <motion.div
                  className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
            >
              <RainbowButton
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="neon-border"
              >
                    <Mail className="w-5 h-5 mr-2" />
                    ./contact
              </RainbowButton>
              <RainbowButton
                    onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
              >
                    <Code className="w-5 h-5 mr-2" />
                    ./projects
              </RainbowButton>
              <RainbowButton
                    onClick={() => window.open('/resume.pdf', '_blank')}
              >
                    <FileText className="w-5 h-5 mr-2" />
                    ./resume.pdf
              </RainbowButton>
            </motion.div>

                {/* Subtle interaction hint */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <p className="text-gray-500 text-sm code-font">
                    💡 Psst... there are hidden surprises throughout this site
                  </p>
                </motion.div>
              </div>

              {/* Right column - Visual elements */}
              <div className="relative">
                <motion.div
                  className="terminal p-8 h-96 overflow-hidden relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="code-font text-sm space-y-3">
                    <div className="syntax-comment">// Current Status</div>
                    <div className="syntax-keyword">while</div> (<span className="syntax-variable">alive</span>) {"{"}
                    <div className="ml-4 space-y-2 mt-2">
                      <div><span className="syntax-function">eat</span>();</div>
                      <div><span className="syntax-function">code</span>();</div>
                      <div><span className="syntax-function">sleep</span>();</div>
                      <div><span className="syntax-function">repeat</span>();</div>
                    </div>
                    <div>{"}"}</div>
                    <div className="mt-6">
                      <div className="syntax-comment">// Latest Achievement</div>
                      <div className="text-green-400">✓ Deployed 5+ production apps</div>
                      <div className="text-green-400">✓ Reduced load time by 50%</div>
                      <div className="text-green-400">✓ 99.9% uptime maintained</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills marquee */}
      <div className="py-8 bg-[#0a0a0a] border-y border-[#f5c842]/20">
        <Marquee className="text-[#f5c842] code-font" pauseOnHover={true}>
          {skills.map((skill, index) => (
            <span key={index} className="mx-6 px-4 py-2 bg-[#141414] border border-[#f5c842]/30 rounded">
              {skill}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Live Code Demo Section */}
      <AnimatedSection
        className="py-20 bg-gradient-to-br from-[#141414] to-[#0a0a0a]"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="$ node ./live-demo.js"
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text code-font"
        />
        <LiveCodeDemo />
      </AnimatedSection>

      {/* About Section with terminal-like cards */}
      <AnimatedSection
        id="about"
        className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#141414]"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="$ cat /about/experience.json"
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text code-font"
        />
        
        <div className="max-w-6xl mx-auto space-y-8">
          {roleContent.experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="terminal p-6 hover:neon-border transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    {exp.icon === 'server' && <Server className="w-6 h-6 text-[#f5c842]" />}
                    {exp.icon === 'code' && <Code className="w-6 h-6 text-[#f5c842]" />}
                    {exp.icon === 'database' && <Database className="w-6 h-6 text-[#f5c842]" />}
                <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-[#f5c842] code-font">{exp.company}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="code-font text-sm text-gray-400">{exp.period}</span>
                      <div className="text-xs text-[#f5c842]">[{exp.type}]</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-gray-300">
                    {exp.description.map((desc, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-[#f5c842] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="code-font text-sm text-[#f5c842] mb-2">// Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                      key={i}
                        className="px-2 py-1 bg-[#f5c842]/10 text-[#f5c842] rounded text-xs code-font border border-[#f5c842]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Achievements Section */}
      <AnimatedSection
        className="py-20 bg-gradient-to-br from-[#141414] to-[#0a0a0a]"
        childrenClassName="container mx-auto px-6"
      >
        <AchievementsSection />
      </AnimatedSection>

      {/* Projects Section with modern cards */}
      <AnimatedSection
        id="work"
        className="py-20 bg-gradient-to-br from-[#141414] to-[#0a0a0a] hex-pattern"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="$ ls -la ./projects/"
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text code-font"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roleContent.projects.map((project, index) => (
                <motion.div
              key={index}
              className="terminal p-6 hover:neon-border transition-all duration-500 group"
              initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f5c842] transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs code-font ${
                    project.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Live' ? 'bg-[#f5c842]/20 text-[#f5c842]' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {project.status}
                  </span>
                  </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="code-font text-xs text-[#f5c842] mb-2">// Built with</div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#f5c842]/10 text-[#f5c842] rounded text-xs code-font"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  {!project.githubLink.includes('#') && (
                    <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 d-none text-[#f5c842] hover:text-[#ffd700] code-font text-sm"
                    whileHover={{ x: 3 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>code</span>
                  </motion.a>
                  )}
                  
                  {!project.demoLink.includes('#') && (
                  <motion.a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-[#f5c842] hover:text-[#ffd700] code-font text-sm"
                      whileHover={{ x: 3 }}
                  >
                      <ExternalLink className="w-4 h-4" />
                      <span>live</span>
                  </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills Section with terminal interface */}
      <AnimatedSection
        id="skills"
        className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#1f1f1f]"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="$ grep -r 'skills' /dev/brain"
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text code-font"
        />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="terminal p-8 scan-lines relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
          >
                        <div className="code-font text-sm space-y-4">
              <div className="syntax-comment">// Skill Tree - Level: Senior</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <div className="syntax-property mb-3">Frontend</div>: {"{"}
                  <div className="ml-4 space-y-1">
                    <div><span className="syntax-string">"React.js"</span>: <span className="text-green-400">█████████░ 90%</span></div>
                    <div><span className="syntax-string">"TypeScript"</span>: <span className="text-green-400">████████░░ 80%</span></div>
                    <div><span className="syntax-string">"Next.js"</span>: <span className="text-green-400">███████░░░ 70%</span></div>
                    <div><span className="syntax-string">"Tailwind"</span>: <span className="text-green-400">████████░░ 80%</span></div>
                  </div>
                  <div>{"}"}</div>
                </div>
                
                <div>
                  <div className="syntax-property mb-3">Backend</div>: {"{"}
                  <div className="ml-4 space-y-1">
                    <div><span className="syntax-string">"Node.js"</span>: <span className="text-green-400">█████████░ 90%</span></div>
                    <div><span className="syntax-string">"Express"</span>: <span className="text-green-400">████████░░ 80%</span></div>
                    <div><span className="syntax-string">"MongoDB"</span>: <span className="text-green-400">███████░░░ 70%</span></div>
                    <div><span className="syntax-string">"PostgreSQL"</span>: <span className="text-green-400">██████░░░░ 60%</span></div>
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="syntax-property mb-3">DevOps</div>: {"{"}
                <div className="ml-4 space-y-1">
                  <div><span className="syntax-string">"Docker"</span>: <span className="text-green-400">███████░░░ 70%</span></div>
                  <div><span className="syntax-string">"AWS"</span>: <span className="text-green-400">██████░░░░ 60%</span></div>
                  <div><span className="syntax-string">"Git"</span>: <span className="text-green-400">█████████░ 90%</span></div>
                  <div><span className="syntax-string">"CI/CD"</span>: <span className="text-green-400">███████░░░ 70%</span></div>
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section with terminal theme */}
      <AnimatedSection
        id="contact"
        className="py-20 bg-gradient-to-br from-[#141414] to-[#0a0a0a] matrix-bg"
        childrenClassName="container mx-auto px-6"
      >
        <AnimatedTitle
          text="$ ./initiate-contact.sh"
          className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text code-font"
        />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
              className="terminal p-8 neon-border"
              initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
              <div className="code-font text-sm space-y-4">
                <div className="text-green-400">// Contact Information</div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#f5c842]" />
                    <a
                      href="mailto:work.vinodsharma23@gmail.com"
                      className="text-[#f5c842] hover:text-[#ffd700] hover:underline"
                >
                  work.vinodsharma23@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-[#f5c842]" />
                    <a
                  href="https://github.com/vinodonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="text-[#f5c842] hover:text-[#ffd700] hover:underline"
                >
                  github.com/vinodonweb
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-[#f5c842]" />
                    <a
                  href="https://linkedin.com/in/vinodonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="text-[#f5c842] hover:text-[#ffd700] hover:underline"
                >
                  linkedin.com/in/vinodonweb
                    </a>
                  </div>
                </div>
              </div>
              </motion.div>

            <motion.div
              className="terminal p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="code-font text-sm text-green-400">
                  // Ready to collaborate?
                </div>
                <div className="text-white">
                  <p className="mb-4">
                    I'm always interested in new opportunities and exciting projects. 
                    Whether you're looking to build something amazing or just want to chat about tech!
                  </p>
                </div>
              <RainbowButton
                onClick={() => window.location.href = 'mailto:work.vinodsharma23@gmail.com'}
                  className="w-full neon-border"
              >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
              </RainbowButton>
              </div>
            </motion.div>

            {/* Resume Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ResumeDownload />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <motion.footer
        className="bg-[#0a0a0a] py-8 border-t border-[#f5c842]/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="code-font text-gray-400">
            <p>© {new Date().getFullYear()} Vinod Sharma. Built with React & ❤️</p>
            <p className="text-[#f5c842] mt-2">// Keep coding, keep creating</p>
          </div>
        </div>
      </motion.footer>

      {/* Easter Eggs */}
      <EasterEggs />
      
      {/* Hint System */}
      <HintSystem />
    </div>
  );
}

export default App