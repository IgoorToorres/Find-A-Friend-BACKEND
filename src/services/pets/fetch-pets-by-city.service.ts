import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'

interface GetPetsByCityQuery {
  city: string
}

interface GetPetsByCityResponse {
  pets: Pet[]
}

export class GetPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: GetPetsByCityQuery): Promise<GetPetsByCityResponse> {
    if (!city.trim()) throw new Error('Nenhuma cidade informada')
    const pets = await this.petsRepository.fetchPetsByCity(city)

    return { pets }
  }
}
