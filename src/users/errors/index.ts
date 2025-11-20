import { ConflictError } from '@/errors'

export class UserAlreadyExistsError extends ConflictError {
  constructor(identifier: string) {
    super({
      cause: { identifier },
      details: { identifier },
      message: 'An user already exists with same identifier',
    })
    this.name = 'UserAlreadyExistsError'
  }
}
