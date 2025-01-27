import { UpdateTaskDTO } from "./task.dto";
import { TaskServiceInterface } from "./task.service";

export function updateTaskUseCase({
    service
}: {
    service: TaskServiceInterface,
}) {
    return {
        execute: async function (identifier: string, data: UpdateTaskDTO) {
            await service.update(identifier, data);
        }
    }
}