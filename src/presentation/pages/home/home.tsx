import { AppBar } from "@presentation/components/app-bar"
import { Button } from "@presentation/components/button"
import { Input } from "@presentation/components/form/input"
import { Select } from "@presentation/components/form/select"
import { Table, TableActions, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@presentation/components/table"
import { usePagination } from "@presentation/hooks/use-pagination"
import { memo } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather"
import { useHomePage } from "./use-home-page"

const Home = memo(() => {
    const { actionOptions } = useHomePage()
    const { currentPage, totalPages, rowsPerPage, rowsPerPageOptions, handleChangePerPage } = usePagination()

    return <div className="flex flex-col w-full h-full justify-center">
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] pt-12">
                <AppBar />
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] flex flex-col gap-1">
                {/* <h3 className="text-base font-bold md:text-3xl">Tasks</h3> */}
                <h5 className="text-xs md:text-base">Here's a list of your tasks</h5>
            </div>
        </div>
        <div className="w-dvw h-full overflow-y-auto">
            <div className="flex flex-col items-center pt-5 pb-6">
                <div className="w-[85dvw] flex flex-col gap-6 rounded-lg p-4 overflow-hidden bg-white drop-shadow-2xl">
                    <div className="flex flex-col gap-4">
                        <Input className="w-100 md:w-80" placeholder="filter tasks..." />
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="md:w-72">Identifier</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-48">Status</TableHead>
                                        <TableHead className="w-32" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.from({ length: rowsPerPage }).flatMap((_, index) =>
                                        <TableRow key={index}>
                                            <TableCell className="w-fit md:w-72">549a2699-1a6f-43a5-92a7-17dccd180cc5</TableCell>
                                            <TableCell className="truncate max-w-36">Task {index + 1}</TableCell>
                                            <TableCell className="truncate max-w-36">Teste description</TableCell>
                                            <TableCell>Pending</TableCell>
                                            <TableCell>
                                                <TableActions actions={actionOptions("549a2699-1a6f-43a5-92a7-17dccd180cc5")} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex flex-col md:flex-row w-100 gap-4 md:gap-6 items-center justify-end text-sm font-medium">
                            <div className="flex flex-row gap-6 items-center justify-between">
                                <div className="flex flex-row gap-4 items-center">
                                    Rows per page
                                    <Select
                                        value={String(rowsPerPage)}
                                        className="w-[4.5rem]"
                                        options={rowsPerPageOptions}
                                        onValueChange={handleChangePerPage}
                                    />
                                </div>
                                <div>
                                    Page {currentPage} of {totalPages}
                                </div>
                            </div>
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <Button className="w-8 h-8" variant={"outline"}>
                                    <ChevronsLeft className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"}>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"}>
                                    <ChevronsRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
})

export { Home }
