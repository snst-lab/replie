import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class IssueMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => String, {nullable:true})
    type?: string;

    @Field(() => String, {nullable:true})
    status?: string;

    @Field(() => String, {nullable:true})
    personId?: string;

    @Field(() => String, {nullable:true})
    personName?: string;

    @Field(() => String, {nullable:true})
    personAvatar?: string;

    @Field(() => String, {nullable:true})
    personRelationship?: string;

    @Field(() => String, {nullable:true})
    personCharacter?: string;

    @Field(() => String, {nullable:true})
    personRecentStatus?: string;

    @Field(() => String, {nullable:true})
    personRecentIntimacy?: string;

    @Field(() => String, {nullable:true})
    requestMessage?: string;

    @Field(() => String, {nullable:true})
    requestDirection?: string;

    @Field(() => Int, {nullable:true})
    requestLimitLength?: number;

    @Field(() => String, {nullable:true})
    result?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
