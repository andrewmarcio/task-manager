import { TaskStatus } from "./task-status.enum"

export interface Task {
    identifier: string
    title: string
    description: string
    status: TaskStatus
}