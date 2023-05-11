import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { DayModule } from '../day/day.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    UtilitiesModule,
    DayModule,
    AnalyticsModule,
    CalendarModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
