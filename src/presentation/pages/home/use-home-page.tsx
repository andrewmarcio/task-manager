import { TaskStatus } from "@domain/task/task-status.enum"
import { ListTaskDTO } from "@domain/task/task.dto"
import { Task } from "@domain/task/task.entity"
import { httpClient } from "@infra/http-client"
import { TableAction } from "@presentation/components/table/table"
import { useDebounce } from "@presentation/hooks/use-debounce"
import { usePagination } from "@presentation/hooks/use-pagination"
import { useToast } from "@presentation/hooks/use-toast"
import { taskService } from "@services/task.service"
import { Pencil, Trash2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

export function useHomePage() {

    const [tasks, setTasks] = useState<Task[]>([])

    const [loading, setLaoding] = useState<boolean>(false)

    const { toast } = useToast()

    const { control, register, getValues, setValue } = useForm({
        defaultValues: {
            searchText: "",
            status: undefined
        }
    })

    const {
        currentPage,
        totalPages,
        rowsPerPage,
        rowsPerPageOptions,
        changePerPage,
        prev,
        next,
        toFirstPage,
        toLastPage,
    } = usePagination()

    const searchText = useWatch({
        control,
        name: "searchText"
    })

    const searchTitle = useDebounce(searchText)

    const getTasks = useCallback(async (params: ListTaskDTO) => {
        const service = taskService({ client: httpClient })
        return await service.list(params)
    }, [])

    const showRequestErrorMessage = useCallback(() => {
        toast({
            variant: "destructive",
            title: "Error",
            description: "It was not possible to search"
        })
    }, [])

    const handleChangePerPage = useCallback(async (value: string) => {
        setLaoding(true)
        changePerPage(value)
        try {
            const params = getValues()
            const { data } = await getTasks({ ...params, currentPage, perPage: Number(value) })
            setTasks(data)
        } catch (error) {
            showRequestErrorMessage()
        }

        setLaoding(false)
    }, [currentPage])

    const handleChangeStatus = useCallback(async (status: TaskStatus & "all") => {
        setLaoding(true)
        setValue("status", status as any)
        const selectedStatus = status !== "all" ? status : undefined
        try {
            const params = getValues()
            const { data } = await getTasks({ ...params, status: selectedStatus, currentPage, perPage: rowsPerPage })
            setTasks(data)
        } catch (error) {
            showRequestErrorMessage()
        }
        setLaoding(false)
    }, [rowsPerPage, currentPage])

    const getTasksByFilters = useCallback(async () => {
        setLaoding(true)
        try {
            const params = getValues()
            const { data } = await getTasks({ ...params, currentPage, perPage: rowsPerPage })
            setTasks(data)
        } catch (error) {
            showRequestErrorMessage()
        }
        setLaoding(false)
    }, [rowsPerPage, currentPage])

    const handlePageChange = useCallback(
        (type: "toFirstPage" | "toLastPage" | "prev" | "next") => {
            const request = async (page: number) => {
                setLaoding(true)
                try {
                    const params = getValues()
                    const { data } = await getTasks({ ...params, currentPage: page, perPage: rowsPerPage })
                    setTasks(data)
                } catch (error) {
                    showRequestErrorMessage()
                }
                setLaoding(false)
            }

            return {
                toFirstPage() { toFirstPage(request) },
                toLastPage() { toLastPage(request) },
                prev() { prev(request) },
                next() { next(request) },
            }[type]
        }, [
            rowsPerPage,
            prev,
            next,
            toFirstPage,
            toLastPage,
        ])

    const handleEdit = useCallback((identifier: string) => () => {
        alert("Edit")
    }, [])
    const handleRemove = useCallback((identifier: string) => () => {
        alert("Remove")
    }, [])

    const actionOptions = useCallback((identifier: string) => {
        return [
            {
                label: "Edit",
                icon: <Pencil className="w-4 h-4" />,
                handleClick: handleEdit(identifier)
            },
            {
                label: "Remove",
                icon: <Trash2 className="w-4 h-4 text-red-600" />,
                handleClick: handleRemove(identifier)
            },
        ] satisfies TableAction[]
    }, [])

    useEffect(() => {
        if (searchTitle) {
            getTasksByFilters()
        }
    }, [searchTitle])

    useEffect(() => {
        getTasksByFilters()
    }, [])


    return {
        loading,
        tasks,
        currentPage,
        totalPages,
        rowsPerPage,
        rowsPerPageOptions,
        register,
        actionOptions,
        handleChangePerPage,
        handleChangeStatus,
        handlePageChange,
        getTasksByFilters
    }
}