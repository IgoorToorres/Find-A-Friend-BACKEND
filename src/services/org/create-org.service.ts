import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { Org } from 'generated/prisma'

interface CreateOrgParams {
  name: string
  email: string
  cep: string
  address: string
  latitude: number
  longitude: number
  phone: string
  password: string
}

interface CreateOrgResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    latitude,
    longitude,
    phone,
    password,
  }: CreateOrgParams): Promise<CreateOrgResponse> {
    const password_hash = await hash(password, 6)

    const org = await this.orgRepository.create({
      name,
      email,
      cep,
      address,
      latitude,
      longitude,
      phone,
      password: password_hash,
    })

    return { org }
  }
}
