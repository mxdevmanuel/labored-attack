import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { cookieConstants, jwtConstants } from './constants';
import { ValidatedTokenUser } from './auth.types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract token from signed, httpOnly cookie
        function (req: Request): string {
          let token = null;
          if (req && req.signedCookies) {
            token = req.signedCookies[cookieConstants.name];
          }
          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<ValidatedTokenUser> {
    return { userId: payload.sub, username: payload.username };
  }
}
