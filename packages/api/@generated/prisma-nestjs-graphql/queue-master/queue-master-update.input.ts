import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { HideField } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class QueueMasterUpdateInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    groupId?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @HideField()
    password?: StringFieldUpdateOperationsInput;

    @HideField()
    cookie?: any;

    @HideField()
    localStorage?: any;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    proxyUrl?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    proxyUser?: StringFieldUpdateOperationsInput;

    @HideField()
    proxyPass?: StringFieldUpdateOperationsInput;
}
