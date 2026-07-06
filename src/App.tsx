import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Wellness from './components/Wellness'
import Booking from './components/Booking'
import Footer from './components/Footer'
import type { Service } from './data/services'

export default function App() {
  const [preselectedId, setPreselectedId] = useState<string | undefined>()

  const handleBook = (service: Service) => {
    setPreselectedId(service.id)
    setTimeout(() => {
      document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const handleWellnessBook = (serviceId: string) => {
    setPreselectedId(serviceId)
    setTimeout(() => {
      document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Services onBook={handleBook} />
      <Wellness onBook={handleWellnessBook} />
      <Booking preselectedServiceId={preselectedId} onClearPreselect={() => setPreselectedId(undefined)} />
      <Footer />
    </>
  )
}
