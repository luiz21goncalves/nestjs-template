import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { Env } from '@/env'

import * as schema from '../db/schema'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private _drizzle: NodePgDatabase<typeof schema> & {
    $client: Pool
  }

  constructor(private readonly configService: ConfigService<Env, true>) {}

  onModuleInit() {
    const db = drizzle(this.configService.get('DATABASE_URL'), { schema })
    this._drizzle = db
  }

  onModuleDestroy() {
    this._drizzle.$client.end()
  }

  get db() {
    return this._drizzle
  }
}
