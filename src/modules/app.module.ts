import { /*MiddlewareConsumer,*/ Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { OrmModule } from './orm/orm.module';
// import { FirebaseAuthMiddleware } from './middlewares/firebase-auth.middleware';
// import { TournamentModule } from './tournament/tournament.module';
// import { RiotModule } from './riot/riot.module';
import { HttpModule } from '@nestjs/axios';
import { RaceModule } from './race/race.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from 'src/mailer.config';
import { EmailService } from './mailer/services/email.service';
// import { MikroOrmMiddleware } from '@mikro-orm/nestjs';

@Module({
  imports: [
    OrmModule,
    // TournamentModule,
    RaceModule,
    UserModule,
    AuthModule,
    MailerModule.forRoot(mailerConfig),
    // RiotModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(FirebaseAuthMiddleware, MikroOrmMiddleware).forRoutes('*'); // Apply middleware to all routes
  // }
}
