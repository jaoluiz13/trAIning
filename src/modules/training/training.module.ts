import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TelegramModule } from '../services/telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [TrainingController],
  providers: [TrainingService],
  exports: [TrainingService]
})
export class TrainingModule { }
