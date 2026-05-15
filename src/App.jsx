import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import {
  Mail, Github, Linkedin, ExternalLink, Code2, Server,
  Database, Globe, Calendar, ArrowRight, Layers, Terminal,
  Cpu, GitBranch, ChevronRight, Zap, Brain, Bot
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import ScrollObserver from './components/ScrollObserver'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SKILLS_MARQUEE = [
  'Java', 'Spring Boot', 'TypeScript', 'React', 'Next.js',
  'Python', 'FastAPI', 'Node.js', 'AWS', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions',
  'Jenkins', 'LangChain', 'Prompt Engineering', 'SQL', 'OAuth 2.0',
  'Nginx', 'SAML', 'REST APIs', 'Microservices', 'RBAC',
]

const EXPERIENCES = [
   {
    title: 'Volunteer Software Engineer',
    company: 'EarthHero',
    period: 'Aug 2025 – Present',
    type: 'Volunteer',
    dotColor: '#d29922',
    description: [
      'Contributing to the EarthHero web platform (Next.js, React, Firebase) — a climate action nonprofit used across 150+ countries',
      'Helped migrate the codebase from the Next.js pages router to the app router, improving rendering performance',
      'Shipped localized emissions units (metric/imperial by country) and a "Not For Me" dismissal flow from the issue tracker',
      'Tightened Firebase security rules to harden read/write access on user data',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'Firebase'],
    link: 'https://www.earthhero.org/',
  },
  {
    title: 'Software Engineer',
    company: 'DePaul University',
    period: 'Feb 2024 – Jun 2025',
    type: 'Full-Time',
    dotColor: '#3fb950',
    description: [
      'Replaced 4 paid third-party tools with custom Node.js and Spring Boot microservices, cutting software costs by 70%',
      'PostgreSQL/MongoDB query refactoring improved performance by 60% across core academic workflows',
      'Set up Nginx reverse proxy + load balancing on DigitalOcean, reducing API latency by 60%; wired GitHub Actions + Docker for zero-downtime deploys',
      'Led OAuth 2.0, SAML, and RBAC hardening across platforms, securing sensitive student and admin data',
    ],
    technologies: ['Node.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'Nginx'],
  },
   {
    title: 'Junior Software Engineer',
    company: 'Techsyspro Infosolutions',
    period: 'Jan 2022 – Jul 2023',
    type: 'Full-Time',
    dotColor: '#58a6ff',
    description: [
      'Built REST APIs with Node.js/Express and Java Spring Boot supporting internal application workflows',
      'Designed and optimized PostgreSQL schemas and queries for core data access patterns',
      'Maintained production services on AWS (EC2, S3, RDS) in an Agile/Scrum environment',
    ],
    technologies: ['Node.js', 'Express', 'Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
  }
]

const PROJECTS = [
  {
    title: 'SmartReached',
    description: 'AI-powered all-in-one outreach platform for job seekers. Automates personalized outreach at scale — from crafting tailored cover letters to managing application pipelines with LLM orchestration.',
    technologies: ['Next.js', 'FastAPI', 'LangChain', 'AWS', 'Stripe', 'PostgreSQL'],
    demoLink: 'https://smartreached.com',
    githubLink: null,
    status: 'Live',
    featured: true,
    aiOutput: [
      '> initializing resume parser...',
      '> extracting skills & experience     ✓',
      '> analyzing job requirements          ✓',
      '> running LangChain orchestration...',
      '> generating personalized email        ✓',
      '> SmartReached pipeline complete  🚀',
    ],
  },
  {
    title: 'VectorDB',
    description: 'Vector database built from scratch in Python with three swappable search backends (HNSW, KD-Tree, brute force). Includes a full RAG pipeline — Ollama embeds queries, HNSW retrieves top-k chunks, and llama3.2 generates grounded answers. Ships with a REST API and a live 2D PCA scatter plot showing semantic clusters forming in real time.',
    technologies: ['Python', 'HNSW', 'RAG', 'Ollama', 'REST API'],
    demoLink: null,
    githubLink: 'https://github.com/vinodonweb/Your-OWN-AI',
    status: 'Open Source',
    featured: false,
  },
  {
    title: 'AI Code Analyzer',
    description: 'Instant AI-driven code analysis that identifies security vulnerabilities, performance bottlenecks, and quality improvements.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI API', 'Vercel'],
    demoLink: 'https://code-analyzer-mu.vercel.app/',
    githubLink: null,
    status: 'Live',
    featured: false,
  },
  {
    title: 'Break Reminder Extension',
    description: 'Chrome extension that gamifies break reminders with jokes, quotes, and exercise tips. 500+ active users on the Chrome Web Store.',
    technologies: ['React.js', 'Chrome APIs'],
    demoLink: 'https://chromewebstore.google.com/detail/break-reminder/imkkaclpdmkjoebdceipiokgnehkollk',
    githubLink: 'https://github.com/vinodonweb/break-reminder-extraction',
    status: 'Published',
    featured: false,
  },
]

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    icon: <Code2 className="w-4 h-4" />,
    skills: ['Java', 'Python', 'TypeScript', 'SQL'],
  },
  {
    label: 'Backend & Cloud',
    icon: <Server className="w-4 h-4" />,
    skills: ['Spring Boot', 'FastAPI', 'Node.js', 'AWS (EC2, S3, Lambda, RDS)', 'OAuth 2.0', 'REST APIs'],
  },
  {
    label: 'Frontend & Databases',
    icon: <Database className="w-4 h-4" />,
    skills: ['React', 'Next.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'DevOps',
    icon: <GitBranch className="w-4 h-4" />,
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'Nginx'],
  },
]

