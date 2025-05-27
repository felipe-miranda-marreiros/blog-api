import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

async function resetDatabase() {
  await client.connect()

  const db = drizzle(client)

  console.log('>> Dropping tables...')
  await db.execute(`
  -- Remove o tipo ENUM, se existir
  DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
      DROP TYPE status;
    END IF;
  END$$;

  -- Remove tabelas (e dependências)
  DROP TABLE IF EXISTS usernames, emails, articles, users CASCADE;
`)

  console.log('>> Running migrations...')
  await migrate(db, { migrationsFolder: 'drizzle' })

  await client.end()
  console.log('Database reset and migrated')
}

resetDatabase().catch((err) => {
  console.error('Error running reset script:', err)
  process.exit(1)
})
