import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterWhereInput } from './queue-master-where.input';
import { Type } from 'class-transformer';
import { QueueMasterOrderByWithRelationInput } from './queue-master-order-by-with-relation.input';
import { QueueMasterWhereUniqueInput } from './queue-master-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QueueMasterCountAggregateInput } from './queue-master-count-aggregate.input';
import { QueueMasterAvgAggregateInput } from './queue-master-avg-aggregate.input';
import { QueueMasterSumAggregateInput } from './queue-master-sum-aggregate.input';
import { QueueMasterMinAggregateInput } from './queue-master-min-aggregate.input';
import { QueueMasterMaxAggregateInput } from './queue-master-max-aggregate.input';

@ArgsType()
export class QueueMasterAggregateArgs {

    @Field(() => QueueMasterWhereInput, {nullable:true})
    @Type(() => QueueMasterWhereInput)
    where?: QueueMasterWhereInput;

    @Field(() => [QueueMasterOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<QueueMasterOrderByWithRelationInput>;

    @Field(() => QueueMasterWhereUniqueInput, {nullable:true})
    cursor?: QueueMasterWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => QueueMasterCountAggregateInput, {nullable:true})
    _count?: QueueMasterCountAggregateInput;

    @Field(() => QueueMasterAvgAggregateInput, {nullable:true})
    _avg?: QueueMasterAvgAggregateInput;

    @Field(() => QueueMasterSumAggregateInput, {nullable:true})
    _sum?: QueueMasterSumAggregateInput;

    @Field(() => QueueMasterMinAggregateInput, {nullable:true})
    _min?: QueueMasterMinAggregateInput;

    @Field(() => QueueMasterMaxAggregateInput, {nullable:true})
    _max?: QueueMasterMaxAggregateInput;
}
