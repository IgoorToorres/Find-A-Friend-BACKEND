import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetOrgByPetService } from '../pets/get-org-by-pet.service'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetOrgByPets() {
  const petRepository = new PrismaPetsRepository()
  const orgRepository = new PrismaOrgsRepository()
  const getOrgByPet = new GetOrgByPetService(petRepository, orgRepository)

  return getOrgByPet
}
