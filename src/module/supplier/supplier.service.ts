import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { SupplierEntity } from './entities/supplier.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepo: Repository<SupplierEntity>,
  ) {}
  create(createSupplierInput: CreateSupplierInput): Observable<SupplierEntity> {
    return from(this.supplierRepo.save(createSupplierInput));
  }

  findAll(): Observable<SupplierEntity[]> {
    return from(this.supplierRepo.find({ relations: ['user'] }));
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierInput: UpdateSupplierInput) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
