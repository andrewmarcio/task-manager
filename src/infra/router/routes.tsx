import { PageLayout } from "@presentation/layouts/page-layout";
import { Login } from "@presentation/pages/login";
import { Register } from "@presentation/pages/register";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Navigate to={"/login"} />
            },
            {
                path: "login",
                element: <PageLayout>
                    <Login />
                </PageLayout>
            },
            {
                path: "register",
                element: <PageLayout>
                    <Register />
                </PageLayout>
            }
        ]
    }
]

export { routes }