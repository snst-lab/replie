import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { IssueCountAggregate } from './issue-count-aggregate.output';
import { IssueAvgAggregate } from './issue-avg-aggregate.output';
import { IssueSumAggregate } from './issue-sum-aggregate.output';
import { IssueMinAggregate } from './issue-min-aggregate.output';
import { IssueMaxAggregate } from './issue-max-aggregate.output';

@ObjectType()
export class AggregateIssue {

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
