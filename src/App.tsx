import { useState, useEffect, useCallback } from 'react'
import { categories, featuredItem, type Category, type MenuItem } from './data/menu'

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Manrope:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* ── Palette ── */
  --bg:           #F5F1E8;
  --surface:      #FBF8F2;
  --text:         #181410;
  --text-2:       #6E655D;
  --text-3:       #94897F;
  --divider:      rgba(24, 20, 16, 0.12);
  --divider-md:   rgba(24, 20, 16, 0.18);
  --thumb-bg:     #E8E1D4;

  /* ── Accent ── */
  --green:        #D0EA00;
  --green-dark:   #97A600;
  --green-light:  #DDF260;
  --coral:        #F25487;
  --gold:         #C8B059;

  /* ── Overlays ── */
  --hero-overlay: linear-gradient(90deg, rgba(8, 7, 6, 0.88) 0%, rgba(8, 7, 6, 0.56) 44%, rgba(8, 7, 6, 0.14) 76%, rgba(8, 7, 6, 0.08) 100%);

  /* ── Surfaces ── */
  --shadow-sm: 0 1px 4px rgba(24,20,16,0.07);
  --shadow-md: 0 3px 12px rgba(24,20,16,0.10);

  /* ── Radii ── */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;

  /* ── Spacing (4pt scale) ── */
  --sp-4:  4px;
  --sp-6:  6px;
  --sp-8:  8px;
  --sp-12: 12px;
  --sp-16: 16px;
  --sp-20: 20px;
  --sp-24: 24px;
  --sp-28: 28px;
  --sp-32: 32px;
  --sp-40: 40px;
}

/* ── Typography helpers ── */
.display { font-family: 'Bebas Neue', 'Oswald', sans-serif; }
.sans    { font-family: 'DM Sans', 'Manrope', system-ui, sans-serif; }

/* ─────────────────────────────────────────────────────────────────── */

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #D6D0C5;
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--green); color: var(--surface); }
::-webkit-scrollbar { width: 0; }

/* ─── Shell ────────────────────────────────────────────────────── */
.shell {
  max-width: 480px;
  margin: 0 auto;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}

@media (min-width: 560px) {
  body { background: #C4BFB5; }
  .shell {
    margin: 14px auto;
    min-height: calc(100vh - 28px);
    border-radius: 22px;
    box-shadow: 0 14px 48px rgba(24,20,16,0.15);
    overflow: hidden;
  }
}

/* ─── Hero ─────────────────────────────────────────────────────── */
.hero {
  position: relative;
  height: 292px;
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
  background: var(--hero-overlay);
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--sp-24) var(--sp-20) var(--sp-24);
  max-width: 56%;
}

.hero-eyebrow {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: var(--sp-8);
}

.hero-title {
  font-family: 'Bebas Neue', 'Oswald', sans-serif;
  font-size: 70px;
  font-weight: 400;
  color: #fff;
  line-height: 0.88;
  letter-spacing: 0.015em;
  margin-bottom: var(--sp-12);
  text-wrap: balance;
}

.hero-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255,255,255,0.76);
  line-height: 1.42;
}

.hero-badge {
  position: absolute;
  top: var(--sp-14);
  right: var(--sp-14);
  font-family: 'DM Sans', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--green);
  background: rgba(12,10,8,0.58);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(208,234,0,0.24);
  padding: 4px 10px;
  border-radius: 99px;
}

/* ─── Category Nav ─────────────────────────────────────────────── */
.cat-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--divider);
  box-shadow: 0 1px 0 rgba(24,20,16,0.05);
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: var(--sp-4) var(--sp-10) 0;
}

.cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-6);
  padding: var(--sp-12) var(--sp-2) var(--sp-14);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: var(--text-2);
  transition: color 0.18s ease;
}

.cat-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 6px;
  background: var(--green);
  border-radius: 99px;
  transition: width 0.22s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.cat-btn.active { color: var(--text); }
.cat-btn.active::after { width: 64px; }
.cat-btn:hover:not(.active) { color: var(--text); }

.cat-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  line-height: 1;
}

