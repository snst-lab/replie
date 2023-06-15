import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class QueueMasterCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    groupId!: number;

    @Field(() => Int, {nullable:false})
    email!: number;

    @HideField()
    password!: number;

    @HideField()
    cookie!: number;

    @HideField()
    localStorage!: number;

    @Field(() => Int, {nullable:false})
    proxyUrl!: number;

    @Field(() => Int, {nullable:false})
    proxyUser!: number;

    @HideField()
    proxyPass!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
