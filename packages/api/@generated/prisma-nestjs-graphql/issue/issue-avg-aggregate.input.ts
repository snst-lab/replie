import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IssueAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    requestLimitLength?: true;
}
