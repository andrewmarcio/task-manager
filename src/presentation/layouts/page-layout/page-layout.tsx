import { memo, PropsWithChildren } from "react";

const PageLayout = memo(({ children }: PropsWithChildren) => {
    return <main className="flex w-dvw h-dvh justify-center">
        <div className="w-screen h-fit !px-4 md:w-xl md:!p-0">
            {children}
        </div>
    </main>
})

export { PageLayout }