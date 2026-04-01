import {
  Pet,
  PetAge,
  PetSize,
  EnergyLevel,
  IndependenceLevel,
  Environment,
  Requirement,
} from 'generated/prisma'

export type FetchPetsFilters = {
  city: string
  age?: PetAge
  size?: PetSize
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
}

export interface CreatePetDTO {
  name: string
  about: string
  age: PetAge
  size: PetSize
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  environment: Environment
  orgId: string
  city: string
  requirements: string[]
}

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
  fetchPetsByFilters(filters: FetchPetsFilters): Promise<Pet[]>
  getPetDetails(petId: string): Promise<Pet | null>
  getPetRequirements(petId: string): Promise<Requirement[]>
}
