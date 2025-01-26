import { LoginDTO, RegisterDTO } from "@domain/auth/auth.dto";
import { AuthServiceInterface } from "@domain/auth/auth.service";
import { CookiesServiceInterface } from "@domain/cookies/cookies.service";
import { AxiosInstance } from "axios";

export const authService = ({
    cookies,
    client,
}: {
    cookies?: CookiesServiceInterface;
    client: AxiosInstance
}): AuthServiceInterface => {

    return {
        login: async (data: LoginDTO): Promise<{ token: string }> => {
            return await client.post("/login", data)
        },
        register: async (data: RegisterDTO) => {
            return await client.post("/register", data)
        },
        logout: () => {
            cookies?.remove("accessToken");
        }
    }
}