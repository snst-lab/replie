import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class QueueMaster {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false,defaultValue:1})
    groupId!: number;

    @Field(() => String, {nullable:false,defaultValue:''})
    email!: string;

    @HideField()
    password!: string;

    @HideField()
    cookie!: any;

    @HideField()
    localStorage!: any;

    @Field(() => String, {nullable:false,defaultValue:''})
    proxyUrl!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    proxyUser!: string;

    @HideField()
    proxyPass!: string;
}
