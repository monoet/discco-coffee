import { useState, useEffect, useCallback } from 'react'
import { categories, featuredItem, type Category, type MenuItem } from './data/menu'

// ─── Styles ─────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #F5EFE4;
  --surface: #FFFDF7;
  --text: #171412;
  --muted: #6F6860;
  --border: rgba(23, 20, 18, 0.12);
  --accent: #C8FF00;
  --pink: #FF4FA3;
  --shadow: 0 1px 4px rgba(23,20,18,0.06);
  --radius: 14px;
  --radius-sm: 10px;
  --nav-h: 72px;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Instrument Sans', system-ui, sans-serif;
  background: #E8E2D4;
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--accent); color: var(--text); }

::-webkit-scrollbar { width: 0; }

/* ─── Shell ─────────────────────────────────────────────── */
.shell {
  max-width: 480px;
  margin: 0 auto;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}

@media (min-width: 600px) {
  body { background: #D9D3C5; }
  .shell {
    margin: 20px auto;
    min-height: calc(100vh - 40px);
    border-radius: 28px;
    box-shadow: 0 12px 48px rgba(23,20,18,0.14);
    overflow: hidden;
  }
}

/* ─── Hero ──────────────────────────────────────────────── */
.hero {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(23,20,18,0.05) 0%,
    rgba(23,20,18,0.55) 60%,
    rgba(23,20,18,0.88) 100%
  );
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 20px 18px;
}

.hero-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.hero-sub {
  font-size: 13px;
  color: rgba(255,255,255,0.72);
  line-height: 1.45;
}

.hero-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(23,20,18,0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(200,255,0,0.3);
  color: var(--accent);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 99px;
}

/* ─── Category Nav ──────────────────────────────────────── */
.cat-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  padding: 0 8px;
}

.cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 4px 10px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: var(--muted);
  transition: color 0.15s;
}

.cat-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 99px;
  transition: width 0.2s ease;
}

.cat-btn.active { color: var(--text); }
.cat-btn.active::after { width: 24px; }

.cat-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.cat-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
}

/* ─── Featured Strip ────────────────────────────────────── */
.featured-strip {
  margin: 14px 14px 0;
  background: var(--text);
  border-radius: var(--radius);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.featured-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
}

.featured-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-info { flex: 1; min-width: 0; }

.featured-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 3px;
}

.featured-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.featured-price {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
}

.featured-price span {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255,255,255,0.5);
  margin-left: 2px;
}

/* ─── Menu Content ───────────────────────────────────────── */
.menu-content {
  padding: 18px 14px 40px;
}

.menu-section {
  margin-bottom: 28px;
}

.menu-section:last-child { margin-bottom: 0; }

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ─── Menu Item Row ──────────────────────────────────────── */
.item-row {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.item-row:last-child { border-bottom: none; }

.item-thumb {
  width: 72px;
  height: 58px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  background: #E8E2D4;
}

.item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-body { flex: 1; min-width: 0; }

.item-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.item-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
}

.item-badge {
  flex-shrink: 0;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--text);
  white-space: nowrap;
}

.item-badge.pink { background: var(--pink); color: #fff; }

.item-desc {
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
  margin-bottom: 5px;
}

.item-price {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15px;
  font-weight: 700;
}

/* ─── Footer ────────────────────────────────────────────── */
.footer {
  text-align: center;
  padding: 24px 14px 36px;
  border-top: 1px solid var(--border);
}

.footer-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.footer-logo span { color: var(--accent); }

.footer-sub {
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 10px;
}

.footer-divider {
  width: 28px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 10px;
  border-radius: 99px;
}
`

// ─── SVG Icons (inline, no extra deps) ───────────────────────────────────────
function Icon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    coffee: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    sun: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    utensils: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
    cake: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
        <path d="M2 21h20"/>
        <path d="M7 8v3"/>
        <path d="M12 8v3"/>
        <path d="M17 8v3"/>
        <path d="M7 4h.01"/>
        <path d="M12 4h.01"/>
        <path d="M17 4h.01"/>
      </svg>
    ),
    cup: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
  }
  return icons[name] ?? <span style={{ fontSize: 18 }}>○</span>
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <header className="hero">
      <img
        className="hero-img"
        src="https://images.unsplash.com/photo-1760163630058-aa71c91783bf?auto=format&fit=crop&w=1400&q=80"
        alt="Discco Coffee — buen café, buen sonido"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-label">Bienvenido</p>
        <h1 className="hero-title">Buen café,<br />buen sonido</h1>
        <p className="hero-sub">Café, desayunos y algo para escuchar.</p>
      </div>
      <div className="hero-badge">Menú demo</div>
    </header>
  )
}

// ─── Category Grid ───────────────────────────────────────────────────────────
function CategoryNav({
  categories,
  activeId,
  onSelect,
}: {
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="cat-nav" aria-label="Categorías">
      <div className="cat-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn${activeId === cat.id ? ' active' : ''}`}
            onClick={() => onSelect(cat.id)}
            aria-current={activeId === cat.id ? 'page' : undefined}
          >
            <span className="cat-icon">
              <Icon name={cat.icon} />
            </span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

// ─── Featured Strip ──────────────────────────────────────────────────────────
function FeaturedStrip() {
  return (
    <div className="featured-strip">
      <div className="featured-icon">
        <img
          src="https://images.unsplash.com/photo-1759754147072-aff1923ba10f?auto=format&fit=crop&w=120&q=80"
          alt="Cold Brew"
        />
      </div>
      <div className="featured-info">
        <div className="featured-label">★ Especial de la casa</div>
        <div className="featured-name">{featuredItem.name}</div>
      </div>
      <div className="featured-price">
        ${featuredItem.price}
        <span>MXN</span>
      </div>
    </div>
  )
}

// ─── Menu Item Row ───────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: MenuItem }) {
  const isPink = item.badge === 'Especial'
  return (
    <article className="item-row">
      <div className="item-thumb">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="item-body">
        <div className="item-top">
          <h3 className="item-name">{item.name}</h3>
          {item.badge && (
            <span className={`item-badge${isPink ? ' pink' : ''}`}>{item.badge}</span>
          )}
        </div>
        <p className="item-desc">{item.description}</p>
        <div className="item-price">${item.price}</div>
      </div>
    </article>
  )
}

// ─── Menu Section ────────────────────────────────────────────────────────────
function MenuSection({ category }: { category: Category }) {
  return (
    <section id={`cat-${category.id}`} className="menu-section" aria-labelledby={`title-${category.id}`}>
      <div className="section-header">
        <h2 className="section-title" id={`title-${category.id}`}>{category.label}</h2>
        <div className="section-line" />
      </div>
      {category.items.map((item) => (
        <MenuItemRow key={item.id} item={item} />
      ))}
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Discco <span>Coffee</span></div>
      <div className="footer-sub">Demo de menú digital</div>
      <div className="footer-divider" />
      <div className="footer-sub">Para acompañar una buena sesión.</div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const scrollToCategory = useCallback((id: string) => {
    setActiveCategory(id)
    const el = document.getElementById(`cat-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Track active category via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '')
            setActiveCategory(id)
          }
        })
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    )

    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{css}</style>
      <div className="shell">
        <HeroSection />
        <CategoryNav
          categories={categories}
          activeId={activeCategory}
          onSelect={scrollToCategory}
        />
        <main className="menu-content">
          <FeaturedStrip />
          {categories.map((cat) => (
            <MenuSection key={cat.id} category={cat} />
          ))}
        </main>
        <Footer />
      </div>
    </>
  )
}
