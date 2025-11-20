import { ValidationPipe, VersioningType } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '@/app.module'

export async function createApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication({ logger: false })

  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  return app
}
