import { testContainers } from '../TestContainers/TestContainers'

beforeAll(async () => {
  await testContainers.initAll()
  process.env.DATABASE_URL = testContainers.db.getConnectionUri()
})

afterAll(async () => {
  await testContainers.closeAll()
})
