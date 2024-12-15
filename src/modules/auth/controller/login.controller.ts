import { Body, Controller, Get, Post } from '@nestjs/common';
import { Result } from 'option-t/plain_result';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../usecases/login.usecase';
import { User } from 'src/modules/user/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { join } from 'path';
@Controller('/login')
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  async test() {
    const subject = 'Welcome!';
    const templatePath = join(
      __dirname,
      '../../../../src/templates/invite.ejs',
    );
    const htmlContent = await ejs.renderFile(templatePath);

    // Sending the email without a template
    return await this.mailerService.sendMail({
      to: 'robertgaina@outlook.fr',
      subject,
      html: htmlContent, // Template file in src/templates/welcome.hbs
    });
  }
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<Result<User, Error>> {
    return await this.loginUseCase.execute(loginDto);
  }
}
