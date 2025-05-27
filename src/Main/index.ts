import 'dotenv/config'
import { app } from './Libs/Express/Express'
import { ENV } from '@/Shared/Env/Env'

app.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port 3000`)
})
