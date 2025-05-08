import { Encrypter } from '@/Application/Contracts/Criptography/Encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt<TData extends Object>(value: TData): Promise<string> {
    const encryptedValue = jwt.sign(value, this.secret)
    return Promise.resolve(encryptedValue)
  }
}
