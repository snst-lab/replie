import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterWhereInput } from './queue-master-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyQueueMasterArgs {

    @Field(() => QueueMasterWhereInput, {nullable:true})
    @Type(() => QueueMasterWhereInput)
    where?: QueueMasterWhereInput;
}
