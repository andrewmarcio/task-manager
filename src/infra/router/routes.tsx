import { PageLayout } from "@presentation/layouts/page-layout";
import { Home } from "@presentation/pages/home";
import { Login } from "@presentation/pages/login";
import { Register } from "@presentation/pages/register";
import { Navigate, RouteObject } from "react-router-dom";
import { CheckHasSession } from "./check-has-session";
import { ProtectedRoute } from "./protected-route";

const routes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Navigate to={"auth"} />
            },
            {
                path: "auth",
                element: <CheckHasSession />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={"login"} />
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
                    },
                ]
            },
            {
                path: "home",
                element: (
                    <ProtectedRoute>
                        <PageLayout isFullContent>
                            <Home />
                        </PageLayout>
                    </ProtectedRoute>
                )
            }
        ],
    }
]

export { routes };
