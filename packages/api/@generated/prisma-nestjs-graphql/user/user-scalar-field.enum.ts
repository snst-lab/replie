import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    authType = "authType",
    userName = "userName",
    secret = "secret",
    email = "email",
    tel = "tel",
    avatar = "avatar",
    lastName = "lastName",
    firstName = "firstName",
    zip1 = "zip1",
    zip2 = "zip2",
    address1 = "address1",
    address2 = "address2",
    address3 = "address3",
    address4 = "address4",
    status = "status",
    licence = "licence",
    meta = "meta",
    lastLoginedAt = "lastLoginedAt",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    deletedAt = "deletedAt"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
