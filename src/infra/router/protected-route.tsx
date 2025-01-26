import { cookiesService } from "@infra/cookies/cookies.service";
import { memo, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = memo(({ children }: PropsWithChildren) => {
    const token = cookiesService().get("accessToken")
    if(!token) return <Navigate to={"/auth/login"}/>
    return children
})

export { ProtectedRoute }