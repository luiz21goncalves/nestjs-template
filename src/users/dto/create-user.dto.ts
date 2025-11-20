import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ format: 'email' })
  email: string
}
