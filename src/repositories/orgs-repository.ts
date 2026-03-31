import { Prisma, Org } from 'generated/prisma'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
