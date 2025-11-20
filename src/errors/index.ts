import { HttpStatus } from '@nestjs/common'

type AppErrorProps<TDetails = unknown> = {
  name: string
  message: string
  statusCode: number
  cause?: unknown
  details?: TDetails
}

type AppErrorResponse = {
  status_code: number
  name: string
  message: string
  details?: unknown
}

export class AppError extends Error {
  private readonly props: Pick<AppErrorProps, 'statusCode' | 'details'>

  constructor({ message, cause, name, statusCode, details }: AppErrorProps) {
    super(message, { cause })
    this.name = name
    this.props = { details, statusCode }
  }

  toResponse(): AppErrorResponse {
    return {
      details: this.props.details,
      message: this.message,
      name: this.name,
      status_code: this.props.statusCode,
    }
  }
}

export class ValidationError extends AppError {
  constructor({ cause, details }: Pick<AppErrorProps, 'cause' | 'details'>) {
    super({
      cause,
      details,
      message: 'An validation error occurred.',
      name: 'ValidationError',
      statusCode: HttpStatus.BAD_REQUEST,
    })
  }
}

export class NotFoundError extends AppError {
  constructor({ cause, message }: Pick<AppErrorProps, 'cause' | 'message'>) {
    super({
      cause,
      message,
      name: 'NotFoundError',
      statusCode: HttpStatus.NOT_FOUND,
    })
  }
}

export class ConflictError extends AppError {
  constructor({
    cause,
    message,
    details,
  }: Pick<AppErrorProps, 'cause' | 'message' | 'details'>) {
    super({
      cause,
      details,
      message,
      name: 'ConflictError',
      statusCode: HttpStatus.CONFLICT,
    })
  }
}

export class InternalServerError extends AppError {
  constructor({ cause }: Pick<AppErrorProps, 'cause'>) {
    super({
      cause,
      message: 'An internal server error occurred.',
      name: 'InternalServerError',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    })
  }
}
