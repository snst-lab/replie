import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class IssueWhereInput {

    @Field(() => [IssueWhereInput], {nullable:true})
    AND?: Array<IssueWhereInput>;

    @Field(() => [IssueWhereInput], {nullable:true})
    OR?: Array<IssueWhereInput>;

    @Field(() => [IssueWhereInput], {nullable:true})
    NOT?: Array<IssueWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    type?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    status?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    personId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    personName?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    personAvatar?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    personRelationship?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    personCharacter?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    personRecentStatus?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    personRecentIntimacy?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    requestMessage?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    requestDirection?: StringNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    requestLimitLength?: IntNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    result?: StringNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
