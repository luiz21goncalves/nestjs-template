import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { Env } from '@/env'

@Injectable()
export class DrizzleService implements OnModuleInit {
  private _drizzle: NodePgDatabase<Record<string, never>> & {
    $client: Pool
  }

  constructor(private readonly configService: ConfigService<Env, true>) {}

  onModuleInit() {
    const pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
    })
    this._drizzle = drizzle({ client: pool })
  }

  get db() {
    return this._drizzle
  }
}
