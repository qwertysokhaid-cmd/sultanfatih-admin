import type { Testimonial } from '../types/index.ts'
import data from '../content/testimoni.json' with { type: 'json' }

// Ulasan asli dari Google Maps, dikelola lewat panel admin (/admin) → src/content/testimoni.json.
export const testimonials: Testimonial[] = data.testimoni
