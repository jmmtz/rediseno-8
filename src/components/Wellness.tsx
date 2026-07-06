import { useScrollReveal } from '../hooks/useScrollReveal'

interface TreatmentProps {
  tag: string
  name: string
  description: string
  benefits: string[]
  duration: string
  image: string
  onBook: () => void
}

function Treatment({ tag, name, description, benefits, duration, image, onBook }: TreatmentProps) {
  const contentRef = useScrollReveal<HTMLDivElement>()
  return (
    <div className="treatment">
      <div className="treatment__img-wrap">
        <img src={image} alt={name} className="treatment__img" loading="lazy" />
        <div className="treatment__img-overlay" />
      </div>
      <div ref={contentRef} className="treatment__content reveal">
        <p className="treatment__tag">{tag}</p>
        <h3 className="treatment__name">{name}</h3>
        <p className="treatment__desc">{description}</p>
        <ul className="treatment__benefits">
          {benefits.map(b => <li key={b}>{b}</li>)}
        </ul>
        <p className="treatment__duration">{duration}</p>
        <button className="btn btn--outline-light" onClick={onBook}>
          Reservar Experiencia
        </button>
      </div>
    </div>
  )
}

interface Props {
  onBook: (serviceId: string) => void
}

export default function Wellness({ onBook }: Props) {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="bienestar" className="wellness">
      <div ref={headerRef} className="wellness__header reveal">
        <p className="section-eyebrow">Bienestar Tecnológico</p>
        <h2 className="section-title">Terapias del Futuro</h2>
        <p className="section-sub">
          Tecnología sensorial de vanguardia para restaurar tu equilibrio interior.
        </p>
      </div>

      <div className="wellness__treatments">
        <Treatment
          tag="Terapia Sonora"
          name="Cama Vibroacústica"
          description="Una experiencia inmersiva que combina frecuencias vibratorias y sonido terapéutico para sincronizar cuerpo y mente. Cada sesión es un viaje profundo hacia la calma y la regeneración celular."
          benefits={[
            'Reduce cortisol y niveles de estrés profundamente',
            'Mejora la calidad del sueño y la recuperación muscular',
            'Estimula el sistema nervioso parasimpático',
          ]}
          duration="45 min por sesión"
          image="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200"
          onBook={() => onBook('vibroacustica')}
        />
        <Treatment
          tag="Fotobiomodulación"
          name="Terapia de Luz Roja LED"
          description="Longitudes de onda precisas de luz roja e infrarroja penetran la dermis para activar la producción de colágeno, reducir la inflamación y acelerar la renovación celular a nivel mitocondrial."
          benefits={[
            'Estimula la síntesis de colágeno y elastina',
            'Reduce líneas de expresión y manchas',
            'Acelera la cicatrización y regeneración tisular',
          ]}
          duration="30 min por sesión"
          image="https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=1200"
          onBook={() => onBook('led')}
        />
      </div>
    </section>
  )
}
