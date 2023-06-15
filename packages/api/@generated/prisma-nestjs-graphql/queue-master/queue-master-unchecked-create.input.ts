import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class QueueMasterUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    groupId?: number;

    @Field(() => String, {nullable:true})
    email?: string;

    @HideField()
    password?: string;

    @HideField()
    cookie?: any;

    @HideField()
    localStorage?: any;

    @Field(() => String, {nullable:true})
    proxyUrl?: string;

    @Field(() => String, {nullable:true})
    proxyUser?: string;

    @HideField()
    proxyPass?: string;
}
