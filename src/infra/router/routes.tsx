import { PageLayout } from "@presentation/layouts/page-layout";
import { Login } from "@presentation/pages/login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <PageLayout>
            <Login />
        </PageLayout>
    }
]

export { routes }