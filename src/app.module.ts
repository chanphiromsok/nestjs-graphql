import { SupplierModule } from './module/supplier/supplier.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { GrqhpqlModule } from './graphql/grqhpql.module';
import { TypeormModule } from './database/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['env/dev.env'] }),
    AuthModule,
    GrqhpqlModule,
    TypeormModule,
    UserModule,
    SupplierModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
