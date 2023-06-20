import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IssueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  personAvatar?: InputMaybe<Scalars['String']['input']>;
  personCharacter?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['String']['input']>;
  personName?: InputMaybe<Scalars['String']['input']>;
  personRecentIntimacy?: InputMaybe<Scalars['String']['input']>;
  personRecentStatus?: InputMaybe<Scalars['String']['input']>;
  personRelationship?: InputMaybe<Scalars['String']['input']>;
  requestDirection?: InputMaybe<Scalars['String']['input']>;
  requestLimitLength?: InputMaybe<Scalars['Int']['input']>;
  requestMessage?: InputMaybe<Scalars['String']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type IssueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  personAvatar?: InputMaybe<SortOrder>;
  personCharacter?: InputMaybe<SortOrder>;
  personId?: InputMaybe<SortOrder>;
  personName?: InputMaybe<SortOrder>;
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
  PersonAvatar = 'personAvatar',
  PersonCharacter = 'personCharacter',
  PersonId = 'personId',
  PersonName = 'personName',
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
  personAvatar?: InputMaybe<StringNullableFilter>;
  personCharacter?: InputMaybe<StringNullableFilter>;
  personId?: InputMaybe<StringFilter>;
  personName?: InputMaybe<StringFilter>;
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
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** . */
  deleteIssue: Response;
  /** . */
  login: Response;
  /** . */
  readNotification: Response;
  /** . */
  upsertIssue: Response;
  /** . */
  upsertPerson: Response;
};


export type MutationDeleteIssueArgs = {
  where: IssueWhereUniqueInput;
};


export type MutationLoginArgs = {
  authType: Scalars['String']['input'];
  secret?: InputMaybe<Scalars['String']['input']>;
  userName: Scalars['String']['input'];
};


export type MutationReadNotificationArgs = {
  data: NotificationCreateInput;
};


export type MutationUpsertIssueArgs = {
  data: IssueCreateInput;
};


export type MutationUpsertPersonArgs = {
  data: PersonCreateInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkTo?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  unread?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<Scalars['String']['input']>;
};

export type PersonCreateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  character?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recentIntimacy?: InputMaybe<Scalars['String']['input']>;
  recentStatus?: InputMaybe<Scalars['String']['input']>;
  relationship?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PersonOrderByWithRelationInput = {
  avatar?: InputMaybe<SortOrder>;
  character?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
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
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  recentIntimacy?: InputMaybe<StringNullableFilter>;
  recentStatus?: InputMaybe<StringNullableFilter>;
  relationship?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type PersonWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
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
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IssueWhereInput>;
};


export type QueryFindManyIssueArgs = {
  cursor?: InputMaybe<IssueWhereUniqueInput>;
  distinct?: InputMaybe<Array<IssueScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IssueOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IssueWhereInput>;
};


export type QueryFindManyNotificationArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryFindPersonArgs = {
  cursor?: InputMaybe<PersonWhereUniqueInput>;
  distinct?: InputMaybe<Array<PersonScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PersonOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonWhereInput>;
};

export type Response = {
  __typename?: 'Response';
  jwt?: Maybe<Scalars['JSON']['output']>;
  response?: Maybe<Scalars['JSON']['output']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeFilter: DateTimeFilter;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntNullableFilter: IntNullableFilter;
  IssueCreateInput: IssueCreateInput;
  IssueOrderByWithRelationInput: IssueOrderByWithRelationInput;
  IssueScalarFieldEnum: IssueScalarFieldEnum;
  IssueWhereInput: IssueWhereInput;
  IssueWhereUniqueInput: IssueWhereUniqueInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
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
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BoolFilter: BoolFilter;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeFilter: DateTimeFilter;
  Int: Scalars['Int']['output'];
  IntNullableFilter: IntNullableFilter;
  IssueCreateInput: IssueCreateInput;
  IssueOrderByWithRelationInput: IssueOrderByWithRelationInput;
  IssueWhereInput: IssueWhereInput;
  IssueWhereUniqueInput: IssueWhereUniqueInput;
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
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
  String: Scalars['String']['output'];
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
  deleteIssue?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationDeleteIssueArgs, 'where'>>;
  login?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'authType' | 'userName'>>;
  readNotification?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationReadNotificationArgs, 'data'>>;
  upsertIssue?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationUpsertIssueArgs, 'data'>>;
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

