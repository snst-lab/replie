import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { QueueMasterCountAggregate } from './queue-master-count-aggregate.output';
import { QueueMasterAvgAggregate } from './queue-master-avg-aggregate.output';
import { QueueMasterSumAggregate } from './queue-master-sum-aggregate.output';
import { QueueMasterMinAggregate } from './queue-master-min-aggregate.output';
import { QueueMasterMaxAggregate } from './queue-master-max-aggregate.output';

@ObjectType()
export class QueueMasterGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    groupId!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @HideField()
    password!: string;

    @HideField()
    cookie!: any;

    @HideField()
    localStorage!: any;

    @Field(() => String, {nullable:false})
    proxyUrl!: string;

    @Field(() => String, {nullable:false})
    proxyUser!: string;

    @HideField()
    proxyPass!: string;

    @Field(() => QueueMasterCountAggregate, {nullable:true})
    _count?: QueueMasterCountAggregate;

    @Field(() => QueueMasterAvgAggregate, {nullable:true})
    _avg?: QueueMasterAvgAggregate;

    @Field(() => QueueMasterSumAggregate, {nullable:true})
    _sum?: QueueMasterSumAggregate;

    @Field(() => QueueMasterMinAggregate, {nullable:true})
    _min?: QueueMasterMinAggregate;

    @Field(() => QueueMasterMaxAggregate, {nullable:true})
    _max?: QueueMasterMaxAggregate;
}
