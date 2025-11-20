import { HttpStatus, type INestApplication } from '@nestjs/common'
import { createApp } from '@test/setup'
import supertest from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

import { DrizzleService } from '@/drizzle/drizzle.service'

describe('HealthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await createApp()

    await app.init()
  })

  describe('When all services running', () => {
    test('[GET] /health', async () => {
      const response = await supertest(app.getHttpServer()).get('/health')

      expect(response.statusCode).toEqual(HttpStatus.OK)
      expect(response.body).toStrictEqual({
        details: { database: { status: 'up' } },
        error: {},
        info: { database: { status: 'up' } },
        status: 'ok',
      })
    })
  })

  describe('When database is down', () => {
    test('[GET] /health', async () => {
      const drizzleService = app.get(DrizzleService)
      drizzleService.onModuleDestroy()

      const response = await supertest(app.getHttpServer()).get('/health')

      expect(response.statusCode).toEqual(HttpStatus.SERVICE_UNAVAILABLE)
      expect(response.body).toStrictEqual({
        details: { database: { status: 'down' } },
        error: { database: { status: 'down' } },
        info: {},
        status: 'error',
      })
    })
  })
})
