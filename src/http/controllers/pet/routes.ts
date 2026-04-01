import { FastifyInstance } from 'fastify'
import { petDetails } from './pet-details'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:petId', petDetails)

  app.post('/pet', { onRequest: [verifyJWT] }, createPet)
}
