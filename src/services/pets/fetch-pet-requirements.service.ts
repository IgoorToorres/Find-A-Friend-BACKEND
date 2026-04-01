import { PetsRepository } from '@/repositories/pets-repository'
import { Requirement } from 'generated/prisma'
import { InexistentPetError } from '../errors/inexistent-pet-error'

interface FetchPetRequirementsServiceRequest {
  petId: string
}

interface FetchPetRequirementsServiceResponse {
  requirements: Requirement[]
}

export class FetchPetRequirementsService {
  constructor(private petRepository: PetsRepository) {}
  async execute({
    petId,
  }: FetchPetRequirementsServiceRequest): Promise<FetchPetRequirementsServiceResponse> {
    const requirements = await this.petRepository.fetchPetRequirements(petId)

    if (!requirements) {
      throw new InexistentPetError()
    }

    return { requirements }
  }
}
