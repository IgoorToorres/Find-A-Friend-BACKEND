import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetOrgByPet } from './get-org-by-pet.service'
import { InexistentOrgError } from '../errors/inexistent-org-error'

vi.mock('@/utils/get-city-from-cep', () => {
  return {
    getCityFromCep: vi.fn().mockResolvedValue('SAO PAULO'),
  }
})

let orgRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetOrgByPet

describe('Get Org By Pet', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetOrgByPet(petsRepository, orgRepository)
  })

  it('Deveria retornar a org responsavel pelo pet', async () => {
    const org = await orgRepository.create({
      name: 'org test',
      email: 'org@test.com',
      cep: '71720022',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123',
    })

    const pet = await petsRepository.create({
      name: 'Rex',
      about: 'Muito amigavel',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.LOW,
      environment: Environment.SMALL_SPACE,
      orgId: org.id,
      city: 'SAO PAULO',
      requirements: [],
    })

    const response = await sut.execute({ petId: pet.id })

    expect(response.org.id).toEqual(org.id)
    expect(response.pet.id).toEqual(pet.id)
  })

  it('Nao deveria retornar org quando pet nao existe', async () => {
    await expect(() =>
      sut.execute({ petId: 'pet-inexistente' }),
    ).rejects.toBeInstanceOf(InexistentOrgError)
  })
})
