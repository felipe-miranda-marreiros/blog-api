import { testContainers } from '../TestContainers/TestContainers'

process.on('uncaughtException', (error) => {})

export default async function teardown() {
  await testContainers.closeAll()
}
