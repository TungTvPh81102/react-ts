import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(1),
  thumbnail: z.string().optional(),
  description: z.string().optional()
})
