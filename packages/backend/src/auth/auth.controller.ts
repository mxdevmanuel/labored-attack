import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserPostDTO, UsernamePutDTO, PasswordPutDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { DisplayUser, ValidatedTokenUser } from './auth.types';
import { cookieConstants, jwtConstants } from './constants';
import {
  QueryFailedFilter,
  EntityNotFoundFilter,
} from '@database/database.filter';
import {
  Controller,
  Get,
  Request,
  Response,
  Post,
  Put,
  UseGuards,
  Body,
  UseFilters,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { Request as Req, Response as Res } from 'express';

// IUGH
import ms = require('ms');
import { WrongPasswordFilter } from './auth.filter';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @UseFilters(EntityNotFoundFilter)
  @Post('login')
  async login(@Request() req: Req, @Response({ passthrough: true }) res: Res) {
    const data = await this.authService.login(req.user as DisplayUser);
    res.cookie(cookieConstants.name, data.access_token, {
      maxAge: ms(jwtConstants.duration),
      httpOnly: true,
      signed: true,
      // secure: true, // TODO: set environment conditional
    });
    return data;
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Response({ passthrough: true }) res: Res) {
    res.clearCookie('auth');
    return '';
  }

  @Post('register')
  @UseFilters(QueryFailedFilter)
  async registeUser(@Body() { username, password }: UserPostDTO) {
    return this.usersService.create(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: Req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req: Req) {
    return this.usersService.findById((req.user as ValidatedTokenUser).userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/username')
  @UseFilters(QueryFailedFilter)
  async changeUserName(
    @Request() req: Req,
    @Body() { username: newUsername }: UsernamePutDTO,
  ) {
    return this.usersService.changeUsername(
      (req.user as ValidatedTokenUser)?.username,
      newUsername,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/password')
  @UseFilters(WrongPasswordFilter)
  async changePassword(
    @Request() req: Req,
    @Body() { oldPassword, password }: PasswordPutDTO,
  ) {
    const userId = (req.user as ValidatedTokenUser).userId;
    const { password: _password, ...user } =
      await this.usersService.changePassword(userId, oldPassword, password);
    return user;
  }
}
