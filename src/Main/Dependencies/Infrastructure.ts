import { BcryptAdapter } from '@/Infrastructure/Cryptography/BcryptAdapter'
import { JwtAdapter } from '@/Infrastructure/Cryptography/JwtAdapter'

export const bcryptAdapter = new BcryptAdapter(12)
export const jwtAdapter = new JwtAdapter('jwt_secret')
