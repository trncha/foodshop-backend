
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (request.file) {
			const { path } = request.file;
			fs.unlink(path, (err) => {
				if (err) {
					console.error('Error removing file:', err);
				}
			});
		}

		const status = exception instanceof HttpException
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;

		const errorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			success: false,
			message: "Error Call Service",
			errorInfo: exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error',
		};

		response.status(status).json(errorResponse);
	}
}
