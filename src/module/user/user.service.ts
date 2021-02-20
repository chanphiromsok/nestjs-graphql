import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity, ResponseMsg } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  create(createUserInput: CreateUserInput): Observable<UserEntity> {
    return from(this.userRepo.save(createUserInput)).pipe(
      map((user) => {
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
