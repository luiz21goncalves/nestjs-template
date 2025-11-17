import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { DrizzleModule } from '@/drizzle/drizzle.module'

import { DrizzleHealthIndicator } from './drizzle.health'
import { HealthController } from './health.controller'

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, DrizzleModule],
  providers: [DrizzleHealthIndicator],
})
export class HealthModule {}
