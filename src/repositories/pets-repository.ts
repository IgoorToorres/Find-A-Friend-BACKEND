import { Prisma, Pet } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchPetsByCity(city: string): Promise<Pet[]>
}
