import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TelegramService } from '../services/telegram/telegram.service';
import OpenAI from "openai";

@Injectable()
export class TrainingService {
  constructor(
    private readonly telegramService: TelegramService
  ) { }

  async analysisAI(trainingData) {
    try {

      if (trainingData.length == 0) {
        await this.telegramService.sendMessage('Failed to get training data');
      }

      const openai = new OpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Please analyze the training data from Strava and provide me with key insights, 
            including a detailed analysis of important performance metrics such as heart rate, pace, distance, and elevation gain. 
            Highlight any trends or patterns in my training sessions, and compare them to previous workouts. 
            Additionally, include specific recommendations and strategies that can help me improve my performance based on this data, 
            presented in a summarized format: ${JSON.stringify(trainingData)}`,
          },
        ],
      });

      await this.telegramService.sendMessage(completion.choices[0].message.content);

    } catch (err) {
      throw new HttpException({ err, message: 'error' }, HttpStatus.BAD_REQUEST);
    }
  }
}
