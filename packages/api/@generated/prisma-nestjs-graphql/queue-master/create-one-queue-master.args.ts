import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterCreateInput } from './queue-master-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneQueueMasterArgs {

    @Field(() => QueueMasterCreateInput, {nullable:false})
    @Type(() => QueueMasterCreateInput)
    data!: QueueMasterCreateInput;
}
