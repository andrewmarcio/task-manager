import React, { memo } from "react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Input } from "../form/input";
import { CirclePlus } from "lucide-react";
import { Textarea } from "../form/text-area";
import { Select } from "../form/select";
import { TaskStatus } from "@domain/task/task-status.enum";
import { useTaskDialog } from "./use-task-dialog";
import { CreateTaskValidationSchema, UpdateTaskValidationSchema } from "@domain/task/task.validation";
import { Task } from "@domain/task/task.entity";
import { updateTaskUseCase } from "@domain/task/update-task.usecase";
import { taskService } from "@services/task.service";
import { httpClient } from "@infra/http-client";
import { createTaskUseCase } from "@domain/task/create-task.usecase";

const TaskCreate = memo(({ refresh } : { refresh?: () => void }) => {
    const {
        errors,
        openDialog,
        isSubmitting,
        isValid,
        register,
        handleSubmit,
        handleSave,
        handleOpenDialog
    } = useTaskDialog({
        identifier: undefined,
        validationSchema: CreateTaskValidationSchema,
        defaultValues: {
            title: "",
            description: ""
        },
        useCase: createTaskUseCase({ service: taskService({ client: httpClient }) }),
        refresh
    })

    return (
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CirclePlus />
                    Add task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <form className="w-full" onSubmit={handleSubmit(handleSave)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4 gap-y-2">
                            <label htmlFor="title" className="text-right">
                                Title
                            </label>
                            <Input {...register("title")} id="title" className="col-span-3" disabled={isSubmitting}/>
                            <span className="col-span-1"/>
                            {errors?.title && (<p className="text-xs text-red-600 font-medium col-span-3">{errors.title.message}</p>)}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 gap-y-2">
                            <label htmlFor="description" className="text-right">
                                Description
                            </label>
                            <Textarea {...register("description")} id="description" className="col-span-3" disabled={isSubmitting}/>
                            <span className="col-span-1"/>
                            {errors?.description && (<p className="text-xs text-red-600 font-medium col-span-3">{errors.description.message}</p>)}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="submit" loading={isSubmitting} disabled={!isValid}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
})

const TaskUpdate = memo(({ 
    task: { identifier, ...task },
    refresh,
    actionButton
}: { task: Task; refresh?: () => void, actionButton?: React.ReactNode }) => {
    const {
        errors,
        openDialog,
        isSubmitting,
        isValid,
        selectedStatus,
        register,
        handleSubmit,
        handleSave,
        handleOpenDialog,
        handleStatusChange
    } = useTaskDialog({
        identifier,
        defaultValues: task,
        validationSchema: UpdateTaskValidationSchema, 
        useCase: updateTaskUseCase({ service: taskService({ client: httpClient }) }),
        refresh
    })

    return (
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
            <DialogTrigger asChild>
                {actionButton ??
                <Button variant="outline">
                    <CirclePlus />
                    Edit task
                </Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Update task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form className="w-full" onSubmit={handleSubmit(handleSave)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4 gap-y-2">
                            <label htmlFor="title" className="text-right">
                                Title
                            </label>
                            <Input {...register("title")} id="title" className="col-span-3" disabled={isSubmitting}/>
                            <span className="col-span-1"/>
                            {errors?.title && (<p className="text-xs text-red-600 font-medium col-span-3">{errors.title.message}</p>)}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 gap-y-2">
                            <label htmlFor="description" className="text-right">
                                Description
                            </label>
                            <Textarea {...register("description")} id="description" className="col-span-3" disabled={isSubmitting}/>
                            <span className="col-span-1"/>
                            {errors?.description && (<p className="text-xs text-red-600 font-medium col-span-3">{errors.description.message}</p>)}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 gap-y-2">
                            <label htmlFor="status" className="text-right">
                                Status
                            </label>
                            <Select
                                value={selectedStatus}
                                className="col-span-3" 
                                options={[
                                    { label: "Pending", value: TaskStatus.Pending },
                                    { label: "In Progress", value: TaskStatus.InProgress },
                                    { label: "Complete", value: TaskStatus.Complete },
                                ]}
                                onValueChange={handleStatusChange} 
                                disabled={isSubmitting}
                            />
                            <span className="col-span-1"/>
                            {errors?.status && (<p className="text-xs text-red-600 font-medium col-span-3">{errors.status.message}</p>)}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="submit" loading={isSubmitting} disabled={!isValid}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
})

export const TaskDialog = {
    Create: TaskCreate,
    Update: TaskUpdate
}
