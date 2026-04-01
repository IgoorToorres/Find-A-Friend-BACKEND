import { FastifyInstance } from 'fastify'
import { petDetails } from './pet-details'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchPetsFiltered } from './fetch-pets-filtered'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:petId', petDetails)

  app.post('/pet', { onRequest: [verifyJWT] }, createPet)
  app.get('/pets', fetchPetsFiltered)
}
