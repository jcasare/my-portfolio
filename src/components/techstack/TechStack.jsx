import { useState, useEffect, useRef, useCallback } from 'react';
import './techstack.css';

const techData = [
  // Frontend & Languages
  { name: 'JavaScript', icon: 'JS', category: 'frontend', level: 95, color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'TS', category: 'frontend', level: 88, color: '#3178C6' },
  { name: 'HTML', icon: '◇', category: 'frontend', level: 95, color: '#E34F26' },
  { name: 'CSS', icon: '◆', category: 'frontend', level: 92, color: '#1572B6' },
  { name: 'React', icon: '⚛', category: 'frontend', level: 92, color: '#61DAFB' },
  { name: 'Vue.js', icon: '◩', category: 'frontend', level: 82, color: '#42B883' },
  { name: 'Next.js', icon: '▲', category: 'frontend', level: 88, color: '#ededed' },
  { name: 'Tailwind', icon: '✦', category: 'frontend', level: 90, color: '#06B6D4' },
  { name: 'Bootstrap', icon: '▣', category: 'frontend', level: 90, color: '#7952B3' },
  { name: 'WordPress', icon: 'W', category: 'frontend', level: 92, color: '#21759B' },
  // Backend & Databases
  { name: 'Node.js', icon: '⬢', category: 'backend', level: 90, color: '#339933' },
  { name: 'Laravel', icon: '◆', category: 'backend', level: 92, color: '#FF2D20' },
  { name: 'NestJS', icon: '▧', category: 'backend', level: 85, color: '#E0234E' },
  { name: 'Express', icon: '⇢', category: 'backend', level: 88, color: '#68A063' },
  { name: 'Python', icon: '⌘', category: 'backend', level: 78, color: '#3776AB' },
  { name: 'Java', icon: '♦', category: 'backend', level: 75, color: '#ED8B00' },
  { name: 'C++', icon: '⊕', category: 'backend', level: 72, color: '#00599C' },
  { name: 'PHP', icon: '⟐', category: 'backend', level: 85, color: '#777BB4' },
  { name: 'PostgreSQL', icon: '⛁', category: 'backend', level: 85, color: '#4169E1' },
  { name: 'MySQL', icon: '⊛', category: 'backend', level: 88, color: '#4479A1' },
  { name: 'Aurora', icon: '⊙', category: 'backend', level: 80, color: '#527FFF' },
  { name: 'MongoDB', icon: '⟁', category: 'backend', level: 82, color: '#47A248' },
  { name: 'Redis', icon: '◈', category: 'backend', level: 80, color: '#DC382D' },
  // Cloud & DevOps
  { name: 'AWS', icon: '☁', category: 'devops', level: 92, color: '#FF9900' },
  { name: 'GCP', icon: '◎', category: 'devops', level: 75, color: '#4285F4' },
  { name: 'Azure', icon: '◐', category: 'devops', level: 72, color: '#0078D4' },
  { name: 'Docker', icon: '⊡', category: 'devops', level: 82, color: '#2496ED' },
  { name: 'CI/CD', icon: '⟳', category: 'devops', level: 88, color: '#4CAF50' },
  { name: 'Serverless', icon: 'λ', category: 'devops', level: 90, color: '#FD5750' },
  { name: 'Jenkins', icon: '⚙', category: 'devops', level: 80, color: '#D24939' },
  { name: 'Prometheus', icon: '⊕', category: 'devops', level: 78, color: '#E6522C' },
  { name: 'Grafana', icon: '◉', category: 'devops', level: 78, color: '#F46800' },
  { name: 'GitHub Actions', icon: '⊙', category: 'devops', level: 85, color: '#2088FF' },
  { name: 'CodePipeline', icon: '▶', category: 'devops', level: 82, color: '#527FFF' },
  // Tools
  { name: 'Git', icon: '⎇', category: 'tools', level: 95, color: '#F05032' },
  { name: 'Jira', icon: '◧', category: 'tools', level: 88, color: '#0052CC' },
  { name: 'Prisma', icon: '△', category: 'tools', level: 85, color: '#2D3748' },
  { name: 'TypeORM', icon: '⊞', category: 'tools', level: 82, color: '#E83524' },
  { name: 'Jest', icon: '⊘', category: 'tools', level: 85, color: '#C21325' },
  { name: 'WebSocket', icon: '⇋', category: 'tools', level: 80, color: '#010101' },
  { name: 'RabbitMQ', icon: '⊗', category: 'tools', level: 78, color: '#FF6600' },
];

