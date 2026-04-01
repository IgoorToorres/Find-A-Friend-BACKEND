import { randomUUID } from 'node:crypto'
import {
  CreatePetDTO,
  FetchPetsFilters,
  PetWithRequirements,
  PetsRepository,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetWithRequirements[] = []

  async create(data: CreatePetDTO) {
    const pet: PetWithRequirements = {
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
      requirements: data.requirements.map((name) => ({
        id: randomUUID(),
        name,
      })),
    }

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

  async getPetDetails(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchPetRequirements(petId: string) {
    const pet = this.items.find((item) => item.id === petId)
    if (!pet) return []
    return pet.requirements
  }
}
