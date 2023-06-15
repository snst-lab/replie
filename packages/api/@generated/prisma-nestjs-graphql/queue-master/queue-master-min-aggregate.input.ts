import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@InputType()
export class QueueMasterMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    groupId?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @HideField()
    password?: true;

    @Field(() => Boolean, {nullable:true})
    proxyUrl?: true;

    @Field(() => Boolean, {nullable:true})
    proxyUser?: true;

    @HideField()
    proxyPass?: true;
}
