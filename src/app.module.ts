import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envSchema } from './env'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      expandVariables: true,
      isGlobal: true,
      validate(config) {
        return envSchema.parse(config)
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
