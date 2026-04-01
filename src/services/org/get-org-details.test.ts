import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgDetailsService } from './get-org-details.service'
import { InexistentOrgError } from '../errors/inexistent-org-error'

let orgRepository: InMemoryOrgsRepository
let sut: GetOrgDetailsService

describe('Get Org Details', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new GetOrgDetailsService(orgRepository)
  })

  it('Deveria retornar os detalhes da org', async () => {
    const created = await orgRepository.create({
      name: 'org test',
      email: 'org@test.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123',
    })

    const { org } = await sut.execute({ orgId: created.id })

    expect(org.id).toEqual(created.id)
    expect(org).toEqual(
      expect.objectContaining({
        name: created.name,
        email: created.email,
        cep: created.cep,
        address: created.address,
        phone: created.phone,
      }),
    )
  })

  it('Nao deveria retornar org inexistente', async () => {
    await expect(() =>
      sut.execute({ orgId: 'org-inexistente' }),
    ).rejects.toBeInstanceOf(InexistentOrgError)
  })
})
