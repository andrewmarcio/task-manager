import { cookiesService } from "@infra/cookies/cookies.service";
import { environmentService } from "@infra/environment/environment.service";
import axios from "axios";

function createBaseHttpClient() {
    const environment = environmentService()
    const cookies = cookiesService()
    
    const client = axios.create({
        baseURL: environment.baseApiUrl
    });

    client.interceptors.request.use((config) => {
        const token = cookies.get("accessToken")
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    return client
}

export const httpClient = createBaseHttpClient()