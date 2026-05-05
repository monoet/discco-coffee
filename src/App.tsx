import { useState, useEffect, useCallback } from 'react'
import { categories, featuredItem, type Category, type MenuItem } from './data/menu'

// ─── Design Tokens ───────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:wght@600;700;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* ── Palette ── */
  --cream:      #F6F0E6;
  --ivory:      #FBF8F2;
  --beige:      #E8D9C8;
  --tan:        #D6BEA4;
  --brown:      #6D4C3D;
  --espresso:   #2A1F1A;
  --charcoal:   #241C18;
  --muted:      #6E625A;
  --border:     rgba(36, 28, 24, 0.10);
  --border-md:  rgba(36, 28, 24, 0.16);

  /* ── Accent ── */
  --olive:      #8A9B4F;
  --olive-dark: #6F7E3B;
  --coral:      #D47A7A;

  /* ── Surfaces ── */
  --surface: #FFFDF9;
  --shadow-sm: 0 1px 3px rgba(36,28,24,0.07);
  --shadow-md: 0 3px 10px rgba(36,28,24,0.09);

  /* ── Radii ── */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 18px;

  /* ── Spacing ── */
  --sp-2: 2px;
  --sp-4: 4px;
  --sp-6: 6px;
  --sp-8: 8px;
  --sp-10: 10px;
  --sp-12: 12px;
  --sp-14: 14px;
  --sp-16: 16px;
  --sp-20: 20px;
  --sp-24: 24px;
  --sp-32: 32px;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #D5CEc3;
  color: var(--charcoal);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--olive); color: var(--ivory); }

::-webkit-scrollbar { width: 0; }

/* ─── Shell ─────────────────────────────────────────────────── */
.shell {
  max-width: 500px;
  margin: 0 auto;
  background: var(--cream);
  min-height: 100vh;
}

@media (min-width: 580px) {
  body { background: #C9C3B6; }
  .shell {
    margin: 16px auto;
    min-height: calc(100vh - 32px);
    border-radius: 24px;
    box-shadow: 0 16px 56px rgba(36,28,24,0.16);
    overflow: hidden;
  }
}

/* ─── Hero ─────────────────────────────────────────────────── */
.hero {
  position: relative;
  height: 260px;
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
    160deg,
    rgba(36,28,24,0.02) 0%,
    rgba(36,28,24,0.40) 40%,
    rgba(36,28,24,0.82) 100%
  );
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--sp-20) var(--sp-16) var(--sp-16);
}

.hero-eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: var(--sp-6);
  opacity: 0;
  transform: translateY(6px);
  animation: fadeUp 0.5s ease 0.1s forwards;
}

.hero-title {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 42px;
  font-weight: 900;
  color: var(--ivory);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-8);
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp 0.55s ease 0.18s forwards;
}

.hero-sub {
  font-size: 14px;
  font-weight: 300;
  color: rgba(251,248,242,0.68);
  line-height: 1.55;
  opacity: 0;
  transform: translateY(6px);
  animation: fadeUp 0.5s ease 0.28s forwards;
}

.hero-badge {
  position: absolute;
  top: var(--sp-14);
  right: var(--sp-14);
  background: rgba(36,28,24,0.48);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138,155,79,0.28);
  color: var(--olive);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 99px;
  opacity: 0;
  animation: fadeIn 0.4s ease 0.4s forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* ─── Category Nav ─────────────────────────────────────────── */
.cat-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--cream);
  border-bottom: 1px solid var(--border);
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 var(--sp-4);
}

.cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-3);
  padding: var(--sp-12) var(--sp-2) var(--sp-10);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: var(--muted);
  transition: color 0.2s ease;
}

.cat-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2.5px;
  background: var(--olive);
  border-radius: 99px;
  transition: width 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cat-btn.active { color: var(--charcoal); }
.cat-btn.active::after { width: 28px; }

.cat-btn:hover:not(.active) { color: var(--brown); }

.cat-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.cat-btn:hover .cat-icon { transform: translateY(-1px); }

.cat-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}

/* ─── Featured Strip ───────────────────────────────────────── */
.featured-strip {
  margin: var(--sp-14) var(--sp-14) 0;
  background: var(--charcoal);
  border-radius: var(--r-md);
  padding: var(--sp-12) var(--sp-14);
  display: flex;
  align-items: center;
  gap: var(--sp-12);
}

.featured-thumb {
  width: 48px;
  height: 48px;
  border-radius: var(--r-sm);
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(251,248,242,0.1);
}

.featured-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-body { flex: 1; min-width: 0; }

.featured-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: var(--sp-2);
}

.featured-name {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--ivory);
  line-height: 1.3;
}

.featured-meta {
  display: flex;
  align-items: baseline;
  gap: var(--sp-4);
  margin-top: var(--sp-4);
}

.featured-price {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--olive);
}

.featured-tagline {
  font-size: 11px;
  color: rgba(251,248,242,0.42);
  line-height: 1.4;
}

/* ─── Menu Content ─────────────────────────────────────────── */
.menu-content {
  padding: var(--sp-20) var(--sp-14) var(--sp-40);
}

/* ─── Menu Section ─────────────────────────────────────────── */
.menu-section {
  margin-bottom: var(--sp-32);
}

.menu-section:last-child { margin-bottom: 0; }

.section-header {
  display: flex;
  align-items: center;
  gap: var(--sp-10);
  margin-bottom: var(--sp-14);
}

.section-title {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--charcoal);
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
}

.section-title-accent {
  font-size: 18px;
  color: var(--olive);
  margin-left: var(--sp-2);
  font-weight: 400;
}

