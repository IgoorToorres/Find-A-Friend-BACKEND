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

export type PetWithRequirements = Pet & {
  requirements: Requirement[]
}

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<PetWithRequirements>
  fetchPetsByFilters(filters: FetchPetsFilters): Promise<Pet[]>
  getPetDetails(petId: string): Promise<Pet | null>
  fetchPetRequirements(petId: string): Promise<Requirement[]>
}
