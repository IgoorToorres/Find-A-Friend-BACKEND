import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Org, Pet } from 'generated/prisma'
import { InexistentOrgError } from '../errors/inexistent-org-error'

interface GetOrgByPetParams {
  petId: string
}

interface GetOrgByPetResponse {
  pet: Pet
  org: Org
}

export class GetOrgByPet {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({ petId }: GetOrgByPetParams): Promise<GetOrgByPetResponse> {
    const pet = await this.petRepository.getPetDetails(petId)

    if (!pet) throw new InexistentOrgError()

    const org = await this.orgRepository.findById(pet.orgId)

    if (!org) throw new InexistentOrgError()

    return {
      pet,
      org,
    }
  }
}
