import { memo, PropsWithChildren } from "react";

const PageLayout = memo(({ children }: PropsWithChildren) => {
    return <main className="flex w-dvw h-dvh justify-center bg-slate-800">
        <div className="w-full h-full px-4 md:w-[50dvw] md:p-0 lg:w-[40dvw]">
            {children}
        </div>
    </main>
})

export { PageLayout }