// Terminal command responses
const commandResponses = {
  help: [
    { type: 'output', text: '' },
    { type: 'success', text: '  Available commands:' },
    { type: 'output', text: '  ─────────────────────────────────────' },
    { type: 'output', text: '  whoami        → about me' },
    { type: 'output', text: '  skills        → list tech stack' },
    { type: 'output', text: '  certs         → certifications' },
    { type: 'output', text: '  experience    → work history' },
    { type: 'output', text: '  contact       → reach me' },
    { type: 'output', text: '  status        → current vibe' },
    { type: 'output', text: '  sudo hire-me  → 😏' },
    { type: 'output', text: '  clear         → clear terminal' },
    { type: 'output', text: '' },
  ],
  whoami: [
    { type: 'output', text: '' },
    { type: 'output', text: '  ┌─────────────────────────────────────────┐' },
    { type: 'output', text: '  │  jerry@dev ~ whoami                     │' },
    { type: 'output', text: '  ├─────────────────────────────────────────┤' },
    { type: 'success', text: '  │  Name:    Jerry C. Asare                │' },
    { type: 'output', text: '  │  Role:    Full-Stack Software Engineer  │' },
    { type: 'output', text: '  │  Base:    Accra, Ghana 🇬🇭               │' },
    { type: 'output', text: '  │  Editor:  VS Code + Vim                 │' },
    { type: 'output', text: '  │  Shell:   zsh + oh-my-zsh               │' },
    { type: 'output', text: '  │  Cloud:   AWS Solutions Architect ✓     │' },
    { type: 'output', text: '  │  Focus:   Ship fast, break nothing 🚀   │' },
    { type: 'output', text: '  └─────────────────────────────────────────┘' },
    { type: 'output', text: '' },
  ],
  skills: [
    { type: 'output', text: '' },
    { type: 'success', text: '  Languages:' },
    { type: 'output', text: '    JS · TS · Python · Java · C++ · PHP' },
    { type: 'success', text: '  Frontend:' },
    { type: 'output', text: '    HTML · CSS · React · Vue · Next.js · Tailwind · Bootstrap · WordPress' },
    { type: 'success', text: '  Backend:' },
    { type: 'output', text: '    Node · Laravel · Nest · Express' },
    { type: 'success', text: '  Databases:' },
    { type: 'output', text: '    PostgreSQL · MySQL · Aurora · MongoDB · Redis' },
    { type: 'success', text: '  Cloud & DevOps:' },
    { type: 'output', text: '    AWS · GCP · Azure · Docker · Serverless · Jenkins' },
    { type: 'output', text: '    GH Actions · CodePipeline · Prometheus · Grafana' },
    { type: 'success', text: '  Tools:' },
    { type: 'output', text: '    Git · Jira · Prisma · TypeORM · Jest · RabbitMQ' },
    { type: 'output', text: '' },
  ],
  certs: [
    { type: 'output', text: '' },
    { type: 'success', text: '  Certifications:' },
    { type: 'output', text: '  ─────────────────────────────────────' },
    { type: 'output', text: '  ✓ AWS Solutions Architect – Associate' },
    { type: 'output', text: '  ✓ AWS Certified Cloud Practitioner' },
    { type: 'output', text: '  ✓ Agile Scrum Master' },
    { type: 'output', text: '  ✓ Agile Scrum Professional' },
    { type: 'output', text: '  ✓ Cisco Cyber Security Essentials' },
    { type: 'output', text: '  ✓ Google Project Management Professional' },
    { type: 'output', text: '  ✓ Google IT Support Professional' },
    { type: 'output', text: '' },
  ],
  experience: [
    { type: 'output', text: '' },
    { type: 'success', text: '  Work History:' },
    { type: 'output', text: '  ─────────────────────────────────────────' },
    { type: 'output', text: '  2025–now   Sr. Software Engineer @ Fjorge' },
    { type: 'output', text: '  2023–2025  Software Developer @ GTN LLC' },
    { type: 'output', text: '  2023       Web Developer @ WebSys Technology' },
    { type: 'output', text: '  2021–2023  IT Manager @ Kosans Royal' },
    { type: 'output', text: '  2021–now   Freelance Software Developer' },
    { type: 'output', text: '' },
    { type: 'success', text: '  Highlights:' },
    { type: 'output', text: '  → 30% faster API response (serverless migration)' },
    { type: 'output', text: '  → 70% lower deployment costs' },
    { type: 'output', text: '  → 35+ projects shipped' },
    { type: 'output', text: '' },
  ],
  contact: [
    { type: 'output', text: '' },
    { type: 'success', text: '  Let\'s connect:' },
    { type: 'output', text: '  ─────────────────────────────────────' },
    { type: 'output', text: '  📧 asarejerry16@gmail.com' },
    { type: 'output', text: '  🐙 github.com/jcasare' },
    { type: 'output', text: '  💼 linkedin.com/in/jerry-asare-comforter' },
    { type: 'output', text: '  🌐 jerryasare.com' },
    { type: 'output', text: '' },
  ],
  status: [
    { type: 'output', text: '' },
    { type: 'success', text: '  ⚡ System Status: ALL SYSTEMS GO' },
    { type: 'output', text: '  ─────────────────────────────────────' },
    { type: 'output', text: '  Availability:  Open to opportunities' },
    { type: 'output', text: '  Uptime:        99.9% (only sleep sometimes)' },
    { type: 'output', text: '  Current mood:  Building cool stuff' },
    { type: 'output', text: '  Coffee level:  ████████░░ 80%' },
    { type: 'output', text: '  Code quality:  ██████████ 100%' },
    { type: 'output', text: '' },
  ],
  'sudo hire-me': [
    { type: 'output', text: '' },
    { type: 'success', text: '  🎉 PERMISSION GRANTED' },
    { type: 'output', text: '' },
    { type: 'output', text: '  Excellent choice! Initiating hire sequence...' },
    { type: 'output', text: '  Loading exceptional developer......... ✓' },
    { type: 'output', text: '  Deploying to your team................ ✓' },
    { type: 'output', text: '  Injecting 10x productivity........... ✓' },
    { type: 'output', text: '' },
    { type: 'success', text: '  → Scroll down to contact me, or email:' },
    { type: 'success', text: '    asarejerry16@gmail.com' },
    { type: 'output', text: '' },
  ],
};

