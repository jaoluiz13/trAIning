import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { StravaModule } from '../services/strava/strava.module';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [StravaModule, TrainingModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
