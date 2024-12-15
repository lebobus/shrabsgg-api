import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to, // Recipient email
        subject: 'Welcome to our platform!', // Subject line
        template: './welcome', // Template file name
        context: { name }, // Data to bind in template
      });
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}
