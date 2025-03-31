
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../interfaces/access-token.payload';


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token-strategy') {
  constructor(
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_TOKEN_SECRET')
    });
  }

  async validate(payload: AccessTokenPayload) {
    /// get user information
    return {
        ...payload
    };
  }
}
