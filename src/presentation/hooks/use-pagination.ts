import { useCallback, useMemo, useState } from "react"

export function usePagination() {
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(5)

    const rowsPerPageOptions = useMemo(() => Array.from({ length: 5 }, (_, index) => {
        const currentOptinValue = String((index + 1) * 10)
        return { label: currentOptinValue, value: currentOptinValue }
    }), [])

    const changePerPage = useCallback((value: string) => {
        setRowsPerPage(Number(value))
    }, [])

    const handleTotalPages = useCallback((total: number) => {
        setTotalPages(total)
    }, [])

    const prev = useCallback((
        callback: (page: number) => void
    ) => {
        console.log({currentPage});
        
        if(currentPage <= 1) return
        const page = currentPage - 1
        setCurrentPage(page)
        callback(page)
    }, [currentPage])
    
    const next = useCallback((
        callback: (page: number) => void
    ) => {
        const page = currentPage + 1
        setCurrentPage(page)
        callback(page)
    }, [currentPage])
    
    const toFirstPage = useCallback((
        callback: (page: number) => void
    ) => {
        setCurrentPage(1)
        callback(1)
    }, [currentPage])
    
    const toLastPage = useCallback((
        callback: (page: number) => void
    ) => {
        callback(currentPage)
    }, [currentPage])

    return { 
        currentPage, 
        totalPages, 
        rowsPerPage, 
        rowsPerPageOptions, 
        prev,
        next,
        toFirstPage,
        toLastPage,
        changePerPage, 
        handleTotalPages 
    }
}