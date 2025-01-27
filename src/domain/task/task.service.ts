import { CreateTaskDTO, ListTaskDTO, UpdateTaskDTO } from "./task.dto"
import { Task } from "./task.entity"

export interface TaskServiceInterface {
    list: (params: ListTaskDTO) => Promise<{ data: Task[] }>
    create: (data: CreateTaskDTO) => Promise<any>
    update: (identifier: string, data: UpdateTaskDTO) => Promise<any>
    delete: (identifier: string) => Promise<void>
}