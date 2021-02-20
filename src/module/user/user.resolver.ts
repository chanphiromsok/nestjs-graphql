import { GQLAuthGuard } from './../auth/gql.guard';
import { ResponseMsg } from './dto/res-msg';
import { UserEntity } from './entities/user.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RESToken } from './dto/res-token.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => RESToken)
  userLogin(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.userLogin(createUserInput);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserEntity], { name: 'findAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: 'findOneUser' })
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => ResponseMsg, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => ResponseMsg, { name: 'deleteUser' })
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
