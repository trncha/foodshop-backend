import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map(data => {
                return {
                    statusCode: response.statusCode,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    method: request.method,
					success: true,
                    ...data,
                };
            }),
        );
    }
}

