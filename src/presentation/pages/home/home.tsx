import { TaskStatus as TaskStatusEnum } from "@domain/task/task-status.enum"
import { AppBar } from "@presentation/components/app-bar"
import { Button } from "@presentation/components/button"
import { Input } from "@presentation/components/form/input"
import { Select } from "@presentation/components/form/select"
import {
    Table,
    TableActions,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@presentation/components/table"
import { TaskDialog } from "@presentation/components/task-dialog"
import { TaskStatus } from "@presentation/components/task-status"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    List,
    LoaderCircleIcon
} from "lucide-react"
import { memo } from "react"
import { useHomePage } from "./use-home-page"

const Home = memo(() => {
    const {
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
    } = useHomePage()

    return <div className="flex flex-col w-full h-full justify-center">
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] pt-12">
                <AppBar />
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="w-[85dvw] flex flex-col gap-1">
                <h5 className="text-xs md:text-base">Here's a list of your tasks</h5>
            </div>
        </div>
        <div className="w-dvw h-full overflow-y-auto">
            <div className="flex flex-col items-center pt-5 pb-6">
                <div className="w-[85dvw] flex flex-col gap-6 rounded-lg p-4 overflow-hidden bg-white drop-shadow-2xl">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                            <Input {...register("searchText")} className="w-100 md:w-80" placeholder="filter tasks..." />
                            <Select
                                className="w-100 md:w-36"
                                placeholder="Status"
                                onValueChange={handleChangeStatus}
                                defaultValue="all"
                                options={[
                                    { label: "All", value: "all" },
                                    { label: "Pending", value: TaskStatusEnum.Pending },
                                    { label: "In Progress", value: TaskStatusEnum.InProgress },
                                    { label: "Complete", value: TaskStatusEnum.Complete },
                                ]}
                            />
                            <div className="w-full flex justify-end">
                                <TaskDialog.Create refresh={getTasksByFilters} />
                            </div>
                        </div>
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
                                    {!loading && tasks.flatMap((task, index) =>
                                        <TableRow key={index}>
                                            <TableCell className="w-fit md:w-72">{task.identifier}</TableCell>
                                            <TableCell className="truncate max-w-36">{task.title}</TableCell>
                                            <TableCell className="truncate max-w-36">{task.description}</TableCell>
                                            <TableCell><TaskStatus type={task.status} /></TableCell>
                                            <TableCell>
                                                <TableActions actions={actionOptions(task.identifier)} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {!loading && !tasks.length && (
                                <div className="w-full h-32 flex flex-row gap-4 items-center justify-center">
                                    <List className="h-8 w-8 text-gray-600" />
                                    <p className="text-sm">No tasks found</p>
                                </div>
                            )}
                            {loading && <div className="w-full h-32 flex items-center justify-center">
                                <LoaderCircleIcon className="animate-spin h-12 w-12 text-gray-600" />
                            </div>}
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
                                <Button className="w-8 h-8" variant={"outline"} onClick={handlePageChange("toFirstPage")}>
                                    <ChevronsLeft className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"} onClick={handlePageChange("prev")}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"} onClick={handlePageChange("next")}>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8" variant={"outline"} onClick={handlePageChange("toLastPage")}>
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
