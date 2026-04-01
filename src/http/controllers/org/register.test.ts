import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve registrar uma org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'org-test-1@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })

  it('nao deve registrar org com email duplicado', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Duplicate',
      email: 'org-dup@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    const response = await request(app.server).post('/orgs').send({
      name: 'Org Duplicate 2',
      email: 'org-dup@example.com',
      cep: '71720022',
      address: 'Endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123456',
    })

    expect(response.statusCode).toBe(409)
  })
})
