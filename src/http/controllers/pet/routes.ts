import { FastifyInstance } from 'fastify'
import { petDetails } from './pet-details'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pet/:petId', petDetails)
}
