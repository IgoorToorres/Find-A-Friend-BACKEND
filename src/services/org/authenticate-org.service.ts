import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from 'generated/prisma'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateOrgServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrgServiceResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
