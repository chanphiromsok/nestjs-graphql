import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSupplierInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  tel: string;

  @Field({ nullable: true })
  user_id: number;
}
