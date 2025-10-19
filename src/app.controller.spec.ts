import { HttpStatus, INestApplication } from '@nestjs/common'
import { createApp } from '@test/setup'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await createApp()

    await app.init()
  })

  it('/ (GET)', async () => {
    const response = await supertest(app.getHttpServer()).get('/')

    expect(response.statusCode).toEqual(HttpStatus.OK)
    expect(response.body).toEqual({ message: 'Hello World!' })
  })
})
