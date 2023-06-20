import { z } from "zod";

class Schema {
  static id = z.string().uuid();

  static notification = z.object({
    id: Schema.id,
    createdAt: z.string().regex(/^\d{4}\/\d{2}\/\d{2}T\d{2}:\d{2}:\d{2}$/),
    unread: z.boolean(),
    title: z.string(),
    message: z.string(),
    personId: Schema.id.optional(),
    linkTo: z.string().optional(),
  });

  static person = z.object({
    id: Schema.id,
    name: z.string().max(50),
    relationship: z.string().max(50),
    avatar: z.string().optional(),
    character: z.string().max(50).optional(),
    recentStatus: z.string().max(50).optional(),
    recentIntimacy: z.string().max(50).optional(),
  });

  static request = z.object({
    type: z.enum(["reply", "other"]),
    message: z.string(),
    direction: z.string().max(50).optional(),
    limitLength: z.number().optional(),
  });

  static issue = z.object({
    id: Schema.id,
    type: z.enum(["reply", "other"]),
    status: z.enum(["pending", "done", "failed", "canceled", "deleted"]),
    personId: Schema.id,
    personName: z.string(),
    personAvatar: z.string().optional(),
    personRelationship: z.string(),
    personCharacter: z.string().optional(),
    personRecentStatus: z.string().optional(),
    personRecentIntimacy: z.string().optional(),
    requestMessage: z.string(),
    requestDirection: z.string().optional(),
    requestLimitLength: z.number().optional(),
    createdAt: z.string(),
    result: z.string(),
  });
}

export const dtoValidator = {
  id: Schema.id.parse,
  notification: Schema.notification.parse,
  person: Schema.person.parse,
  request: Schema.request.parse,
  issue: Schema.issue.parse,
};

declare global {
  export namespace Dto {
    type Id = z.infer<typeof Schema.id>;
    type Notification = z.infer<typeof Schema.notification>;
    type Person = z.infer<typeof Schema.person>;
    type Request = z.infer<typeof Schema.request>;
    type Issue = z.infer<typeof Schema.issue>;
  }
}
