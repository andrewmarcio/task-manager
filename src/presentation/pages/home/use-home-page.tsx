import { TableAction } from "@presentation/components/table/table"
import { useCallback } from "react"
import { Edit2, Trash2 } from "react-feather"

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
                icon: <Edit2 className="w-4 h-4" />,
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