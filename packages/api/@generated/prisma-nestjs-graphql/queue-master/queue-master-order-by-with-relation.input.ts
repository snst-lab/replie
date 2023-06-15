import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';

@InputType()
export class QueueMasterOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @HideField()
    password?: keyof typeof SortOrder;

    @HideField()
    cookie?: keyof typeof SortOrder;

    @HideField()
    localStorage?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    proxyUrl?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    proxyUser?: keyof typeof SortOrder;

    @HideField()
    proxyPass?: keyof typeof SortOrder;
}
