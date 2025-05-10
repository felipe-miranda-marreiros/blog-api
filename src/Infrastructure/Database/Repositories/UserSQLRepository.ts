import { UserRepository } from '@/Application/Contracts/Repositories/UserRepository'
import { db } from '../Drizzle/DrizzleClient'
import { emails, usernames, users } from '../Schemas/Schemas'
import { getISOFormatDateQuery } from '../Helpers/Helpers'
import { eq } from 'drizzle-orm'
import { SignUpParams } from '@/Domain/Authentication/UseCases/SignUp'
import { LoggedInUser, User } from '@/Domain/Users/Models/User'

export class UserSQLRepository implements UserRepository {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(emails)
      .where(eq(emails.email, email))
      .leftJoin(users, eq(users.email_id, emails.id))

    if (result[0]?.users) {
      return {
        ...result[0]?.users,
        created_at: result[0].users.created_at.toISOString(),
        updated_at: result[0].users.updated_at.toISOString()
      }
    }
  }

  async isEmailInUse(email: string): Promise<boolean> {
    const result = await db.select().from(emails).where(eq(emails.email, email))
    return result.length > 0
  }

  async isUsernameInUse(username: string): Promise<boolean> {
    const result = await db
      .select()
      .from(usernames)
      .where(eq(usernames.username, username))
    return result.length > 0
  }

  async createUser(params: SignUpParams): Promise<LoggedInUser> {
    const result = await db.transaction(async (tx) => {
      const usernameTransaction = await tx
        .insert(usernames)
        .values({ username: params.username })
        .returning({ username_id: usernames.id })
      const emailTransaction = await tx
        .insert(emails)
        .values({ email: params.email })
        .returning({ email_id: emails.id })
      return await tx
        .insert(users)
        .values({
          password: params.password,
          last_name: params.last_name,
          first_name: params.first_name,
          username_id: usernameTransaction[0].username_id,
          email_id: emailTransaction[0].email_id
        })
        .returning({
          id: users.id,
          last_name: users.last_name,
          first_name: users.first_name,
          username_id: users.username_id,
          email_id: users.email_id,
          created_at: getISOFormatDateQuery(users.created_at),
          updated_at: getISOFormatDateQuery(users.updated_at)
        })
    })
    return result[0]
  }
}
