import { SupplierEntity } from './../../supplier/entities/supplier.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
@Unique('userEntity', ['username'])
@ObjectType()
export class UserEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => SupplierEntity, (entity) => entity.user)
  @Field(() => [SupplierEntity])
  supplier: Promise<SupplierEntity>;
}
