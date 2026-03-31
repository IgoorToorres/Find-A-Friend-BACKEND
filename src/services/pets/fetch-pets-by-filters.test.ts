import { beforeEach, describe, expect, it } from 'vitest'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetsByCityService } from './fetch-pets-by-filters.service'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCityService

describe('Fetch Pets By City And Filters', () => {
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

  it('Deveria filtrar por idade', async () => {
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

    const { pets } = await sut.execute({ city: 'SAO PAULO', age: PetAge.PUPPY })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Rex' }))
  })

  it('Deveria filtrar por porte', async () => {
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

    const { pets } = await sut.execute({
      city: 'SAO PAULO',
      size: PetSize.MEDIUM,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Thor' }))
  })

  it('Deveria filtrar por nivel de energia', async () => {
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

    const { pets } = await sut.execute({
      city: 'SAO PAULO',
      energyLevel: EnergyLevel.HIGH,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Rex' }))
  })

  it('Deveria filtrar por nivel de independencia', async () => {
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

    const { pets } = await sut.execute({
      city: 'SAO PAULO',
      independenceLevel: IndependenceLevel.MEDIUM,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Thor' }))
  })

  it('Deveria filtrar por ambiente', async () => {
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

    const { pets } = await sut.execute({
      city: 'SAO PAULO',
      environment: Environment.MEDIUM_SPACE,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Thor' }))
  })

  it('Deveria permitir combinar filtros', async () => {
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

    const { pets } = await sut.execute({
      city: 'SAO PAULO',
      age: PetAge.ADULT,
      size: PetSize.MEDIUM,
      energyLevel: EnergyLevel.MEDIUM,
      independenceLevel: IndependenceLevel.MEDIUM,
      environment: Environment.MEDIUM_SPACE,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Thor' }))
  })
})
