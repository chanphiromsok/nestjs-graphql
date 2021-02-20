import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';

@Module({
  providers: [SupplierResolver, SupplierService]
})
export class SupplierModule {}
