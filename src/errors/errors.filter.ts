import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import {
  AppError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from '.'

function formatResponseBody<T>(exception: T) {
  if (exception instanceof AppError) {
    return exception.toResponse()
  }

  if (exception instanceof NotFoundException) {
    const error = new NotFoundError({
      cause: exception,
      message: exception.message,
    })

    return error.toResponse()
  }

  if (exception instanceof BadRequestException) {
    const response = exception.getResponse() as string | Record<string, unknown>
    const details = typeof response === 'object' ? response.message : response

    const error = new ValidationError({
      cause: exception,
      details,
    })

    return error.toResponse()
  }

  const internalServerError = new InternalServerError({ cause: exception })

  return internalServerError.toResponse()
}

@Catch()
export class ErrorsFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const responseBody = formatResponseBody(exception)

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.status_code)
  }
}
