import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterWhereUniqueInput } from './queue-master-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueQueueMasterOrThrowArgs {

    @Field(() => QueueMasterWhereUniqueInput, {nullable:false})
    @Type(() => QueueMasterWhereUniqueInput)
    where!: QueueMasterWhereUniqueInput;
}
