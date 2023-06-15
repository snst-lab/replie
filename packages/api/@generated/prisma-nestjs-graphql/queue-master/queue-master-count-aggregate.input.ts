import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class QueueMasterCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    groupId?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @HideField()
    password?: true;

    @HideField()
    cookie?: true;

    @HideField()
    localStorage?: true;

    @Field(() => Boolean, {nullable:true})
    proxyUrl?: true;

    @Field(() => Boolean, {nullable:true})
    proxyUser?: true;

    @HideField()
    proxyPass?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
