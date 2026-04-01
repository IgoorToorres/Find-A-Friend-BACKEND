import { InexistentOrgError } from '@/services/errors/inexistent-org-error'
import { makeCreatePetByOrg } from '@/services/factories/make-create-pet-by-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  EnergyLevel,
  Environment,
  IndependenceLevel,
  PetAge,
  PetSize,
} from 'generated/prisma'
import z from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.nativeEnum(PetAge),
    size: z.nativeEnum(PetSize),
    energyLevel: z.nativeEnum(EnergyLevel),
    independenceLevel: z.nativeEnum(IndependenceLevel),
    environment: z.nativeEnum(Environment),
    orgId: z.string(),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    orgId,
    requirements,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetService = makeCreatePetByOrg()

    await createPetService.execute({
      name,
      about,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
      orgId,
      requirements,
    })
  } catch (err) {
    if (err instanceof InexistentOrgError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
