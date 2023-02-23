import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, _info) {
    if (err || !user) {
      throw (
        err || new UnauthorizedException({ error: 'User token is invalid' })
      );
    }
    return user;
  }

  handleError(_err, _info) {
    throw new UnauthorizedException({ error: 'User token is invalid' });
  }
}
