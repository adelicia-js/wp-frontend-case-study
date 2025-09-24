import { z } from 'zod'

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(10, 'Message must be 10 characters or less')
    .refine(
      (val) => !val.includes('!'),
      {
        message: 'Message cannot contain exclamation marks (!)',
      }
    ),
})

export type MessageFormData = z.infer<typeof messageSchema>

