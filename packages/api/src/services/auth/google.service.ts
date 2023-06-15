import { Injectable } from '@nestjs/common';
import { Field, ObjectType, Args, ArgsType } from '@nestjs/graphql';
import axios from 'axios';
import { ErrorService } from '@/services';

@ObjectType()
export class Google {
  @Field(() => String, { nullable: false })
  access_token!: string;

  @Field(() => String, { nullable: false })
  expires_in!: string;

  @Field(() => String, { nullable: false })
  scope!: string;

  @Field(() => String, { nullable: false })
  token_type!: string;
}

@ArgsType()
export class GoogleAuthArgs {
  @Field(() => String, { nullable: false })
  accessToken!: string;
}

@Injectable()
export class GoogleService {
  constructor(private readonly error: ErrorService) {}

  async fetchUser(@Args() args: GoogleAuthArgs): Promise<Partial<Auth.User>> {
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;',
          },
          params: {
            access_token: args.accessToken,
          },
        },
      );
      return {
        authType: 'google',
        userName: data.email,
        email: data.email,
        avatar: data.picture,
        firstName: data.given_name,
        lastName: data.family_name,
      };
    } catch (error) {
      this.error.throw('authentication-failed');
      return {} as Auth.User;
    }
  }
}
