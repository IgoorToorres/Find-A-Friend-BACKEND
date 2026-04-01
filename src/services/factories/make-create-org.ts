import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '../org/create-org.service'

export function makeCreateOrg() {
  const orgRepository = new PrismaOrgsRepository()
  const createOrg = new CreateOrgService(orgRepository)

  return createOrg
}
