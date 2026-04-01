import { beforeEach, describe, expect, it } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetRequirements } from './fetch-pet-requirements.service'

let petsRepository: InMemoryPetsRepository
let sut: GetPetRequirements

describe('Fetch Pet Requirements', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetRequirements(petsRepository)
  })

  it('Deveria retornar os requirements do pet', async () => {
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
      requirements: ['Precisa de quintal', 'Somente apartamento'],
    })

    const { requirements } = await sut.execute({ petId: created.id })

    expect(requirements).toHaveLength(2)
    expect(requirements).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Precisa de quintal' }),
        expect.objectContaining({ name: 'Somente apartamento' }),
      ]),
    )
  })

  it('Deveria retornar lista vazia quando pet nao existe', async () => {
    const { requirements } = await sut.execute({ petId: 'pet-inexistente' })

    expect(requirements).toHaveLength(0)
  })
})
