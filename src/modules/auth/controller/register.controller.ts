import { Body, Controller, Post } from '@nestjs/common';
import { Result } from 'option-t/plain_result';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUseCase } from '../usecases/register.usecase';

@Controller('/register')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<Result<boolean, Error>> {
    return await this.registerUseCase.execute(registerDto);
  }
}
