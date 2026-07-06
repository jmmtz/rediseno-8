export interface Service {
  id: string
  name: string
  description: string
  duration: string
  image: string
  category: 'cabello' | 'rostro' | 'bienestar'
}

export const services: Service[] = [
  {
    id: 'corte',
    name: 'Corte & Styling',
    description: 'Cortes personalizados que revelan tu mejor versión, adaptados a tu estilo de vida y estructura facial.',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/3993461/pexels-photo-3993461.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'coloracion',
    name: 'Coloración',
    description: 'Transformación de color con pigmentos de alta calidad para resultados vibrantes, naturales y duraderos.',
    duration: '120 min',
    image: 'https://images.pexels.com/photos/3738383/pexels-photo-3738383.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'babylights',
    name: 'Babylights',
    description: 'Iluminación ultra-fina que imita la luz del sol para un acabado luminoso y absolutamente natural.',
    duration: '150 min',
    image: 'https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'rayos',
    name: 'Rayos & Highlights',
    description: 'Técnicas de aclarado artesanal que realzan tus tonos naturales con dimensión, profundidad y movimiento.',
    duration: '90 min',
    image: 'https://images.pexels.com/photos/1580181/pexels-photo-1580181.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'peinado',
    name: 'Peinado & Recogidos',
    description: 'Desde ondas cinematográficas hasta recogidos de alta moda para tus momentos más especiales.',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/2875153/pexels-photo-2875153.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'mucota',
    name: 'Tratamiento Mucota',
    description: 'Hidratación profunda con biotecnología japonesa para un cabello sedoso, brillante y lleno de vida.',
    duration: '90 min',
    image: 'https://images.pexels.com/photos/3738374/pexels-photo-3738374.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cabello',
  },
  {
    id: 'maquillaje',
    name: 'Maquillaje Profesional',
    description: 'Looks únicos creados a medida, desde frescos y naturales hasta glamorosos looks de noche.',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'rostro',
  },
  {
    id: 'dermaplane',
    name: 'Dermaplane',
    description: 'Exfoliación manual con bisturí quirúrgico que revela una piel radiante, lisa e impecable.',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'rostro',
  },
  {
    id: 'facial-clasico',
    name: 'Facial Clásico',
    description: 'Limpieza profunda, extracción y nutrición personalizada para una piel saludable y equilibrada.',
    duration: '60 min',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'rostro',
  },
  {
    id: 'facial-premium',
    name: 'Facial Premium',
    description: 'Protocolo de alta concentración con activos premium para resultados visibles desde la primera sesión.',
    duration: '90 min',
    image: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'rostro',
  },
  {
    id: 'vibroacustica',
    name: 'Cama Vibroacústica',
    description: 'Terapia sonora envolvente con frecuencias precisas para resetear cuerpo y mente profundamente.',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'bienestar',
  },
  {
    id: 'led',
    name: 'Terapia LED Roja',
    description: 'Fotobiomodulación de última generación que estimula la renovación celular y combate el envejecimiento.',
    duration: '30 min',
    image: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'bienestar',
  },
]

export const categories = [
  { id: 'cabello' as const, label: 'Cabello', emoji: '✦' },
  { id: 'rostro' as const, label: 'Rostro & Belleza', emoji: '✦' },
  { id: 'bienestar' as const, label: 'Bienestar', emoji: '✦' },
]