const AI_TOOLS = [
  { name: 'LangChain', desc: 'LLM chain orchestration & RAG pipelines' },
  { name: 'Prompt Engineering', desc: 'Zero-shot, few-shot, CoT reasoning' },
  { name: 'OpenAI API', desc: 'GPT-4o integrations & function calling' },
  { name: 'Claude Code', desc: 'AI-assisted software architecture' },
  { name: 'Cursor', desc: 'AI-powered pair programming' },
  { name: 'RAG Pipelines', desc: 'Vector search + retrieval-augmented gen' },
  { name: 'AI Workflow Design', desc: 'Autonomous agent architecture' },
  { name: 'FastAPI + LLM', desc: 'Production AI API services at scale' },
]

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function Section({ id, children, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id={id} ref={ref} className={`py-24 ${className}`} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="container-xl"
      >
        {children}
      </motion.div>
    </section>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="section-label mb-3">
      <span className="comment-slash">//</span>
      <span style={{ color: 'var(--text-muted)' }}>{children}</span>
    </div>
  )
}

function StatusBadge({ status }) {
  const isLive = status === 'Live'
  const isOpenSource = status === 'Open Source'
  return (
    <span className={isLive ? 'badge-live' : 'badge-live badge-published'}
      style={isOpenSource ? { color: '#58a6ff', borderColor: 'rgba(88,166,255,0.3)' } : {}}>
      {isLive && <span className="status-dot" style={{ width: 5, height: 5, animation: 'none', boxShadow: 'none' }} />}
      {status}
    </span>
  )
}

