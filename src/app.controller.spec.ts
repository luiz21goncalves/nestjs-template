import { HttpStatus, type INestApplication } from '@nestjs/common'
import { createApp } from '@test/setup'
import supertest from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await createApp()

    await app.init()
  })

  test('[GET] /', async () => {
    const response = await supertest(app.getHttpServer()).get('/')

    expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND)
    expect(response.body).toStrictEqual({
      message: 'Cannot GET /',
      name: 'NotFoundError',
      status_code: HttpStatus.NOT_FOUND,
    })
  })
})
