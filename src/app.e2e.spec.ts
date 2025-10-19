import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { AppModule } from './app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    const response = await supertest(app.getHttpServer()).get('/')

    expect(response.statusCode).toEqual(HttpStatus.OK)
    expect(response.body).toEqual({ message: 'Hello World!' })
  })
})
