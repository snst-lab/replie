import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterUpdateInput } from './queue-master-update.input';
import { Type } from 'class-transformer';
import { QueueMasterWhereUniqueInput } from './queue-master-where-unique.input';

@ArgsType()
export class UpdateOneQueueMasterArgs {

    @Field(() => QueueMasterUpdateInput, {nullable:false})
    @Type(() => QueueMasterUpdateInput)
    data!: QueueMasterUpdateInput;

    @Field(() => QueueMasterWhereUniqueInput, {nullable:false})
    @Type(() => QueueMasterWhereUniqueInput)
    where!: QueueMasterWhereUniqueInput;
}
