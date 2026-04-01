import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../pets/create-pet.service'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreatePetByOrg() {
  const petRepository = new PrismaPetsRepository()
  const orgRepository = new PrismaOrgsRepository()
  const createPetByOrg = new CreatePetService(petRepository, orgRepository)

  return createPetByOrg
}
