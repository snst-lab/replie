import { registerEnumType } from '@nestjs/graphql';

export enum NotificationScalarFieldEnum {
    id = "id",
    userId = "userId",
    personId = "personId",
    unread = "unread",
    title = "title",
    message = "message",
    linkTo = "linkTo",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(NotificationScalarFieldEnum, { name: 'NotificationScalarFieldEnum', description: undefined })
