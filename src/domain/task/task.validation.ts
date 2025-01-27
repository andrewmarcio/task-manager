import { z } from "zod";
import { TaskStatus } from "./task-status.enum";

export const CreateTaskValidationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
})

export const UpdateTaskValidationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    status: z.enum([
        TaskStatus.Pending, 
        TaskStatus.InProgress, 
        TaskStatus.Complete], 
        { message: "Select a valid status" }
    ),
})