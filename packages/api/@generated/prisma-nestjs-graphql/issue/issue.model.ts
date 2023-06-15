import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Issue {

    @Field(() => ID, {nullable:false,defaultValue:''})
    id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    userId!: string;

    @Field(() => String, {nullable:false,defaultValue:'pending'})
    status!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    personId!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    personRelationship!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    personCharacter!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    personRecentStatus!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    personRecentIntimacy!: string | null;

    @Field(() => String, {nullable:false,defaultValue:''})
    requestMessage!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    requestDirection!: string | null;

    @Field(() => Int, {nullable:true,defaultValue:0})
    requestLimitLength!: number | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    result!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
}
