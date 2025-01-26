import { cookiesService } from "@infra/cookies/cookies.service";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const CheckHasSession = memo(() => {
    const token = cookiesService().get("accessToken")
    
    if(token) {
        return <Navigate to={"/home"} />
    }

    return <Outlet />
})

export { CheckHasSession };
