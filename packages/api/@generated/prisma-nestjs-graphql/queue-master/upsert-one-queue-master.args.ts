import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterWhereUniqueInput } from './queue-master-where-unique.input';
import { Type } from 'class-transformer';
import { QueueMasterCreateInput } from './queue-master-create.input';
import { QueueMasterUpdateInput } from './queue-master-update.input';

@ArgsType()
export class UpsertOneQueueMasterArgs {

    @Field(() => QueueMasterWhereUniqueInput, {nullable:false})
    @Type(() => QueueMasterWhereUniqueInput)
    where!: QueueMasterWhereUniqueInput;

    @Field(() => QueueMasterCreateInput, {nullable:false})
    @Type(() => QueueMasterCreateInput)
    create!: QueueMasterCreateInput;

    @Field(() => QueueMasterUpdateInput, {nullable:false})
    @Type(() => QueueMasterUpdateInput)
    update!: QueueMasterUpdateInput;
}
