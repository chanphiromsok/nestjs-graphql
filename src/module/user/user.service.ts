import { ResponseMsg } from './dto/res-msg';
import { RESToken } from './dto/res-token.dto';
import { AuthService } from './../auth/auth.service';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private authService: AuthService,
  ) {}
  create(createUserInput: CreateUserInput): Observable<UserEntity> {
    return this.authService.hashPassword(createUserInput.password).pipe(
      switchMap((hash) => {
        return from(
          this.userRepo.save({ ...createUserInput, password: hash }),
        ).pipe(
          map((user) => {
            return user;
          }),
          catchError((err) => throwError(new BadRequestException(err))),
        );
      }),
    );
  }

  userLogin({ username, password }: CreateUserInput): Observable<RESToken> {
    return this.findUsername(username).pipe(
      switchMap((user) => {
        return from(
          this.authService.comparePassword(password, user.password),
        ).pipe(
          switchMap(() => {
            delete user.password;
            return this.authService
              .generateJWT({ ...user })
              .pipe(map((token) => ({ token })));
          }),
        );
      }),
    );
  }

  findUsername(username: string): Observable<UserEntity> {
    return from(this.userRepo.findOne({ where: { username } })).pipe(
      map((user) => {
        if (!user) {
          throw new BadRequestException('Username is incorrect');
        }
        return user;
      }),
      catchError((err) => throwError(new BadRequestException(err))),
    );
  }

  findAll(): Observable<UserEntity[]> {
    return from(this.userRepo.find());
  }

  findOne(id: number): Observable<UserEntity> {
    return from(this.userRepo.findOne(id)).pipe(
      map((user) => {
        if (!user) {
          throw new BadRequestException('User is not found');
        }
        return user;
      }),
      catchError((err) => throwError(new BadRequestException(err))),
    );
  }

  // DO NOT INSERT ID(PRIMARY KEY) INTO FIELD UPDATE {username,password} UpdateUserInput
  update(
    id: number,
    { username, password }: UpdateUserInput,
  ): Observable<ResponseMsg> {
    return from(this.userRepo.update(id, { username, password })).pipe(
      map(({ affected }) => {
        if (affected !== 1) {
          throw new BadRequestException('Cannot Update');
        }
        return { message: `Update username '${username}' Successfully`, id };
      }),
    );
  }

  remove(id: number): Observable<ResponseMsg> {
    return from(this.userRepo.delete(id)).pipe(
      map(({ affected }) => {
        if (affected !== 1) {
          throw new BadRequestException('Cannot Delete');
        }
        return { message: `Delete Successfully`, id };
      }),
    );
  }
}
