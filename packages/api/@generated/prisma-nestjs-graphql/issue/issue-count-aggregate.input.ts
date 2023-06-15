import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IssueCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    personId?: true;

    @Field(() => Boolean, {nullable:true})
    personRelationship?: true;

    @Field(() => Boolean, {nullable:true})
    personCharacter?: true;

    @Field(() => Boolean, {nullable:true})
    personRecentStatus?: true;

    @Field(() => Boolean, {nullable:true})
    personRecentIntimacy?: true;

    @Field(() => Boolean, {nullable:true})
    requestMessage?: true;

    @Field(() => Boolean, {nullable:true})
    requestDirection?: true;

    @Field(() => Boolean, {nullable:true})
    requestLimitLength?: true;

    @Field(() => Boolean, {nullable:true})
    result?: true;

    @Field(() => Boolean, {nullable:true})
    createdAt?: true;

    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
