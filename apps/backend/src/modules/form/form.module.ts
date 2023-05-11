import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { UserModule } from '../user/user.module';
import { FormController } from './form.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
