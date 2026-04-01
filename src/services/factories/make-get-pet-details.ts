import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsService } from '../pets/get-pet-details.service'

export function makeGetPetDetails() {
  const petRepository = new PrismaPetsRepository()
  const getPetDetails = new GetPetDetailsService(petRepository)

  return getPetDetails
}
