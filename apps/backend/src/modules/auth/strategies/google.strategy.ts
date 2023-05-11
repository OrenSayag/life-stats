import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../mongoose-schemas/user.mongoose-schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }

  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userRepository: Model<User>,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_OAUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }
}