/* ─── Featured Strip ────────────────────────────────────────────── */
.featured-strip {
  margin: var(--sp-24) var(--sp-20) 0;
  background: var(--text);
  border-radius: 18px;
  padding: var(--sp-14) var(--sp-16);
  display: flex;
  align-items: center;
  gap: var(--sp-12);
  box-shadow: var(--shadow-md);
}

.featured-thumb {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
}

.featured-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-body { flex: 1; min-width: 0; }

.featured-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: var(--sp-4);
}

.featured-name {
  font-family: 'Bebas Neue', 'Oswald', sans-serif;
  font-size: 22px;
  font-weight: 400;
  color: var(--surface);
  letter-spacing: 0.02em;
  line-height: 1.02;
}

.featured-bottom {
  display: flex;
  align-items: baseline;
  gap: var(--sp-6);
  margin-top: var(--sp-4);
}

.featured-price {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--green);
}

.featured-tagline {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: rgba(251,248,242,0.48);
  line-height: 1.4;
}

/* ─── Menu Content ─────────────────────────────────────────────── */
.menu-content {
  padding: var(--sp-16) var(--sp-20) calc(116px + env(safe-area-inset-bottom));
}

/* ─── Menu Section ─────────────────────────────────────────────── */
.menu-section {
  margin-bottom: var(--sp-32);
  scroll-margin-top: 86px;
}
.menu-section:first-of-type { margin-top: var(--sp-28); }
.menu-section:last-child { margin-bottom: 0; }

.section-header {
  display: flex;
  align-items: center;
  gap: var(--sp-10);
  margin-bottom: var(--sp-16);
}

.section-title {
  font-family: 'Bebas Neue', 'Oswald', sans-serif;
  font-size: 40px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: 0.02em;
  line-height: 0.94;
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: var(--divider-md);
  margin-top: 3px;
}

/* ─── Menu Item Row ────────────────────────────────────────────── */
.item-row {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr) auto;
  gap: 18px;
  padding: var(--sp-16) 0 var(--sp-20);
  border-bottom: 1px solid var(--divider);
  align-items: start;
}

.item-row:last-child { border-bottom: none; }

.item-thumb {
  width: 104px;
  height: 78px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--thumb-bg);
  flex-shrink: 0;
}

.item-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-body { min-width: 0; }

.item-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-6);
}

.item-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: var(--text-2);
  line-height: 1.38;
  max-width: 26ch;
}

.item-price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: var(--sp-4);
  padding-top: 2px;
  min-width: 78px;
}

.item-price {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  white-space: nowrap;
  line-height: 1;
}

.item-price-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: var(--text-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.item-price-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.item-price-badge.recommended { color: var(--coral); }
.item-price-badge.special { color: var(--gold); }

.item-price-badge-icon {
  font-size: 13px;
  line-height: 1;
}

/* ─── Footer ──────────────────────────────────────────────────── */
.footer {
  text-align: center;
  padding: 0 var(--sp-20) calc(var(--sp-40) + 112px);
  border-top: 1px solid var(--divider);
  opacity: 0.68;
}

.footer-logo {
  font-family: 'Bebas Neue', 'Oswald', sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text);
  margin-bottom: var(--sp-4);
}

.footer-logo span { color: var(--green); }

.footer-divider {
  width: 28px;
  height: 2px;
  background: var(--green);
  margin: var(--sp-10) auto;
  border-radius: 99px;
  opacity: 0.6;
}

.footer-sub {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: var(--text-2);
  line-height: 1.7;
  letter-spacing: 0.02em;
}

/* ─── CTA ─────────────────────────────────────────────────────── */
.cta-dock {
  position: sticky;
  bottom: 0;
  padding: 12px var(--sp-20) calc(20px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(245,241,232,0) 0%, rgba(245,241,232,0.94) 24%, rgba(245,241,232,1) 100%);
  z-index: 120;
}

.cta-button {
  width: 100%;
  height: 72px;
  border: none;
  border-radius: 999px;
  background: var(--green);
  color: var(--text);
  display: grid;
  grid-template-columns: 44px 1fr 28px;
  align-items: center;
  gap: 10px;
  padding: 0 22px;
  box-shadow: 0 12px 24px rgba(168, 191, 0, 0.22);
}

