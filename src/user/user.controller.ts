import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { LoginDto, SignInDto } from 'src/models/app.model';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Put('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    return this.userService.singIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() logindto: LoginDto) {
    return this.userService.loginIn(logindto);
  }
}
