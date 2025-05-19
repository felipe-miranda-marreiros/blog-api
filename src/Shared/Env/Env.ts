import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  JWT_SECRET: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  EXPRESS_PORT: z
    .string()
    .nonempty()
    .transform((value) => parseInt(value))
})

export const ENV = envSchema.parse(process.env)

export type Environment = z.infer<typeof envSchema>
