import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'mcgtagroupe@gmail.com', // Your email
      pass: 'xfzt weoz gspr fhgj', // App-specific password
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>', // Default sender info
  },
  template: {
    dir: join(__dirname, '../src/templates'), // Directory for email templates
    adapter: new HandlebarsAdapter(), // Using Handlebars for templates
    options: {
      strict: true,
    },
  },
};
