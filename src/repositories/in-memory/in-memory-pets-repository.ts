import { Pet, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'
import { FetchPetsFilters, PetsRepository } from '../pets-repository'

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

  async fetchPetsByFilters(filters: FetchPetsFilters) {
    let pets = this.items.filter((item) => item.city === filters.city)

    if (filters.age) pets = pets.filter((item) => item.age === filters.age)

    if (filters.size) pets = pets.filter((item) => item.size === filters.size)

    if (filters.energyLevel)
      pets = pets.filter((item) => item.energyLevel === filters.energyLevel)

    if (filters.independenceLevel)
      pets = pets.filter(
        (item) => item.independenceLevel === filters.independenceLevel,
      )

    if (filters.environment)
      pets = pets.filter((item) => item.environment === filters.environment)

    return pets
  }
}
