import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false,defaultValue:''})
    id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    authType!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    userName!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    secret!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    email!: string | null;

    /**
     * IsNumberString()
     */
    @Field(() => String, {nullable:true,defaultValue:'',description:'IsNumberString()'})
    tel!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    avatar!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    lastName!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    firstName!: string | null;

    /**
     * IsNumberString()
     */
    @Field(() => String, {nullable:true,defaultValue:'',description:'IsNumberString()'})
    zip1!: string | null;

    /**
     * IsNumberString()
     */
    @Field(() => String, {nullable:true,defaultValue:'',description:'IsNumberString()'})
    zip2!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    address1!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    address2!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    address3!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    address4!: string | null;

    @Field(() => String, {nullable:false,defaultValue:'active'})
    status!: string;

    @Field(() => String, {nullable:false,defaultValue:'free'})
    licence!: string;

    @Field(() => GraphQLJSON, {nullable:false,defaultValue:'{}'})
    meta!: any;

    @Field(() => Date, {nullable:true})
    lastLoginedAt!: Date | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Date, {nullable:true})
    deletedAt!: Date | null;
}
