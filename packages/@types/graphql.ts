import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IssueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  personCharacter?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
  personRecentIntimacy?: InputMaybe<Scalars['String']>;
  personRecentStatus?: InputMaybe<Scalars['String']>;
  personRelationship?: InputMaybe<Scalars['String']>;
  requestDirection?: InputMaybe<Scalars['String']>;
  requestLimitLength?: InputMaybe<Scalars['Int']>;
  requestMessage?: InputMaybe<Scalars['String']>;
  result?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IssueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personCharacter?: InputMaybe<SortOrder>;
  personId?: InputMaybe<SortOrder>;
  personRecentIntimacy?: InputMaybe<SortOrder>;
  personRecentStatus?: InputMaybe<SortOrder>;
  personRelationship?: InputMaybe<SortOrder>;
  requestDirection?: InputMaybe<SortOrder>;
  requestLimitLength?: InputMaybe<SortOrder>;
  requestMessage?: InputMaybe<SortOrder>;
  result?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum IssueScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PersonCharacter = 'personCharacter',
  PersonId = 'personId',
  PersonRecentIntimacy = 'personRecentIntimacy',
  PersonRecentStatus = 'personRecentStatus',
  PersonRelationship = 'personRelationship',
  RequestDirection = 'requestDirection',
  RequestLimitLength = 'requestLimitLength',
  RequestMessage = 'requestMessage',
  Result = 'result',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type IssueWhereInput = {
  AND?: InputMaybe<Array<IssueWhereInput>>;
  NOT?: InputMaybe<Array<IssueWhereInput>>;
  OR?: InputMaybe<Array<IssueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  personCharacter?: InputMaybe<StringNullableFilter>;
  personId?: InputMaybe<StringFilter>;
  personRecentIntimacy?: InputMaybe<StringNullableFilter>;
  personRecentStatus?: InputMaybe<StringNullableFilter>;
  personRelationship?: InputMaybe<StringFilter>;
  requestDirection?: InputMaybe<StringNullableFilter>;
  requestLimitLength?: InputMaybe<IntNullableFilter>;
  requestMessage?: InputMaybe<StringFilter>;
  result?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type IssueWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** . */
  createIssue: Response;
  /** . */
  login: Response;
  /** . */
  readNotification: Response;
  /** . */
  upsertPerson: Response;
};


export type MutationCreateIssueArgs = {
  data: IssueCreateInput;
};


export type MutationLoginArgs = {
  authType: Scalars['String'];
  secret?: InputMaybe<Scalars['String']>;
  userName: Scalars['String'];
};


export type MutationReadNotificationArgs = {
  data: NotificationCreateInput;
};


