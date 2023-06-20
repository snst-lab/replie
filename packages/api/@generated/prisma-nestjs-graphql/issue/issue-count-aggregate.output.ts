import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class IssueCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Int, {nullable:false})
    type!: number;

    @Field(() => Int, {nullable:false})
    status!: number;

    @Field(() => Int, {nullable:false})
    personId!: number;

    @Field(() => Int, {nullable:false})
    personName!: number;

    @Field(() => Int, {nullable:false})
    personAvatar!: number;

    @Field(() => Int, {nullable:false})
    personRelationship!: number;

    @Field(() => Int, {nullable:false})
    personCharacter!: number;

    @Field(() => Int, {nullable:false})
    personRecentStatus!: number;

    @Field(() => Int, {nullable:false})
    personRecentIntimacy!: number;

    @Field(() => Int, {nullable:false})
    requestMessage!: number;

    @Field(() => Int, {nullable:false})
    requestDirection!: number;

    @Field(() => Int, {nullable:false})
    requestLimitLength!: number;

    @Field(() => Int, {nullable:false})
    result!: number;

    @Field(() => Int, {nullable:false})
    createdAt!: number;

    @Field(() => Int, {nullable:false})
    updatedAt!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
