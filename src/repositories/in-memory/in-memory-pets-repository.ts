import { Pet, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      environment: data.environment,
      orgId: data.orgId,
      city: data.city,
      createdAt: new Date(),
    } as Pet

    this.items.push(pet)

    return pet
  }

  async fetchPetsByCity(city: string) {
    return this.items.filter((item) => item.city.includes(city))
  }
}
