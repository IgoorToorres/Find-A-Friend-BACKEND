import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ localidade: 'SAO PAULO' }),
      }),
    )

    await app.ready()
  })

  afterAll(async () => {
    vi.unstubAllGlobals()
    await app.close()
  })

  it('deve criar um pet para org autenticada', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org Create Pet',
        email: 'org-create-pet@example.com',
        cep: '71720022',
        address: 'Endereco da organizacao',
        latitude: -15.6887474,
        longitude: -47.7044456,
        phone: '6199129391293',
        password: await hash('123456', 6),
      },
    })

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'org-create-pet@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        about: 'Muito amigavel',
        age: PetAge.PUPPY,
        size: PetSize.SMALL,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.SMALL_SPACE,
        orgId: org.id,
        requirements: ['Precisa de quintal'],
      })

    expect(response.statusCode).toBe(201)
  })

  it('nao deve permitir criar pet sem token', async () => {
    const response = await request(app.server)
      .post('/pet')
      .send({
        name: 'Rex',
        about: 'Muito amigavel',
        age: PetAge.PUPPY,
        size: PetSize.SMALL,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.SMALL_SPACE,
        orgId: 'org-inexistente',
        requirements: ['Precisa de quintal'],
      })

    expect(response.statusCode).toBe(401)
  })
})
