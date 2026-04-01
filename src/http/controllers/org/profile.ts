import { makeGetOrgDetails } from '@/services/factories/make-get-org-details'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
  const orgId = request.user.sub
  const getOrgDetails = makeGetOrgDetails()
  const { org } = await getOrgDetails.execute({ orgId })

  return reply.status(200).send({
    ...org,
    password: undefined,
  })
}
