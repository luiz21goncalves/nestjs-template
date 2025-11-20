import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

import {
  InternalServerErrorSchema,
  UserAlreadyExistsErrorSchema,
  ValidationErrorSchema,
} from '@/errors/schemas'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserAlreadyExistsError } from './errors'
import { UsersService } from './users.service'

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: User })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorSchema })
  @ApiBadRequestResponse({ type: ValidationErrorSchema })
  @ApiConflictResponse({ type: UserAlreadyExistsErrorSchema })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email)

    if (user) {
      throw new UserAlreadyExistsError(createUserDto.email)
    }

    return this.usersService.create(createUserDto)
  }
}
