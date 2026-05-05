import { useState, useEffect } from 'react'
import { menuData, featuredItem, type Category } from './data/menu'

// ─── Styles ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F7F4EF;
    --surface: #FFFFFF;
    --text: #1A1714;
    --text-muted: #7A7166;
    --accent: #C8FF00;
    --accent-pink: #FFB5C5;
    --border: #E8E3DC;
    --shadow: 0 2px 12px rgba(26,23,20,0.07);
    --radius: 16px;
    --radius-sm: 10px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Instrument Sans', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--accent); color: var(--text); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

  /* ─── Layout ─────────────────────────────────────────────── */
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }

  .menu-shell {
    width: 100%;
    max-width: 520px;
    background: var(--bg);
    min-height: 100vh;
    position: relative;
  }

  @media (min-width: 640px) {
    body { background: #EDE9E1; }
    .menu-shell {
      margin: 24px auto;
      min-height: calc(100vh - 48px);
      border-radius: 32px;
      box-shadow: 0 8px 40px rgba(26,23,20,0.12);
      overflow: hidden;
    }
  }

  /* ─── Hero ───────────────────────────────────────────────── */
  .hero {
    position: relative;
    padding: 48px 24px 32px;
    text-align: center;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.15) 0%, transparent 70%),
      linear-gradient(180deg, #F0ECD9 0%, var(--bg) 100%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--text);
    color: var(--accent);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 99px;
    margin-bottom: 20px;
  }

  .hero-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 8px;
  }

  .hero-logo span { color: var(--accent); }

  .hero-tagline {
    font-size: 15px;
    color: var(--text-muted);
    font-weight: 400;
    line-height: 1.5;
    max-width: 280px;
    margin: 0 auto 28px;
  }

  .hero-visual {
    display: flex;
    justify-content: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .hero-img-block {
    width: 120px;
    height: 140px;
    border-radius: var(--radius);
    background: linear-gradient(145deg, #D4C9A8 0%, #C8B98A 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    box-shadow: var(--shadow);
    border: 1px solid rgba(255,255,255,0.4);
  }

  .hero-img-block:nth-child(2) {
    width: 90px;
    height: 110px;
    font-size: 38px;
    align-self: flex-end;
    background: linear-gradient(145deg, #D9CBB5 0%, #C9A882 100%);
  }

  /* ─── Category Tabs ──────────────────────────────────────── */
  .tabs-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 0 16px;
  }

  .tabs-scroll {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding: 10px 0;
    scrollbar-width: none;
  }

  .tabs-scroll::-webkit-scrollbar { display: none; }

  .tab-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 99px;
    border: 1.5px solid transparent;
    background: transparent;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .tab-btn:hover { color: var(--text); background: rgba(200,255,0,0.12); }

  .tab-btn.active {
    background: var(--text);
    color: var(--accent);
    border-color: var(--text);
  }

  /* ─── Menu Sections ───────────────────────────────────────── */
  .menu-content { padding: 0 16px 40px; }

  .category-section { padding-top: 32px; }

  .category-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .category-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
    margin-left: 4px;
  }

  /* ─── Menu Item Card ─────────────────────────────────────── */
  .item-card {
    display: flex;
    gap: 14px;
    background: var(--surface);
    border-radius: var(--radius);
    padding: 14px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    position: relative;
    overflow: hidden;
  }

  .item-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(26,23,20,0.1);
  }

  .item-card:active { transform: scale(0.99); }

  .item-thumb {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-sm);
    background: linear-gradient(145deg, #E8E2D0, #D5CCB8);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .item-body { flex: 1; min-width: 0; }

  .item-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 4px;
  }

  .item-name {
    font-weight: 600;
    font-size: 15px;
    line-height: 1.3;
  }

  .item-badge {
    flex-shrink: 0;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 99px;
    background: var(--accent);
    color: var(--text);
  }

  .item-badge.pink { background: var(--accent-pink); }

  .item-desc {
    font-size: 12.5px;
    color: var(--text-muted);
    line-height: 1.45;
    margin-bottom: 8px;
  }

  .item-price {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  .item-price span { font-size: 12px; font-weight: 400; color: var(--text-muted); }

  /* ─── Featured Card ──────────────────────────────────────── */
  .featured-section { padding: 32px 16px 8px; }

  .featured-card {
    background: var(--text);
    color: var(--bg);
    border-radius: 24px;
    padding: 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .featured-card::before {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.15;
  }

  .featured-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .featured-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .featured-desc {
    font-size: 13px;
    color: rgba(247,244,239,0.65);
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .featured-price {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--accent);
  }

  .featured-price span { font-size: 14px; font-weight: 400; opacity: 0.7; }

  /* ─── Footer ─────────────────────────────────────────────── */
  .footer {
    text-align: center;
    padding: 32px 16px 40px;
    border-top: 1px solid var(--border);
    margin-top: 16px;
  }

  .footer-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .footer-logo span { color: var(--accent); }

  .footer-sub {
    font-size: 12px;
    color: var(--text-muted);
  }

  .footer-divider {
    width: 32px;
    height: 2px;
    background: var(--accent);
    margin: 16px auto;
    border-radius: 99px;
  }
`

// ─── Icon emojis (consistent, minimal) ────────────────────────────────────────
const ICONS: Record<string, string> = {
  cafe: '☕',
  desayunos: '🥑',
  platos: '🍽️',
  postres: '🍰',
  bebidas: '🥤',
  logo: '◈',
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <header className="hero">
      <div className="hero-badge">
        <span>◈</span> Menú demo
      </div>

      <h1 className="hero-logo">
        Discco <span>Coffee</span>
      </h1>

      <p className="hero-tagline">
        Buen café. Buen sonido.<br />
        Breakfast, lunch y algo para escuchar.
      </p>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-img-block">☕</div>
        <div className="hero-img-block">🥐</div>
        <div className="hero-img-block">🎵</div>
      </div>
    </header>
  )
}

// ─── Category Tabs ────────────────────────────────────────────────────────────
function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: Category[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <nav className="tabs-bar" aria-label="Categorías del menú">
      <div className="tabs-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn${active === cat.id ? ' active' : ''}`}
            onClick={() => onSelect(cat.id)}
            aria-current={active === cat.id ? 'true' : undefined}
          >
            <span aria-hidden="true">{ICONS[cat.id] ?? '○'}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

// ─── Menu Item Card ─────────────────────────────────────────────────────────
function MenuItemCard({
  item,
  index,
}: {
  item: { id: string; name: string; description: string; price: number; badge?: string }
  index: number
}) {
  const badgeClass = item.badge === 'Especial' ? ' pink' : ''

  return (
    <article
      className="item-card"
      role="article"
      aria-label={`${item.name}, $${item.price}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="item-thumb" aria-hidden="true">
        {ICONS.cafe}
      </div>
      <div className="item-body">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          {item.badge && (
            <span className={`item-badge${badgeClass}`}>{item.badge}</span>
          )}
        </div>
        <p className="item-desc">{item.description}</p>
        <div className="item-price">
          ${item.price} <span>MXN</span>
        </div>
      </div>
    </article>
  )
}

// ─── Menu Section ────────────────────────────────────────────────────────────
function MenuSection({ category }: { category: Category }) {
  return (
    <section
      id={`cat-${category.id}`}
      className="category-section"
      aria-labelledby={`title-${category.id}`}
    >
      <h2 className="category-title" id={`title-${category.id}`}>
        <span aria-hidden="true">{ICONS[category.id] ?? '○'}</span>
        {category.name}
      </h2>
      {category.items.map((item, i) => (
        <MenuItemCard key={item.id} item={item} index={i} />
      ))}
    </section>
  )
}

// ─── Featured Card ───────────────────────────────────────────────────────────
function FeaturedSection() {
  return (
    <section className="featured-section" aria-labelledby="featured-title">
      <h2 id="featured-title" className="category-title">
        <span>★</span> Especial de la casa
      </h2>
      <article className="featured-card">
        <div className="featured-badge">{featuredItem.badge}</div>
        <h3 className="featured-name">{featuredItem.name}</h3>
        <p className="featured-desc">{featuredItem.description}</p>
        <div className="featured-price">
          ${featuredItem.price} <span>MXN</span>
        </div>
      </article>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">Discco <span>Coffee</span></div>
      <div className="footer-sub">Demo de menú digital</div>
      <div className="footer-divider" aria-hidden="true" />
      <p className="footer-sub">Para acompañar una buena sesión.</p>
    </footer>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id)

  // Sync active tab with scroll
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
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    menuData.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleTabClick = (catId: string) => {
    setActiveCategory(catId)
    const el = document.getElementById(`cat-${catId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <main className="menu-shell" role="main">
          <HeroSection />

          <CategoryTabs
            categories={menuData}
            active={activeCategory}
            onSelect={handleTabClick}
          />

          <div className="menu-content">
            <FeaturedSection />
            {menuData.map((cat) => (
              <MenuSection key={cat.id} category={cat} />
            ))}
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}
