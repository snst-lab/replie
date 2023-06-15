import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Response {
  @Field(() => GraphQLJSON, { nullable: true })
  response!: string | number | boolean | Json;

  @Field(() => GraphQLJSON, { nullable: true })
  jwt?: {
    update: boolean;
    accessToken: string | null;
  };
}
