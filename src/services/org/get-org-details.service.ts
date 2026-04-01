import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from 'generated/prisma'
import { InexistentOrgError } from '../errors/inexistent-org-error'

interface GetOrgDetailsParams {
  orgId: string
}

interface GetOrgDetailsResponse {
  org: Org
}

export class GetOrgDetailsService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgDetailsParams): Promise<GetOrgDetailsResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new InexistentOrgError()
    }

    return { org }
  }
}
