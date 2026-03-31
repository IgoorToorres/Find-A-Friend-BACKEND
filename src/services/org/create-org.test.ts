import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgService } from './create-org.service'

let orgRepository: InMemoryOrgsRepository
let sut: CreateOrgService

describe('Create Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgRepository)
  })

  it('Deveria ser possivel criar uma organizacao', async () => {
    const input = {
      name: 'organizacao de test',
      email: 'organizacao@gmail.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123',
    }
    const { org } = await sut.execute(input)

    expect(org).toEqual(
      expect.objectContaining({
        name: input.name,
        email: input.email,
        cep: input.cep,
        address: input.address,
        phone: input.phone,
      }),
    )
    expect(orgRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('Deveria salvar a senha de forma criptografada', async () => {
    const { org } = await sut.execute({
      name: 'organizacao de test',
      email: 'organizacao@gmail.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: '123',
    })

    const isPasswordHashed = await compare('123', org.password)

    expect(isPasswordHashed).toBe(true)
  })
})
