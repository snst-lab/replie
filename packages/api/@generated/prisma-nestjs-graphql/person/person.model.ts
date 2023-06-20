import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class Person {

    @Field(() => ID, {nullable:false,defaultValue:''})
    id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    userId!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    name!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    avatar!: string | null;

    @Field(() => String, {nullable:false,defaultValue:''})
    relationship!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    character!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    recentStatus!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    recentIntimacy!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
}
