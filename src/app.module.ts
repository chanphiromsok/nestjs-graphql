import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { GrqhpqlModule } from './graphql/grqhpql.module';
import { TypeormModule } from './database/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    AuthModule,
    GrqhpqlModule,
    TypeormModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['env/dev.env'] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
