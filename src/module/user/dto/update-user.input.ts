import { Int } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
