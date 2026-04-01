import { beforeEach, describe, expect, it } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsService } from './get-pet-details.service'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsService

describe('Get Pet Details', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsService(petsRepository)
  })

  it('Deveria retornar os detalhes de um pet', async () => {
    const created = await petsRepository.create({
      name: 'Rex',
      about: 'Muito amigavel',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.LOW,
      environment: Environment.SMALL_SPACE,
      orgId: 'org-01',
      city: 'SAO PAULO',
      requirements: [],
    })

    const { pet } = await sut.execute({ petId: created.id })

    expect(pet).toEqual(expect.objectContaining({ id: created.id }))
  })

  it('Nao deveria retornar detalhes de pet inexistente', async () => {
    await expect(() =>
      sut.execute({ petId: 'pet-inexistente' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
