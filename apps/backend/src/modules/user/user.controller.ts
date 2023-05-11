import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UpdateUserSettingsRequestBody } from '../../types/user.type';
import { UsersService } from './users.service';
import { AppAPIResponseBodyBase } from '../../types/app.type';
import apiReturnStrings from '../../assets/strings/api-return.strings';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUserDataResponseBody } from 'shared-types/shared.type';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get('data')
  async getUserData(): Promise<GetUserDataResponseBody> {
    return {
      ...new AppAPIResponseBodyBase(
        true,
        apiReturnStrings.user.SUCCESSFULLY_GOT_USER_DATA,
        200,
      ),
      data: await this.userService.getUserData(),
    };
  }
  @Patch('settings')
  async updateUserSettings(
    @Body() body: UpdateUserSettingsRequestBody,
  ): Promise<AppAPIResponseBodyBase> {
    await this.userService.updateUserSettings(body);
    return new AppAPIResponseBodyBase(
      true,
      apiReturnStrings.user.SUCCESSFULLY_UPDATED_USER_SETTINGS,
    );
  }
}
