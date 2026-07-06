import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('hero')}>
          La Rue
        </button>

        <div className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <button onClick={() => scrollTo('servicios')}>Servicios</button>
          <button onClick={() => scrollTo('bienestar')}>Bienestar</button>
          <button onClick={() => scrollTo('reservar')} className="navbar__cta">
            Reservar
          </button>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Abrir menú"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  )
}
