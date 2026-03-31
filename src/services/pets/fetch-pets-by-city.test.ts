import { beforeEach, describe, expect, it } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetsByCityService } from './fetch-pets-by-city.service'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityService

describe('Fetch Pets By City', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityService(petsRepository)
  })

  it('Deveria listar pets por cidade', async () => {
    await petsRepository.create({
      name: 'Rex',
      about: 'Muito amigavel',
      age: PetAge.PUPPY,
      size: PetSize.SMALL,
      energyLevel: EnergyLevel.HIGH,
      independenceLevel: IndependenceLevel.LOW,
      environment: Environment.SMALL_SPACE,
      orgId: 'org-01',
      city: 'SAO PAULO',
    })

    await petsRepository.create({
      name: 'Thor',
      about: 'Calmo',
      age: PetAge.ADULT,
      size: PetSize.MEDIUM,
      energyLevel: EnergyLevel.MEDIUM,
      independenceLevel: IndependenceLevel.MEDIUM,
      environment: Environment.MEDIUM_SPACE,
      orgId: 'org-01',
      city: 'SAO PAULO',
    })

    await petsRepository.create({
      name: 'Luna',
      about: 'Brincalhona',
      age: PetAge.SENIOR,
      size: PetSize.LARGE,
      energyLevel: EnergyLevel.LOW,
      independenceLevel: IndependenceLevel.HIGH,
      environment: Environment.LARGE_SPACE,
      orgId: 'org-02',
      city: 'RIO DE JANEIRO',
    })

    const { pets } = await sut.execute({ city: 'SAO PAULO' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Rex' }),
      expect.objectContaining({ name: 'Thor' }),
    ])
  })

  it('Nao deveria listar pets sem cidade informada', async () => {
    // RN01 - cidade obrigatoria para listagem
    await expect(() => sut.execute({ city: '' })).rejects.toBeInstanceOf(Error)
  })
})
