import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { HideField } from '@nestjs/graphql';
import { JsonFilter } from '../prisma/json-filter.input';

@InputType()
export class QueueMasterWhereInput {

    @Field(() => [QueueMasterWhereInput], {nullable:true})
    AND?: Array<QueueMasterWhereInput>;

    @Field(() => [QueueMasterWhereInput], {nullable:true})
    OR?: Array<QueueMasterWhereInput>;

    @Field(() => [QueueMasterWhereInput], {nullable:true})
    NOT?: Array<QueueMasterWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    groupId?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @HideField()
    password?: StringFilter;

    @HideField()
    cookie?: JsonFilter;

    @HideField()
    localStorage?: JsonFilter;

    @Field(() => StringFilter, {nullable:true})
    proxyUrl?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    proxyUser?: StringFilter;

    @HideField()
    proxyPass?: StringFilter;
}
