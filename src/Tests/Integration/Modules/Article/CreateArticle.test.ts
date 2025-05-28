import { app } from '@/Main/Libs/Express/Express'
import { getCookies } from '@/Tests/Integration/Helpers/GetCookies'
import request from 'supertest'

describe('Create Article Route', () => {
  describe('POST', () => {
    it('Should create an article and return 201', async () => {
      const cookies = await getCookies()
      await request(app)
        .post('/api/articles')
        .send({
          title: 'new title',
          body: 'new body'
        })
        .set('Cookie', cookies)
        .set('Accept', 'application/json')
        .expect(201)
    })
  })
})
