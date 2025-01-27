import { CreateTaskDTO, ListTaskDTO, UpdateTaskDTO } from "@domain/task/task.dto";
import { Task } from "@domain/task/task.entity";
import { AxiosInstance } from "axios";

export function taskService({ client }: {
    client: AxiosInstance
}) {
    return {
        list: async (params: ListTaskDTO): Promise<{
            data: Task[]
        }> => {
            return await client.get("/tasks/list", {
                params
            })
        },
        create: async (data: CreateTaskDTO): Promise<any> => {
            return await client.post("/tasks/create", data)
        },
        update: async (identifier: string, data: UpdateTaskDTO): Promise<any> => {
            return await client.put(`/tasks/${identifier}/update`, data)
        },
        delete: async (identifier: string): Promise<void> => {
            await client.delete(`/tasks/${identifier}`)
        },
    }
}