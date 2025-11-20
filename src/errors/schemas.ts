import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class ValidationErrorSchema {
  @ApiProperty({ default: 'ValidationError' })
  name: string

  @ApiProperty()
  message: string

  @ApiProperty({ default: HttpStatus.BAD_REQUEST })
  status_code: number

  @ApiProperty()
  details: string[]
}

export class NotFoundErrorSchema {
  @ApiProperty({ default: 'NotFoundError' })
  name: string

  @ApiProperty()
  message: string

  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  status_code: number
}

export class ConflictErrorSchema {
  @ApiProperty({ default: 'ConflictError' })
  name: string

  @ApiProperty()
  message: string

  @ApiProperty({ default: HttpStatus.CONFLICT })
  status_code: number

  @ApiProperty({ required: false })
  details?: Record<string, unknown>
}

export class UserAlreadyExistsErrorSchema {
  @ApiProperty({ default: 'UserAlreadyExistsError' })
  name: string

  @ApiProperty()
  message: string

  @ApiProperty({ default: HttpStatus.CONFLICT })
  status_code: number

  @ApiProperty({ required: false })
  details?: Record<string, unknown>
}

export class InternalServerErrorSchema {
  @ApiProperty({ default: 'InternalServerError' })
  name: string

  @ApiProperty()
  message: string

  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  status_code: number
}
