import { TaskStatus } from "@domain/task/task-status.enum"
import { Task } from "@domain/task/task.entity"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@presentation/hooks/use-toast"
import { useCallback, useState } from "react"
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

export function useTaskDialog<V extends z.ZodType<any, any, any>, T extends Omit<Task, "identifier">>({
    useCase,
    validationSchema,
    defaultValues,
    identifier,
    refresh
}: {
    identifier?: string;
    useCase: any;
    defaultValues: DefaultValues<T>;
    validationSchema: V;
    refresh?: () => void
}) {

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { toast } = useToast()

    const { 
        formState: {
            isSubmitting,
            isValid,
            errors
        },
        reset,
        setValue,
        register,
        handleSubmit
    } = useForm<Omit<Task, "identifier">>({
        resolver: zodResolver(validationSchema),
        defaultValues,
    })

    const handleOpenDialog = useCallback((value: boolean) => {
        setOpenDialog(value)
        reset()
    }, [])

    const handleStatusChange = useCallback((status: TaskStatus) => {
        setValue("status", status)
    }, [])

    const handleSave: SubmitHandler<T> = useCallback(async (data) => {
        try {
            if(!!identifier) {
                await useCase.execute(identifier, data)
            } else {
                await useCase.execute(data)
            }

            toast({
                variant: "success",
                title: "Success",
                description: "Task saved successfully"
            })
            refresh?.()
            handleOpenDialog(false)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "The task information could not be saved"
            })
        }
    }, [identifier, useCase, refresh]) 

    return {
        errors,
        isValid,
        openDialog,
        isSubmitting,
        register,
        handleSave,
        handleSubmit,
        handleOpenDialog,
        handleStatusChange
    }
}