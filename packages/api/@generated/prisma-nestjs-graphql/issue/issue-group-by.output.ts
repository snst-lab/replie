import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { IssueCountAggregate } from './issue-count-aggregate.output';
import { IssueAvgAggregate } from './issue-avg-aggregate.output';
import { IssueSumAggregate } from './issue-sum-aggregate.output';
import { IssueMinAggregate } from './issue-min-aggregate.output';
import { IssueMaxAggregate } from './issue-max-aggregate.output';

@ObjectType()
export class IssueGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    status!: string;

    @Field(() => String, {nullable:false})
    personId!: string;

    @Field(() => String, {nullable:false})
    personRelationship!: string;

    @Field(() => String, {nullable:true})
    personCharacter?: string;

    @Field(() => String, {nullable:true})
    personRecentStatus?: string;

    @Field(() => String, {nullable:true})
    personRecentIntimacy?: string;

    @Field(() => String, {nullable:false})
    requestMessage!: string;

    @Field(() => String, {nullable:true})
    requestDirection?: string;

    @Field(() => Int, {nullable:true})
    requestLimitLength?: number;

    @Field(() => String, {nullable:true})
    result?: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => IssueCountAggregate, {nullable:true})
    _count?: IssueCountAggregate;

    @Field(() => IssueAvgAggregate, {nullable:true})
    _avg?: IssueAvgAggregate;

    @Field(() => IssueSumAggregate, {nullable:true})
    _sum?: IssueSumAggregate;

    @Field(() => IssueMinAggregate, {nullable:true})
    _min?: IssueMinAggregate;

    @Field(() => IssueMaxAggregate, {nullable:true})
    _max?: IssueMaxAggregate;
}
