import { Injectable } from '@nestjs/common'
import { v7 } from 'uuid'

import { users } from '@/db/schema'
import { DrizzleService } from '@/drizzle/drizzle.service'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create({ email }: CreateUserDto) {
    const [user] = await this.drizzleService.db
      .insert(users)
      .values({ email, id: v7() })
      .returning()

    return new User(user)
  }

  async findByEmail(email: string) {
    const user = await this.drizzleService.db.query.users.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email)
      },
    })

    if (user) {
      return new User(user)
    }

    return null
  }
}
