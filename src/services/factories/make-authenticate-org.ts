import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgService } from '../org/authenticate-org.service'

export function makeAuthenticateOrg() {
  const orgRepository = new PrismaOrgsRepository()
  const authenticateOrg = new AuthenticateOrgService(orgRepository)

  return authenticateOrg
}
