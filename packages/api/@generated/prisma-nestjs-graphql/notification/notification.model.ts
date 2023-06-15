import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class Notification {

    @Field(() => ID, {nullable:false,defaultValue:''})
    id!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    userId!: string;

    @Field(() => String, {nullable:false,defaultValue:''})
    personId!: string;

    @Field(() => Boolean, {nullable:false,defaultValue:true})
    unread!: boolean;

    @Field(() => String, {nullable:false,defaultValue:''})
    title!: string;

    @Field(() => String, {nullable:true,defaultValue:''})
    message!: string | null;

    @Field(() => String, {nullable:true,defaultValue:''})
    linkTo!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
}
