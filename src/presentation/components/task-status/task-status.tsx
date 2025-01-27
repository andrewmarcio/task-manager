import { TaskStatus as TaskStatusEnum } from "@domain/task/task-status.enum"
import { cva } from "class-variance-authority"
import { Bell, CircleCheck, CirclePlay } from "lucide-react"
import { useMemo } from "react"

type TaskStatusProps = {
    type: TaskStatusEnum
}
const TaskStatus = ({ type }: TaskStatusProps) => {

    const statusOptions = useMemo(() => ({
        [TaskStatusEnum.Pending]: { icon: <Bell />, label: "Pending"},
        [TaskStatusEnum.InProgress]: { icon: <CirclePlay />, label: "In Progress"},
        [TaskStatusEnum.Complete]: { icon: <CircleCheck /> , label: "Complete"},
    }), [])

    const variants = cva(
        "w-fit h-fit p-1 rounded-md text-xs text-white flex flex-row items-center gap-1 [&_svg]:w-4 [&_svg]:h-4",
        {
            variants: {
                type: {
                    [TaskStatusEnum.Pending]: "bg-yellow-400 text-slate-900",
                    [TaskStatusEnum.InProgress]: "bg-sky-500",
                    [TaskStatusEnum.Complete]: "bg-emerald-500",
                }
            }
        }
    )

    return <div className={variants({ type })}>
        {statusOptions[type].icon} {statusOptions[type].label}
    </div>
}

export { TaskStatus }
