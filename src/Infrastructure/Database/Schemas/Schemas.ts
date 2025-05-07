import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

const baseSchema = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull()
}

export const users = pgTable('users', {
  ...baseSchema,
  email_id: integer().notNull(),
  username_id: integer().notNull(),
  password: varchar({ length: 255 }).notNull(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull()
})

export const usernames = pgTable('usernames', {
  ...baseSchema,
  username: varchar({ length: 255 }).notNull().unique()
})

export const emails = pgTable('emails', {
  ...baseSchema,
  email: varchar({ length: 255 }).notNull().unique()
})
