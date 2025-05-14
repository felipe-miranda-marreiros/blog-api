import { testContainers } from '../TestContainers/TestContainers'

export default async function setup() {
  await testContainers.initAll()
}
