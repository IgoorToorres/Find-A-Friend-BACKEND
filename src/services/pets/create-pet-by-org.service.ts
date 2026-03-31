import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'
import { InexistentOrgError } from '../errors/inexistent-org-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { getCityFromCep } from '@/utils/get-city-from-cep'

interface CreatePetParams {
  name: string
  about: string
  age: 'PUPPY' | 'ADULT' | 'SENIOR'
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energyLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  independenceLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  environment: 'SMALL_SPACE' | 'MEDIUM_SPACE' | 'LARGE_SPACE'
  orgId: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    orgId,
  }: CreatePetParams): Promise<CreatePetResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new InexistentOrgError()
    }

    const city = await getCityFromCep(org.cep)

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
      orgId,
      city,
    })

    return { pet }
  }
}
