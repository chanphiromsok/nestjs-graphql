import { UserEntity } from './../../user/entities/user.entity';
import { ShareEntity } from './../../../common/share-entity/share-entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'supplier' })
export class SupplierEntity extends ShareEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  tel: string;

  @ManyToOne(() => UserEntity, (entity) => entity.supplier, { primary: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  @Column()
  user_id: number;
}
