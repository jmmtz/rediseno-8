export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <span className="footer__logo">La Rue</span>
          <p className="footer__tagline">
            Salon & Spa de alta gama en el corazón de Torreón, Coahuila. Belleza, bienestar y lujo sensorial.
          </p>
        </div>

        <div>
          <p className="footer__heading">Navegación</p>
          <ul className="footer__list">
            <li><button onClick={() => scrollTo('servicios')}>Servicios</button></li>
            <li><button onClick={() => scrollTo('bienestar')}>Bienestar</button></li>
            <li><button onClick={() => scrollTo('reservar')}>Reservar Cita</button></li>
          </ul>
        </div>

        <div>
          <p className="footer__heading">Servicios</p>
          <ul className="footer__list">
            <li>Corte & Coloración</li>
            <li>Babylights & Rayos</li>
            <li>Maquillaje & Faciales</li>
            <li>Terapias Sensoriales</li>
          </ul>
        </div>

        <div>
          <p className="footer__heading">Contacto</p>
          <ul className="footer__list">
            <li>Torreón, Coahuila</li>
            <li>México</li>
            <li style={{ marginTop: 8 }}>Lun — Sáb</li>
            <li>9:00 — 19:00 hrs</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} La Rue Salon & Spa. Todos los derechos reservados.</span>
        <span>Torreón, Coahuila · México</span>
      </div>
    </footer>
  )
}
