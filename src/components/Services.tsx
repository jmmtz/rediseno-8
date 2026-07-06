import { useState } from 'react'
import { services, categories, type Service } from '../data/services'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Props {
  onBook: (service: Service) => void
}

function ServiceCard({ service, index, onBook }: { service: Service; index: number; onBook: (s: Service) => void }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="service-card reveal"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="service-card__img-wrap">
        <img src={service.image} alt={service.name} className="service-card__img" loading="lazy" />
      </div>
      <div className="service-card__body">
        <h3 className="service-card__name">{service.name}</h3>
        <p className="service-card__desc">{service.description}</p>
        <div className="service-card__footer">
          <span className="service-card__duration">{service.duration}</span>
          <button className="btn btn--ghost" onClick={() => onBook(service)}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Services({ onBook }: Props) {
  const [activeCategory, setActiveCategory] = useState<'cabello' | 'rostro' | 'bienestar'>('cabello')
  const titleRef = useScrollReveal<HTMLDivElement>()

  const filtered = services.filter(s => s.category === activeCategory)

  return (
    <section id="servicios" className="services">
      <div className="container">
        <div ref={titleRef} className="section-header reveal">
          <p className="section-eyebrow">Nuestros Servicios</p>
          <h2 className="section-title">El Arte de Transformar</h2>
          <p className="section-sub">
            Cada servicio, una experiencia diseñada exclusivamente para ti.
          </p>
        </div>

        <div className="services__tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`services__tab${activeCategory === cat.id ? ' services__tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="services__grid">
          {filtered.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  )
}
