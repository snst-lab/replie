import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class IssueAvgAggregate {

    @Field(() => Float, {nullable:true})
    requestLimitLength?: number;
}
