import { faker } from '@faker-js/faker'
import { HttpStatus, type INestApplication } from '@nestjs/common'
import { createApp } from '@test/setup'
import supertest from 'supertest'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { DrizzleService } from '@/drizzle/drizzle.service'

import { UsersService } from './users.service'

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await createApp()

    await app.init()
  })

  describe('With valid data', () => {
    test('[POST] /v1/users', async () => {
      const email = faker.internet.email()
      const date = new Date()

      vi.setSystemTime(date)

      const response = await supertest(app.getHttpServer())
        .post('/v1/users')
        .send({ email })

      vi.useRealTimers()

      expect(response.statusCode).toEqual(HttpStatus.CREATED)
      expect(response.body).toStrictEqual({
        created_at: date.toISOString(),
        email: email.toLowerCase(),
        id: expect.any(String),
        updated_at: date.toISOString(),
      })
    })
  })

  describe('When database is down', () => {
    test('[POST] /v1/users', async () => {
      const drizzleService = app.get(DrizzleService)
      drizzleService.onModuleDestroy()

      const response = await supertest(app.getHttpServer())
        .post('/v1/users')
        .send({ email: faker.internet.email() })

      expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR)
      expect(response.body).toStrictEqual({
        message: 'An internal server error occurred.',
        name: 'InternalServerError',
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    })
  })

  describe('With invalid body', () => {
    test('[POST] /v1/users', async () => {
      const response = await supertest(app.getHttpServer()).post('/v1/users')

      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
      expect(response.body).toStrictEqual({
        details: ['email must be an email'],
        message: 'An validation error occurred.',
        name: 'ValidationError',
        status_code: HttpStatus.BAD_REQUEST,
      })
    })
  })

  describe('When user already exists', () => {
    test('[POST] /v1/users', async () => {
      const email = faker.internet.email()
      const userService = app.get(UsersService)

      await userService.create({ email: email.toLowerCase() })

      const response = await supertest(app.getHttpServer())
        .post('/v1/users')
        .send({ email })

      expect(response.statusCode).toEqual(HttpStatus.CONFLICT)
      expect(response.body).toStrictEqual({
        details: {
          identifier: email.toLowerCase(),
        },
        message: 'An user already exists with same identifier',
        name: 'UserAlreadyExistsError',
        status_code: HttpStatus.CONFLICT,
      })
    })
  })
})
