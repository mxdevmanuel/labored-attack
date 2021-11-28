import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { DisplayUser } from './auth.types';
import { UserPostDTO } from './auth.dto';
import { UsersService } from '@users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user as DisplayUser);
  }

  @Post('register')
  async registeUser(@Body() { username, password }: UserPostDTO) {
    return this.usersService.create(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    return req.user;
  }
}
