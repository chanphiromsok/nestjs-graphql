import { UserEntity } from './../user/entities/user.entity';
import { GQLAuthGuard } from './../auth/gql.guard';
import { SupplierEntity } from './entities/supplier.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';

@Resolver(() => SupplierEntity)
@UseGuards(GQLAuthGuard)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => SupplierEntity, { name: 'createSupplier' })
  create(
    @User() { id }: UserEntity,
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    return this.supplierService.create({ ...createSupplierInput, user_id: id });
  }

  @Query(() => [SupplierEntity], { name: 'findAllSupplier' })
  findAll() {
    return this.supplierService.findAll();
  }

  // @Query('supplier')
  // findOne(@Args('id') id: number) {
  //   return this.supplierService.findOne(id);
  // }

  // @Mutation('updateSupplier')
  // update(@Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput) {
  //   return this.supplierService.update(updateSupplierInput.id, updateSupplierInput);
  // }

  // @Mutation('removeSupplier')
  // remove(@Args('id') id: number) {
  //   return this.supplierService.remove(id);
  // }
}
