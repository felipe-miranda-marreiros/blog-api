import { app } from '@/Main/Express/Express'
import request from 'supertest'

describe('User Routes', () => {
  describe('POST', () => {
    it('Should return 200 if payload is correct', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'any_email@gmail.com',
          first_name: 'any_first_name',
          last_name: 'any_last_name',
          password: 'any_password',
          username: 'any_username484'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(response.body.first_name).toBe('any_first_name')
    })
  })
})
