import { LoginDTO, RegisterDTO } from "./auth.dto";

export interface AuthServiceInterface {
    login(data: LoginDTO): Promise<{ token: string }>
    register(data: RegisterDTO): void
    logout(): void
}