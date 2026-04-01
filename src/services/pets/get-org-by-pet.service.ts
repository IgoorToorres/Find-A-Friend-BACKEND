import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Org, Pet } from 'generated/prisma'
import { InexistentOrgError } from '../errors/inexistent-org-error'

interface GetOrgByPetServiceParams {
  petId: string
}

type SafeOrg = Omit<Org, 'password'>

interface GetOrgByPetServiceResponse {
  pet: Pet
  org: SafeOrg
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeOrg } = org

    return {
      pet,
      org: safeOrg,
    }
  }
}
