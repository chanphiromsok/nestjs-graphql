import { UserEntity, ResponseMsg } from './entities/user.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log(createUserInput);
    return this.userService.create(createUserInput);
  }

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
