import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Org, Pet, Requirement } from 'generated/prisma'
import { InexistentOrgError } from '../errors/inexistent-org-error'

interface GetOrgByPetServiceParams {
  petId: string
}

type SafeOrg = Omit<Org, 'password'>

interface GetOrgByPetServiceResponse {
  pet: Pet
  org: SafeOrg
  requeriments: Requirement[]
}

export class GetOrgByPetService {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetOrgByPetServiceParams): Promise<GetOrgByPetServiceResponse> {
    const pet = await this.petRepository.getPetDetails(petId)

    if (!pet) throw new InexistentOrgError()

    const org = await this.orgRepository.findById(pet.orgId)

    if (!org) throw new InexistentOrgError()

    const requeriments = await this.petRepository.fetchPetRequirements(petId)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeOrg } = org

    return {
      pet,
      org: safeOrg,
      requeriments,
    }
  }
}
