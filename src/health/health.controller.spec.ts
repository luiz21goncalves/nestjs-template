import { HttpStatus, type INestApplication } from '@nestjs/common'
import { createApp } from '@test/setup'
import supertest from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

describe('HealthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await createApp()

    await app.init()
  })

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
