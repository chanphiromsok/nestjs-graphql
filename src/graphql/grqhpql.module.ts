import { ComplexityPlugin } from './../common/gql-complexity/gql.plugin';
import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      fieldResolverEnhancers: ['interceptors'],
      context: ({ req }) => ({ req }),
    }),
    GraphQLSchemaHost,
  ],
  providers: [ComplexityPlugin],
})
export class GrqhpqlModule {}
