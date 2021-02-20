import { CreateUserInput } from './../user/dto/create-user.input';
import { map, catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  generateJWT(data: CreateUserInput): Observable<string> {
    return from(this.jwtService.signAsync(data)).pipe(map((token) => token));
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }

  comparePassword(
    newPassword: string,
    hasPassword: string,
  ): Observable<boolean> {
    return from(bcrypt.compare(newPassword, hasPassword)).pipe(
      map((match) => {
        if (!match) throw new UnauthorizedException('Incorrect password');
        return match;
      }),
      catchError((err) => throwError(new BadRequestException(err))),
    );
  }

  verifyJWT(data: string): Observable<any> {
    return from(this.jwtService.verifyAsync(data)).pipe(map((x) => x));
  }
}
