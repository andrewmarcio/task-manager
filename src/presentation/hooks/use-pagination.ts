import { useCallback, useMemo, useState } from "react"

export function usePagination() {
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(5)

    const rowsPerPageOptions = useMemo(() => Array.from({ length: 5 }, (_, index) => {
        const currentOptinValue = String((index + 1) * 10)
        return { label: currentOptinValue, value: currentOptinValue }
    }), [])

    const handleChangePerPage = useCallback((value: string) => {
        setRowsPerPage(Number(value))
    }, [])

    return { currentPage, totalPages, rowsPerPage, rowsPerPageOptions, handleChangePerPage }
}