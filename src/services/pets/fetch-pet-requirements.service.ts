import { PetsRepository } from '@/repositories/pets-repository'
import { Requirement } from 'generated/prisma'
import { InexistentPetError } from '../errors/inexistent-pet-error'

interface GetPetRequirementsRequest {
  petId: string
}

interface GetPetRequirementsResponse {
  requirements: Requirement[]
}

export class GetPetRequirements {
  constructor(private petRepository: PetsRepository) {}
  async execute({
    petId,
  }: GetPetRequirementsRequest): Promise<GetPetRequirementsResponse> {
    const requirements = await this.petRepository.getPetRequirements(petId)

    if (!requirements) {
      throw new InexistentPetError()
    }

    return { requirements }
  }
}