const availableCommands = Object.keys(commandResponses);

// Initial boot sequence
const bootSequence = [
  { type: 'success', text: '  ⚡ jerry@dev v4.2.0 — interactive terminal' },
  { type: 'output', text: '  type "help" for available commands' },
  { type: 'output', text: '' },
];

const TechStack = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [terminalReady, setTerminalReady] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  // Boot sequence animation
  useEffect(() => {
    if (!isVisible) return;

    let i = 0;
    const runBoot = () => {
      if (i < bootSequence.length) {
        const line = bootSequence[i];
        setTerminalLines(prev => [...prev, line]);
        i++;
        setTimeout(runBoot, 150);
      } else {
        setTerminalReady(true);
        setCardsRevealed(true);
      }
    };

    const timer = setTimeout(runBoot, 400);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Tab completion suggestion
  useEffect(() => {
    if (inputValue.length > 0) {
      const match = availableCommands.find(cmd => cmd.startsWith(inputValue.toLowerCase()) && cmd !== inputValue.toLowerCase());
      setSuggestion(match || '');
    } else {
      setSuggestion('');
    }
  }, [inputValue]);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const inputLine = { type: 'input', text: `$ ${cmd.trim()}` };

    if (trimmed === 'clear') {
      setTerminalLines([...bootSequence]);
      return;
    }

    const response = commandResponses[trimmed];
    if (response) {
      setTerminalLines(prev => [...prev, inputLine, ...response]);
    } else if (trimmed === '') {
      setTerminalLines(prev => [...prev, inputLine]);
    } else {
      setTerminalLines(prev => [
        ...prev,
        inputLine,
        { type: 'error', text: `  zsh: command not found: ${cmd.trim()}` },
        { type: 'output', text: '  type "help" for available commands' },
        { type: 'output', text: '' },
      ]);
    }

    setCommandHistory(prev => [cmd.trim(), ...prev].slice(0, 20));
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
      setInputValue('');
      setSuggestion('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInputValue(suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const filteredTech = activeFilter === 'all'
    ? techData
    : techData.filter(t => t.category === activeFilter);

  const filters = [
    { key: 'all', label: '*' },
    { key: 'frontend', label: 'frontend/' },
    { key: 'backend', label: 'backend/' },
    { key: 'devops', label: 'devops/' },
    { key: 'tools', label: 'tools/' },
  ];

  return (
    <section className="techstack section" id="techstack" ref={sectionRef}>
      <div className="techstack__container container">
        <div className="techstack__header">
          <h2 className="techstack__title">
            <span className="techstack__title-bracket">&lt;</span>
            TechStack
            <span className="techstack__title-bracket"> /&gt;</span>
          </h2>
          <p className="techstack__subtitle">tools i ship with</p>
        </div>

        {/* Terminal — full width on top */}
        <div
          className={`techstack__terminal ${isVisible ? 'techstack__terminal--active' : ''}`}
          onClick={focusInput}
        >
          <div className="techstack__terminal-bar">
            <div className="techstack__terminal-dots">
              <span className="techstack__dot techstack__dot--red"></span>
              <span className="techstack__dot techstack__dot--yellow"></span>
              <span className="techstack__dot techstack__dot--green"></span>
            </div>
            <span className="techstack__terminal-title">jerry@dev: ~/stack — interactive</span>
            <div className="techstack__terminal-hint">try typing &quot;help&quot;</div>
          </div>
          <div className="techstack__terminal-body" ref={terminalRef}>
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className={`techstack__line techstack__line--${line.type}`}
              >
                {line.type === 'input' && <span className="techstack__prompt">~</span>}
                <span className={`techstack__text--${line.type}`}>
                  {line.text}
                </span>
              </div>
            ))}
            {/* Live input line */}
            {terminalReady && (
              <div className="techstack__input-line">
                <span className="techstack__prompt">~</span>
                <span className="techstack__input-dollar">$ </span>
                <div className="techstack__input-wrap">
                  <input
                    ref={inputRef}
                    type="text"
                    className="techstack__input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                  {suggestion && inputValue && (
                    <span className="techstack__suggestion">
                      {suggestion.slice(inputValue.length)}
                      <span className="techstack__tab-hint">TAB</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills cards — full width below */}
        <div className="techstack__skills">
          <div className="techstack__filters">
            {filters.map(f => (
              <button
                key={f.key}
                className={`techstack__filter ${activeFilter === f.key ? 'techstack__filter--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="techstack__cards">
            {filteredTech.map((tech, index) => (
              <div
                key={tech.name}
                className={`techstack__card ${cardsRevealed ? 'techstack__card--visible' : ''} ${hoveredCard === tech.name ? 'techstack__card--hovered' : ''}`}
                style={{
                  '--card-color': tech.color,
                  '--card-delay': `${index * 0.04}s`,
                }}
                onMouseEnter={() => setHoveredCard(tech.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="techstack__card-inner">
                  <div className="techstack__card-icon">
                    <span>{tech.icon}</span>
                  </div>
                  <div className="techstack__card-info">
                    <h4 className="techstack__card-name">{tech.name}</h4>
                    <div className="techstack__bar-track">
                      <div
                        className="techstack__bar-fill"
                        style={{ '--fill-width': cardsRevealed ? `${tech.level}%` : '0%' }}
                      ></div>
                    </div>
                    <span className="techstack__card-level">{tech.level}%</span>
                  </div>
                </div>
                <div className="techstack__card-glow"></div>
              </div>
            ))}
          </div>

          <div className={`techstack__stats ${cardsRevealed ? 'techstack__stats--visible' : ''}`}>
            <div className="techstack__stat">
              <span className="techstack__stat-value">{techData.length}</span>
              <span className="techstack__stat-label">Technologies</span>
            </div>
            <div className="techstack__stat-divider"></div>
            <div className="techstack__stat">
              <span className="techstack__stat-value">7</span>
              <span className="techstack__stat-label">Certifications</span>
            </div>
            <div className="techstack__stat-divider"></div>
            <div className="techstack__stat">
              <span className="techstack__stat-value">5+</span>
              <span className="techstack__stat-label">Yrs Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="techstack__bg-grid"></div>
    </section>
  );
};

export default TechStack;
