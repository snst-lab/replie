import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { HideField } from '@nestjs/graphql';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';

@InputType()
export class QueueMasterScalarWhereWithAggregatesInput {

    @Field(() => [QueueMasterScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<QueueMasterScalarWhereWithAggregatesInput>;

    @Field(() => [QueueMasterScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<QueueMasterScalarWhereWithAggregatesInput>;

    @Field(() => [QueueMasterScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<QueueMasterScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    groupId?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    email?: StringWithAggregatesFilter;

    @HideField()
    password?: StringWithAggregatesFilter;

    @HideField()
    cookie?: JsonWithAggregatesFilter;

    @HideField()
    localStorage?: JsonWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    proxyUrl?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    proxyUser?: StringWithAggregatesFilter;

    @HideField()
    proxyPass?: StringWithAggregatesFilter;
}
