import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PersonCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Int, {nullable:false})
    name!: number;

    @Field(() => Int, {nullable:false})
    avatar!: number;

    @Field(() => Int, {nullable:false})
    relationship!: number;

    @Field(() => Int, {nullable:false})
    character!: number;

    @Field(() => Int, {nullable:false})
    recentStatus!: number;

    @Field(() => Int, {nullable:false})
    recentIntimacy!: number;

    @Field(() => Int, {nullable:false})
    createdAt!: number;

    @Field(() => Int, {nullable:false})
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
