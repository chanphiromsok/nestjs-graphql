import { GrqhpqlModule } from './graphql/grqhpql.module';
import { TypeormModule } from './database/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [GrqhpqlModule, TypeormModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
