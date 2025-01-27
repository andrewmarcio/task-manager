import { CreateTaskDTO } from "./task.dto";
import { TaskServiceInterface } from "./task.service";

export function createTaskUseCase({
    service
}: {
    service: TaskServiceInterface,
}) {
    return {
        execute: async function (data: CreateTaskDTO) {
            await service.create(data);
        }
    }
}