import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';

@Resolver('Supplier')
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation('createSupplier')
  create(@Args('createSupplierInput') createSupplierInput: CreateSupplierInput) {
    return this.supplierService.create(createSupplierInput);
  }

  @Query('supplier')
  findAll() {
    return this.supplierService.findAll();
  }

  @Query('supplier')
  findOne(@Args('id') id: number) {
    return this.supplierService.findOne(id);
  }

  @Mutation('updateSupplier')
  update(@Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput) {
    return this.supplierService.update(updateSupplierInput.id, updateSupplierInput);
  }

  @Mutation('removeSupplier')
  remove(@Args('id') id: number) {
    return this.supplierService.remove(id);
  }
}
