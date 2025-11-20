import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  id: text('id').primaryKey(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
})
