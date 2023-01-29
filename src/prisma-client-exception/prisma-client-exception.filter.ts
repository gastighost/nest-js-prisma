import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': {
          const status = HttpStatus.CONFLICT;
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          break;
        }
        case 'P2025': {
          const status = HttpStatus.NOT_FOUND;
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          break;
        }
        default:
          // default 500 error code
          super.catch(exception, host);
          break;
      }
    }

    if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