.section-line {
  flex: 1;
  height: 1px;
  background: var(--border-md);
  margin-top: 4px;
}

/* ─── Menu Item Row ────────────────────────────────────────── */
.item-row {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr) auto;
  gap: var(--sp-12);
  padding: var(--sp-12) 0;
  border-bottom: 1px solid var(--border);
  align-items: start;
}

.item-row:last-child { border-bottom: none; }

.item-thumb {
  width: 88px;
  height: 72px;
  border-radius: var(--r-sm);
  overflow: hidden;
  background: var(--beige);
  flex-shrink: 0;
}

.item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-body { min-width: 0; }

.item-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-6);
  margin-bottom: var(--sp-4);
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--charcoal);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.item-badge {
  flex-shrink: 0;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 99px;
  background: var(--olive);
  color: var(--ivory);
  white-space: nowrap;
  margin-top: 1px;
}

.item-badge.coral { background: var(--coral); color: var(--ivory); }

.item-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
  font-weight: 300;
}

.item-price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: var(--sp-4);
  padding-top: 2px;
}

.item-price {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--charcoal);
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.item-price-sub {
  font-size: 10px;
  color: var(--muted);
  font-weight: 400;
  letter-spacing: 0.04em;
}

/* ─── Footer ───────────────────────────────────────────────── */
.footer {
  text-align: center;
  padding: var(--sp-24) var(--sp-16) var(--sp-36);
  border-top: 1px solid var(--border);
}

.footer-logo {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--charcoal);
  margin-bottom: var(--sp-4);
}

.footer-logo span { color: var(--olive); }

.footer-divider {
  width: 32px;
  height: 2px;
  background: var(--olive);
  margin: var(--sp-10) auto var(--sp-10);
  border-radius: 99px;
  opacity: 0.7;
}

.footer-sub {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.6;
  letter-spacing: 0.02em;
}
`

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    coffee: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    sun: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    utensils: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
    cake: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2M12 8v2M17 8v2M7 4h.01M12 4h.01M17 4h.01"/>
      </svg>
    ),
    beverage: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l-1 9H9L8 2Z"/><path d="M12 11v11"/><path d="M5 2c0 1.7 1.4 3 3 3s3-1.3 3-3"/><path d="M19 2c0 1.7-1.4 3-3 3s-3-1.3-3-3"/>
      </svg>
    ),
  }
  return icons[name] ?? <span style={{ fontSize: s }}>○</span>
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
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
        <p className="hero-eyebrow">Bienvenido</p>
        <h1 className="hero-title">Buen café,<br />buen sonido</h1>
        <p className="hero-sub">Café, desayunos y algo para escuchar.</p>
      </div>
      <div className="hero-badge">Menú demo</div>
    </header>
  )
}

// ─── Category Nav ─────────────────────────────────────────────────────────────
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
    <nav className="cat-nav" aria-label="Categorías del menú">
      <div className="cat-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn${activeId === cat.id ? ' active' : ''}`}
            onClick={() => onSelect(cat.id)}
            aria-current={activeId === cat.id ? 'page' : undefined}
          >
            <span className="cat-icon">
              <Icon name={cat.icon} size={18} />
            </span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

// ─── Featured Strip ────────────────────────────────────────────────────────────
function FeaturedStrip() {
  return (
    <div className="featured-strip">
      <div className="featured-thumb">
        <img
          src="https://images.unsplash.com/photo-1759754147072-aff1923ba10f?auto=format&fit=crop&w=120&q=80"
          alt={featuredItem.name}
        />
      </div>
      <div className="featured-body">
        <div className="featured-label">★ Especial de la casa</div>
        <div className="featured-name">{featuredItem.name}</div>
        <div className="featured-meta">
          <span className="featured-price">${featuredItem.price}</span>
          <span className="featured-tagline">El almuerzo perfecto</span>
        </div>
      </div>
    </div>
  )
}

// ─── Menu Item Row ─────────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: MenuItem }) {
  const isCoral = item.badge === 'Especial'
  return (
    <article className="item-row">
      <div className="item-thumb">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="item-body">
        <div className="item-top">
          <h3 className="item-name">{item.name}</h3>
          {item.badge && (
            <span className={`item-badge${isCoral ? ' coral' : ''}`}>{item.badge}</span>
          )}
        </div>
        <p className="item-desc">{item.description}</p>
      </div>
      <div className="item-price-col">
        <span className="item-price">${item.price}</span>
        <span className="item-price-sub">MXN</span>
      </div>
    </article>
  )
}

// ─── Menu Section ─────────────────────────────────────────────────────────────
function MenuSection({ category }: { category: Category }) {
  return (
    <section
      id={`cat-${category.id}`}
      className="menu-section"
      aria-labelledby={`title-${category.id}`}
    >
      <div className="section-header">
        <h2 className="section-title" id={`title-${category.id}`}>
          {category.label}
        </h2>
        <div className="section-line" />
      </div>
      {category.items.map((item) => (
        <MenuItemRow key={item.id} item={item} />
      ))}
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Discco <span>Coffee</span></div>
      <div className="footer-divider" aria-hidden="true" />
      <p className="footer-sub">Demo de menú digital</p>
      <p className="footer-sub">Para acompañar una buena sesión.</p>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const scrollToCategory = useCallback((id: string) => {
    setActiveCategory(id)
    const el = document.getElementById(`cat-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace('cat-', ''))
          }
        })
      },
      { rootMargin: '-30% 0px -65% 0px', threshold: 0 }
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
