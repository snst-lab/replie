import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterWhereInput } from './queue-master-where.input';
import { Type } from 'class-transformer';
import { QueueMasterOrderByWithRelationInput } from './queue-master-order-by-with-relation.input';
import { QueueMasterWhereUniqueInput } from './queue-master-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QueueMasterScalarFieldEnum } from './queue-master-scalar-field.enum';

@ArgsType()
export class FindManyQueueMasterArgs {

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

    @Field(() => [QueueMasterScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof QueueMasterScalarFieldEnum>;
}
