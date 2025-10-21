import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(['production', 'test', 'development']),
  OTEL_TRACE_EXPORTER_TOKEN: z.string(),
  OTEL_TRACE_EXPORTER_URL: z.url(),
  PORT: z.coerce.number(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
})

export type Env = z.infer<typeof envSchema>
