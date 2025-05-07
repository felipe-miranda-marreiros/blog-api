import { UserSQLRepository } from '@/Infrastructure/Database/Repositories/UserSQLRepository'

describe('User Repository', () => {
  it('Should insert an User into database and return its model', async () => {
    const createUserMock = {
      email: 'any_email@gmail.com',
      first_name: 'any_first_name',
      last_name: 'any_last_name',
      password: 'any_password',
      username: 'any_username'
    }
    const userSQLRepository = new UserSQLRepository()
    const user = await userSQLRepository.createUserRespository(createUserMock)
    expect(user.first_name).toEqual(createUserMock.first_name)
    expect(user.last_name).toEqual(createUserMock.last_name)
    expect(user).not.toHaveProperty('password')
  })
})
