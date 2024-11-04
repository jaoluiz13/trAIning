import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingModule } from './modules/training/training.module';
import { StravaModule } from './modules/services/strava/strava.module';
import { TelegramModule } from './modules/services/telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './modules/authentication/authentication.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TrainingModule,
    StravaModule,
    TelegramModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
