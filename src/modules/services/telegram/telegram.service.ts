import { Injectable } from '@nestjs/common';
const { Telegraf } = require('telegraf')

@Injectable()
export class TelegramService {
    private bot;

    private chatId: string;
    constructor() {

        const messageWelcomeAnalysis = `Hey! Welcome to trAIning Coaching 🏃‍♂️💨
I’m here to help you analyze and improve your training using your Strava data. To get started, I’ll need your authorization to access your Strava information. You can do this by clicking here.
Let's get training smarter! 💪🚴‍♀️`;

        this.bot = new Telegraf(process.env.BOT_TOKEN);
        this.bot.hears('analysis', (ctx) => {
            ctx.reply(messageWelcomeAnalysis, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Authorize", url: process.env.STRAVA_API_URL }],
                    ]
                }
            })

            this.chatId = ctx.update.message.chat.id;
        }
        )
        this.bot.launch();
        console.log('bot is running!');
    }

    async sendMessage(message: string) {
        this.bot.telegram.sendMessage(this.chatId, message);
    }
}
