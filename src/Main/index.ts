import 'dotenv/config'
import { app } from './Express/Express'

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
