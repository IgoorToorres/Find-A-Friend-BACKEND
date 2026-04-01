import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'

interface FetchPetsByFiltersQuery {
  city: string
  age?: 'PUPPY' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
}

interface FetchPetsByFiltersResponse {
  pets: Pet[]
}

export class FetchPetsByFiltersService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  }: FetchPetsByFiltersQuery): Promise<FetchPetsByFiltersResponse> {
    if (!city.trim()) throw new Error('Nenhuma cidade informada')

    const pets = await this.petsRepository.fetchPetsByFilters({
      city,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    })

    return { pets }
  }
}
