import { OrgAlredyExists } from '@/services/errors/org-alredy-exists-error'
import { makeCreateOrg } from '@/services/factories/make-create-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, email, cep, address, latitude, longitude, phone, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerService = makeCreateOrg()

    await registerService.execute({
      name,
      email,
      cep,
      address,
      latitude,
      longitude,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof OrgAlredyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
