import { Injectable } from '@nestjs/common';
import { ErrorService } from '@/services';
import { GoogleService } from '@/services/auth/google.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly error: ErrorService,
    private readonly googleService: GoogleService,
  ) {}

  async fetchUser(
    authType: string,
    userName: string,
    secret: string, // password or socialAccessToken
  ): Promise<Partial<Auth.User>> {
    try {
      switch (authType) {
        case 'google':
          return await this.googleService.fetchUser({
            accessToken: secret,
          });
        default:
          this.error.throw('bad-request');
      }
    } catch (error) {
      this.error.catch(error);
    }
  }
}
