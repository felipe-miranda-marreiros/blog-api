import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

async function resetDatabase() {
  await client.connect()

  const db = drizzle(client)

  console.log('>> Dropping tables...')
  await db.execute(`
  DROP TABLE IF EXISTS usernames_table, emails_table, articles_table, users_table CASCADE;

  DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
      DROP TYPE status CASCADE;
    END IF;
  END$$;
`)

  await client.end()
  console.log('Database reset')
}

resetDatabase().catch((err) => {
  console.error('Error running reset script:', err)
  process.exit(1)
})
