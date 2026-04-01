import {
  CreatePetDTO,
  FetchPetsFilters,
  PetsRepository,
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetDTO) {
    const { requirements, ...petData } = data

    const pet = await prisma.pet.create({
      data: {
        ...petData,
        requirements: {
          connectOrCreate: requirements.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        requirements: true,
      },
    })
    return pet
  }

  async fetchPetsByFilters(filters: FetchPetsFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        city: filters.city,
        age: filters.age,
        size: filters.size,
        energyLevel: filters.energyLevel,
        independenceLevel: filters.independenceLevel,
        environment: filters.environment,
      },
    })

    return pets
  }

  async getPetDetails(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })
    return pet
  }

  async fetchPetRequirements(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      select: { requirements: true },
    })

    return pet?.requirements ?? []
  }
}
