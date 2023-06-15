import { registerEnumType } from '@nestjs/graphql';

export enum QueueMasterScalarFieldEnum {
    id = "id",
    groupId = "groupId",
    email = "email",
    password = "password",
    cookie = "cookie",
    localStorage = "localStorage",
    proxyUrl = "proxyUrl",
    proxyUser = "proxyUser",
    proxyPass = "proxyPass"
}


registerEnumType(QueueMasterScalarFieldEnum, { name: 'QueueMasterScalarFieldEnum', description: undefined })
