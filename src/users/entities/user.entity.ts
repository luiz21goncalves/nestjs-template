import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class User {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty({ format: 'email' })
  email: string

  @Expose({ name: 'created_at' })
  @ApiProperty({ default: new Date(), format: 'date-time', name: 'created_at' })
  createdAt: Date

  @Expose({ name: 'updated_at' })
  @ApiProperty({ default: new Date(), format: 'date-time', name: 'updated_at' })
  updatedAt: Date

  constructor(values: Partial<User>) {
    Object.assign(this, values)
  }
}
