import { SupplierEntity } from './entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SupplierResolver, SupplierService],
})
export class SupplierModule {}