/* Typewriter subtitle */
const ROLES = ['Software Engineer', 'Backend Architect', 'AI Builder']
function TypewriterRole() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[idx]
    let timeout
    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 75)
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 40)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx])

  return (
    <span style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', fontWeight: 500 }}>
      {text}<span className="cursor-blink" />
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────── */
export default function App() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const navItems = ['home', 'experience', 'projects', 'skills', 'beyond', 'contact']

  return (
    <div
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      className="min-h-screen overflow-x-hidden relative"
    >
      <ScrollObserver />

      {/* ── NAVIGATION ──────────────────────────────────────── */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={`nav-pill flex items-center gap-1 px-3 py-2 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/50' : ''}`}>
          {/* Logo */}
          <span
            className="code-font text-sm font-bold mr-2 px-2"
            style={{ color: 'var(--green)', letterSpacing: '-0.02em' }}
          >
            ~/vinod
          </span>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 code-font"
              style={{
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {item}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: '0.25rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'var(--green)',
              color: '#0d1117',
              textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.target.style.background = 'var(--green-bright)'; e.target.style.boxShadow = '0 0 16px var(--green-glow)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--green)'; e.target.style.boxShadow = 'none'; }}
          >
            Resume ↗
          </a>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center dot-grid mesh-bg" style={{ zIndex: 1 }}>
        <div className="container-xl relative" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — Text */}
            <div>
              {/* Terminal prompt label */}
              <motion.div
                className="code-font text-sm mb-5 flex items-center gap-2"
                style={{ color: 'var(--text-muted)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ color: 'var(--green)' }}>~/vinod</span>
                <span>$ whoami</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="font-display font-bold leading-none mb-3"
                style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="gradient-text">Vinod Sharma</span>
              </motion.h1>

              {/* Typewriter role */}
              <motion.div
                className="mb-4 h-7 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <TypewriterRole />
              </motion.div>

              {/* Status + role pills */}
              <motion.div
                className="flex flex-wrap items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="status-dot" />
                  <span className="code-font text-xs" style={{ color: 'var(--green)' }}>open to work</span>
                </div>
                <span className="glass-badge">Chicago, IL</span>
                <span className="glass-badge">3+ yrs</span>
              </motion.div>

              {/* Bio */}
              <motion.p
                style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '480px', marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Software engineer specializing in Java/Spring Boot microservices, React/TypeScript frontends, and AI-powered products with LangChain.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.button
                  onClick={() => scrollTo('contact')}
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </motion.button>
                <motion.button
                  onClick={() => scrollTo('projects')}
                  className="btn-outline"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View projects
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/30call')}
                  className="btn-outline"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule call
                </motion.button>
              </motion.div>
            </div>

            {/* Right — Terminal card + stats */}
            <motion.div
              className="float hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {/* Terminal window */}
              <div className="terminal-card">
                <div className="terminal-header">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot yellow" />
                  <div className="terminal-dot green" />
                  <span className="terminal-title">vinod.ts</span>
                </div>
                <div className="terminal-body" style={{ fontSize: '0.78rem', lineHeight: 1.75 }}>
                  <div><span className="syntax-keyword">const</span> <span className="syntax-variable">engineer</span> = {'{'}</div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">name</span>:{' '}
                    <span className="syntax-string">"Vinod Sharma"</span>,
                  </div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">role</span>:{' '}
                    <span className="syntax-string">"Software Engineer"</span>,
                  </div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">location</span>:{' '}
                    <span className="syntax-string">"Chicago, IL"</span>,
                  </div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">stack</span>: [
                    <span className="syntax-string">"Java"</span>,{' '}
                    <span className="syntax-string">"React"</span>,{' '}
                    <span className="syntax-string">"AWS"</span>],
                  </div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">aiTools</span>: [
                    <span className="syntax-string">"LangChain"</span>,{' '}
                    <span className="syntax-string">"OpenAI"</span>],
                  </div>
                  <div style={{ marginLeft: '1.5rem' }}>
                    <span className="syntax-property">status</span>:{' '}
                    <span className="syntax-value">"open_to_work"</span>,
                  </div>
                  <div>{'}'}</div>
                  <div style={{ marginTop: '0.6rem' }}>
                    <span className="syntax-comment">// 57M+ users served</span>
                  </div>
                  <div>
                    <span className="syntax-comment">// 200K+ daily API requests · 99.9% uptime</span>
                  </div>
                </div>
              </div>

              {/* Stat pills */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {[
                  { val: '3+', label: 'Years exp.' },
                  { val: '57M+', label: 'Users served' },
                  { val: '99.9%', label: 'Uptime' },
                ].map(({ val, label }) => (
                  <div key={label} className="stat-card">
                    <div className="font-display font-bold text-xl" style={{ color: 'var(--green)' }}>{val}</div>
                    <div className="code-font text-xs" style={{ color: 'var(--text-muted)', marginTop: '0.1rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div style={{
            width: 22, height: 36, borderRadius: 11,
            border: '1.5px solid var(--border)',
            display: 'flex', justifyContent: 'center', paddingTop: 5,
          }}>
            <div style={{ width: 3, height: 7, borderRadius: 2, background: 'var(--green)', opacity: 0.7 }} />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SKILLS MARQUEE
      ═══════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: '1px solid var(--border-dim)',
        borderBottom: '1px solid var(--border-dim)',
        padding: '0.9rem 0',
        background: 'var(--bg-surface)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((skill, i) => (
              <span
                key={i}
                className="tech-tag mx-3"
                style={{ whiteSpace: 'nowrap', fontSize: '0.72rem' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════════ */}
      <Section id="experience" style={{ zIndex: 1 }}>
        <SectionLabel>experience</SectionLabel>
        <h2 className="font-display font-bold mb-14"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.025em' }}>
          Where I&apos;ve worked
        </h2>
        <div className="relative pl-6" style={{ borderLeft: '2px solid var(--border)' }}>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              className="relative mb-10 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -31, top: 22,
                width: 10, height: 10, borderRadius: '50%',
                background: exp.dotColor,
                border: '2px solid var(--bg-base)',
                boxShadow: `0 0 10px ${exp.dotColor}60`,
              }} />

              <div className="glass-card p-6" style={{ borderRadius: 10 }}>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>{exp.title}</h3>
                    <div className="flex items-center gap-2">
                      {exp.link ? (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer"
                          style={{ color: exp.dotColor, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >{exp.company} ↗</a>
                      ) : (
                        <span style={{ color: exp.dotColor, fontWeight: 600, fontSize: '0.9rem' }}>{exp.company}</span>
                      )}
                      <span className="glass-badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>{exp.type}</span>
                    </div>
                  </div>
                  <span className="code-font text-xs" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: 'var(--green)' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════════ */}
      <Section id="projects" style={{ background: 'var(--bg-surface)', zIndex: 1, position: 'relative' }}>
        <SectionLabel>projects</SectionLabel>
        <h2 className="font-display font-bold mb-14"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.025em' }}>
          Things I&apos;ve built
        </h2>

        <div className="bento-grid">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className={`project-card ${project.featured ? 'bento-featured' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {/* Status + file label */}
              <div className="flex items-center justify-between mb-4">
                <span className="code-font text-xs" style={{ color: 'var(--text-muted)' }}>
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <StatusBadge status={project.status} />
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{project.title}</h3>

              {/* Description */}
              <p style={{
                color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem',
                ...(project.featured ? {} : { WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
              }}>
                {project.description}
              </p>

              {/* AI pipeline output — featured only */}
              {project.featured && project.aiOutput && (
                <div className="terminal-card mb-4" style={{ fontSize: '0.72rem' }}>
                  <div className="terminal-header" style={{ padding: '0.35rem 0.75rem' }}>
                    <div className="terminal-dot red" style={{ width: 9, height: 9 }} />
                    <div className="terminal-dot yellow" style={{ width: 9, height: 9 }} />
                    <div className="terminal-dot green" style={{ width: 9, height: 9 }} />
                    <span className="terminal-title">ai-pipeline.log</span>
                  </div>
                  <div className="terminal-body" style={{ padding: '0.7rem 0.9rem' }}>
                    {project.aiOutput.map((line, j) => (
                      <div key={j} style={{
                        color: line.includes('✓') || line.includes('🚀')
                          ? 'var(--green-bright)'
                          : line.includes('initializing') || line.includes('running')
                            ? 'var(--text-muted)'
                            : 'var(--text-secondary)',
                        marginBottom: '0.1rem',
                      }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                )}
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: 'var(--green)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--green-bright)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--green)'}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════════════════════ */}
      <Section id="skills" style={{ zIndex: 1 }}>
        <SectionLabel>tech stack</SectionLabel>
        <h2 className="font-display font-bold mb-12"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.025em' }}>
          My tech stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              className="skill-category"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: 'rgba(63,185,80,0.1)',
                  border: '1px solid rgba(63,185,80,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--green)',
                }}>
                  {cat.icon}
                </div>
                <span className="skill-category-title">{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className="tech-tag">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: 'rgba(63,185,80,0.1)',
            border: '1px solid rgba(63,185,80,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          }}>🎓</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.1rem' }}>M.S. Computer Science</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              DePaul University — Chicago, IL · June 2025
            </div>
          </div>
        </motion.div>

        {/* ─── AI & LLM Stack ─────────────────────────────── */}
        <SectionLabel>ai & llm stack</SectionLabel>
        <h3 className="font-display font-bold mb-8"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}>
          AI engineering toolkit
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {AI_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="ai-pill"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className="ai-pill-name">{tool.name}</div>
              <div className="ai-pill-desc">{tool.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* AI project highlight */}
        <motion.div
          className="glass-card mt-8 p-5"
          style={{ borderColor: 'rgba(63,185,80,0.2)' }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div style={{
              width: 40, height: 40, borderRadius: 8, flexShrink: 0,
              background: 'rgba(63,185,80,0.1)',
              border: '1px solid rgba(63,185,80,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot className="w-5 h-5" style={{ color: 'var(--green)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                Building AI-First Products
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                Designing and shipping production AI pipelines — from resume parsing with LLMs to automated outreach generation and RAG-powered knowledge retrieval. I combine backend engineering rigor with modern AI tooling to build products that <span style={{ color: 'var(--green)' }}>actually work at scale</span>.
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          BEYOND THE CODE
      ═══════════════════════════════════════════════════════ */}
      <Section id="beyond" style={{ zIndex: 1 }}>
        <SectionLabel>beyond the code</SectionLabel>
        <h2 className="font-display font-bold mb-3"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.025em' }}>
          Not just a keyboard guy
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: 520 }}>
          When I&apos;m not pushing commits or debugging at 2am,{' '}
          <span style={{ color: 'var(--text-primary)' }}>here&apos;s what I&apos;m actually doing:</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              emoji: '🏋️',
              title: 'Lifting Weights',
              desc: 'PRs in the gym, PRs in the codebase. Discipline is discipline.',
              tag: 'strength.exe',
            },
            {
              emoji: '🍺',
              title: 'Exploring Local Bars',
              desc: 'Chicago has incredible spots. The best conversations happen over a good drink.',
              tag: 'social.irl',
            },
            {
              emoji: '👾',
              title: 'Video Games',
              desc: 'Call of Duty, mostly. My K/D is classified — same clearance as my AWS IAM roles.',
              tag: 'gaming.mode',
            },
            {
              emoji: '🤙',
              title: 'Out With Friends',
              desc: 'Running on caffeine and good company. AFK mode: engaged.',
              tag: 'system.offline',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div style={{ fontSize: '2rem', lineHeight: 1 }}>{item.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.95rem' }}>{item.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
              <span className="code-font text-xs mt-auto" style={{ color: 'var(--text-muted)' }}>// {item.tag}</span>
            </motion.div>
          ))}
        </div>

        {/* COD Challenge Card — the showstopper */}
        <motion.div
          className="glass-card p-6"
          style={{
            borderColor: 'rgba(63,185,80,0.35)',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(63,185,80,0.04) 100%)',
            position: 'relative', overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* corner glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,185,80,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>🎮</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Wanna 1v1 on COD?</span>
                <span className="badge-live" style={{ fontSize: '0.65rem' }}>
                  <span className="status-dot" style={{ width: 5, height: 5 }} />
                  serious offer
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0, maxWidth: 540 }}>
                I&apos;m not saying I&apos;ll destroy you... but I&apos;m not{' '}
                <span style={{ fontStyle: 'italic' }}>not</span> saying that either.
                If you want to discuss a job opportunity AND settle it on Warzone, my DMs are open.
                <span style={{ color: 'var(--green)', marginLeft: 4 }}>
                  Win = you skip the technical interview. Lose = you still get a great engineer. 🤝
                </span>
              </p>
            </div>
            <div className="terminal-card flex-shrink-0 hidden sm:block" style={{ fontSize: '0.72rem', minWidth: 190 }}>
              <div className="terminal-header" style={{ padding: '0.3rem 0.65rem' }}>
                <div className="terminal-dot red" style={{ width: 8, height: 8 }} />
                <div className="terminal-dot yellow" style={{ width: 8, height: 8 }} />
                <div className="terminal-dot green" style={{ width: 8, height: 8 }} />
                <span className="terminal-title">match.log</span>
              </div>
              <div className="terminal-body" style={{ padding: '0.6rem 0.8rem', lineHeight: 1.8 }}>
                <div style={{ color: 'var(--text-muted)' }}>&gt; searching lobby...</div>
                <div><span className="syntax-value">vinod</span> <span style={{ color: 'var(--text-muted)' }}>joined</span></div>
                <div><span style={{ color: '#ff7b72)' }}>opponent</span> <span style={{ color: 'var(--text-muted)' }}>joined</span></div>
                <div style={{ color: 'var(--green)' }}>&gt; GG in advance 😅</div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════ */}
      <Section id="contact" style={{ background: 'var(--bg-surface)', zIndex: 1, position: 'relative' }}>
        <div className="max-w-xl mx-auto text-center">
          <SectionLabel>contact</SectionLabel>
          <h2 className="font-display font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.025em' }}>
            Let&apos;s work together
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem' }}>
            I&apos;m actively looking for full-time Software Engineering opportunities.
            Reach out — I&apos;d love to chat about how I can contribute to your team.
          </p>

          {/* Primary email CTA */}
          <motion.a
            href="mailto:work.vinodsharma23@gmail.com"
            className="btn-primary"
            style={{ display: 'inline-flex', marginBottom: '2rem', fontSize: '0.9rem', padding: '0.7rem 1.6rem' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4" />
            work.vinodsharma23@gmail.com
          </motion.a>

          {/* Social links */}
          <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
            {[
              { icon: <Github className="w-4 h-4" />, label: 'github.com/vinodonweb', href: 'https://github.com/vinodonweb' },
              { icon: <Linkedin className="w-4 h-4" />, label: 'linkedin.com/in/vinodonweb', href: 'https://linkedin.com/in/vinodonweb' },
              { icon: <Calendar className="w-4 h-4" />, label: 'Schedule a 30-min call', href: null, onClick: () => navigate('/30call') },
            ].map(({ icon, label, href, onClick }) => (
              <motion.a
                key={label}
                href={href ?? '#'}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                onClick={onClick ? (e) => { e.preventDefault(); onClick() } : undefined}
                className="contact-link"
                whileHover={{ x: 3 }}
              >
                <div className="contact-link-icon">{icon}</div>
                <span>{label}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-40" />
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border-dim)',
        padding: '1.5rem 0',
        background: 'var(--bg-base)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="code-font text-sm" style={{ color: 'var(--green)' }}>
            ~/vinod{' '}
            <span style={{ color: 'var(--text-muted)' }}>$ </span>
            <span className="cursor-blink" />
          </span>
          <span className="code-font text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} · Built with React & Framer Motion
          </span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/vinodonweb" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/vinodonweb" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:work.vinodsharma23@gmail.com"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}