import {
  Prisma,
  Pet,
  PetAge,
  PetSize,
  EnergyLevel,
  IndependenceLevel,
  Environment,
} from 'generated/prisma'

export type FetchPetsFilters = {
  city: string
  age?: PetAge
  size?: PetSize
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchPetsByFilters(filters: FetchPetsFilters): Promise<Pet[]>
  getPetDetails(petId: string): Promise<Pet | null>
}
