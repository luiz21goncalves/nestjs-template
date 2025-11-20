import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  createdAt: timestamp('created_at')
    .$onUpdateFn(() => new Date())
    .$onUpdateFn(() => new Date()),
  email: text('email').notNull().unique(),
  id: text('id').primaryKey(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdateFn(() => new Date())
    .$onUpdateFn(() => new Date()),
})
