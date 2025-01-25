import { mergeStyles } from "@shared/utils/merge-styles";
import { memo, PropsWithChildren } from "react";

const PageLayout = memo(({ isFullContent, children }: PropsWithChildren<{ isFullContent?: boolean}>) => {
    return <main className="flex w-dvw h-dvh justify-center bg-white">
        <div className={mergeStyles(
            "w-dvw h-dvh",
            !isFullContent ? "px-4 md:w-[50dvw] md:p-0 lg:w-[40dvw]" : ""
        )}>
            {children}
        </div>
    </main>
})

export { PageLayout }