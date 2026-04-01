import { InexistentOrgError } from '@/services/errors/inexistent-org-error'
import { makeGetOrgByPets } from '@/services/factories/make-get-org-by-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = paramsSchema.parse(request.params)

  try {
    const getOrgByPet = makeGetOrgByPets()

    const { org, pet, requeriments } = await getOrgByPet.execute({ petId })
    console.log({ org, pet, requeriments })
    return reply.status(200).send({ org, pet, requeriments })
  } catch (err) {
    if (err instanceof InexistentOrgError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
