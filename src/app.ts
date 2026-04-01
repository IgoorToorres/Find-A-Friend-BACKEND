import fastify from 'fastify'
import { OrgRoutes } from './http/controllers/org/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(OrgRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error: ', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    // task futura
  }

  return reply.status(500).send({ message: 'internal server error' })
})
