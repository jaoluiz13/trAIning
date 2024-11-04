import { Injectable } from '@nestjs/common';
import { StravaService } from '../services/strava/strava.service';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly stravaService: StravaService,
    private readonly trainingService: TrainingService
  ) { }
  async loginAndAnalysis(code: string) {
    let token = await this.stravaService.login(code);
    let trainingData = await this.stravaService.fetchTrainings(token);
    this.trainingService.analysisAI(trainingData);
    return 'Thank you in some moments you will receive your training analysis in the telegram chat.'
  }
}
