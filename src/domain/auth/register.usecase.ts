import { RegisterDTO } from "./auth.dto";
import { AuthServiceInterface } from "./auth.service";

export function registerUseCase({
    service
}: {
    service: AuthServiceInterface,
}) {
    return {
        execute: async function ({ name, email, password }: RegisterDTO) {
            await service.register({
                name, email, password
            });
        }
    }
}