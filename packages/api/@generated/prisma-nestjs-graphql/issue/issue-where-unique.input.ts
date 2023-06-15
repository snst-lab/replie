import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IssueWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;
}
