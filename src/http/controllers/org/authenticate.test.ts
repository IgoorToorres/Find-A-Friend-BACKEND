import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve autenticar uma org e retornar token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Auth',
      email: 'org-auth@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'org-auth@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('refreshToken=')]),
    )
  })

  it('nao deve autenticar com credenciais invalidas', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Auth 2',
      email: 'org-auth-2@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'org-auth-2@example.com',
      password: 'wrong-password',
    })

    expect(response.statusCode).toBe(400)
  })
})
