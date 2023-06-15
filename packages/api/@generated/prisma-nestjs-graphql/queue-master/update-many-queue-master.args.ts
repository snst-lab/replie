import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterUpdateManyMutationInput } from './queue-master-update-many-mutation.input';
import { Type } from 'class-transformer';
import { QueueMasterWhereInput } from './queue-master-where.input';

@ArgsType()
export class UpdateManyQueueMasterArgs {

    @Field(() => QueueMasterUpdateManyMutationInput, {nullable:false})
    @Type(() => QueueMasterUpdateManyMutationInput)
    data!: QueueMasterUpdateManyMutationInput;

    @Field(() => QueueMasterWhereInput, {nullable:true})
    @Type(() => QueueMasterWhereInput)
    where?: QueueMasterWhereInput;
}
