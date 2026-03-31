import { beforeEach, describe, expect, it } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet-by-org.service'
import { InexistentOrgError } from '../errors/inexistent-org-error'

let orgRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('Create Pet By Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(petsRepository, orgRepository)
  })

  it('Deveria ser possivel cadastrar um pet vinculado a uma org', async () => {
    const org = await orgRepository.create({
      name: 'org test',
      email: 'org@test.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123',
    })

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Rex',
      about: 'Muito amigavel',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.LOW,
      environment: Environment.SMALL_SPACE,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.orgId).toEqual(org.id)
    expect(petsRepository.items).toHaveLength(1)
  })

  it('Nao deveria cadastrar pet sem org', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'org-inexistente',
        name: 'Rex',
        about: 'Muito amigavel',
        age: PetAge.PUPPY,
        size: PetSize.SMALL,
        energyLevel: EnergyLevel.HIGH,
        independenceLevel: IndependenceLevel.LOW,
        environment: Environment.SMALL_SPACE,
      }),
    ).rejects.toBeInstanceOf(InexistentOrgError)
  })
})
