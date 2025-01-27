import { TaskStatus } from "./task-status.enum"

export interface ListTaskDTO {
    searchText?: string
    status?: TaskStatus
    perPage: number
    currentPage: number
}

export interface CreateTaskDTO {
    title: string
    description: string
}

export interface UpdateTaskDTO {
    title: string
    description: string
    status: TaskStatus
}