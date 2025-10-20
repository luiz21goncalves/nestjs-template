import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'test', 'development']),
  OTEL_TRACE_EXPORTER_TOKEN: z.string(),
  OTEL_TRACE_EXPORTER_URL: z.url(),
  PORT: z.coerce.number(),
})

export type Env = z.infer<typeof envSchema>
