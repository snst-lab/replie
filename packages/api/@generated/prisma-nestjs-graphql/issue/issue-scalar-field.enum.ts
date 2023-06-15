import { registerEnumType } from '@nestjs/graphql';

export enum IssueScalarFieldEnum {
    id = "id",
    userId = "userId",
    status = "status",
    personId = "personId",
    personRelationship = "personRelationship",
    personCharacter = "personCharacter",
    personRecentStatus = "personRecentStatus",
    personRecentIntimacy = "personRecentIntimacy",
    requestMessage = "requestMessage",
    requestDirection = "requestDirection",
    requestLimitLength = "requestLimitLength",
    result = "result",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(IssueScalarFieldEnum, { name: 'IssueScalarFieldEnum', description: undefined })
