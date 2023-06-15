import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UserCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    authType?: true;

    @Field(() => Boolean, {nullable:true})
    userName?: true;

    @Field(() => Boolean, {nullable:true})
    secret?: true;

    @Field(() => Boolean, {nullable:true})
    email?: true;

    @Field(() => Boolean, {nullable:true})
    tel?: true;

    @Field(() => Boolean, {nullable:true})
    avatar?: true;

    @Field(() => Boolean, {nullable:true})
    lastName?: true;

    @Field(() => Boolean, {nullable:true})
    firstName?: true;

    @Field(() => Boolean, {nullable:true})
    zip1?: true;

    @Field(() => Boolean, {nullable:true})
    zip2?: true;

    @Field(() => Boolean, {nullable:true})
    address1?: true;

    @Field(() => Boolean, {nullable:true})
    address2?: true;

    @Field(() => Boolean, {nullable:true})
    address3?: true;

    @Field(() => Boolean, {nullable:true})
    address4?: true;

    @Field(() => Boolean, {nullable:true})
    status?: true;

    @Field(() => Boolean, {nullable:true})
    licence?: true;

    @Field(() => Boolean, {nullable:true})
    meta?: true;

    @Field(() => Boolean, {nullable:true})
    lastLoginedAt?: true;

    @Field(() => Boolean, {nullable:true})
    createdAt?: true;

    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;

    @Field(() => Boolean, {nullable:true})
    deletedAt?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
