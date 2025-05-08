import { app } from '@/Main/Express/Express'
import request from 'supertest'

describe('User Routes', () => {
  describe('POST', () => {
    it('Should return 200 if payload is correct', async () => {
      await request(app)
        .post('/api/sign-up')
        .send({
          email: 'testing_email@gmail.com',
          first_name: 'any_first_name',
          last_name: 'any_last_name',
          password: 'any_password',
          username: 'any_username484777'
        })
        .set('Accept', 'application/json')
        .expect(200)
    })
  })
})
