import { afterAll, beforeAll, describe, expect, it } from 'vitest'
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

describe('Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve retornar detalhes do pet', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org Pet Details',
        email: 'org-pet-details@example.com',
        cep: '71720022',
        address: 'Endereco da organizacao',
        latitude: -15.6887474,
        longitude: -47.7044456,
        phone: '6199129391293',
        password: await hash('123456', 6),
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        about: 'Muito amigavel',
        age: PetAge.PUPPY,
        size: PetSize.SMALL,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.SMALL_SPACE,
        city: 'SAO PAULO',
        orgId: org.id,
        requirements: {
          connectOrCreate: [
            {
              where: { name: 'Precisa de quintal' },
              create: { name: 'Precisa de quintal' },
            },
          ],
        },
      },
    })

    const response = await request(app.server).get(`/pet/${pet.id}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('pet')
    expect(response.body.pet.id).toBe(pet.id)
    expect(response.body).toHaveProperty('org')
    expect(response.body.org.id).toBe(org.id)
    expect(response.body.org).not.toHaveProperty('password')
  })

  it('deve retornar erro quando pet nao existe', async () => {
    const response = await request(app.server).get('/pet/any-id').send()

    expect(response.statusCode).toBe(400)
  })
})
