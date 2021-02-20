import { CreateSupplierInput } from './create-supplier.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  id: number;
}
