import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'
import { InexistentPetError } from '../errors/inexistent-pet-error'

interface GetPetDetailsServiceRequest {
  petId: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petRepository: PetsRepository) {}
  async execute({
    petId,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petRepository.getPetDetails(petId)

    if (!pet) {
      throw new InexistentPetError()
    }

    return { pet }
  }
}
