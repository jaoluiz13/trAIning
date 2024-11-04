import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RequestService {

    constructor(private readonly httpService: HttpService) { }

    async request({
        url,
        endPoint,
        body,
        method,
        params,
        headers,
        basicAuth
    }) {
        const response = this.httpService.axiosRef
            .request({
                method,
                url: url + endPoint,
                headers,
                data: body,
                params: params,
                responseType: "json",
                auth: basicAuth
            })
            .then((res): any => {
                return res.data;
            })
            .catch(function (error: any): any {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);

                    return {
                        data: error.response.data,
                        status: error.response.status,
                        headers: error.response.headers,
                    };
                } else if (error.request) {
                    return error.request;
                } else {
                    return error.message;
                }
            });
        return response;
    }
}
