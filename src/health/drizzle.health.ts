import { Injectable } from '@nestjs/common'
import { HealthIndicatorService } from '@nestjs/terminus'

import { DrizzleService } from '../drizzle/drizzle.service'

@Injectable()
export class DrizzleHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
    private readonly drizzleService: DrizzleService
  ) {}

  private promiseTimeout<T>(ms: number, promise: Promise<T>) {
    let timer: NodeJS.Timeout

    return Promise.race<T>([
      promise,
      new Promise(
        (_, reject) =>
          (timer = setTimeout(
            () => reject(new Error(`Timed out in ${ms}ms.`)),
            ms
          ))
      ),
    ]).finally(() => clearTimeout(timer))
  }

  async pingCheck(key: string) {
    const check = this.healthIndicatorService.check(key)
    const timeout = 1000

    try {
      await this.promiseTimeout(
        timeout,
        this.drizzleService.db.execute('select 1')
      )
    } catch {
      return check.down()
    }

    return check.up()
  }
}
