import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UtilitiesService],
  exports: [UtilitiesService],
})
export class UtilitiesModule {}
