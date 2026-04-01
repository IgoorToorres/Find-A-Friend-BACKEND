import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgDetailsService } from '../org/get-org-details.service'

export function makeGetOrgDetails() {
  const orgRepository = new PrismaOrgsRepository()
  const getOrgByPet = new GetOrgDetailsService(orgRepository)

  return getOrgByPet
}
