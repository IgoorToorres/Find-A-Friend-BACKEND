import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { Profile } from './profile'

export async function OrgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/authenticate', authenticate)

  app.get('/profile', { onRequest: [verifyJWT] }, Profile)
}
