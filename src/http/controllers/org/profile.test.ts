import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve retornar o perfil da org autenticada', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Profile',
      email: 'org-profile@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'org-profile@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        name: 'Org Profile',
        email: 'org-profile@example.com',
        cep: '71720022',
        address: 'Endereco da organizacao',
        phone: '6199129391293',
      }),
    )
    expect(profileResponse.body).not.toHaveProperty('password')
  })

  it('nao deve retornar perfil sem token', async () => {
    const response = await request(app.server).get('/profile').send()

    expect(response.statusCode).toBe(401)
  })
})
