export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <img
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="La Rue Salon & Spa"
          className="hero__img"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Torreón, Coahuila</p>
        <h1 className="hero__title">La Rue</h1>
        <p className="hero__subtitle">Salon & Spa</p>
        <p className="hero__tagline">
          Donde la belleza se convierte en una experiencia sensorial
        </p>
        <div className="hero__actions">
          <button className="btn btn--light" onClick={() => scrollTo('reservar')}>
            Reservar Cita
          </button>
          <button className="btn btn--outline-light" onClick={() => scrollTo('servicios')}>
            Ver Servicios
          </button>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span />
      </div>
    </section>
  )
}
