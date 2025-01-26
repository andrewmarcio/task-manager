import { CookiesServiceInterface } from "@domain/cookies/cookies.service";
import { LoginDTO } from "./auth.dto";
import { AuthServiceInterface } from "./auth.service";

export function loginUseCase({
    cookies,
    service
}: {
    cookies: CookiesServiceInterface
    service: AuthServiceInterface,
}) {
    return {
        execute: async function ({ email, password }: LoginDTO) {
            const response = await service.login({
                email, password
            });

            cookies.set("accessToken", response.token, {
                expires: new Date().setHours(3),
                secure: true,
            })
        }
    }
}