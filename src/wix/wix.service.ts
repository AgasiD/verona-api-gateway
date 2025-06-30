import { HttpException, Injectable } from '@nestjs/common';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';
import { HttpService } from 'src/common/http/http.service';
import { envs } from 'src/config/envs';

@Injectable()
export class WixService {

    HEADERS: any;
    URL = envs.WIX_URL
    constructor(private readonly http: HttpService) {

        this.HEADERS = {
            "Authorization": envs.WIX_API_KEY,
            "wix-account-id": envs.WIX_ACC_ID,
            "wix-site-id": envs.WIX_SITE_ID
        }
    }


    async getAllPost_deprecated() {

        let response = await this.http.get(`${this.URL}/posts`, this.HEADERS);
        return response;
    }


    async getAllPostQuery() {
        const body = {
            "fieldsets": [
                "URL",
                // "METRICS",
                "CONTENT_TEXT"
            ]
        }
        let response = await this.http.post(`${this.URL}/posts/query`, this.HEADERS, body);
        return response;
    }


    async getPost(idPost) {
        let response = await this.http.get(`${this.URL}/posts/${idPost}`, this.HEADERS);
        return response;
    }


    async obtener_posteos() {
        try {

            let data = await this.getAllPostQuery();

            if (data.status > 300) {
                handleHttpErrors({ message: data.statusText, status: data.status });
            }

            return data.data;

        } catch (err) {


        }
    }

    async obtener_posteo(idPost) {
        try {

            let data = await this.getPost(idPost);

            if (data.status > 300) {
                throw new Error(data.statusText);
            }

            const response = {
                fallo: false,
                data: data.data
            }

            return response;

        } catch (err) {

            console.log(err.message)
            return {
                fallo: true,
                error: err.message
            }
        }
    }
}
