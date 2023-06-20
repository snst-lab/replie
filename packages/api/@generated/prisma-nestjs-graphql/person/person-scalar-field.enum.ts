import { registerEnumType } from '@nestjs/graphql';

export enum PersonScalarFieldEnum {
    id = "id",
    userId = "userId",
    name = "name",
    avatar = "avatar",
    relationship = "relationship",
    character = "character",
    recentStatus = "recentStatus",
    recentIntimacy = "recentIntimacy",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PersonScalarFieldEnum, { name: 'PersonScalarFieldEnum', description: undefined })
