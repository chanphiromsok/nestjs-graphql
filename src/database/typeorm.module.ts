import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'db_clothe',
      username: 'postgres',
      password: '2109',
      host: 'localhost',
      port: 5432,
      autoLoadEntities: true,
      type: 'postgres',
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormModule {}
