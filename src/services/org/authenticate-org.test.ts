import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgService } from './authenticate-org.service'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgService

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgRepository)
  })

  it('Deveria ser possivel autenticar uma organizacao', async () => {
    await orgRepository.create({
      name: 'org test',
      email: 'org@test.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: await hash('123', 6),
    })

    const { org } = await sut.execute({
      email: 'org@test.com',
      password: '123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Nao deveria autenticar com email inexistente', async () => {
    await expect(() =>
      sut.execute({
        email: 'nao-existe@test.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Nao deveria autenticar com senha incorreta', async () => {
    await orgRepository.create({
      name: 'org test',
      email: 'org@test.com',
      cep: '123123123132',
      address: 'endereco da organizacao',
      latitude: -15.6887474,
      longitude: -47.7044456,
      phone: '6199129391293',
      password: await hash('123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'org@test.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
