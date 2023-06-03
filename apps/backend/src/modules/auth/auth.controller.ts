import {
  Controller,
  Get,
  NotImplementedException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from '@nestjs/config';

const LOGIN_MAX_AGE = 60000 * 60 * 24; // 24h

@Controller('auth')
export class AuthController {
  private readonly pwaUrl: string;
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    this.pwaUrl = configService.getOrThrow('PWA_URL');
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.authService.signIn(req);
    res.cookie('access_token', token, {
      maxAge: LOGIN_MAX_AGE,
      sameSite: false,
      secure: false,
      httpOnly: true,
    });
    res.redirect(this.pwaUrl);
  }

  // TODO remove this test endpoint
  @Get('test-jwt')
  @UseGuards(AuthGuard)
  async testJwt() {
    return 'Success?';
  }
}
