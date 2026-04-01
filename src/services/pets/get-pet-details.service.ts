import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'
import { InexistentPetError } from '../errors/inexistent-pet-error'

interface GetPetDetailsRequest {
  petId: string
}

interface GetPetDetailsResponse {
  pet: Pet
}

export class GetPetDetails {
  constructor(private petRepository: PetsRepository) {}
  async execute({
    petId,
  }: GetPetDetailsRequest): Promise<GetPetDetailsResponse> {
    const pet = await this.petRepository.getPetDetails(petId)

    if (!pet) {
      throw new InexistentPetError()
    }

    return { pet }
  }
}
