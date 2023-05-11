import { forwardRef, Module } from '@nestjs/common';
import { GoogleStrategy } from '../auth/strategies/google.strategy';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../../mongoose-schemas/user.mongoose-schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, ConfigService, JwtService],
  exports: [AuthService, JwtService, ConfigService],
})
export class AuthModule {}
