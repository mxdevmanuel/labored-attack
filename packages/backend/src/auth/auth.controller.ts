import {
  Controller,
  Get,
  Request,
  Response,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { DisplayUser } from './auth.types';
import { UserPostDTO } from './auth.dto';
import { UsersService } from '@users/users.service';

// IUGH
import ms = require('ms');
import { cookieConstants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Req, @Response({ passthrough: true }) res: Res) {
    const data = await this.authService.login(req.user as DisplayUser);
    res.cookie(cookieConstants.name, data.access_token, {
      maxAge: ms('2m'),
      httpOnly: true,
      signed: true,
      // secure: true, // TODO: set environment conditional
    });
    return data;
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