export type MutationUpsertPersonArgs = {
  data: PersonCreateInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NotificationCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  linkTo?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  personId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  unread?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type NotificationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  linkTo?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  personId?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  unread?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum NotificationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  LinkTo = 'linkTo',
  Message = 'message',
  PersonId = 'personId',
  Title = 'title',
  Unread = 'unread',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  linkTo?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<StringNullableFilter>;
  personId?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  unread?: InputMaybe<BoolFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PersonCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  character?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  recentIntimacy?: InputMaybe<Scalars['String']>;
  recentStatus?: InputMaybe<Scalars['String']>;
  relationship?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type PersonOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrder>;
  character?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  recentIntimacy?: InputMaybe<SortOrder>;
  recentStatus?: InputMaybe<SortOrder>;
  relationship?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum PersonScalarFieldEnum {
  Avatar = 'avatar',
  Character = 'character',
  CreatedAt = 'createdAt',
  DeletedAt = 'deletedAt',
  Id = 'id',
  Name = 'name',
  RecentIntimacy = 'recentIntimacy',
  RecentStatus = 'recentStatus',
  Relationship = 'relationship',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type PersonWhereInput = {
  AND?: InputMaybe<Array<PersonWhereInput>>;
  NOT?: InputMaybe<Array<PersonWhereInput>>;
  OR?: InputMaybe<Array<PersonWhereInput>>;
  avatar?: InputMaybe<StringNullableFilter>;
  character?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  recentIntimacy?: InputMaybe<StringNullableFilter>;
  recentStatus?: InputMaybe<StringNullableFilter>;
  relationship?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type PersonWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** . */
  findIssue: Response;
  /** . */
  findManyIssue: Response;
  /** . */
  findManyNotification: Response;
  /** . */
  findManyPerson: Response;
  /** . */
  findPerson: Response;
};


export type QueryFindIssueArgs = {
  cursor?: InputMaybe<IssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<IssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IssueWhereInput>;
};


export type QueryFindManyIssueArgs = {
  cursor?: InputMaybe<IssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<IssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IssueWhereInput>;
};


export type QueryFindManyNotificationArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryFindPersonArgs = {
  cursor?: InputMaybe<PersonWhereUniqueInput>;
  distinct?: InputMaybe<Array<PersonScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PersonOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonWhereInput>;
};

export type Response = {
  __typename?: 'Response';
  jwt?: Maybe<Scalars['JSON']>;
  response?: Maybe<Scalars['JSON']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BoolFilter: BoolFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DateTimeFilter: DateTimeFilter;
  DateTimeNullableFilter: DateTimeNullableFilter;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntNullableFilter: IntNullableFilter;
  IssueCreateInput: IssueCreateInput;
  IssueOrderByWithRelationInput: IssueOrderByWithRelationInput;
  IssueScalarFieldEnum: IssueScalarFieldEnum;
  IssueWhereInput: IssueWhereInput;
  IssueWhereUniqueInput: IssueWhereUniqueInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  NotificationCreateInput: NotificationCreateInput;
  NotificationOrderByWithRelationInput: NotificationOrderByWithRelationInput;
  NotificationScalarFieldEnum: NotificationScalarFieldEnum;
  NotificationWhereInput: NotificationWhereInput;
  NotificationWhereUniqueInput: NotificationWhereUniqueInput;
  PersonCreateInput: PersonCreateInput;
  PersonOrderByWithRelationInput: PersonOrderByWithRelationInput;
  PersonScalarFieldEnum: PersonScalarFieldEnum;
  PersonWhereInput: PersonWhereInput;
  PersonWhereUniqueInput: PersonWhereUniqueInput;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BoolFilter: BoolFilter;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  DateTimeFilter: DateTimeFilter;
  DateTimeNullableFilter: DateTimeNullableFilter;
  Int: Scalars['Int'];
  IntNullableFilter: IntNullableFilter;
  IssueCreateInput: IssueCreateInput;
  IssueOrderByWithRelationInput: IssueOrderByWithRelationInput;
  IssueWhereInput: IssueWhereInput;
  IssueWhereUniqueInput: IssueWhereUniqueInput;
  JSON: Scalars['JSON'];
  Mutation: {};
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
  NestedDateTimeNullableFilter: NestedDateTimeNullableFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  NotificationCreateInput: NotificationCreateInput;
  NotificationOrderByWithRelationInput: NotificationOrderByWithRelationInput;
  NotificationWhereInput: NotificationWhereInput;
  NotificationWhereUniqueInput: NotificationWhereUniqueInput;
  PersonCreateInput: PersonCreateInput;
  PersonOrderByWithRelationInput: PersonOrderByWithRelationInput;
  PersonWhereInput: PersonWhereInput;
  PersonWhereUniqueInput: PersonWhereUniqueInput;
  Query: {};
  Response: Response;
  String: Scalars['String'];
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createIssue?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateIssueArgs, 'data'>>;
  login?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'authType' | 'userName'>>;
  readNotification?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationReadNotificationArgs, 'data'>>;
  upsertPerson?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertPersonArgs, 'data'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findIssue?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindIssueArgs>>;
  findManyIssue?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyIssueArgs>>;
  findManyNotification?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindManyNotificationArgs>>;
  findManyPerson?: Resolver<ResolversTypes['Response'], ParentType, ContextType>;
  findPerson?: Resolver<ResolversTypes['Response'], ParentType, ContextType, Partial<QueryFindPersonArgs>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  jwt?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
};

