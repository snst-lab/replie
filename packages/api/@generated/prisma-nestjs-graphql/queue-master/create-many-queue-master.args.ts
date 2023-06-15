import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QueueMasterCreateManyInput } from './queue-master-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyQueueMasterArgs {

    @Field(() => [QueueMasterCreateManyInput], {nullable:false})
    @Type(() => QueueMasterCreateManyInput)
    data!: Array<QueueMasterCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
