import { Module } from '@nestjs/common';
import { StravaService } from './strava.service';
import { RequestModule } from 'src/modules/@shared/request/request.module';

@Module({
  imports: [RequestModule],
  providers: [StravaService],
  exports: [StravaService]
})
export class StravaModule { }