.cta-button:active { transform: translateY(1px); }

.cta-icon,
.cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}

@media (max-width: 399px) {
  .hero {
    height: 272px;
  }

  .hero-content {
    max-width: 62%;
  }

  .hero-title {
    font-size: 62px;
  }

  .featured-name {
    font-size: 20px;
  }

  .section-title {
    font-size: 36px;
  }

  .item-row {
    grid-template-columns: 96px minmax(0, 1fr) auto;
  }

  .item-thumb {
    width: 96px;
    height: 74px;
  }

  .item-price {
    font-size: 22px;
  }
}
`

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function Icon({ name, size = 16 }: { name: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    coffee: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
        <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    sun: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    utensils: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
    cake: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
        <path d="M2 21h20"/>
        <path d="M7 8v2M12 8v2M17 8v2M7 4h.01M12 4h.01M17 4h.01"/>
      </svg>
    ),
    beverage: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l-1 9H9L8 2Z"/>
        <path d="M12 11v11"/>
        <path d="M5 2c0 1.7 1.4 3 3 3s3-1.3 3-3"/>
        <path d="M19 2c0 1.7-1.4 3-3 3s-3-1.3-3-3"/>
      </svg>
    ),
  }
  return icons[name] ?? <span style={{ fontSize: s }}>○</span>
}

// ─── Hero ──────────────────────────────────────────────────────────────────
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

// ─── Category Nav ───────────────────────────────────────────────────────────
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
              <Icon name={cat.icon} size={16} />
            </span>
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

// ─── Featured Strip ─────────────────────────────────────────────────────────
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
        <div className="featured-bottom">
          <span className="featured-price">${featuredItem.price}</span>
          <span className="featured-tagline">El almuerzo perfecto</span>
        </div>
      </div>
    </div>
  )
}

// ─── Menu Item Row ──────────────────────────────────────────────────────────
function MenuItemRow({ item }: { item: MenuItem }) {
  const badgeTone =
    item.badge === 'Recomendado' ? 'recommended' : item.badge ? 'special' : null

  return (
    <article className="item-row">
      <div className="item-thumb">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="item-body">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-desc">{item.description}</p>
      </div>
      <div className="item-price-col">
        <span className="item-price">${item.price}</span>
        <span className="item-price-sub">MXN</span>
        {item.badge && badgeTone && (
          <span className={`item-price-badge ${badgeTone}`}>
            <span className="item-price-badge-icon" aria-hidden="true">
              {item.badge === 'Recomendado' ? '★' : '✦'}
            </span>
            {item.badge}
          </span>
        )}
      </div>
    </article>
  )
}

// ─── Menu Section ───────────────────────────────────────────────────────────
function MenuSection({ category }: { category: Category }) {
  return (
    <section
      id={`cat-${category.id}`}
      className="menu-section"
      aria-labelledby={`title-${category.id}`}
    >
      <div className="section-header">
        <h2 className="section-title" id={`title-${category.id}`}>
          {category.label.toUpperCase()}
        </h2>
        <div className="section-line" />
      </div>
      {category.items.map((item) => (
        <MenuItemRow key={item.id} item={item} />
      ))}
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────
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

function CartDock() {
  return (
    <div className="cta-dock">
      <button className="cta-button" type="button" aria-label="Ver pedido">
        <span className="cta-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 7V6a6 6 0 0 1 12 0v1"/>
            <path d="M4 7h16l-1.2 11.4A2 2 0 0 1 16.81 20H7.19a2 2 0 0 1-1.99-1.6L4 7Z"/>
            <path d="M9 11h6"/>
          </svg>
        </span>
        <span className="cta-label">Ver pedido (0)</span>
        <span className="cta-arrow" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </span>
      </button>
    </div>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  const scrollToCategory = useCallback((id: string) => {
    setActiveCategory(id)
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveCategory(entry.target.id.replace('cat-', ''))
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
        <CartDock />
        <Footer />
      </div>
    </>
  )
}
