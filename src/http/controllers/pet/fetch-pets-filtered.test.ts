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

describe('Fetch Pets Filtered (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve listar pets por cidade', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org Fetch Pets',
        email: 'org-fetch-pets@example.com',
        cep: '71720022',
        address: 'Endereco da organizacao',
        latitude: -15.6887474,
        longitude: -47.7044456,
        phone: '6199129391293',
        password: await hash('123456', 6),
      },
    })

    await prisma.pet.create({
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
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Bob',
        about: 'Muito calmo',
        age: PetAge.ADULT,
        size: PetSize.MEDIUM,
        energyLevel: EnergyLevel.LOW,
        independenceLevel: IndependenceLevel.HIGH,
        environment: Environment.MEDIUM_SPACE,
        city: 'RIO DE JANEIRO',
        orgId: org.id,
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'SAO PAULO' })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0].city).toBe('SAO PAULO')
  })

  it('deve filtrar por caracteristicas', async () => {
    const org = await prisma.org.create({
      data: {
        name: 'Org Fetch Pets 2',
        email: 'org-fetch-pets-2@example.com',
        cep: '71720022',
        address: 'Endereco da organizacao',
        latitude: -15.6887474,
        longitude: -47.7044456,
        phone: '6199129391293',
        password: await hash('123456', 6),
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Thor',
        about: 'Ativo',
        age: PetAge.PUPPY,
        size: PetSize.LARGE,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.LARGE_SPACE,
        city: 'CURITIBA',
        orgId: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'Luna',
        about: 'Tranquila',
        age: PetAge.SENIOR,
        size: PetSize.SMALL,
        energyLevel: EnergyLevel.LOW,
        independenceLevel: IndependenceLevel.HIGH,
        environment: Environment.SMALL_SPACE,
        city: 'CURITIBA',
        orgId: org.id,
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'CURITIBA', size: 'SMALL' })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0].size).toBe('SMALL')
  })

  it('deve retornar erro quando cidade nao for informada', async () => {
    const response = await request(app.server).get('/pets').send()

    expect(response.statusCode).toBe(400)
  })
})
