import { useState } from 'react'
import { services, categories } from '../data/services'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

const TIME_SLOTS = [
  '9:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const MONTH_NAMES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const DAY_NAMES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
const FULL_DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatDateSpanish(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return `${FULL_DAY_NAMES[date.getDay()]}, ${d} de ${MONTH_NAMES_ES[m - 1]} de ${y}`
}

function MiniCalendar({ selected, onChange }: { selected: string; onChange: (d: string) => void }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const isPast = (d: number) => new Date(year, month, d) < today

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button className="calendar__nav" onClick={prevMonth}>&#8592;</button>
        <span className="calendar__month">{MONTH_NAMES[month]} {year}</span>
        <button className="calendar__nav" onClick={nextMonth}>&#8594;</button>
      </div>
      <div className="calendar__days-header">
        {DAY_NAMES.map(d => <span key={d} className="calendar__day-label">{d}</span>)}
      </div>
      <div className="calendar__grid">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`b${i}`} />
          ) : (
            <button
              key={d}
              disabled={isPast(d)}
              className={`calendar__day${toDateStr(year, month, d) === selected ? ' calendar__day--selected' : ''}${isPast(d) ? ' calendar__day--past' : ''}`}
              onClick={() => !isPast(d) && onChange(toDateStr(year, month, d))}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  )
}

interface BookingData {
  categoryId: string
  serviceId: string
  serviceName: string
  serviceDuration: string
  date: string
  time: string
  name: string
  phone: string
}

const INITIAL: BookingData = {
  categoryId: '',
  serviceId: '',
  serviceName: '',
  serviceDuration: '',
  date: '',
  time: '',
  name: '',
  phone: '',
}

interface Props {
  preselectedServiceId?: string
  onClearPreselect?: () => void
}

