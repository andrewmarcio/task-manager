import { TableAction } from "@presentation/components/table/table"
import { Pencil, Trash2 } from "lucide-react"
import { useCallback } from "react"

export function useHomePage() {

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

    return {
        actionOptions
    }
}