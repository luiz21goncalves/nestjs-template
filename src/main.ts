import './instrumentation'

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

import { AppModule } from './app.module'
import type { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const config = new DocumentBuilder()
    .setTitle('Nestjs template')
    .setDescription('The NestJs template')
    .setContact(
      'Luiz Gonçalves',
      'https://github.com/luiz21goncalves/nestjs-template',
      'luizhbgoncalves@gmail.com'
    )
    .setVersion('0.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  app.use('/docs', apiReference({ content: document }))

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
