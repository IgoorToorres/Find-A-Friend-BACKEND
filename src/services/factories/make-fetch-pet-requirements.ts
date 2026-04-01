import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetRequirementsService } from '../pets/fetch-pet-requirements.service'

export function makeFetchPetRequirements() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetRequirements = new FetchPetRequirementsService(petRepository)

  return fetchPetRequirements
}
