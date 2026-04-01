import { AnyCityInformedError } from '@/services/errors/any-city-informed-error'
import { makeFetchPetsByFilters } from '@/services/factories/make-fetch-pets-by-filters'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function fetchPetsFiltered(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsquerSchema = z.object({
    city: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z
      .enum(['SMALL_SPACE', 'MEDIUM_SPACE', 'LARGE_SPACE'])
      .optional(),
  })

  const { city, age, size, energyLevel, independenceLevel, environment } =
    fetchPetsquerSchema.parse(request.query)

  try {
    const fetchPetsFiltered = makeFetchPetsByFilters()

    const pets = await fetchPetsFiltered.execute({
      city,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    })

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof AnyCityInformedError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
