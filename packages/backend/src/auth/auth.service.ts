import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DisplayUser } from './auth.types';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<DisplayUser> {
    const user = await this.usersService.findOne(username);
    const userExists = !_.isNil(user);
    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (userExists && passwordMatches) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: DisplayUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