export default function Booking({ preselectedServiceId, onClearPreselect }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 'confirmed'>(1)
  const [data, setData] = useState<BookingData>(() => {
    if (preselectedServiceId) {
      const svc = services.find(s => s.id === preselectedServiceId)
      if (svc) {
        return {
          ...INITIAL,
          categoryId: svc.category,
          serviceId: svc.id,
          serviceName: svc.name,
          serviceDuration: svc.duration,
        }
      }
    }
    return INITIAL
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const headerRef = useScrollReveal<HTMLDivElement>()

  const filteredServices = services.filter(s => s.category === data.categoryId)

  const canAdvanceStep1 = data.categoryId !== '' && data.serviceId !== ''
  const canAdvanceStep2 = data.date !== '' && data.time !== ''
  const canAdvanceStep3 = data.name.trim() !== '' && data.phone.trim() !== ''

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    const { error: dbErr } = await supabase.from('appointments').insert({
      name: data.name.trim(),
      phone: data.phone.trim(),
      service_category: data.categoryId,
      service_id: data.serviceId,
      service_name: data.serviceName,
      appointment_date: data.date,
      appointment_time: data.time,
    })
    setSubmitting(false)
    if (dbErr) {
      setError('Ocurrió un error al guardar tu cita. Intenta de nuevo.')
      return
    }
    setStep('confirmed')
  }

  const buildWhatsAppUrl = () => {
    const msg =
      `¡Hola La Rue Salon & Spa! ✨\n\nMe gustaría confirmar mi cita:\n\n` +
      `📋 Servicio: ${data.serviceName}\n` +
      `📅 Fecha: ${formatDateSpanish(data.date)}\n` +
      `🕐 Hora: ${data.time} hrs\n` +
      `👤 Nombre: ${data.name}\n` +
      `📱 Teléfono: ${data.phone}\n\n¡Gracias! 💫`
    return `https://wa.me/528710000000?text=${encodeURIComponent(msg)}`
  }

  const reset = () => {
    setData(INITIAL)
    setStep(1)
    onClearPreselect?.()
  }

  const STEPS = [
    { num: 1, label: 'Servicio' },
    { num: 2, label: 'Fecha & Hora' },
    { num: 3, label: 'Tus Datos' },
  ]

  if (step === 'confirmed') {
    return (
      <section id="reservar" className="booking">
        <div className="booking__container">
          <div className="booking__card">
            <div className="booking__confirmation">
              <div className="booking__check">✓</div>
              <h2>¡Cita Registrada!</h2>
              <p>
                Tu solicitud fue guardada exitosamente.<br />
                Confirma tu cita directamente con nosotros por WhatsApp.
              </p>
              <div className="booking__summary">
                {[
                  ['Servicio', data.serviceName],
                  ['Fecha', formatDateSpanish(data.date)],
                  ['Hora', `${data.time} hrs`],
                  ['Nombre', data.name],
                  ['Teléfono', data.phone],
                ].map(([label, value]) => (
                  <div key={label} className="booking__summary-row">
                    <span className="booking__summary-label">{label}</span>
                    <span className="booking__summary-value">{value}</span>
                  </div>
                ))}
              </div>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="booking__whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Confirmar por WhatsApp
              </a>
              <button className="booking__new" onClick={reset}>
                Agendar otra cita
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reservar" className="booking">
      <div className="booking__container">
        <div ref={headerRef} className="booking__header reveal">
          <p className="section-eyebrow">Reservaciones</p>
          <h2 className="section-title">Agenda tu Experiencia</h2>
          <p className="section-sub">
            Reserva en minutos. Confirmamos por WhatsApp.
          </p>
        </div>

        <div className="booking__card">
          <div className="booking__steps">
            {STEPS.map(s => (
              <div
                key={s.num}
                className={`booking__step-indicator${step === s.num ? ' booking__step-indicator--active' : (step > s.num ? ' booking__step-indicator--done' : '')}`}
              >
                <span className="booking__step-number">
                  {(step as number) > s.num ? '✓' : s.num}
                </span>
                {s.label}
              </div>
            ))}
          </div>

          <div className="booking__body">
            {/* ── Step 1: Choose service ── */}
            {step === 1 && (
              <>
                <h3 className="booking__step-title">¿Qué deseas reservar?</h3>
                <p className="booking__step-sub">Selecciona una categoría y el servicio de tu preferencia.</p>

                <div className="booking__categories">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`booking__category-btn${data.categoryId === cat.id ? ' booking__category-btn--active' : ''}`}
                      onClick={() => setData(d => ({ ...d, categoryId: cat.id, serviceId: '', serviceName: '', serviceDuration: '' }))}
                    >
                      <span className="booking__category-icon">{cat.emoji}</span>
                      <span className="booking__category-name">{cat.label}</span>
                    </button>
                  ))}
                </div>

                {data.categoryId && (
                  <div className="booking__services-list">
                    {filteredServices.map(svc => (
                      <button
                        key={svc.id}
                        className={`booking__service-btn${data.serviceId === svc.id ? ' booking__service-btn--active' : ''}`}
                        onClick={() => setData(d => ({ ...d, serviceId: svc.id, serviceName: svc.name, serviceDuration: svc.duration }))}
                      >
                        <span className="booking__service-name">{svc.name}</span>
                        <span className="booking__service-duration">{svc.duration}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="booking__nav">
                  <span />
                  <button
                    className="btn btn--dark"
                    disabled={!canAdvanceStep1}
                    onClick={() => setStep(2)}
                    style={{ opacity: canAdvanceStep1 ? 1 : 0.4 }}
                  >
                    Continuar →
                  </button>
                </div>
              </>
            )}

            {/* ── Step 2: Date & time ── */}
            {step === 2 && (
              <>
                <h3 className="booking__step-title">Elige fecha y hora</h3>
                <p className="booking__step-sub">{data.serviceName} · {data.serviceDuration}</p>

                <div className="booking__datetime">
                  <div>
                    <p className="booking__datetime-label">Fecha</p>
                    <MiniCalendar selected={data.date} onChange={date => setData(d => ({ ...d, date }))} />
                  </div>
                  <div>
                    <p className="booking__datetime-label">Horario</p>
                    <div className="time-slots">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          className={`time-slot${data.time === t ? ' time-slot--selected' : ''}`}
                          onClick={() => setData(d => ({ ...d, time: t }))}
                        >
                          {t} hrs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="booking__nav">
                  <button className="btn btn--outline" onClick={() => setStep(1)}>← Regresar</button>
                  <button
                    className="btn btn--dark"
                    disabled={!canAdvanceStep2}
                    onClick={() => setStep(3)}
                    style={{ opacity: canAdvanceStep2 ? 1 : 0.4 }}
                  >
                    Continuar →
                  </button>
                </div>
              </>
            )}

            {/* ── Step 3: Personal info ── */}
            {step === 3 && (
              <>
                <h3 className="booking__step-title">Tus datos</h3>
                <p className="booking__step-sub">
                  {data.serviceName} · {formatDateSpanish(data.date)} · {data.time} hrs
                </p>

                <div className="booking__form">
                  <div className="form-field">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={data.name}
                      onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-field">
                    <label>Teléfono (WhatsApp)</label>
                    <input
                      type="tel"
                      placeholder="+52 871 000 0000"
                      value={data.phone}
                      onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                    />
                  </div>
                </div>

                {error && <p className="booking__error">{error}</p>}

                <div className="booking__nav">
                  <button className="btn btn--outline" onClick={() => setStep(2)}>← Regresar</button>
                  <button
                    className="btn btn--accent"
                    disabled={!canAdvanceStep3 || submitting}
                    onClick={submit}
                    style={{ opacity: canAdvanceStep3 ? 1 : 0.4 }}
                  >
                    {submitting ? 'Guardando…' : 'Confirmar Cita'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
