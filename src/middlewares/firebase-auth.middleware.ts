// firebase-auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split('Bearer ')[1];

    try {
      if (!authToken) {
        throw new Error('Authorization token not found');
      }

      const decodedToken = await this.firebase.auth.verifyIdToken(authToken);
      req['user'] = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  }
}
