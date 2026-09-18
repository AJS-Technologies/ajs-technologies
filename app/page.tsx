"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ParticleGlobe from "./components/ParticleGlobe";

const logoRoot = "/ASJ%20Logo/";
const services = [
  { icon: "</>", title: "Web experiences", text: "High-performance websites and web apps that turn first impressions into lasting connections.", tags: ["Web development", "E-commerce"], className: "web" },
  { icon: "▦", title: "Business, connected.", text: "Custom systems that bring your people, processes, and data into one clear picture.", tags: ["ERP systems", "Databases", "Automation"], className: "systems" },
  { icon: "✳", title: "Intelligence that works.", text: "Practical AI that takes the busywork out of your day and puts your data to work.", tags: ["AI assistants", "Smart workflows"], className: "ai" },
  { icon: "▯", title: "Mobile applications", text: "Thoughtful mobile experiences. Built for real people, wherever life takes them.", tags: ["iOS & Android", "Cross-platform"], className: "mobile" },
  { icon: "☁", title: "Cloud & hosting", text: "A solid foundation for your next big thing. Hosting, domains, and ongoing care.", tags: ["Cloud hosting", "Domains"], className: "cloud" },
  { icon: "⌘", title: "IT & infrastructure", text: "Keep your business moving with connected networks and dependable IT support.", tags: ["Networking", "IT support"], className: "network" },
];
const solutions = [
  { name: "Business systems", heading: "Less friction. More flow.", text: "Replace scattered spreadsheets with a workspace designed around your operations. Connect inventory, teams, and reporting in one place.", features: ["One connected source of information", "Workflows built around your team", "Clear, actionable reporting"], label: "Operations overview", badge: "ERP / BUSINESS SYSTEM", stats: ["Revenue", "Orders", "Active projects"], values: ["$48,250", "128", "24"], bars: [35, 55, 42, 70, 59, 82, 72, 95, 78, 100, 87, 112] },
  { name: "Digital experiences", heading: "Make every interaction count.", text: "Give your business a digital home that feels as good as it works. Create clear journeys, effortless shopping, and a memorable first impression.", features: ["Responsive from the very first screen", "Clear paths from discovery to action", "Performance built into the experience"], label: "Experience overview", badge: "WEB / DIGITAL EXPERIENCE", stats: ["Visitors", "Page views", "Conversions"], values: ["12,840", "38,520", "642"], bars: [24, 42, 30, 62, 50, 73, 62, 90, 76, 98, 90, 120] },
  { name: "AI & automation", heading: "Make room for what matters.", text: "Connect your tools and simplify repetitive tasks with practical automation. Give your team more time for the work that needs a human touch.", features: ["Assistants grounded in your knowledge", "Connected tools and repeatable workflows", "People in control of important decisions"], label: "Workflow overview", badge: "AI / SMART AUTOMATION", stats: ["Tasks completed", "Workflows", "Hours saved"], values: ["1,240", "18", "86"], bars: [30, 38, 54, 45, 78, 60, 88, 75, 108, 95, 112, 124] },
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const solution = solutions[active];

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add("reveal-ready"); observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <div ref={rootRef} className={paused ? "site motion-paused" : "site"}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner">
      <a className="brand" href="#" aria-label="AJS Technologies home"><Image src={logoRoot + "ASJ_LAN_WHITE_LogoWithText.svg"} alt="AJS Technologies — Advanced Joint Solution" width={260} height={41} priority /></a>
      <nav id="main-nav" className={menu ? "nav open" : "nav"} aria-label="Main navigation">
        {[['Services', '#services'], ['Solutions', '#solutions'], ['Our process', '#process'], ['About us', '#about']].map(([name, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{name}</a>)}
        <a className="button nav-cta" href="#contact" onClick={() => setMenu(false)}>Let’s talk <span>↗</span></a>
      </nav>
      <button className="menu-toggle" aria-controls="main-nav" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? 'Close −' : 'Menu +'}</button>
    </div></header>

    <main id="main">
      <section className="hero"><div className="hero-grid" aria-hidden="true"/><div className="hero-aura" aria-hidden="true"/>
        <div className="container hero-layout"><div className="hero-copy">
          <div className="hero-badge"><i/> YOUR NEXT CHAPTER. ENGINEERED.</div>
          <h1>We build<br/>what’s <span className="gradient-text">next.</span><span className="headline-star" aria-hidden="true">✳</span></h1>
          <p>Bold ideas deserve better technology. We create digital experiences, intelligent systems, and connected solutions that move your business forward.</p>
          <div className="hero-actions"><a className="button primary" href="#contact">Build with AJS <span>↗</span></a><a className="button secondary" href="#services">Explore our world <span>↓</span></a></div>
          <div className="hero-footnote"><div className="mini-logo"><Image src={logoRoot + "ASJ_POR_BLUE_LogoWithoutText.svg"} alt="" width={24} height={24}/></div><span>From the first idea to the next big leap.<br/><strong>Your technology partner, all the way.</strong></span></div>
        </div>
        <div className="hero-visual"><span className="visual-coordinate">AJS CORE / CONNECTED POSSIBILITIES</span>
          <div className="globe-stage"><ParticleGlobe paused={paused}/><div className="globe-orbit orbit-a"/><div className="globe-orbit orbit-b"/><div className="core-logo"><Image src={logoRoot + "ASJ_POR_WHITE_LogoWithoutText.svg"} alt="AJS" width={90} height={90} priority/></div></div>
          <div className="floating-card float-code"><div className="float-icon">&lt;/&gt;</div><div><small>BUILT FOR YOUR NEXT</small><strong>Ideas into reality.</strong></div><i className="online-dot"/></div>
          <div className="floating-card float-ai"><span className="ai-spark">✳</span><div><strong>Intelligence, connected.</strong><small>HUMAN IDEAS. DIGITAL POSSIBILITIES.</small></div><div className="signal-bars"><i/><i/><i/><i/></div></div>
          <div className="visual-bottom"><span><i className="online-dot"/> DESIGN. DEVELOP. EVOLVE.</span><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? '▶ Enable motion' : 'Ⅱ Pause motion'}</button></div>
        </div></div>
        <div className="container hero-bottom"><span>IDEAS WITHOUT LIMITS. TECHNOLOGY WITH PURPOSE.</span><a href="#services">SCROLL TO EXPLORE <span>↓</span></a></div>
      </section>

      <section className="tech-strip" aria-label="Technology capabilities"><div className="container tech-strip-inner"><span className="strip-caption">THE BUILDING BLOCKS<br/><strong>OF WHAT’S NEXT</strong></span><div className="tech-track"><span>React<span className="tech-dot">✳</span></span><span>Next.js<span className="tech-dot">↗</span></span><span>Laravel<span className="tech-dot">◇</span></span><span>Flutter<span className="tech-dot">⌁</span></span><span>Python<span className="tech-dot">⌘</span></span><span>Cloud<span className="tech-dot">☁</span></span></div></div></section>

      <section className="section container" id="services"><div className="section-top" data-reveal><div><div className="eyebrow"><span>01</span> OUR CAPABILITIES</div><h2>One partner.<br/><span className="muted">A whole world of possibilities.</span></h2></div><p>Every business is different. We connect the right technology to your ambition, from the first pixel to the systems behind it.</p></div>
        <div className="services-grid">{services.map((s, i) => <a href="#contact" key={s.title} className={'service-card service-' + s.className} data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
          <div className="service-top"><span className="service-icon">{s.icon}</span><span className="card-arrow">↗</span></div>
          <div className={'service-art art-' + s.className} aria-hidden="true">{s.className === 'web' ? <div className="mini-browser"><div className="browser-dots"><i/><i/><i/></div><div className="browser-content"><div><i/><i/><b/></div><span/></div></div> : s.className === 'systems' ? <div className="data-bars">{[42, 68, 50, 84, 65, 100, 77, 114].map((h, n) => <i key={n} style={{ height: `${h}px`, animationDelay: `${n * -0.4}s` }}/>)}</div> : s.className === 'ai' ? <div className="ai-orb"><span>✳</span><i/><b/></div> : s.className === 'mobile' ? <div className="phone"><i/><div/><span/><span/><b/></div> : s.className === 'cloud' ? <div className="server-stack"><i/><i/><i/></div> : <div className="network-nodes"><i/><i/><i/><i/><span>⌘</span></div>}</div>
          <div className="service-content"><span className="service-index">0{i + 1} / {i < 3 ? 'CREATE & TRANSFORM' : 'CONNECT & SCALE'}</span><h3>{s.title}</h3><p>{s.text}</p><div className="tags">{s.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        </a>)}</div>
      </section>

      <section className="solutions-section" id="solutions"><div className="container section"><div className="section-top" data-reveal><div><div className="eyebrow"><span>02</span> POSSIBILITIES IN ACTION</div><h2>Built for the way<br/><span className="gradient-text">your world works.</span></h2></div><p>Explore what we can build together.<br/>A few possibilities. A starting point for yours.</p></div>
        <div className="solution-tabs" role="tablist" aria-label="Explore solutions">{solutions.map((s, i) => <button key={s.name} id={'tab-' + i} role="tab" aria-selected={active === i} aria-controls="solution-panel" tabIndex={active === i ? 0 : -1} className={active === i ? 'active' : ''} onClick={() => setActive(i)} onKeyDown={event => { let next = i; if (event.key === 'ArrowRight') next = (i + 1) % 3; else if (event.key === 'ArrowLeft') next = (i + 2) % 3; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = 2; else return; event.preventDefault(); setActive(next); document.getElementById('tab-' + next)?.focus(); }}>{s.name}<span>↗</span></button>)}</div>
        <div id="solution-panel" role="tabpanel" aria-labelledby={'tab-' + active} tabIndex={0} className="solution-panel"><div className="solution-copy" key={solution.name}><span className="eyebrow">{solution.badge}</span><h3>{solution.heading}</h3><p>{solution.text}</p><ul>{solution.features.map(f => <li key={f}><span>✓</span>{f}</li>)}</ul><a href="#contact" className="text-link">Let’s build your solution <span>↗</span></a></div><div className="dashboard" aria-label="Illustrative interface with sample data"><div className="dashboard-top"><div className="dashboard-brand"><Image src={logoRoot + 'ASJ_POR_BLUE_LogoWithoutText.svg'} alt="" width={21} height={21}/> workspace<span>/ Overview</span></div><span className="demo-label">CONCEPT PREVIEW</span></div><div className="dashboard-body"><div className="dashboard-title"><div><small>YOUR BUSINESS, AT A GLANCE</small><h4>{solution.label}</h4></div><span>Last 30 days ⌄</span></div><div className="dashboard-stats">{solution.stats.map((s, i) => <div key={s}><span>{s}</span><strong>{solution.values[i]}</strong><small>↗ Sample metric</small></div>)}</div><div className="chart-top"><span>Activity overview</span><small><i/> This period</small></div><div className="chart">{solution.bars.map((h, i) => <div key={i} style={{ '--bar-height': `${h}px`, '--bar-delay': `${i * 35}ms` } as React.CSSProperties}/>)}</div><div className="chart-axis"><span>WEEK 01</span><span>WEEK 02</span><span>WEEK 03</span><span>WEEK 04</span></div><div className="dashboard-note"><i className="online-dot"/> Everything in one place.<span>Connected by design ↗</span></div></div></div></div>
      </div></section>

      <section className="section container" id="process"><div className="section-top" data-reveal><div><div className="eyebrow"><span>03</span> THE WAY FORWARD</div><h2>Big ambition.<br/><span className="muted">A clear path to get there.</span></h2></div><p>Great technology starts with a shared understanding. We keep you involved, informed, and moving forward.</p></div><div className="process-grid">{[['Discover','First, we get curious. We listen to your goals, explore the challenge, and find the right problem to solve.'],['Design','We bring clarity to your idea with a thoughtful experience, a technical direction, and a practical plan.'],['Develop','We turn the plan into a product, building and testing in stages with your feedback along the way.'],['Deploy & evolve','Launch is a beginning. We help you get started, support what’s live, and map out what comes next.']].map(([title, text], i) => <article className="process-step" key={title} data-reveal style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}><div className="process-marker"><span>0{i + 1}</span><i/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="container about-section" id="about"><div className="about-card" data-reveal><div className="about-visual" aria-hidden="true"><div className="about-ring"/><div className="about-ring ring-two"/><Image src={logoRoot + 'ASJ_POR_BLUE_LogoWithoutText.svg'} alt="" width={190} height={190}/><span>ADVANCED JOINT SOLUTION</span></div><div className="about-copy"><div className="eyebrow"><span>04</span> MEET AJS TECHNOLOGIES</div><h2>Human at heart.<br/><span className="gradient-text">Future by design.</span></h2><p>Behind every great piece of technology is a human ambition. A business to grow. A problem to solve. An idea that deserves a chance.</p><p>We bring design, development, and practical thinking together to help you take that next step. As your technology partner, we care about the details — and the bigger picture.</p><div className="about-values"><span><i/>Built around you</span><span><i/>Made to evolve</span></div></div></div></section>

      <section className="section container contact-section" id="contact"><div className="contact-copy" data-reveal><div className="eyebrow"><span>05</span> LET’S START SOMETHING</div><h2>Your next big thing<br/>starts with<br/><span className="gradient-text">a hello.</span><span className="contact-arrow">↗</span></h2><p>Got an idea, a challenge, or a “what if”?<br/>We’d love to explore it with you.</p><a className="contact-email" href="mailto:info@ajstechnologies.com">info@ajstechnologies.com <span>↗</span></a><div className="contact-caption"><i className="online-dot"/> BIG IDEAS WELCOME. ALWAYS.</div></div><form className="contact-form" onSubmit={event => {event.preventDefault(); const data = new FormData(event.currentTarget); const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`; window.location.href = `mailto:info@ajstechnologies.com?subject=${encodeURIComponent('Project inquiry from ' + data.get('name'))}&body=${encodeURIComponent(body)}`; setReady(true);}}><div className="form-heading"><h3>Tell us what’s next.</h3><span>↗</span></div><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100}/></label><label>Email address<input name="email" autoComplete="email" type="email" placeholder="alex@company.com" required/></label></div><label>I’m interested in<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{['Web development','Systems & databases','Mobile applications','AI solutions','Hosting & domains','IT & networking','Let’s explore an idea'].map(s => <option key={s}>{s}</option>)}</select></label><label>A little about your project<textarea name="message" placeholder="The idea, the challenge, the possibility…" rows={3} required maxLength={3000}/></label><button className="button primary" type="submit">Start the conversation <span>↗</span></button><p className="form-note" aria-live="polite">{ready ? 'Send the prepared inquiry in your email app. If it did not open, contact us directly at info@ajstechnologies.com.' : 'Opens your email app with your project details, ready for you to send.'}</p></form></section>
    </main>
    <footer className="footer"><div className="container footer-top"><a className="brand" href="#" aria-label="AJS Technologies home"><Image src={logoRoot + 'ASJ_LAN_WHITE_LogoWithText.svg'} alt="AJS Technologies" width={245} height={39}/></a><span>Ideas into impact.<br/><strong>Together, we build what’s next.</strong></span><a className="back-top" href="#" aria-label="Back to top">↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AJS Technologies. All rights reserved.</span><div><span className="draft-badge">DRAFT / IN EVOLUTION</span><a href="#services">Services</a><a href="#contact">Contact</a></div></div></footer>
  </div>;
}
