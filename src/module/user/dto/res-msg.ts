import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseMsg {
  @Field()
  message: string;
  @Field()
  id: number;
}
