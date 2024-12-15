import { Module } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
