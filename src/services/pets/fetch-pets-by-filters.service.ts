import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'

interface GetPetsByCityQuery {
  city: string
  age?: 'PUPPY' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
}

interface GetPetsByCityResponse {
  pets: Pet[]
}

export class GetPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  }: GetPetsByCityQuery): Promise<GetPetsByCityResponse> {
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
