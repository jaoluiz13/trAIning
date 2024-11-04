import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestService } from 'src/modules/@shared/request/request.service';
const stravaApi = require('strava-v3');

@Injectable()
export class StravaService {

    constructor(private readonly requestService: RequestService) { }

    async login(code: string) {
        return await this.exchangeToken(code);
    }

    async exchangeToken(code: string) {

        let response = await this.requestService.request({
            url: process.env.STRAVA_API_URL_SIMPLE,
            method: 'POST',
            endPoint: `/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
            body: {},
            headers: {},
            basicAuth: false,
            params: {}
        });

        if (response.status == 400) {
            throw new HttpException({ message: response.data }, HttpStatus.BAD_REQUEST)
        }

        return response.access_token;
    }

    async fetchTrainings(code: string) {
        try {
            let strava = new stravaApi.client(code);
            return await strava.athlete.listActivities({ access_token: code, before: this.getDate().now, after: this.getDate().startOfMonth });
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST)
        }

    }

    getDate() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return {
            startOfMonth: Math.floor(startOfMonth.getTime() / 1000),
            now: Math.floor(now.getTime() / 1000)
        };
    }
}
