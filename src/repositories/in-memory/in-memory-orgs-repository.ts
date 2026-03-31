import { Org, Prisma } from 'generated/prisma'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      latitude: new Prisma.Decimal(data.latitude as Prisma.Decimal.Value),
      longitude: new Prisma.Decimal(data.longitude as Prisma.Decimal.Value),
      phone: data.phone,
      password: data.password,
      createdAt: new Date(),
    }

    this.items.push(org)

    return org
  }
}
