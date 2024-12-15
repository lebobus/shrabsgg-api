import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

// NestJS interceptor that automatically transform class instances returned from the application's route handlers into plain JavaScript objects.
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data =>
        instanceToPlain(data, {
          enableCircularCheck: true,
        }),
      ),
    );
  }
}
