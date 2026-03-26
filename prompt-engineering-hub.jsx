/**
 * PromptCraft Hub — A Complete Prompt Engineering Learning Platform
 * 
 * Architecture:
 *  - Single-file React component (default export)
 *  - Tailwind CSS for styling
 *  - Lucide-react for icons
 *  - All data is static/mocked
 *  - Sections: Hero, Fundamentals, Constraints, Parameters, Frameworks,
 *              Playground, Library, Learning Path, Leaderboard, Blog
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sun, Moon, Zap, BookOpen, Sliders, Brain, Code2, Layers,
  Copy, Check, ChevronRight, ChevronDown, Star, Trophy, Users,
  Search, Filter, Play, RotateCcw, Info, Sparkles, ArrowRight,
  Terminal, Lightbulb, AlertTriangle, TrendingUp, Bookmark,
  BookMarked, Menu, X, ExternalLink, Clock, Award, Target,
  MessageSquare, Hash, Cpu, Database, GitBranch
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "fundamentals", label: "Fundamentals", icon: BookOpen },
  { id: "constraints",  label: "Constraints",  icon: Cpu },
  { id: "parameters",   label: "Parameters",   icon: Sliders },
  { id: "frameworks",   label: "Frameworks",   icon: GitBranch },
  { id: "playground",   label: "Playground",   icon: Terminal },
  { id: "library",      label: "Library",      icon: Database },
  { id: "learning",     label: "Learning Path",icon: Target },
];

const PROMPT_LIBRARY = [
  {
    id: 1, category: "Coding", title: "Code Reviewer",
    prompt: "Review the following code for bugs, performance issues, and style improvements. Explain each issue clearly and provide corrected code snippets:\n\n[PASTE CODE HERE]",
    tags: ["debugging", "review", "code quality"], likes: 342, featured: true,
  },
  {
    id: 2, category: "Writing", title: "Blog Post Generator",
    prompt: "Write a comprehensive blog post about [TOPIC] targeting [AUDIENCE]. Include: an engaging hook, 3–5 main sections with subheadings, practical examples, and a call-to-action conclusion. Tone: [TONE].",
    tags: ["content", "SEO", "writing"], likes: 289, featured: true,
  },
  {
    id: 3, category: "Business", title: "SWOT Analyst",
    prompt: "Perform a detailed SWOT analysis for [COMPANY/PRODUCT]. For each quadrant (Strengths, Weaknesses, Opportunities, Threats), provide 4–5 specific points with brief explanations. Conclude with 3 strategic recommendations.",
    tags: ["strategy", "analysis", "business"], likes: 215,
  },
  {
    id: 4, category: "Learning", title: "Concept Explainer",
    prompt: "Explain [CONCEPT] using the Feynman technique. Start with a simple analogy a 10-year-old would understand, then progressively build to a more technical explanation. Include a real-world example and common misconceptions.",
    tags: ["education", "learning", "feynman"], likes: 401, featured: true,
  },
  {
    id: 5, category: "Coding", title: "SQL Query Builder",
    prompt: "Generate a well-commented SQL query that: [DESCRIBE WHAT YOU NEED]. Use best practices including proper indexing hints, avoid N+1 patterns, and explain the query logic step by step.",
    tags: ["sql", "database", "query"], likes: 178,
  },
  {
    id: 6, category: "Writing", title: "Email Optimizer",
    prompt: "Rewrite this email to be more [professional/concise/persuasive]: [EMAIL]. Preserve the core message but improve: subject line, opening hook, clarity of ask, and closing CTA.",
    tags: ["email", "communication", "business"], likes: 267,
  },
  {
    id: 7, category: "Research", title: "Literature Summarizer",
    prompt: "Summarize the key findings, methodology, and implications of this research paper in 300 words. Then list 5 follow-up questions a researcher might explore based on these findings:\n\n[PASTE ABSTRACT/TEXT]",
    tags: ["research", "academic", "summary"], likes: 156,
  },
  {
    id: 8, category: "Business", title: "Product Launch Planner",
    prompt: "Create a 90-day product launch plan for [PRODUCT] targeting [MARKET]. Include: pre-launch (days 1–30), launch week activities, and post-launch optimization. Use a table format for the timeline.",
    tags: ["product", "launch", "marketing"], likes: 193,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "PromptWizard99",   score: 4820, badge: "🥇", prompts: 47 },
  { rank: 2, name: "AIArchitect",      score: 4210, badge: "🥈", prompts: 39 },
  { rank: 3, name: "NeuralNomad",      score: 3890, badge: "🥉", prompts: 35 },
  { rank: 4, name: "TokenTamer",       score: 3340, badge: "⭐", prompts: 28 },
  { rank: 5, name: "ContextCrafter",   score: 2970, badge: "⭐", prompts: 24 },
];

const BLOG_POSTS = [
  {
    id: 1, title: "Why Chain-of-Thought Prompting Outperforms Direct Answers by 40%",
    excerpt: "A deep dive into the research showing why step-by-step reasoning dramatically improves LLM accuracy on complex tasks.",
    date: "Mar 20, 2026", readTime: "6 min", category: "Research",
  },
  {
    id: 2, title: "The Hidden Cost of Long Context Windows",
    excerpt: "What developers often miss: attention degradation in the middle of long context windows, and how to structure prompts to avoid it.",
    date: "Mar 15, 2026", readTime: "8 min", category: "Advanced",
  },
  {
    id: 3, title: "Zero-Shot vs Few-Shot: When Each Actually Wins",
    excerpt: "Practical benchmarks comparing prompting strategies across 12 task types — the results may surprise you.",
    date: "Mar 8, 2026", readTime: "5 min", category: "Tutorial",
  },
];

const LEARNING_PATH = [
  {
    level: "Beginner", color: "#10b981", icon: Sparkles,
    modules: [
      { title: "What is Prompt Engineering?", done: true },
      { title: "Anatomy of a Good Prompt",    done: true },
      { title: "Your First 5 Prompts",         done: false },
      { title: "Avoiding Common Mistakes",     done: false },
    ],
  },
  {
    level: "Intermediate", color: "#f59e0b", icon: Zap,
    modules: [
      { title: "Chain-of-Thought Techniques", done: false },
      { title: "Role & Persona Prompting",    done: false },
      { title: "Few-Shot Pattern Design",     done: false },
      { title: "Parameter Tuning Lab",        done: false },
    ],
  },
  {
    level: "Advanced", color: "#ef4444", icon: Brain,
    modules: [
      { title: "Tree-of-Thought Prompting",   done: false },
      { title: "Prompt Injection Defense",    done: false },
      { title: "System Prompt Architecture",  done: false },
      { title: "Multi-Agent Orchestration",   done: false },
    ],
  },
];

const SIMULATED_OUTPUTS = {
  creative: [
    "The old lighthouse keeper, Maren, discovered the message in a bottle on a Tuesday — which was strange, because the sea had been still for seventeen years. She uncorked it with trembling fingers, wondering if the world outside her fog-wrapped island had finally remembered she existed...",
    "In a city where dreams were taxed at 15%, Ezra had stopped sleeping. The dream auditors came every Thursday, their briefcases humming with captured reveries — and he had debts he couldn't afford to pay in imagination...",
  ],
  precise: [
    "The French Revolution began in 1789 with the storming of the Bastille on July 14th. Key causes included: (1) fiscal crisis from war debt, (2) social inequality under the Estates system, (3) Enlightenment ideas challenging monarchical authority, and (4) food scarcity following poor harvests.",
    "Python list comprehension syntax: [expression for item in iterable if condition]. Example: squares = [x**2 for x in range(10) if x % 2 == 0] produces [0, 4, 16, 36, 64].",
  ],
  balanced: [
    "Machine learning is a subset of artificial intelligence where systems learn patterns from data rather than being explicitly programmed. Think of it like teaching a child — instead of giving rules, you show examples until the pattern clicks. Common applications include image recognition, recommendation systems, and language translation.",
    "To improve your public speaking: First, prepare thoroughly — know your material well enough to deviate from notes. Second, practice deliberate eye contact by picking 3 anchor points in the room. Third, embrace pauses — silence feels longer to you than your audience, and it creates emphasis.",
  ],
};

const FRAMEWORK_EXAMPLES = {
  chainOfThought: {
    bad: {
      prompt: "What is 17% of 340?",
      output: "57.8",
    },
    good: {
      prompt: "What is 17% of 340? Think through this step by step.",
      output: "Step 1: Convert 17% to decimal → 17 ÷ 100 = 0.17\nStep 2: Multiply 0.17 × 340\nStep 3: 0.17 × 300 = 51, 0.17 × 40 = 6.8\nStep 4: 51 + 6.8 = 57.8\n\nAnswer: 57.8",
    },
  },
  fewShot: {
    bad: {
      prompt: "Classify the sentiment of: 'The product arrived broken.'",
      output: "Negative",
    },
    good: {
      prompt: `Classify sentiment as POSITIVE, NEGATIVE, or NEUTRAL with brief reason.

Examples:
Text: "Fast shipping, great quality!" → POSITIVE (expresses satisfaction)
Text: "It's okay, nothing special." → NEUTRAL (mild, neither good nor bad)
Text: "Broke after one use, terrible." → NEGATIVE (expresses disappointment)

Now classify: "The product arrived broken."`,
      output: "NEGATIVE (product arrived damaged, indicating a negative customer experience)",
    },
  },
  roleBased: {
    bad: {
      prompt: "Explain recursion.",
      output: "Recursion is when a function calls itself.",
    },
    good: {
      prompt: "You are a patient CS professor teaching first-year students. Explain recursion using a real-world analogy before the technical definition.",
      output: "Great question! Imagine Russian nesting dolls (Matryoshka). Each doll contains a slightly smaller version of itself — until you reach the tiny final doll that contains nothing. Recursion works exactly the same way: a function solves a problem by solving a smaller version of that same problem, until it hits the simplest case (the base case) that it can solve directly...",
    },
  },
};

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(null);
  const copy = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), timeout);
    });
  }, [timeout]);
  return { copied, copy };
}

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-50 pointer-events-none"
          style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: "var(--accent)" }} />
        </span>
      )}
    </span>
  );
}

function Badge({ children, color = "var(--accent)" }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: color + "22", color: color, border: `1px solid ${color}44` }}>
      {children}
    </span>
  );
}

function SectionTag({ label }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
      style={{ background: "var(--accent)15", color: "var(--accent)", border: "1px solid var(--accent)30" }}>
      <Zap size={13} />
      {label}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function PromptCraftHub() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("fundamentals");
  const [savedPrompts, setSavedPrompts] = useState(new Set([2, 4]));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [playgroundPrompt, setPlaygroundPrompt] = useState("Write a short story about an AI that learned to paint.");
  const [temperature, setTemperature] = useState(0.8);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(200);
  const [playOutput, setPlayOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [frameworkTab, setFrameworkTab] = useState("chainOfThought");
  const [openFaq, setOpenFaq] = useState(null);
  const { copied, copy } = useClipboard();

  // CSS variables for theming
  const theme = {
    "--bg":       dark ? "#0a0b0f" : "#f4f5f7",
    "--bg2":      dark ? "#111318" : "#ffffff",
    "--bg3":      dark ? "#1a1d25" : "#f0f1f4",
    "--border":   dark ? "#ffffff12" : "#e2e4e9",
    "--text":     dark ? "#e8eaf0" : "#1a1d25",
    "--text2":    dark ? "#8a8fa8" : "#5a6070",
    "--accent":   "#6c63ff",
    "--accent2":  "#00d4aa",
    "--accent3":  "#ff6b6b",
    "--card":     dark ? "#13161e" : "#ffffff",
  };

  const simulateOutput = () => {
    setIsGenerating(true);
    setPlayOutput("");
    const pool = temperature > 0.6 ? SIMULATED_OUTPUTS.creative : temperature < 0.3 ? SIMULATED_OUTPUTS.precise : SIMULATED_OUTPUTS.balanced;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    let i = 0;
    const interval = setInterval(() => {
      if (i <= chosen.length) {
        setPlayOutput(chosen.slice(0, i));
        i += 3;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 18);
  };

  const toggleSave = (id) => {
    setSavedPrompts(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const categories = ["All", ...new Set(PROMPT_LIBRARY.map(p => p.category))];
  const filteredPrompts = PROMPT_LIBRARY.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ ...theme, background: "var(--bg)", color: "var(--text)", fontFamily: "'Syne', sans-serif", minHeight: "100vh" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }
        .mono { font-family: 'Space Mono', monospace; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        .glow { box-shadow: 0 0 30px rgba(108,99,255,0.2); }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(108,99,255,0.3); transition: box-shadow 0.3s; }
        .btn-primary { background: var(--accent); color: #fff; border: none; padding: 10px 22px; border-radius: 10px; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text2); padding: 8px 18px; border-radius: 10px; font-family: 'Syne', sans-serif; font-weight: 500; font-size: 13px; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: all 0.2s; }
        .card:hover { border-color: rgba(108,99,255,0.3); }
        input, textarea, select { background: var(--bg3); border: 1px solid var(--border); color: var(--text); border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border 0.2s; }
        input:focus, textarea:focus { border-color: var(--accent); }
        textarea { resize: vertical; }
        input[type="range"] { -webkit-appearance: none; background: var(--bg3); border-radius: 5px; height: 6px; cursor: pointer; border: none; padding: 0; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent); cursor: pointer; }
        .tag { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: var(--bg3); color: var(--text2); border: 1px solid var(--border); margin: 2px; font-family: 'DM Sans', sans-serif; }
        .section { padding: 80px 0; }
        .container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media(max-width: 768px) { .grid2, .grid3 { grid-template-columns: 1fr; } .hide-mobile { display: none !important; } }
        .tab-active { background: var(--accent) !important; color: #fff !important; border-color: var(--accent) !important; }
        .progress-bar { height: 6px; border-radius: 3px; background: var(--bg3); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent), var(--accent2)); }
        .code-block { background: #0d0f14; border: 1px solid var(--border); border-radius: 12px; padding: 16px; font-family: 'Space Mono', monospace; font-size: 12px; line-height: 1.7; color: #c9d1d9; overflow-x: auto; white-space: pre-wrap; }
        .hero-grid { display: grid; grid-template-columns: 1fr 420px; gap: 60px; align-items: center; }
        @media(max-width: 900px) { .hero-grid { grid-template-columns: 1fr; } }
        .shimmer { background: linear-gradient(90deg, var(--bg3) 25%, var(--border) 50%, var(--bg3) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; pointer-events: none; }
        .nav-link { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; color: var(--text2); text-decoration: none; }
        .nav-link:hover, .nav-link.active { color: var(--accent); background: rgba(108,99,255,0.1); }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)", background: dark ? "rgba(10,11,15,0.85)" : "rgba(244,245,247,0.85)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>PromptCraft<span style={{ color: "var(--accent)" }}>Hub</span></span>
          </div>

          <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`} className={`nav-link ${activeSection === l.id ? "active" : ""}`}
                onClick={() => setActiveSection(l.id)}>{l.label}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setDark(!dark)} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text2)" }}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="btn-primary hide-mobile" style={{ padding: "8px 16px", fontSize: 13 }}>
              Sign In
            </button>
            <button className="btn-ghost" style={{ display: "none" }} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "90px 0 70px", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 500, height: 500, background: "var(--accent)", top: -200, left: -100 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "var(--accent2)", bottom: -100, right: 0 }} />
        <div className="container">
          <div className="hero-grid">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: "var(--accent)18", color: "var(--accent)", border: "1px solid var(--accent)30", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <Sparkles size={14} /> The #1 Prompt Engineering Community
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20 }}>
                Master the Art of<br />
                <span style={{ color: "var(--accent)" }}>Prompt Engineering</span>
              </h1>
              <p className="dm" style={{ fontSize: 17, color: "var(--text2)", lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
                From beginner fundamentals to advanced techniques — learn, practice, and share prompts that unlock AI's full potential. Interactive playground included.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#learning" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  Start Learning <ArrowRight size={16} />
                </a>
                <a href="#playground" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  <Terminal size={15} /> Open Playground
                </a>
              </div>
              <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
                {[["12,400+", "Community Members"], ["850+", "Prompt Templates"], ["94%", "Satisfaction Rate"]].map(([val, lab]) => (
                  <div key={lab}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>{val}</div>
                    <div className="dm" style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{lab}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Card */}
            <div className="card glow fade-in" style={{ animationDelay: "0.2s", background: "var(--card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--text2)" }}>prompt.ai</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6, fontWeight: 600 }} className="mono">SYSTEM PROMPT</div>
                <div className="code-block" style={{ fontSize: 11, padding: 12 }}>
                  {`You are an expert tutor. When explaining
concepts, always use:
1. A real-world analogy
2. A step-by-step breakdown
3. A practical example
Tone: encouraging, clear`}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6, fontWeight: 600 }} className="mono">USER</div>
                <div className="code-block" style={{ fontSize: 11, padding: 12, background: "#1a1d25" }}>
                  Explain how neural networks learn.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--accent2)", marginBottom: 6, fontWeight: 600 }} className="mono">ASSISTANT ✦</div>
                <div className="code-block" style={{ fontSize: 11, padding: 12, borderColor: "rgba(0,212,170,0.2)" }}>
                  {`Think of it like training a dog 🐕
Each time the network makes a prediction,
it checks if it was right (loss function).
If wrong → adjust the "connections"
slightly (backpropagation)...`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNDAMENTALS ─────────────────────────────────────────────────── */}
      <section id="fundamentals" className="section">
        <div className="container">
          <SectionTag label="Chapter 1 — Fundamentals" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            What is Prompt Engineering?
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 48, lineHeight: 1.7 }}>
            Prompt engineering is the practice of crafting inputs to AI language models to reliably produce desired outputs. It's part art, part science.
          </p>

          <div className="grid3">
            {[
              { icon: MessageSquare, color: "var(--accent)", title: "What It Is", body: "The discipline of designing and refining text instructions (prompts) that guide large language models toward accurate, useful, and contextually appropriate responses." },
              { icon: TrendingUp, color: "var(--accent2)", title: "Why It Matters", body: "The difference between a mediocre and exceptional AI response often comes down to prompt quality. Good prompt engineering can 10x your productivity with AI tools." },
              { icon: Lightbulb, color: "var(--accent3)", title: "Real Applications", body: "Code generation, content creation, data analysis, customer support automation, research assistance, tutoring systems, and much more." },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="card hover-glow">
                <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{title}</h3>
                <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Bad vs Good Prompt */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Bad Prompt vs. Good Prompt</h3>
            <div className="grid2">
              <div className="card" style={{ borderColor: "#ff6b6b44" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <AlertTriangle size={16} color="#ff6b6b" />
                  <span style={{ color: "#ff6b6b", fontWeight: 700, fontSize: 13 }}>BAD PROMPT</span>
                </div>
                <div className="code-block" style={{ marginBottom: 14 }}>{`Write about climate change.`}</div>
                <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
                  ❌ No format specified, no audience, no length, no angle. The model will produce something generic and unpredictable.
                </p>
              </div>
              <div className="card" style={{ borderColor: "#00d4aa44" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Check size={16} color="#00d4aa" />
                  <span style={{ color: "#00d4aa", fontWeight: 700, fontSize: 13 }}>GOOD PROMPT</span>
                </div>
                <div className="code-block" style={{ marginBottom: 14 }}>{`Write a 300-word explainer on the top
3 effects of climate change for a high
school audience. Use bullet points,
avoid jargon, and end with one
actionable step teens can take.`}</div>
                <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
                  ✅ Specifies format, length, audience, structure, tone, and a concrete deliverable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSTRAINTS ──────────────────────────────────────────────────── */}
      <section id="constraints" className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <SectionTag label="Chapter 2 — Model Constraints" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            Understanding Model Limits
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 48, lineHeight: 1.7 }}>
            Every LLM operates within constraints. Understanding them lets you write prompts that work <em>with</em> the model, not against it.
          </p>

          <div className="grid2" style={{ gap: 24 }}>
            {[
              {
                icon: Hash, color: "#6c63ff", title: "Token Limits",
                content: (
                  <>
                    <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                      LLMs process text as <Tooltip text="~4 chars / 1 token on average"><span style={{ borderBottom: "1px dashed var(--accent)", cursor: "help" }}>tokens</span></Tooltip>, not words. A model with a 128K token context window can handle roughly 96,000 words.
                    </p>
                    <div style={{ background: "var(--bg3)", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span className="mono" style={{ fontSize: 11, color: "var(--text2)" }}>Context Usage</span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>73,400 / 128,000 tokens</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "57%" }} />
                      </div>
                    </div>
                    <p className="dm" style={{ fontSize: 13, color: "var(--text2)" }}>💡 Tip: Summarize long documents before including them in prompts.</p>
                  </>
                ),
              },
              {
                icon: Brain, color: "#00d4aa", title: "Hallucination",
                content: (
                  <>
                    <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                      LLMs generate plausible-sounding text — not necessarily factually accurate text. They can confidently state incorrect information.
                    </p>
                    <div className="code-block" style={{ fontSize: 11, marginBottom: 12 }}>
                      {`❌ "What papers did Dr. X publish in 2023?"
→ Model may invent citations that don't exist

✅ "I'll provide research papers. Summarize
only what I share, do not add external facts.
[PAPERS HERE]"`}
                    </div>
                    <p className="dm" style={{ fontSize: 13, color: "var(--text2)" }}>💡 Provide source material. Ask models to cite or acknowledge uncertainty.</p>
                  </>
                ),
              },
              {
                icon: Layers, color: "#f59e0b", title: "Context Window Memory",
                content: (
                  <>
                    <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                      LLMs don't have memory between sessions. Each conversation is independent. Research also shows attention can degrade in the <em>middle</em> of long contexts (the "lost in the middle" problem).
                    </p>
                    <div style={{ background: "var(--bg3)", borderRadius: 10, padding: 14, fontSize: 12, fontFamily: "Space Mono", lineHeight: 1.8 }}>
                      <div style={{ color: "#00d4aa" }}>█████ Strong recall</div>
                      <div style={{ color: "#f59e0b" }}>░░░░░ Weak recall</div>
                      <div style={{ color: "#00d4aa" }}>█████ Strong recall</div>
                      <div style={{ color: "var(--text2)", fontSize: 10, marginTop: 8 }}>Start ←————————————→ End of context</div>
                    </div>
                  </>
                ),
              },
              {
                icon: AlertTriangle, color: "#ef4444", title: "Bias & Limitations",
                content: (
                  <>
                    <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                      Models reflect biases in training data. They can truncate output mid-thought when hitting token limits, and struggle with tasks requiring real-time data or exact arithmetic.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {["Training data cutoff = no recent events", "Math errors on large numbers", "May reflect cultural biases", "Output truncates at max_tokens limit"].map(txt => (
                        <div key={txt} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--text2)" }} className="dm">
                          <span style={{ color: "#ef4444", flexShrink: 0 }}>⚠</span> {txt}
                        </div>
                      ))}
                    </div>
                  </>
                ),
              },
            ].map(({ icon: Icon, color, title, content }) => (
              <div key={title} className="card hover-glow">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color={color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16 }}>{title}</h3>
                </div>
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARAMETERS ───────────────────────────────────────────────────── */}
      <section id="parameters" className="section">
        <div className="container">
          <SectionTag label="Chapter 3 — Parameter Tuning" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            The Dials of an LLM
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 48, lineHeight: 1.7 }}>
            Parameters control how a model samples text. Understanding them lets you tune outputs from highly creative to laser-precise.
          </p>
          <div style={{ display: "grid", gap: 24 }}>
            {[
              {
                name: "Temperature", range: "0.0 → 2.0", icon: "🌡️",
                low: "Deterministic. Best for: factual Q&A, code generation, structured data extraction.",
                high: "Creative. Best for: storytelling, brainstorming, poetry, diverse ideas.",
                tip: "Start at 0.7 for general use. Reduce for tasks requiring accuracy.",
                visual: { left: "Precise", right: "Creative", pct: 70 },
              },
              {
                name: "Top-P (Nucleus Sampling)", range: "0.0 → 1.0", icon: "🎯",
                low: "Only considers the most probable next tokens. Very focused.",
                high: "Considers a broad vocabulary of likely tokens. More varied.",
                tip: "Use Top-P OR Temperature — adjusting both simultaneously is rarely needed.",
                visual: { left: "Focused", right: "Broad", pct: 90 },
              },
              {
                name: "Frequency Penalty", range: "0.0 → 2.0", icon: "🔄",
                low: "No penalty. Model may repeat phrases for emphasis.",
                high: "Strong penalty. Forces lexical diversity, avoids word repetition.",
                tip: "Raise to 0.5–1.0 when generating long-form content to avoid repetition.",
                visual: { left: "Repetition OK", right: "Force Diversity", pct: 40 },
              },
              {
                name: "Presence Penalty", range: "0.0 → 2.0", icon: "🗺️",
                low: "No push to introduce new topics.",
                high: "Encourages model to cover new ground and explore more concepts.",
                tip: "Useful for exploratory writing or when you want broad topic coverage.",
                visual: { left: "Stay on Topic", right: "Explore More", pct: 30 },
              },
            ].map(p => (
              <div key={p.name} className="card hover-glow">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 22 }}>{p.icon}</span>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</h3>
                        <span className="mono" style={{ fontSize: 11, color: "var(--text2)" }}>{p.range}</span>
                      </div>
                    </div>
                    <div className="grid2" style={{ gap: 12, marginBottom: 12 }}>
                      <div style={{ background: "var(--bg3)", borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>LOW VALUE</div>
                        <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{p.low}</p>
                      </div>
                      <div style={{ background: "var(--bg3)", borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent2)", marginBottom: 4 }}>HIGH VALUE</div>
                        <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{p.high}</p>
                      </div>
                    </div>
                    <div style={{ background: "rgba(108,99,255,0.08)", borderRadius: 8, padding: 10, display: "flex", gap: 8 }}>
                      <Lightbulb size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
                      <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{p.tip}</p>
                    </div>
                  </div>
                  <div style={{ width: 200 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "var(--text2)" }}>{p.visual.left}</span>
                      <span style={{ fontSize: 11, color: "var(--text2)" }}>{p.visual.right}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.visual.pct}%` }} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: 6 }}>
                      <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                        Recommended: {(p.visual.pct / 100 * (p.name.includes("Top") ? 1 : 2)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS ───────────────────────────────────────────────────── */}
      <section id="frameworks" className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <SectionTag label="Chapter 4 — Frameworks" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            Logical Prompting Frameworks
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 32, lineHeight: 1.7 }}>
            These proven patterns significantly improve LLM performance across different task types.
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              ["chainOfThought", "⛓ Chain-of-Thought"],
              ["fewShot",        "🎯 Few-Shot"],
              ["roleBased",      "🎭 Role-Based"],
            ].map(([key, label]) => (
              <button key={key} className={`btn-ghost ${frameworkTab === key ? "tab-active" : ""}`}
                onClick={() => setFrameworkTab(key)}>
                {label}
              </button>
            ))}
          </div>

          {/* Framework Content */}
          {(() => {
            const fw = FRAMEWORK_EXAMPLES[frameworkTab];
            const info = {
              chainOfThought: { title: "Chain-of-Thought (CoT)", desc: "Ask the model to reason step-by-step before answering. Dramatically improves accuracy on math, logic, and multi-step problems." },
              fewShot:        { title: "Few-Shot Prompting", desc: "Provide 2–5 input/output examples before your actual query. Teaches the model the exact format and style you want." },
              roleBased:      { title: "Role-Based Prompting", desc: "Assign the model a specific persona or expertise. This primes the model to draw on relevant knowledge and match the expected tone." },
            }[frameworkTab];
            return (
              <div className="fade-in">
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{info.title}</h3>
                  <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, maxWidth: 600 }}>{info.desc}</p>
                </div>
                <div className="grid2">
                  <div className="card" style={{ borderColor: "#ff6b6b44" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <AlertTriangle size={14} color="#ff6b6b" />
                      <span style={{ color: "#ff6b6b", fontWeight: 700, fontSize: 12 }}>WITHOUT FRAMEWORK</span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }} className="mono">PROMPT</div>
                      <div className="code-block" style={{ fontSize: 12 }}>{fw.bad.prompt}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }} className="mono">OUTPUT</div>
                      <div className="code-block" style={{ fontSize: 12, borderColor: "#ff6b6b33" }}>{fw.bad.output}</div>
                    </div>
                  </div>
                  <div className="card" style={{ borderColor: "#00d4aa44" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <Sparkles size={14} color="#00d4aa" />
                      <span style={{ color: "#00d4aa", fontWeight: 700, fontSize: 12 }}>WITH FRAMEWORK</span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }} className="mono">PROMPT</div>
                      <div className="code-block" style={{ fontSize: 12 }}>{fw.good.prompt}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 6 }} className="mono">OUTPUT</div>
                      <div className="code-block" style={{ fontSize: 12, borderColor: "#00d4aa33" }}>{fw.good.output}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Zero-Shot info */}
          <div className="card" style={{ marginTop: 24, background: "linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(0,212,170,0.05) 100%)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={20} color="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: 6 }}>Zero-Shot Prompting</h4>
                <p className="dm" style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>
                  No examples provided — just a clear task description. Works best with large, capable models for straightforward tasks. Example: <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>"Translate this to French: [TEXT]"</span> — no translation examples needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAYGROUND ───────────────────────────────────────────────────── */}
      <section id="playground" className="section">
        <div className="container">
          <SectionTag label="Interactive — Prompt Playground" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            Experiment in Real-Time
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 40, lineHeight: 1.7 }}>
            Adjust parameters and see how they affect output style. Outputs are simulated to demonstrate the effect of temperature changes.
          </p>

          <div className="grid2" style={{ gap: 28, alignItems: "start" }}>
            {/* Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Your Prompt</h3>
                <textarea value={playgroundPrompt} onChange={e => setPlaygroundPrompt(e.target.value)}
                  style={{ width: "100%", minHeight: 120, marginBottom: 0 }} />
              </div>

              <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Parameters</h3>
                {[
                  { label: "Temperature", val: temperature, set: setTemperature, min: 0, max: 2, step: 0.1,
                    hint: temperature < 0.4 ? "🎯 Precise" : temperature < 0.8 ? "⚖️ Balanced" : "🎨 Creative" },
                  { label: "Top-P", val: topP, set: setTopP, min: 0.1, max: 1, step: 0.05, hint: `${Math.round(topP*100)}% nucleus` },
                  { label: "Max Tokens", val: maxTokens, set: setMaxTokens, min: 50, max: 1000, step: 50, hint: `~${Math.round(maxTokens*0.75)} words` },
                ].map(({ label, val, set, min, max, step, hint }) => (
                  <div key={label} style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{label}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{val}</span>
                        <span className="dm" style={{ fontSize: 11, color: "var(--text2)" }}>{hint}</span>
                      </div>
                    </div>
                    <input type="range" min={min} max={max} step={step} value={val}
                      onChange={e => set(parseFloat(e.target.value))} style={{ width: "100%" }} />
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onClick={simulateOutput} disabled={isGenerating}>
                    {isGenerating ? <><span className="shimmer" style={{ width: 60, height: 14, borderRadius: 4 }} /></> : <><Play size={14} /> Generate</>}
                  </button>
                  <button className="btn-ghost" onClick={() => { setPlayOutput(""); setTemperature(0.8); setTopP(0.9); setMaxTokens(200); }}>
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="card" style={{ minHeight: 380 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: isGenerating ? "#00d4aa" : "#374151", transition: "all 0.3s" }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Output</span>
                </div>
                {playOutput && (
                  <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}
                    onClick={() => copy(playOutput, "output")}>
                    {copied === "output" ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                )}
              </div>
              {playOutput ? (
                <p className="dm" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>{playOutput}</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 280, color: "var(--text2)" }}>
                  <Terminal size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
                  <p className="dm" style={{ fontSize: 14 }}>Configure parameters and click Generate</p>
                  <p className="dm" style={{ fontSize: 12, marginTop: 4, opacity: 0.6 }}>Tip: Try temperature 0.1 vs 1.5 to see the difference</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIBRARY ──────────────────────────────────────────────────────── */}
      <section id="library" className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <SectionTag label="Prompt Library" />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 8 }}>
                Community Prompts
              </h2>
              <p className="dm" style={{ color: "var(--text2)", fontSize: 16 }}>
                Battle-tested prompts across every use case. Copy, customize, and deploy.
              </p>
            </div>
            <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={15} /> Submit Prompt
            </button>
          </div>

          {/* Search & Filter */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text2)" }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search prompts..." style={{ width: "100%", paddingLeft: 38 }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} className={`btn-ghost ${activeCategory === cat ? "tab-active" : ""}`}
                  style={{ padding: "8px 14px", fontSize: 12 }} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Grid */}
          <div className="grid2">
            {filteredPrompts.map(p => (
              <div key={p.id} className="card hover-glow" style={{ position: "relative" }}>
                {p.featured && (
                  <div style={{ position: "absolute", top: 16, right: 16 }}>
                    <Badge color="var(--accent)"><Star size={10} /> Featured</Badge>
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <Badge color="var(--accent2)">{p.category}</Badge>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{p.title}</h3>
                <div className="code-block" style={{ fontSize: 11, marginBottom: 14, maxHeight: 100, overflow: "hidden", position: "relative" }}>
                  {p.prompt}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 30, background: "linear-gradient(transparent, #0d0f14)" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {p.tags.map(t => <span key={t} className="tag">#{t}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}
                      onClick={() => copy(p.prompt, p.id)}>
                      {copied === p.id ? <><Check size={12} color="#00d4aa" /> Copied</> : <><Copy size={12} /> Copy</>}
                    </button>
                    <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }}
                      onClick={() => toggleSave(p.id)}>
                      {savedPrompts.has(p.id) ? <BookMarked size={14} color="var(--accent)" /> : <Bookmark size={14} />}
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text2)" }} className="dm">
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontSize: 13 }}>{p.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredPrompts.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "var(--text2)" }} className="dm">
              No prompts match your search. Try different keywords.
            </div>
          )}
        </div>
      </section>

      {/* ── LEARNING PATH ────────────────────────────────────────────────── */}
      <section id="learning" className="section">
        <div className="container">
          <SectionTag label="Learning Path" />
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>
            Your Journey to Mastery
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 16, maxWidth: 600, marginBottom: 48, lineHeight: 1.7 }}>
            Follow our structured curriculum from your first prompt to building production-grade AI pipelines.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {LEARNING_PATH.map((stage, si) => {
              const Icon = stage.icon;
              const completed = stage.modules.filter(m => m.done).length;
              return (
                <div key={stage.level} className="card hover-glow">
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: stage.color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={24} color={stage.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <h3 style={{ fontWeight: 800, fontSize: 18 }}>{stage.level}</h3>
                        <Badge color={stage.color}>{completed}/{stage.modules.length} done</Badge>
                      </div>
                      <div className="progress-bar" style={{ height: 4 }}>
                        <div style={{ height: "100%", borderRadius: 2, background: stage.color, width: `${completed/stage.modules.length*100}%`, transition: "width 0.5s" }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                    {stage.modules.map((mod, mi) => (
                      <div key={mod.title} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", borderRadius: 10, background: "var(--bg3)", border: `1px solid ${mod.done ? stage.color + "44" : "var(--border)"}` }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: mod.done ? stage.color : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          {mod.done && <Check size={11} color="#fff" />}
                        </div>
                        <div>
                          <p className="dm" style={{ fontSize: 13, fontWeight: 600, color: mod.done ? "var(--text)" : "var(--text2)", marginBottom: 4 }}>{mod.title}</p>
                          <div style={{ display: "flex", gap: 8 }}>
                            {mod.done
                              ? <Badge color={stage.color}>Completed</Badge>
                              : <button className="btn-ghost" style={{ padding: "3px 10px", fontSize: 11 }}>Start →</button>
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEADERBOARD ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="grid2" style={{ gap: 40, alignItems: "start" }}>
            {/* Leaderboard */}
            <div>
              <SectionTag label="Community" />
              <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 24 }}>
                Top Contributors
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {LEADERBOARD.map(l => (
                  <div key={l.rank} className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px" }}>
                    <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{l.badge}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</div>
                      <div className="dm" style={{ fontSize: 12, color: "var(--text2)" }}>{l.prompts} prompts submitted</div>
                    </div>
                    <div className="mono" style={{ color: "var(--accent)", fontWeight: 700, fontSize: 15 }}>{l.score.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button className="btn-ghost" style={{ width: "100%" }}>View Full Leaderboard</button>
              </div>
            </div>

            {/* Blog */}
            <div>
              <SectionTag label="Latest" />
              <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 24 }}>
                From the Blog
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {BLOG_POSTS.map(post => (
                  <div key={post.id} className="card hover-glow" style={{ cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <Badge color="var(--accent)">{post.category}</Badge>
                      <span className="dm" style={{ fontSize: 12, color: "var(--text2)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={11} /> {post.readTime} read
                      </span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
                    <p className="dm" style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="dm" style={{ fontSize: 12, color: "var(--text2)" }}>{post.date}</span>
                      <button className="btn-ghost" style={{ padding: "4px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                        Read <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 400, height: 400, background: "var(--accent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 40, marginBottom: 24, background: "var(--accent)15", border: "1px solid var(--accent)30" }}>
            <Award size={15} color="var(--accent)" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>Join 12,400+ prompt engineers</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>
            Ready to Master<br />Prompt Engineering?
          </h2>
          <p className="dm" style={{ color: "var(--text2)", fontSize: 17, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Create your free account to save prompts, track progress, and join our growing community.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "13px 32px", display: "flex", alignItems: "center", gap: 8 }}>
              Get Started Free <ArrowRight size={18} />
            </button>
            <button className="btn-ghost" style={{ fontSize: 14, padding: "13px 24px" }}>
              Explore Library
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0", background: "var(--bg2)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={15} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16 }}>PromptCraft<span style={{ color: "var(--accent)" }}>Hub</span></span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {["About", "Blog", "Community", "API Docs", "Privacy"].map(l => (
                <a key={l} href="#" style={{ fontSize: 13, color: "var(--text2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "var(--accent)"}
                  onMouseLeave={e => e.target.style.color = "var(--text2)"}>
                  {l}
                </a>
              ))}
            </div>
            <div className="dm" style={{ fontSize: 13, color: "var(--text2)" }}>
              © 2026 PromptCraftHub. Built for AI enthusiasts.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
