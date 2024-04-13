import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {

	constructor(error: any, status?: HttpStatus, customMessage?: string) {
        const responseStatus = status || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        
        const responseMessage = {
            message: customMessage || error.message || 'An unexpected error occurred',
            error: error.name || 'Error',
            statusCode: responseStatus,
        };

        super(responseMessage, responseStatus);
    }
}
