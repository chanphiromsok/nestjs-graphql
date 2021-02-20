import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

export class ShareEntity extends BaseEntity {
  @Field({ nullable: true })
  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
